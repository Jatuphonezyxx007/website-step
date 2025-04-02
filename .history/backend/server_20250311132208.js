require('dotenv').config(); // โหลดค่าจากไฟล์ .env

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const argon2 = require('argon2');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
// const app = express();
const port = process.env.PORT || 3000; // ใช้ค่าจาก .env หากมี

const app = express();
app.use(bodyParser.json({ limit: "50mb" })); // ✅ เพิ่มขนาด JSON สูงสุด
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());

// ให้บริการไฟล์ static สำหรับรูปสินค้า
app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));
// ให้บริการไฟล์ static สำหรับรูปผู้ใช้
app.use('/images/user', express.static(path.join(__dirname, '../admin/public/images/user')));

// ตั้งค่าการเชื่อมต่อ MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST, // ใช้ค่าจาก .env
  user: process.env.DB_USER, // ใช้ค่าจาก .env
  password: process.env.DB_PASSWORD, // ใช้ค่าจาก .env
  database: process.env.DB_NAME, // ใช้ค่าจาก .env
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
async function checkDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully.');
    connection.release();
  } catch (error) {
    console.error('❌ Database Connection Failed:', error);
    process.exit(1);
  }
}
checkDBConnection();

// 👉 ตั้งค่าให้ `multer` เก็บไฟล์ใน memory แทนที่จะเขียนลง disk ทันที
const storage = multer.memoryStorage(); // ✅ ใช้ memory storage ไม่บันทึกไฟล์ทันที
const upload = multer({ storage });

app.post('/api/admin/login', async (req, res) => {
  console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM admin WHERE admin_user = ?`,
      [username]
    );

    if (rows.length === 0) {
      console.log('❌ ผู้ใช้ไม่ถูกต้อง');
      return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const admin = rows[0];

    if (!admin.admin_pwd) {
      console.error("❌ admin.admin_pwd is undefined for user:", username);
      return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const validPassword = await argon2.verify(admin.admin_pwd, password);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);

    // ลบรหัสผ่านออกจากข้อมูลที่ส่งกลับ
    delete admin.admin_pwd;

    // ✅ เพิ่ม URL ของรูปภาพ
    const imageUrl = admin.admin_img 
      ? `/images/user/${admin.admin_img}`  // ถ้ามีรูป ใช้ path ที่ถูกต้อง
      : "/images/user/default-avatar.png"; // ถ้าไม่มีรูป ใช้ค่าพื้นฐาน

    return res.status(200).json({
      success: true,
      message: '✅ เข้าสู่ระบบสำเร็จ',
      user: {
        admin_id: admin.admin_id,
        admin_user: admin.admin_user,
        admin_name: admin.admin_name,
        admin_lastname: admin.admin_lastname,
        admin_email: admin.admin_email,
        admin_phone: admin.admin_phone,
        admin_position: admin.admin_position,
        admin_img: imageUrl, // ✅ ส่ง URL ที่แก้ไขแล้วกลับไป
      },
    });

  } catch (error) {
    console.error('❌ Error during login:', error);
    return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});


// API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
app.get('/api/products', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.product_id, 
        p.product_name,  
        p.category_id,
        p.images_main, 
        p.created_at,
        p.series_id
      FROM products p
      ORDER BY p.product_id ASC
    `;
    const [rows] = await pool.query(query);
    res.status(200).json({ success: true, products: rows });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
  }
});

//api สำหรับการค้นหาสินค้า
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT product_id, product_name, images_main FROM products"
    );
    res.json({ success: true, products: rows });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
});

app.get("/api/products/search", async (req, res) => {
  const searchQuery = req.query.query;
  if (!searchQuery) {
    return res.json({ success: false, products: [] });
  }

  try {
    const [rows] = await pool.query(
      "SELECT product_id, product_name, images_main FROM products WHERE product_name LIKE ?",
      [`%${searchQuery}%`]
    );
    res.json({ success: true, products: rows });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
});



app.get('/api/products/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    // Query ดึงข้อมูลสินค้าจากตาราง products พร้อม join กับ product_details, series, categories
    const productQuery = `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.category_id,
        p.series_id,
        p.images_main,
        p.created_at,
        pd.detail,
        s.series_name, 
        c.category_name
      FROM products p
      LEFT JOIN product_details pd ON p.product_id = pd.product_id
      LEFT JOIN series s ON p.series_id = s.series_id
      LEFT JOIN categories c ON p.category_id = c.category_id
      WHERE p.product_id = ?
    `;
    const [productRows] = await pool.query(productQuery, [product_id]);
    if (productRows.length === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    const product = productRows[0];

    // Query ดึงภาพรองจากตาราง product_images
    const imagesQuery = `
      SELECT path
      FROM product_images
      WHERE product_id = ?
    `;
    const [imagesRows] = await pool.query(imagesQuery, [product_id]);
    // เก็บผลลัพธ์ในรูปแบบ array
    product.supplementary_images = imagesRows.map(row => row.path);

    res.status(200).json({ success: true, product });

    
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
  }
});


// API: ดึงข้อมูล categories สำหรับ droplist
app.get('/api/categories', async (req, res) => {
  try {
    const query = `
      SELECT 
        category_id AS value, 
        category_name AS label
      FROM categories
      ORDER BY category_name ASC
    `;
    const [rows] = await pool.query(query);
    res.status(200).json({ success: true, categories: rows });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
  }
});


