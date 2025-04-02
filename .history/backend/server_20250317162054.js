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
//ให้บริการ static สำหรับร 3d
app.use('/3d', express.static(path.join(__dirname, '../admin/public/products_3d')));
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




// ตั้งค่าการเก็บไฟล์ 3D
const storage3d = multer.memoryStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../admin/public/products_3d");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // 📌 ดึง product_id จาก req.body
    const productId = req.body.product_id;
    
    if (!productId) {
      return cb(new Error("❌ Missing product_id"), null);
    }

    // 📌 ดึงนามสกุลไฟล์ (เช่น .glb, .obj)
    const fileExt = path.extname(file.originalname).toLowerCase();

    // 📌 ตั้งชื่อไฟล์ใหม่เป็น "product_id.นามสกุลไฟล์"
    const newFilename = `${productId}${fileExt}`;
    cb(null, newFilename);
  },
});

const upload3d = multer({
  storage: storage3d, // ✅ อัปเดตเป็น memoryStorage()
  limits: { fileSize: 50 * 1024 * 1024 }, // จำกัดขนาด 50MB
  fileFilter: (req, file, cb) => {
    console.log("📌 Checking file:", file.originalname);
    const allowedTypes = [".obj", ".glb", ".gltf", ".stl"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return cb(new Error("❌ Only 3D file formats are allowed"), false);
    }
    cb(null, true);
  },
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


// // API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name,  
//         p.category_id,
//         p.created_at,
//         p.series_id
//       FROM products p
//       ORDER BY p.product_id ASC
//     `;
//     const [rows] = await pool.query(query);
//     res.status(200).json({ success: true, products: rows });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
//   }
// });

// API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
app.get('/api/products', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.product_id, 
        p.product_name,  
        p.category_id,
        p.created_at,
        p.series_id,
        i.path AS main_image
      FROM products p
      LEFT JOIN product_images i 
        ON i.product_id = p.product_id AND i.is_main = 1
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
      "SELECT product_id, product_name FROM products"
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
      "SELECT product_id, product_name FROM products WHERE product_name LIKE ?",
      [`%${searchQuery}%`]
    );
    res.json({ success: true, products: rows });
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
});



// app.get('/api/products/:product_id', async (req, res) => {
//   try {
//     const { product_id } = req.params;
//     // Query ดึงข้อมูลสินค้าจากตาราง products พร้อม join กับ product_details, series, categories
//     const productQuery = `
//       SELECT 
//         p.product_id, 
//         p.product_name, 
//         p.category_id,
//         p.series_id,
//         p.images_main,
//         p.created_at,
//         pd.detail,
//         s.series_name, 
//         c.category_name
//       FROM products p
//       LEFT JOIN product_details pd ON p.product_id = pd.product_id
//       LEFT JOIN series s ON p.series_id = s.series_id
//       LEFT JOIN categories c ON p.category_id = c.category_id
//       WHERE p.product_id = ?
//     `;
//     const [productRows] = await pool.query(productQuery, [product_id]);
//     if (productRows.length === 0) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     const product = productRows[0];

//     // Query ดึงภาพรองจากตาราง product_images
//     const imagesQuery = `
//       SELECT path
//       FROM product_images
//       WHERE product_id = ?
//     `;
//     const [imagesRows] = await pool.query(imagesQuery, [product_id]);
//     // เก็บผลลัพธ์ในรูปแบบ array
//     product.supplementary_images = imagesRows.map(row => row.path);

