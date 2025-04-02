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
const storage3d = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../admin/public/products_3d");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // สร้างโฟลเดอร์ถ้ายังไม่มี
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
    cb(null, filename);
  },
});

const upload3d = multer({
  storage: storage3d,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".obj", ".glb", ".gltf", ".stl"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return cb(new Error("Only 3D file formats are allowed"), false);
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


// // API: ดึงข้อมูล categories สำหรับ droplist
// app.get('/api/categories', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         category_id AS value, 
//         category_name AS label
//       FROM categories
//       ORDER BY category_name ASC
//     `;
//     const [rows] = await pool.query(query);
//     res.status(200).json({ success: true, categories: rows });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
//   }
// });

// // API: ดึงหมวดหมู่ตาม ID
// app.get('/api/categories/:id', async (req, res) => {
//   try {
//     let categoryId = req.params.id;
//     categoryId = parseInt(categoryId, 10); // ✅ แปลงเป็น INT ป้องกันปัญหา
//     console.log(`📌 Fetching category ID: ${categoryId}`);

//     const query = `SELECT category_id AS value, category_name AS label FROM categories WHERE category_id = ?`;
//     const [rows] = await pool.query(query, [categoryId]);

//     if (rows.length > 0) {
//       res.status(200).json(rows[0]); // ✅ ส่งค่า category เดียว
//     } else {
//       console.warn(`⚠️ No category found for ID ${categoryId}`);
//       res.status(404).json({ success: false, message: `Category ID ${categoryId} not found` });
//     }
//   } catch (error) {
//     console.error("❌ Error fetching category:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // API: ดึงสินค้าตามหมวดหมู่
// app.get('/api/products', async (req, res) => {
//   try {
//     let categoryId = req.query.category;
//     categoryId = parseInt(categoryId, 10);
//     console.log(`📌 Received categoryId: ${categoryId}`);

//     if (!categoryId || isNaN(categoryId)) {
//       return res.status(400).json({ success: false, message: "Invalid category ID" });
//     }

//     const query = `
//       SELECT 
//         product_id AS id, 
//         product_name AS name, 
//         images_main AS image, 
//         category_id
//       FROM products 
//       WHERE category_id = ?
//       ORDER BY product_id ASC`;

//     const [rows] = await pool.query(query, [categoryId]);
//     console.log(`📌 Found ${rows.length} products for category ${categoryId}`);

//     if (rows.length > 0) {
//       res.status(200).json({ success: true, products: rows });
//     } else {
//       res.status(200).json({ success: false, message: `ไม่มีสินค้าสำหรับหมวดหมู่ ${categoryId}` });
//     }
//   } catch (error) {
//     console.error("❌ Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });
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
        product_id AS id, 
        product_name AS name, 
        images_main AS image, 
        category_id
      FROM products 
      WHERE category_id = ?
      ORDER BY product_id ASC`;

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

    // ดึงจำนวนรูปภาพที่มีอยู่แล้วในฐานข้อมูล
    const [existingImages] = await pool.query(
      "SELECT path FROM product_images WHERE product_id = ?",
      [product_id]
    );

    // หา index ถัดไปของรูปภาพ
    const existingImageCount = existingImages.length;
    let nextIndex = existingImageCount + 1;

    const savedFiles = [];

    for (let index = 0; index < images.length; index++) {
      const file = images[index];
      const fileExt = path.extname(file.originalname);
      const filename = `${product_id}_${nextIndex}${fileExt}`;
      const filePath = path.join(savePath, filename);

      fs.writeFileSync(filePath, file.buffer);
      console.log(`✅ Saved image: ${filePath}`);

      // บันทึกลงฐานข้อมูล
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

// //API อัปโหลดไฟล์ 3d
// app.post("/api/upload-3d", upload.single("file"), async (req, res) => {
//   try {
//     let { product_id } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     if (!product_id || product_id === "null") {
//       return res.status(400).json({ success: false, message: "Product ID is missing or invalid" });
//     }

//     const fileExt = path.extname(req.file.originalname);
//     const filename = `/${product_id}${fileExt}`;

//     res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });
//   } catch (error) {
//     console.error("🚨 Error uploading 3d file:", error);
//     res.status(500).json({ success: false, message: "Error uploading 3d file" });
//   }
// });
// const storage3d = multer.memoryStorage(); // ✅ ใช้ memory storage ไม่บันทึกไฟล์ทันที
// const upload3d = multer({ storage: storage3d });
// API อัปโหลดไฟล์ 3D
app.post("/api/upload-3d", upload3d.single("file"), async (req, res) => {
  try {
    console.log("📌 File received:", req.file); // ✅ เช็คว่าได้รับไฟล์หรือไม่
    let { product_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!product_id || product_id === "null") {
      return res.status(400).json({ success: false, message: "Product ID is missing or invalid" });
    }

    const filePath = `/3d/${req.file.filename}`;

    // บันทึกลงฐานข้อมูล
    const connection = await pool.getConnection();
    await connection.execute(
      "INSERT INTO product_3d_models (product_id, path) VALUES (?, ?)",
      [product_id, filePath]
    );
    connection.release();

    res.status(200).json({ success: true, filePath });
  } catch (error) {
    console.error("🚨 Error uploading 3d file:", error);
    res.status(500).json({ success: false, message: "Error uploading 3D file" });
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



// API: เพิ่มข้อมูลสินค้าใหม่
// app.post("/api/add-product", upload.array("images"), async (req, res) => {
//   const { product_name, category_id, series_id } = req.body;
//   let details = req.body.details; // อาจจะมาในรูปแบบ JSON string
//   const images = req.files;

//   if (!product_name) {
//     return res.status(400).json({ success: false, message: "Product name is required" });
//   }

//   // แปลง details ถ้าเป็น string
//   if (details && typeof details === "string") {
//     try {
//       details = JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing details JSON:", error);
//       details = null;
//     }
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     // 1️⃣ เพิ่มข้อมูลในตาราง products
//     const [productResult] = await connection.query(
//       "INSERT INTO products (product_name, category_id, series_id) VALUES (?, ?, ?)",
//       [product_name, category_id || null, series_id || null]
//     );
//     const product_id = productResult.insertId;

//     // 2️⃣ เพิ่มรายละเอียดสินค้าในตาราง product_details
//     if (details) {
//       const { detail, installation_type, screen_size } = details;
//       await connection.query(
//         "INSERT INTO product_details (product_id, detail, installation_type, screen_size) VALUES (?, ?, ?, ?)",
//         [product_id, detail || null, installation_type || null, screen_size || null]
//       );
//     }

//     // 3️⃣ จัดการบันทึกรูปภาพ
//     const savePath = path.join(__dirname, "../admin/public/products");
//     if (!fs.existsSync(savePath)) fs.mkdirSync(savePath, { recursive: true });

//     let mainImage = null;
//     for (let index = 0; index < images.length; index++) {
//       const file = images[index];
//       const fileExt = path.extname(file.originalname);
//       const filename = `${product_id}_${index + 1}${fileExt}`;
//       const filePath = path.join(savePath, filename);
      
//       // บันทึกไฟล์ลงในเซิร์ฟเวอร์
//       fs.writeFileSync(filePath, file.buffer);
      
//       // Insert รูปภาพทุกไฟล์ลงในตาราง product_images
//       await connection.query(
//         "INSERT INTO product_images (product_id, path) VALUES (?, ?)",
//         [product_id, filename]
//       );
      
//       // กำหนด mainImage เป็นภาพแรก
//       if (index === 0) mainImage = filename;
//     }

//     // อัปเดต main image ในตาราง products
//     if (mainImage) {
//       await connection.query(
//         "UPDATE products SET images_main = ? WHERE product_id = ?",
//         [mainImage, product_id]
//       );
//     }

//     await connection.commit();
//     res.status(201).json({ success: true, product_id, message: "Product added successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error inserting product:", error);
//     res.status(500).json({ success: false, message: "Error adding product" });
//   } finally {
//     connection.release();
//   }
// });
// ---------------------------------------------------------------------------------------------------------------------
// app.post("/api/add-product", upload.array("images"), async (req, res) => {
//   const { product_name, category_name, series_id } = req.body;
//   let details = req.body.details; // อาจจะเป็น JSON string
//   const images = req.files;

//   if (!product_name) {
//     return res.status(400).json({ success: false, message: "Product name is required" });
//   }

//   // แปลง JSON ถ้าจำเป็น
//   if (details && typeof details === "string") {
//     try {
//       details = JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing details JSON:", error);
//       details = null;
//     }
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     let category_id = null;

//     // 🔹 ตรวจสอบหมวดหมู่ ถ้ายังไม่มีให้เพิ่มใหม่
//     if (category_name) {
//       const [categoryRows] = await connection.query(
//         "SELECT category_id FROM categories WHERE category_name = ?",
//         [category_name]
//       );

//       if (categoryRows.length > 0) {
//         category_id = categoryRows[0].category_id; // ใช้หมวดหมู่เดิมที่มีอยู่
//       } else {
//         const [categoryResult] = await connection.query(
//           "INSERT INTO categories (category_name) VALUES (?)",
//           [category_name]
//         );
//         category_id = categoryResult.insertId; // ใช้หมวดหมู่ใหม่ที่เพิ่งเพิ่มเข้าไป
//       }
//     }

//     // 1️⃣ เพิ่มข้อมูลสินค้า
//     const [productResult] = await connection.query(
//       "INSERT INTO products (product_name, category_id, series_id) VALUES (?, ?, ?)",
//       [product_name, category_id || null, series_id || null]
//     );
//     const product_id = productResult.insertId;

//     // 2️⃣ เพิ่มรายละเอียดสินค้า
//     if (details) {
//       const { detail, installation_type, screen_size } = details;
//       await connection.query(
//         "INSERT INTO product_details (product_id, detail, installation_type, screen_size) VALUES (?, ?, ?, ?)",
//         [product_id, detail || null, installation_type || null, screen_size || null]
//       );
//     }

//     // 3️⃣ จัดการรูปภาพ
//     const savePath = path.join(__dirname, "../admin/public/products");
//     if (!fs.existsSync(savePath)) fs.mkdirSync(savePath, { recursive: true });

//     let mainImage = null;
//     for (let index = 0; index < images.length; index++) {
//       const file = images[index];
//       const fileExt = path.extname(file.originalname);
//       const filename = `${product_id}_${index + 1}${fileExt}`;
//       const filePath = path.join(savePath, filename);

//       fs.writeFileSync(filePath, file.buffer);

//       await connection.query(
//         "INSERT INTO product_images (product_id, path) VALUES (?, ?)",
//         [product_id, filename]
//       );

//       if (index === 0) mainImage = filename;
//     }

//     // 4️⃣ อัปเดต main image ในตาราง products
//     if (mainImage) {
//       await connection.query(
//         "UPDATE products SET images_main = ? WHERE product_id = ?",
//         [mainImage, product_id]
//       );
//     }

//     await connection.commit();
//     res.status(201).json({ success: true, product_id, category_id, message: "Product added successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error inserting product:", error);
//     res.status(500).json({ success: false, message: "Error adding product" });
//   } finally {
//     connection.release();
//   }
// });
// --------------------------------------------
// app.post("/api/add-product", upload.array("images"), async (req, res) => {
//   const { product_name, category_name, series_id } = req.body;
//   let details = req.body.details; // อาจจะเป็น JSON string
//   const images = req.files;

//   if (!product_name || !category_name) {
//     return res.status(400).json({ success: false, message: "Product name and category name are required" });
//   }

//   // แปลง JSON ถ้าจำเป็น
//   if (details && typeof details === "string") {
//     try {
//       details = JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing details JSON:", error);
//       details = null;
//     }
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     // 🔹 เพิ่มหมวดหมู่ใหม่เสมอ (ไม่ใช้หมวดหมู่เดิม)
//     const [categoryResult] = await connection.query(
//       "INSERT INTO categories (category_name) VALUES (?)",
//       [category_name]
//     );
//     const category_id = categoryResult.insertId;

//     // 1️⃣ เพิ่มข้อมูลสินค้า พร้อมใช้ category_id ใหม่ที่เพิ่มเข้าไป
//     const [productResult] = await connection.query(
//       "INSERT INTO products (product_name, category_id, series_id) VALUES (?, ?, ?)",
//       [product_name, category_id, series_id || null]
//     );
//     const product_id = productResult.insertId;

//     // 2️⃣ เพิ่มรายละเอียดสินค้า
//     if (details) {
//       const { detail, installation_type, screen_size } = details;
//       await connection.query(
//         "INSERT INTO product_details (product_id, detail, installation_type, screen_size) VALUES (?, ?, ?, ?)",
//         [product_id, detail || null, installation_type || null, screen_size || null]
//       );
//     }

//     // 3️⃣ จัดการรูปภาพ
//     const savePath = path.join(__dirname, "../admin/public/products");
//     if (!fs.existsSync(savePath)) fs.mkdirSync(savePath, { recursive: true });

//     let mainImage = null;
//     for (let index = 0; index < images.length; index++) {
//       const file = images[index];
//       const fileExt = path.extname(file.originalname);
//       const filename = `${product_id}_${index + 1}${fileExt}`;
//       const filePath = path.join(savePath, filename);

//       fs.writeFileSync(filePath, file.buffer);

//       await connection.query(
//         "INSERT INTO product_images (product_id, path) VALUES (?, ?)",
//         [product_id, filename]
//       );

//       if (index === 0) mainImage = filename;
//     }

//     // 4️⃣ อัปเดต main image ในตาราง products
//     if (mainImage) {
//       await connection.query(
//         "UPDATE products SET images_main = ? WHERE product_id = ?",
//         [mainImage, product_id]
//       );
//     }

//     await connection.commit();
//     res.status(201).json({ success: true, product_id, category_id, message: "Product and new category added successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error inserting product:", error);
//     res.status(500).json({ success: false, message: "Error adding product" });
//   } finally {
//     connection.release();
//   }
// });
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// app.post("/api/add-product", upload.array("images"), async (req, res) => {
//   const { product_name, category_name } = req.body;
//   let details = req.body.details;
//   const images = req.files;

//   if (!product_name || !category_name) {
//     return res.status(400).json({ success: false, message: "Product name and category name are required" });
//   }

//   // แปลง JSON
//   if (details && typeof details === "string") {
//     try {
//       details = JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing details JSON:", error);
//       details = null;
//     }
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     // 🟢 ตรวจสอบว่า category มีอยู่แล้วหรือไม่
//     let category_id;
//     const [existingCategory] = await connection.query(
//       "SELECT category_id FROM categories WHERE category_name = ?",
//       [category_name]
//     );

//     if (existingCategory.length > 0) {
//       category_id = existingCategory[0].id;
//     } else {
//       const [categoryResult] = await connection.query(
//         "INSERT INTO categories (category_name) VALUES (?)",
//         [category_name]
//       );
//       category_id = categoryResult.insertId;
//     }

//     // 🟢 เพิ่มสินค้าใหม่
//     const [productResult] = await connection.query(
//       "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
//       [product_name, category_id]
//     );
//     const product_id = productResult.insertId;

//     await connection.commit();
//     res.status(201).json({ success: true, product_id, category_id, message: "Product added successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error inserting product:", error);
//     res.status(500).json({ success: false, message: "Error adding product" });
//   } finally {
//     connection.release();
//   }
// });
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// app.post("/api/add-product", upload.array("images"), async (req, res) => {
//   const { product_name, category_name } = req.body;
//   let details = req.body.details;
//   const images = req.files;

//   if (!product_name || !category_name) {
//     return res.status(400).json({ success: false, message: "Product name and category name are required" });
//   }

//   // แปลง JSON
//   if (details && typeof details === "string") {
//     try {
//       details = JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing details JSON:", error);
//       details = null;
//     }
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     // 🟢 ตรวจสอบว่า category มีอยู่แล้วหรือไม่
//     let category_id;
//     const [existingCategory] = await connection.query(
//       "SELECT category_id FROM categories WHERE category_name = ?",
//       [category_name]
//     );

//     if (existingCategory.length > 0) {
//       category_id = existingCategory[0].category_id; // ✅ แก้เป็น category_id
//     } else {
//       const [categoryResult] = await connection.query(
//         "INSERT INTO categories (category_name) VALUES (?)",
//         [category_name]
//       );
//       category_id = categoryResult.insertId;
//     }

//     // 🟢 เพิ่มสินค้าใหม่
//     const [productResult] = await connection.query(
//       "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
//       [product_name, category_id]
//     );
//     const product_id = productResult.insertId;

//     // 🟢 เพิ่มรายละเอียดสินค้า (product_details)
//     if (details) {
//       const { detail, installation_type, screen_size } = details;

//       await connection.query(
//         "INSERT INTO product_details (product_id, detail) VALUES (?, ?)",
//         [product_id, detail || null]
//       );
//     }

//     await connection.commit();
//     res.status(201).json({ success: true, product_id, category_id, message: "Product and details added successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error inserting product:", error);
//     res.status(500).json({ success: false, message: "Error adding product" });
//   } finally {
//     connection.release();
//   }
// });
// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// app.post("/api/add-product", upload.array("images"), async (req, res) => {
//   const { product_name, category_id, category_name } = req.body; // ✅ รับ category_id ด้วย
//   let details = req.body.details;
//   const images = req.files;

//   if (!product_name || (!category_id && !category_name)) {
//     return res.status(400).json({ success: false, message: "Product name and category are required" });
//   }

//   // แปลง JSON
//   if (details && typeof details === "string") {
//     try {
//       details = JSON.parse(details);
//     } catch (error) {
//       console.error("Error parsing details JSON:", error);
//       details = null;
//     }
//   }

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();

//   try {
//     let finalCategoryId = category_id; // ✅ ใช้ category_id ที่มีอยู่ ถ้ามี

//     if (!finalCategoryId) {
//       // ✅ ถ้าไม่มี category_id ให้เพิ่มหมวดหมู่ใหม่
//       const [categoryResult] = await connection.query(
//         "INSERT INTO categories (category_name) VALUES (?)",
//         [category_name]
//       );
//       finalCategoryId = categoryResult.insertId;
//     }

//     // 🟢 เพิ่มสินค้าใหม่
//     const [productResult] = await connection.query(
//       "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
//       [product_name, finalCategoryId]
//     );
//     const product_id = productResult.insertId;

//     // 🟢 เพิ่มรายละเอียดสินค้า
//     if (details) {
//       const { detail } = details;
//       await connection.query(
//         "INSERT INTO product_details (product_id, detail) VALUES (?, ?)",
//         [product_id, detail || null]
//       );
//     }

//     await connection.commit();
//     res.status(201).json({ success: true, product_id, category_id: finalCategoryId, message: "Product added successfully" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("🚨 Error inserting product:", error);
//     res.status(500).json({ success: false, message: "Error adding product" });
//   } finally {
//     connection.release();
//   }
// });
app.post("/api/add-product", upload.array("images"), async (req, res) => { 
  const { product_name, category_id, category_name } = req.body; // ✅ รับ category_id และ category_name
  let details = req.body.details;
  const images = req.files;

  if (!product_name || (!category_id && !category_name)) {
    return res.status(400).json({ success: false, message: "Product name and category are required" });
  }

  // 🔍 แปลง JSON ของ `details`
  if (details && typeof details === "string") {
    try {
      details = JSON.parse(details);
    } catch (error) {
      console.error("🚨 Error parsing details JSON:", error);
      details = null;
    }
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    let finalCategoryId = category_id; // ✅ ใช้ category_id ถ้ามี

    if (!finalCategoryId) {
      // ✅ ถ้าไม่มี category_id ให้เพิ่มหมวดหมู่ใหม่
      const [categoryResult] = await connection.query(
        "INSERT INTO categories (category_name) VALUES (?)",
        [category_name]
      );
      finalCategoryId = categoryResult.insertId;
    }

    // 🟢 เพิ่มสินค้าใหม่
    const [productResult] = await connection.query(
      "INSERT INTO products (product_name, category_id) VALUES (?, ?)",
      [product_name, finalCategoryId]
    );
    const product_id = productResult.insertId;

    // 🟢 เพิ่มรายละเอียดสินค้า (product_details)
    if (details && details.detail) { // ✅ ตรวจสอบว่ามีค่า
      await connection.query(
        "INSERT INTO product_details (product_id, detail) VALUES (?, ?)",
        [product_id, details.detail]
      );
    }

    await connection.commit();
    res.status(201).json({ success: true, product_id, category_id: finalCategoryId, message: "Product and details added successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("🚨 Error inserting product:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
  } finally {
    connection.release();
  }
});

//ลบรายการสินค้า
app.delete("/api/products/:product_id", async (req, res) => {
  const { product_id } = req.params;

  if (!product_id) {
    return res.status(400).json({ success: false, message: "Product ID is required" });
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    // ดึงข้อมูลไฟล์ภาพหลักและภาพเพิ่มเติม
    const [product] = await connection.query(
      "SELECT images_main FROM products WHERE product_id = ?",
      [product_id]
    );

    const [images] = await connection.query(
      "SELECT path FROM product_images WHERE product_id = ?",
      [product_id]
    );

    // ลบสินค้าและข้อมูลที่เกี่ยวข้อง
    await connection.query("DELETE FROM product_details WHERE product_id = ?", [product_id]);
    await connection.query("DELETE FROM product_images WHERE product_id = ?", [product_id]);
    await connection.query("DELETE FROM products WHERE product_id = ?", [product_id]);

    // ลบไฟล์รูปภาพ
    const imagePaths = [
      ...(product[0]?.images_main ? [product[0].images_main] : []),
      ...images.map((img) => img.path),
    ];

    const imageDir = path.join(__dirname, "../admin/public/products");
    imagePaths.forEach((filename) => {
      const filePath = path.join(imageDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted image: ${filePath}`);
      }
    });

    await connection.commit();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("🚨 Error deleting product:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  } finally {
    connection.release();
  }
});




app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});