// ✅ API: อัปโหลดรูปภาพ (ยังไม่บันทึกลง `/public/products`)
app.post("/api/upload-image-temp", upload.single("image"), async (req, res) => {
  try {
    const { product_id } = req.body;
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!product_id) {
      return res.status(400).json({ success: false, message: "Product ID is missing" });
    }

    const fileExt = path.extname(req.file.originalname);
    
    // 🔍 ตรวจสอบจำนวนรูปภาพที่มีอยู่แล้ว
    const [imageCount] = await pool.query(
      "SELECT COUNT(*) AS count FROM product_images WHERE product_id = ?",
      [product_id]
    );
    const index = imageCount[0].count + 1; // กำหนด index ถัดไป
    const filename = `/${product_id}_${index}${fileExt}`;

    // 🛑 ยังไม่ copy ไปที่ `/public/products`
    console.log("📸 Temporary uploaded image:", filename);

    res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });
  } catch (error) {
    console.error("🚨 Error uploading image:", error);
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
});

// ✅ API บันทึกภาพ (หลังจากกดบันทึก)
app.post("/api/save-images", upload.array("images"), async (req, res) => {
  try {
    const { product_id } = req.body;
    const images = req.files;

    console.log("🔍 Received product_id:", product_id);
    console.log("🖼️ Received images:", images.length);

    if (!product_id || !images || images.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data (missing product_id or images)" });
    }

    // ✅ ใช้ path admin/public/products
    const savePath = path.join(__dirname, "../admin/public/products");

    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
      console.log("📂 Created directory:", savePath);
    }

    // ดึงรายชื่อไฟล์ที่มีอยู่ในฐานข้อมูล
    const [existingImages] = await pool.query(
      "SELECT path FROM product_images WHERE product_id = ?",
      [product_id]
    );
    const existingImageSet = new Set(existingImages.map(img => img.path));

    for (let index = 0; index < images.length; index++) {
      const file = images[index];
      const fileExt = path.extname(file.originalname);
      const filename = `${product_id}_${index + 1}${fileExt}`; // ✅ ไม่มี "/" นำหน้า
      const filePath = path.join(savePath, filename);

      // 🔍 ตรวจสอบว่ามีไฟล์นี้อยู่แล้วหรือไม่
      if (!existingImageSet.has(filename) && !fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, file.buffer);
        console.log(`✅ Saved image: ${filePath}`);

        if (index === 0) {
          await pool.query("UPDATE products SET images_main = ? WHERE product_id = ?", [filename, product_id]);
        } else {
          await pool.query("INSERT INTO product_images (product_id, path) VALUES (?, ?)", [product_id, filename]);
        }
      } else {
        console.log(`⏭️ Skipping existing image: ${filename}`);
      }
    }

    res.status(200).json({ success: true, message: "Images saved successfully" });
  } catch (error) {
    console.error("🚨 Error saving images:", error);
    res.status(500).json({ success: false, message: "Error saving images" });
  }
});



// ✅ API: อัปเดตข้อมูลสินค้า
app.put("/api/products/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const { product_name, category_id, series_id, detail } = req.body;

    if (!product_name || !category_id) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    console.log(`📝 Updating product ID: ${product_id}`);
    console.log("📦 Received Data:", { product_name, category_id, series_id, detail });

    // ✅ ตรวจสอบว่าข้อมูลเปลี่ยนแปลงหรือไม่
    const [existingProduct] = await pool.query(
      "SELECT product_name, category_id, series_id FROM products WHERE product_id = ?",
      [product_id]
    );

    if (existingProduct.length > 0) {
      const { product_name: currentName, category_id: currentCategory, series_id: currentSeries } = existingProduct[0];

      if (currentName === product_name && currentCategory === category_id && currentSeries === series_id) {
        console.log("⚠️ No changes detected, skipping UPDATE.");
      } else {
        const updateProductQuery = `
          UPDATE products 
          SET product_name = ?, category_id = ?, series_id = ? 
          WHERE product_id = ?
        `;

        const [updateResult] = await pool.query(updateProductQuery, [product_name, category_id, series_id, product_id]);

        console.log("🔄 Product Update Result:", updateResult);
      }
    }

    // ✅ ตรวจสอบว่ามี `detail` ใน `product_details` หรือไม่
    const [existingDetail] = await pool.query(
      "SELECT product_id FROM product_details WHERE product_id = ?",
      [product_id]
    );

    if (existingDetail.length > 0) {
      const updateDetailQuery = `
        UPDATE product_details 
        SET detail = ? 
        WHERE product_id = ?
      `;

      const [updateDetailResult] = await pool.query(updateDetailQuery, [detail, product_id]);

      console.log("🔄 Product Detail Update Result:", updateDetailResult);
    } else {
      const insertDetailQuery = `
        INSERT INTO product_details (product_id, detail) 
        VALUES (?, ?)
      `;

      const [insertDetailResult] = await pool.query(insertDetailQuery, [product_id, detail]);

      console.log("🆕 Inserted new detail:", insertDetailResult);
    }

    res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("🚨 Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
});




app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});