//     res.status(200).json({ success: true, product });

    
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
//   }
// });
app.get('/api/products/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    // ดึงข้อมูลสินค้าพร้อมรายละเอียดอื่นๆ
    const productQuery = `
      SELECT 
        p.product_id, 
        p.product_name, 
        p.category_id,
        p.series_id,
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

    // ดึงภาพทั้งหมด (main + รอง)
    const imagesQuery = `
      SELECT path, is_main
      FROM product_images
      WHERE product_id = ?
    `;
    const [imagesRows] = await pool.query(imagesQuery, [product_id]);

    // แยกภาพหลักและภาพรอง
    const mainImage = imagesRows.find(img => img.is_main === 1);
    const supplementaryImages = imagesRows
      .filter(img => img.is_main === 0)
      .map(img => img.path);

    product.main_image = mainImage ? mainImage.path : null;
    product.supplementary_images = supplementaryImages;

    res.status(200).json({ success: true, product });

  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
  }
});




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
    console.error("❌ Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
  }
});

// API: ดึงหมวดหมู่ตาม ID
app.get('/api/categories/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id, 10);

    if (isNaN(categoryId)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }

    console.log(`📌 Fetching category ID: ${categoryId}`);

    const query = `SELECT category_id AS value, category_name AS label FROM categories WHERE category_id = ?`;
    const [rows] = await pool.query(query, [categoryId]);

    if (rows.length > 0) {
      res.status(200).json({ success: true, category: rows[0] });
    } else {
      console.warn(`⚠️ No category found for ID ${categoryId}`);
      res.status(404).json({ success: false, message: `Category ID ${categoryId} not found` });
    }
  } catch (error) {
    console.error("❌ Error fetching category:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// API: ดึงสินค้าตามหมวดหมู่
app.get('/api/product', async (req, res) => {
  try {
    const categoryId = req.query.category ? parseInt(req.query.category, 10) : null;

    if (!categoryId || isNaN(categoryId)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }

    console.log(`📌 Received categoryId: ${categoryId}`);

    const query = `
      SELECT 
        p.product_id AS id, 
        p.product_name AS name, 
        i.path AS image, 
        p.category_id
      FROM products p
      LEFT JOIN product_images i 
        ON i.product_id = p.product_id AND i.is_main = 1
      WHERE p.category_id = ?
      ORDER BY p.product_id ASC`;

    console.log(`📌 Executing SQL Query: ${query} with categoryId = ${categoryId}`);

    const [rows] = await pool.query(query, [categoryId]);

    console.log(`📌 Found ${rows.length} products for category ${categoryId}`);

    res.status(200).json({ 
      success: rows.length > 0, 
      products: rows.length > 0 ? rows : [], 
      message: rows.length > 0 ? null : `ไม่มีสินค้าสำหรับหมวดหมู่ ${categoryId}` 
    });

  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});



// ✅ API: อัปโหลดรูปภาพ (ยังไม่บันทึกลง `/public/products`)
app.post("/api/upload-image-temp", upload.single("image"), async (req, res) => {
  try {
    let { product_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!product_id || product_id === "null") {
      return res.status(400).json({ success: false, message: "Product ID is missing or invalid" });
    }

    const fileExt = path.extname(req.file.originalname);
    const [imageCount] = await pool.query("SELECT COUNT(*) AS count FROM product_images WHERE product_id = ?", [product_id]);
    const index = imageCount[0].count + 1;
    const filename = `/${product_id}_${index}${fileExt}`;

    res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });
  } catch (error) {
    console.error("🚨 Error uploading image:", error);
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
});

app.post("/api/save-images", upload.array("images"), async (req, res) => {
  try {
    const { product_id } = req.body;
    const images = req.files;

    if (!product_id || !images || images.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid data (missing product_id or images)" });
    }

    const savePath = path.join(__dirname, "../admin/public/products");

    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    const [existingImages] = await pool.query(
      "SELECT path FROM product_images WHERE product_id = ?",
      [product_id]
    );

    const existingFileNames = existingImages.map(img => img.path);

    let nextIndex = existingImages.length + 1;

    const savedFiles = [];

    for (let index = 0; index < images.length; index++) {
      const file = images[index];
      const fileExt = path.extname(file.originalname);
      const filename = `${product_id}_${nextIndex}${fileExt}`;

      if (existingFileNames.includes(filename)) {
        console.log(`⚠️ Image ${filename} already exists, skipping...`);
        continue;
      }

      const filePath = path.join(savePath, filename);
      fs.writeFileSync(filePath, file.buffer);
      console.log(`✅ Saved image: ${filePath}`);

      if (nextIndex === 1) {
        await pool.query("UPDATE products SET images_main = ? WHERE product_id = ?", [filename, product_id]);
      } else {
        await pool.query("INSERT INTO product_images (product_id, path) VALUES (?, ?)", [product_id, filename]);
      }

      savedFiles.push(filename);
      nextIndex++;
    }

    res.status(200).json({ success: true, message: "Images saved successfully", files: savedFiles });
  } catch (error) {
    console.error("🚨 Error saving images:", error);
    res.status(500).json({ success: false, message: "Error saving images" });
  }
});




app.post("/api/upload-3d", upload3d.single("file"), async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!product_id || product_id === "null") {
      return res.status(400).json({ success: false, message: "Product ID is missing or invalid" });
    }

    // 📌 ดึงนามสกุลไฟล์ (เช่น .glb, .obj)
    const fileExt = path.extname(req.file.originalname).toLowerCase();

    // 📌 ตั้งชื่อไฟล์ใหม่เป็น "product_id.นามสกุลไฟล์"
    const newFilename = `${product_id}${fileExt}`;

    // 📌 สร้าง path สำหรับบันทึกไฟล์
    const uploadPath = path.join(__dirname, "../admin/public/products_3d", newFilename);

    // 📌 ตรวจสอบว่ามีไฟล์เก่าอยู่หรือไม่
    const [existingFile] = await pool.query(
      "SELECT path FROM product_3d_models WHERE product_id = ?",
      [product_id]
    );

    if (existingFile.length > 0) {
      const oldFilePath = path.join(__dirname, "../admin/public/products_3d", existingFile[0].path);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); // ลบไฟล์เก่า
      }
    }

    // 📌 บันทึกไฟล์ใหม่
    fs.writeFileSync(uploadPath, req.file.buffer);

    // 📌 ตั้งค่า path ที่จะบันทึกลงฐานข้อมูล
    const filePath = `/${newFilename}`;

    // 📌 บันทึกลงฐานข้อมูล
    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO product_3d_models (product_id, path) VALUES (?, ?)",
      [product_id, filePath]
    );
    connection.release();

    res.status(200).json({ success: true, filePath });
  } catch (error) {
    console.error("🚨 Error uploading 3D file:", error);
    res.status(500).json({ success: false, message: "Error uploading 3D file" });
  }
});


// ✅ API: ดึงข้อมูลไฟล์ 3D ของสินค้า
app.get("/api/products/:product_id/3d", async (req, res) => {
  try {
    const { product_id } = req.params;

    // ค้นหาไฟล์ 3D ที่เกี่ยวข้องกับ `product_id`
    const [rows] = await pool.query(
      "SELECT path FROM product_3d_models WHERE product_id = ? LIMIT 1",
      [product_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "3D model not found" });
    }

    // ✅ ส่ง path ของไฟล์ 3D กลับไป
    const filePath = rows[0].path;
    return res.status(200).json({ success: true, path: `/3d${filePath}` });

  } catch (error) {
    console.error("🚨 Error fetching 3D model:", error);
    return res.status(500).json({ success: false, message: "Error fetching 3D model" });
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

    // ตรวจสอบว่าข้อมูลเปลี่ยนแปลงหรือไม่
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

    // ตรวจสอบว่ามี `detail` ใน `product_details` หรือไม่
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
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
});




app.post("/api/add-product", upload.array("images"), async (req, res) => { 
  const { product_name, category_id, category_name } = req.body;
  let details = req.body.details;
  const images = req.files;

  if (!product_name || (!category_id && !category_name)) {
    return res.status(400).json({ success: false, message: "Product name and category are required" });
  }

  if (details && typeof details === "string") {
    try {
      details = JSON.parse(details);
    } catch (error) {
      console.error("Error parsing details JSON:", error);
      details = null;
    }
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    let finalCategoryId = category_id;

    if (!finalCategoryId) {
      const [categoryResult] = await connection.query(
        "INSERT INTO categories (category_name) VALUES (?)",
        [category_name]
      );
      finalCategoryId = categoryResult.insertId;
    }

    const [productResult] = await connection.query(
      "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
      [product_name, finalCategoryId]
    );
    const product_id = productResult.insertId;

    if (details && details.detail) {
      await connection.query(
        "INSERT INTO product_details (product_id, detail) VALUES (?, ?)",
        [product_id, details.detail]
      );
    }

    // บันทึกภาพหลักและภาพรอง
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = path.extname(file.originalname);
        const filename = `${product_id}_${i + 1}${fileExt}`;
        const filePath = path.join(__dirname, "../admin/public/products", filename);
        fs.writeFileSync(filePath, file.buffer);

        // ตั้งค่า is_main เป็น 1 สำหรับภาพแรก (ภาพหลัก)
        const is_main = i === 0 ? 1 : 0;
        await connection.query(
          "INSERT INTO product_images (product_id, path, is_main) VALUES (?, ?, ?)",
          [product_id, filename, is_main]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ success: true, product_id, category_id: finalCategoryId, message: "Product and details added successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error inserting product:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  } finally {
    connection.release();
  }
});


app.delete("/api/products/:product_id", async (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).json({ success: false, message: "Product ID is required" });
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // ดึงข้อมูลไฟล์ภาพทั้งหมดของสินค้า
    const [images] = await connection.query(
      "SELECT path FROM product_images WHERE product_id = ?",
      [product_id]
    );

    // ดึงข้อมูลไฟล์ 3D ที่เกี่ยวข้องกับสินค้า
    const [threeDModels] = await connection.query(
      "SELECT path FROM product_3d_models WHERE product_id = ?",
      [product_id]
    );

    // ลบสินค้าและข้อมูลที่เกี่ยวข้อง
    await connection.query("DELETE FROM product_details WHERE product_id = ?", [product_id]);
    await connection.query("DELETE FROM product_images WHERE product_id = ?", [product_id]);
    await connection.query("DELETE FROM product_3d_models WHERE product_id = ?", [product_id]);
    await connection.query("DELETE FROM products WHERE product_id = ?", [product_id]);

    // ลบไฟล์รูปภาพ
    const imageDir = path.join(__dirname, "../admin/public/products");
    images.forEach((img) => {
      const filePath = path.join(imageDir, img.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted image: ${filePath}`);
      }
    });

    // ลบไฟล์ 3D
    const threeDDir = path.join(__dirname, "../admin/public/products_3d");
    threeDModels.forEach((model) => {
      const filePath = path.join(threeDDir, model.path.replace("/", ""));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted 3D model: ${filePath}`);
      }
    });

    await connection.commit();
    res.status(200).json({ success: true, message: "Product and related files deleted successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  } finally {
    connection.release();
  }
});


app.post("/api/update-image", upload.single("image"), async (req, res) => {
  try {
    const { product_id, old_filename, image_index } = req.body;

    if (!req.file || !product_id || !old_filename || image_index === undefined) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // ตรวจสอบว่าไฟล์เดิมมีอยู่ในฐานข้อมูลหรือไม่
    const [existingImage] = await pool.query(
      "SELECT path FROM product_images WHERE path = ? AND product_id = ?",
      [old_filename, product_id]
    );

    if (existingImage.length === 0) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    // ลบไฟล์เดิมออกจากเซิร์ฟเวอร์
    const oldFilePath = path.join(__dirname, "../admin/public/products", old_filename);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
      console.log(`🗑️ Deleted old image: ${oldFilePath}`);
    }

    // บันทึกไฟล์ใหม่
    const newFilename = old_filename; // ใช้ชื่อไฟล์เดิม
    const newFilePath = path.join(__dirname, "../admin/public/products", newFilename);
    fs.writeFileSync(newFilePath, req.file.buffer);

    // อัปเดตข้อมูลในฐานข้อมูล
    await pool.query("UPDATE product_images SET path = ? WHERE path = ? AND product_id = ?", [
      newFilename,
      old_filename,
      product_id,
    ]);

    res.status(200).json({ success: true, filename: newFilename, fileBuffer: req.file.buffer.toString("base64") });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ success: false, message: "Error updating image" });
  }
});

// app.delete("/api/delete-image", async (req, res) => {
//   const { filename, product_id } = req.body;

//   if (!filename || !product_id) {
//     return res.status(400).json({ success: false, message: "Filename and product ID are required" });
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     // ดึงข้อมูลรูปภาพทั้งหมดของสินค้า
//     const [images] = await connection.query(
//       "SELECT path FROM product_images WHERE product_id = ? ORDER BY path ASC",
//       [product_id]
//     );

//     // ดึงข้อมูลภาพหลัก
//     const [mainImage] = await connection.query(
//       "SELECT images_main FROM products WHERE product_id = ?",
//       [product_id]
//     );

//     // ตรวจสอบว่ารูปภาพที่ต้องการลบเป็นภาพหลักหรือไม่
//     const isMainImage = mainImage.length > 0 && mainImage[0].images_main === filename;

//     // ลบข้อมูลรูปภาพจากฐานข้อมูล
//     await connection.query("DELETE FROM product_images WHERE path = ? AND product_id = ?", [filename, product_id]);

//     // ลบไฟล์รูปภาพจากเซิร์ฟเวอร์
//     const imagePath = path.join(__dirname, "../admin/public/products", filename);
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//       console.log(`🗑️ Deleted image: ${imagePath}`);
//     }

//     // เปลี่ยนชื่อรูปภาพถัดไปให้ตรงกับลำดับที่ถูกลบ
//     const imageIndex = images.findIndex(img => img.path === filename);
//     if (imageIndex !== -1) {
//       for (let i = imageIndex; i < images.length - 1; i++) {
//         const currentImage = images[i];
//         const nextImage = images[i + 1];

//         const oldPath = path.join(__dirname, "../admin/public/products", nextImage.path);
//         const newPath = path.join(__dirname, "../admin/public/products", currentImage.path);

//         if (fs.existsSync(oldPath)) {
//           fs.renameSync(oldPath, newPath);
//           console.log(`🔄 Renamed ${nextImage.path} to ${currentImage.path}`);
//         }

//         await connection.query(
//           "UPDATE product_images SET path = ? WHERE path = ? AND product_id = ?",
//           [currentImage.path, nextImage.path, product_id]
//         );
//       }

//       // ถ้าลบภาพหลัก ให้เปลี่ยนภาพถัดไปเป็นภาพหลัก
//       if (isMainImage) {
//         const [nextMainImage] = await connection.query(
//           "SELECT path FROM product_images WHERE product_id = ? ORDER BY path ASC LIMIT 1",
//           [product_id]
//         );

//         if (nextMainImage.length > 0) {
//           await connection.query(
//             "UPDATE products SET images_main = ? WHERE product_id = ?",
//             [nextMainImage[0].path, product_id]
//           );
//           console.log(`🔄 Updated main image to: ${nextMainImage[0].path}`);
//         } else {
//           await connection.query(
//             "UPDATE products SET images_main = NULL WHERE product_id = ?",
//             [product_id]
//           );
//           console.log("🔄 No more images, set main image to NULL");
//         }
//       }
//     }

//     await connection.commit();
//     res.status(200).json({ success: true, message: "Image deleted successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error deleting image:", error);
//     res.status(500).json({ success: false, message: "Error deleting image" });
//   } finally {
//     connection.release();
//   }
// });
// app.delete("/api/delete-image", async (req, res) => {
//   const { filename, product_id } = req.body;

//   if (!filename || !product_id) {
//     return res.status(400).json({ success: false, message: "Filename and product ID are required" });
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     // ดึงข้อมูลรูปภาพทั้งหมดของสินค้า
//     const [images] = await connection.query(
//       "SELECT path, is_main FROM product_images WHERE product_id = ? ORDER BY path ASC",
//       [product_id]
//     );

//     // ตรวจสอบว่ารูปภาพที่ต้องการลบเป็นภาพหลักหรือไม่
//     const imageToDelete = images.find(img => img.path === filename);
//     if (!imageToDelete) {
//       return res.status(404).json({ success: false, message: "Image not found" });
//     }

//     const isMainImage = imageToDelete.is_main === 1;

//     // ลบข้อมูลรูปภาพจากฐานข้อมูล
//     await connection.query("DELETE FROM product_images WHERE path = ? AND product_id = ?", [filename, product_id]);

//     // ลบไฟล์รูปภาพจากเซิร์ฟเวอร์
//     const imagePath = path.join(__dirname, "../admin/public/products", filename);
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//       console.log(`🗑️ Deleted image: ${imagePath}`);
//     }

//     // ถ้าเป็นภาพหลัก ให้ตั้งภาพถัดไปเป็นภาพหลัก
//     if (isMainImage && images.length > 1) {
//       const nextImage = images.find(img => img.path !== filename);
//       if (nextImage) {
//         await connection.query(
//           "UPDATE product_images SET is_main = 1 WHERE path = ? AND product_id = ?",
//           [nextImage.path, product_id]
//         );
//         console.log(`🔄 Updated main image to: ${nextImage.path}`);
//       }
//     }

//     await connection.commit();
//     res.status(200).json({ success: true, message: "Image deleted successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("Error deleting image:", error);
//     res.status(500).json({ success: false, message: "Error deleting image" });
//   } finally {
//     connection.release();
//   }
// });
app.delete("/api/delete-image", async (req, res) => {
  const { filename, product_id } = req.body;

  if (!filename || !product_id) {
    return res.status(400).json({ success: false, message: "Filename and product ID are required" });
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // ดึงข้อมูลรูปภาพทั้งหมดของสินค้า
    const [images] = await connection.query(
      "SELECT path, is_main FROM product_images WHERE product_id = ? ORDER BY path ASC",
      [product_id]
    );

    // ตรวจสอบว่ารูปภาพที่ต้องการลบเป็นภาพหลักหรือไม่
    const imageToDelete = images.find(img => img.path === filename);
    if (!imageToDelete) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    const isMainImage = imageToDelete.is_main === 1;

    // ลบข้อมูลรูปภาพจากฐานข้อมูล
    await connection.query("DELETE FROM product_images WHERE path = ? AND product_id = ?", [filename, product_id]);

    // ลบไฟล์รูปภาพจากเซิร์ฟเวอร์
    const imagePath = path.join(__dirname, "../admin/public/products", filename);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log(`🗑️ Deleted image: ${imagePath}`);
    }

    // ถ้าเป็นภาพหลัก ให้ตั้งภาพถัดไปเป็นภาพหลัก
    if (isMainImage && images.length > 1) {
      const nextImage = images.find(img => img.path !== filename);
      if (nextImage) {
        // ตั้งภาพถัดไปเป็นภาพหลัก
        await connection.query(
          "UPDATE product_images SET is_main = 1 WHERE path = ? AND product_id = ?",
          [nextImage.path, product_id]
        );

        // เปลี่ยนชื่อไฟล์ของภาพถัดไปให้เป็นภาพหลัก (product_id_1.นามสกุล)
        const newMainImageFilename = `${product_id}_1${path.extname(nextImage.path)}`;
        const newMainImagePath = path.join(__dirname, "../admin/public/products", newMainImageFilename);

        // เปลี่ยนชื่อไฟล์บนเซิร์ฟเวอร์
        fs.renameSync(
          path.join(__dirname, "../admin/public/products", nextImage.path),
          newMainImagePath
        );

        // อัปเดตชื่อไฟล์ในฐานข้อมูล
        await connection.query(
          "UPDATE product_images SET path = ? WHERE path = ? AND product_id = ?",
          [newMainImageFilename, nextImage.path, product_id]
        );

        console.log(`🔄 Updated main image to: ${newMainImageFilename}`);
      }
    }

    await connection.commit();
    res.status(200).json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, message: "Error deleting image" });
  } finally {
    connection.release();
  }
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});