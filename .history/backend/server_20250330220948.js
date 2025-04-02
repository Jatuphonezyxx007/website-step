require('dotenv').config(); // โหลดค่าจากไฟล์ .env

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const argon2 = require('argon2');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000; // ใช้ค่าจาก .env หากมี
const app = express();

app.use(bodyParser.json({ limit: "1024mb" })); // ✅ เพิ่มขนาด JSON สูงสุด
app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));
app.use(cors());
app.use(express.json());

// ให้บริการไฟล์ static สำหรับรูปสินค้า
app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));
//ให้บริการ static สำหรับร 3d
app.use('/3d', express.static(path.join(__dirname, '../admin/public/products_3d')));
// ให้บริการไฟล์ static สำหรับรูปผู้ใช้
app.use('/images/user', express.static(path.join(__dirname, '../admin/public/images/user')));
// ให้บริการไฟล์ static สำหรับรูปรายละเอียดสินค้า
app.use('/products-detail', express.static(path.join(__dirname, '../admin/public/products_detail')));
// ให้บริการไฟล์ static สำหรับ datasheet
app.use('/datasheet', express.static(path.join(__dirname, '../admin/public/datasheet')));


const tempFilenames = {}; // ใช้เก็บ filename ชั่วคราวสำหรับแต่ละ product_id


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

// ใน server.js
// ใน server.js ให้แก้ไข CORS middleware เป็นแบบนี้:
app.use(cors({
  origin: ['http://localhost:3000', 'https://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// เพิ่มก่อน routes ทั้งหมด
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
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
  storage: storage3d, // ✅ อัปเดตเป็น memoryStorage() หรือ diskStorage() ตามที่ใช้
  limits: { fileSize: 1024 * 1024 * 1024 }, // ✅ จำกัดขนาด 1GB
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


// เปรียบเทียบชื่อสินค้าเก่าและใหม่
const [oldProductRow] = await pool.query(
  "SELECT product_name FROM products WHERE product_id = ?",
  [product_id]
);

const oldProductName = oldProductRow[0]?.product_name || "";
const sanitizedOldName = oldProductName
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\u0E00-\u0E7Fa-z0-9-.]/g, '');

const sanitizedNewName = product_name
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\u0E00-\u0E7Fa-z0-9-.]/g, '');

// ถ้ามี datasheet เดิม และชื่อสินค้าเปลี่ยน
if (sanitizedOldName !== sanitizedNewName) {
  const [dsResult] = await pool.query(
    "SELECT datasheet FROM product_details WHERE product_id = ?",
    [product_id]
  );

  const oldDatasheet = dsResult[0]?.datasheet;
  if (oldDatasheet) {
    const oldPath = path.join(__dirname, "../admin/public/datasheet", oldDatasheet);
    const ext = path.extname(oldDatasheet);
    const newFilename = `${sanitizedNewName}${ext}`;
    const newPath = path.join(__dirname, "../admin/public/datasheet", newFilename);

    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      await pool.query(
        "UPDATE product_details SET datasheet = ? WHERE product_id = ?",
        [newFilename, product_id]
      );
      console.log(`🔄 เปลี่ยนชื่อ datasheet เป็น ${newFilename}`);
    }
  }
}



// ✅ server.js เพิ่ม endpoint ใหม่
// ตั้งค่า Multer สำหรับ datasheet
const datasheetStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../admin/public/datasheet");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // ใช้ชื่อชั่วคราวก่อน แล้วค่อยเปลี่ยนชื่อใน handler
    const ext = path.extname(file.originalname);
    cb(null, `temp_${Date.now()}${ext}`);
  }
});

const uploadDataset = multer({ 
  storage: datasheetStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // จำกัดขนาด 50MB
});





// 👉 ตั้งค่าให้ `multer` เก็บไฟล์ใน memory แทนที่จะเขียนลง disk ทันที
const storage = multer.memoryStorage(); // ✅ ใช้ memory storage ไม่บันทึกไฟล์ทันที
const upload = multer({ storage: multer.memoryStorage() });


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


// การกำหนดที่เก็บไฟล์ datasheet

// ใช้ Multer สำหรับอัปโหลดไฟล์
// const upload = multer({ storage: datasheetStorage });


// API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
app.get('/api/products', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.product_id, 
        p.product_name,  
        p.category_id,
        p.created_at,
        i.product_image_id,
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


app.get('/api/products/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    // ดึงข้อมูลสินค้าพร้อมรายละเอียดอื่นๆ
    const productQuery = `
SELECT 
    p.product_id, 
    p.product_name, 
    p.category_id,
    p.created_at,
    pd.detail,
    c.category_name,
    pi.product_image_id
FROM products p
LEFT JOIN product_details pd ON p.product_id = pd.product_id
LEFT JOIN categories c ON p.category_id = c.category_id
LEFT JOIN product_images pi ON p.product_id = pi.product_id
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


app.post("/api/upload-image-temp", upload.single("image"), async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ success: false, message: "No file uploaded or file buffer is missing" });
    }

    if (!product_id || product_id === "null") {
      return res.status(400).json({ success: false, message: "Product ID is missing or invalid" });
    }

    const fileExt = path.extname(req.file.originalname);
    const index = await getNextImageIndex(product_id);
    const filename = `${product_id}_${index}${fileExt}`;

    // บันทึกไฟล์ลงในเซิร์ฟเวอร์
    const savePath = path.join(__dirname, "../admin/public/products", filename);
    fs.writeFileSync(savePath, req.file.buffer);

    // บันทึกข้อมูลลงในฐานข้อมูล
    const is_main = 0; // ตั้งค่าเป็นภาพรอง (ไม่ใช่ภาพหลัก)
    await pool.query(
      "INSERT INTO product_images (product_id, path, is_main) VALUES (?, ?, ?)",
      [product_id, filename, is_main]
    );

    res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });
  } catch (error) {
    console.error("🚨 Error uploading image:", error);
    res.status(500).json({ success: false, message: "Error uploading image" });
  }
});

app.post("/api/save-images", upload.array("images"), async (req, res) => {
  try {
    const { product_id } = req.body;
    const images = req.files || [];

    if (!product_id) {
      return res.status(400).json({ success: false, message: "Invalid data (missing product_id)" });
    }

    if (!images.length) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const savePath = path.join(__dirname, "../admin/public/products");
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath, { recursive: true });
    }

    // ✅ ดึงภาพที่มีอยู่แล้วจากฐานข้อมูล เพื่อตรวจสอบซ้ำซ้อน
    const [existingImages] = await pool.query(
      "SELECT path FROM product_images WHERE product_id = ?",
      [product_id]
    );

    const existingImagePaths = new Set(existingImages.map((img) => img.path)); // แปลงเป็น Set เพื่อตรวจสอบเร็วขึ้น

    let isFirstImage = existingImages.length === 0; // ✅ กำหนดภาพแรกเป็น main ถ้ายังไม่มีภาพใดๆ

    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const filename = file.originalname; // ✅ ใช้ชื่อไฟล์เดิมจาก FormData
      const filePath = path.join(savePath, filename);

      // ✅ ตรวจสอบว่าภาพนี้มีอยู่แล้วหรือไม่
      if (existingImagePaths.has(filename)) {
        console.log(`⚠️ Image ${filename} already exists, skipping insert.`);
        continue; // ข้ามการเพิ่มข้อมูลถ้าภาพนี้มีอยู่แล้ว
      }

      // ✅ บันทึกไฟล์ลงโฟลเดอร์
      fs.writeFileSync(filePath, file.buffer);

      // ✅ ตั้งค่าภาพแรกเป็น main image
      const is_main = isFirstImage ? 1 : 0;
      isFirstImage = false;

      // ✅ บันทึกลงฐานข้อมูล
      await pool.query(
        "INSERT INTO product_images (product_id, path, is_main) VALUES (?, ?, ?)",
        [product_id, filename, is_main]
      );

      console.log(`✅ Image ${filename} added to database.`);
    }

    res.status(200).json({ success: true, message: "Images saved successfully" });
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


app.put("/api/products/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const { product_name, detail, spec, category_id } = req.body;

    if (!product_id || !product_name || !category_id) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // อัปเดตตาราง products
    const result = await pool.query(
      "UPDATE products SET product_name = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?",
      [product_name, category_id, product_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // เช็คว่ามี product_details สำหรับสินค้านี้อยู่หรือยัง
    const [details] = await pool.query(
      "SELECT * FROM product_details WHERE product_id = ?",
      [product_id]
    );

    if (details.length > 0) {
      // ถ้ามีแล้วให้อัปเดต
      await pool.query(
        "UPDATE product_details SET detail = ?, spec = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?",
        [detail, spec, product_id]
      );
    } else {
      // ถ้ายังไม่มี ให้ insert ใหม่
      await pool.query(
        "INSERT INTO product_details (product_id, detail, spec) VALUES (?, ?, ?)",
        [product_id, detail, spec]
      );
    }

    res.status(200).json({ success: true, message: "Product and details updated successfully" });
  } catch (error) {
    console.error("🚨 Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product", error: error.message });
  }
});



// API สำหรับอัปเดตข้อมูลสินค้าและอัปโหลด datasheet
// app.put("/api/products/:product_id", upload.single('datasheet'), async (req, res) => {
//   try {
//     const { product_id } = req.params;
//     const { product_name, detail, spec, category_id } = req.body;
//     let datasheetFileName = req.body.datasheet_name || null;

//     if (!product_id || !product_name || !category_id) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     if (req.file) {
//       // ถ้ามีการอัปโหลดไฟล์ datasheet
//       datasheetFileName = req.file.filename; // ได้รับชื่อไฟล์จาก multer
//     }

//     // อัปเดตข้อมูลสินค้าในตาราง products
//     const result = await pool.query(
//       "UPDATE products SET product_name = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?",
//       [product_name, category_id, product_id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     // เช็คว่ามีข้อมูลใน product_details หรือยัง
//     const [details] = await pool.query(
//       "SELECT * FROM product_details WHERE product_id = ?",
//       [product_id]
//     );

//     if (details.length > 0) {
//       // ถ้ามีอยู่แล้ว ให้อัปเดต
//       await pool.query(
//         "UPDATE product_details SET detail = ?, spec = ?, datasheet = ?, updated_at = CURRENT_TIMESTAMP WHERE product_id = ?",
//         [detail, spec, datasheetFileName, product_id]
//       );
//     } else {
//       // ถ้ายังไม่มี ให้ insert ข้อมูลใหม่
//       await pool.query(
//         "INSERT INTO product_details (product_id, detail, spec, datasheet) VALUES (?, ?, ?, ?)",
//         [product_id, detail, spec, datasheetFileName]
//       );
//     }

//     res.status(200).json({ success: true, message: "Product and details updated successfully" });
//   } catch (error) {
//     console.error("🚨 Error updating product:", error);
//     res.status(500).json({ success: false, message: "Error updating product", error: error.message });
//   }
// });


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
      "SELECT product_image_id, path FROM product_images WHERE product_id = ?",
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



// ใน server.js แก้ไข endpoint เป็นแบบนี้:
app.get('/api/admins', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        admin_id,
        admin_name,
        admin_lastname,
        admin_phone,
        admin_email,
        admin_user,
        admin_position,
        admin_img
      FROM admin
      ORDER BY admin_id ASC
    `);
    
    const admins = rows.map(admin => ({
      ...admin,
      admin_img: admin.admin_img 
        ? `/images/user/${admin.admin_img.replace(/^\//, '')}`
        : '/images/user/default-avatar.png'
    }));
    
    // ตรวจสอบการส่ง response
    console.log('Sending admins data:', admins);
    res.status(200).json({ success: true, admins });
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching admin data',
      error: error.message
    });
  }
});




// ตั้งค่า Multer สำหรับอัปโหลดรูปภาพผู้ใช้
const userImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../admin/public/images/user");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // ชื่อไฟล์จะถูกตั้งเป็น admin_id.นามสกุล หลังจากบันทึกข้อมูลแล้ว
    const tempFilename = `temp_${Date.now()}${path.extname(file.originalname)}`;
    cb(null, tempFilename);
  },
});

const uploadUserImage = multer({
  storage: userImageStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาด 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".jpg", ".jpeg", ".png", ".gif"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedTypes.includes(ext)) {
      return cb(new Error("❌ Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// API สำหรับเพิ่มผู้ดูแลระบบใหม่
app.post("/api/admin/add", uploadUserImage.single("admin_img"), async (req, res) => {
  try {
    // ใช้ express.json() ไม่สามารถอ่าน FormData ได้ ต้องใช้ req.body โดยตรง
    const {
      admin_name,
      admin_lastname,
      admin_phone,
      admin_email,
      admin_user,
      admin_pwd,
      admin_position,
    } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!admin_name || !admin_lastname || !admin_phone || !admin_email || !admin_user || !admin_pwd || !admin_position) {
      // ลบไฟล์ชั่วคราวถ้ามี
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, message: "กรุณากรอกข้อมูลให้ครบทุกช่อง" });
    }

    // ตรวจสอบความยาวเบอร์โทรศัพท์
    if (admin_phone.length !== 10) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, message: "หมายเลขโทรศัพท์ต้องมี 10 หลัก" });
    }

    // ตรวจสอบว่ามีชื่อผู้ใช้ซ้ำหรือไม่
    const [existingUser] = await pool.query(
      "SELECT admin_id FROM admin WHERE admin_user = ?",
      [admin_user]
    );

    if (existingUser.length > 0) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, message: "ชื่อผู้ใช้งานนี้มีอยู่แล้ว" });
    }

    // Hash รหัสผ่านด้วย argon2
    const hashedPassword = await argon2.hash(admin_pwd);

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // เพิ่มข้อมูลผู้ดูแลระบบ
      const [result] = await connection.query(
        "INSERT INTO admin (admin_name, admin_lastname, admin_phone, admin_email, admin_user, admin_pwd, admin_position) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [admin_name, admin_lastname, admin_phone, admin_email, admin_user, hashedPassword, admin_position]
      );

      const adminId = result.insertId;

      // ถ้ามีการอัปโหลดรูปภาพ
      let imageFilename = null;
      if (req.file) {
        const fileExt = path.extname(req.file.originalname);
        imageFilename = `${adminId}${fileExt}`;
        const newPath = path.join(__dirname, "../admin/public/images/user", imageFilename);

        // เปลี่ยนชื่อไฟล์จาก temp เป็น admin_id.นามสกุล
        fs.renameSync(req.file.path, newPath);

        // อัปเดตชื่อไฟล์ในฐานข้อมูล
        await connection.query(
          "UPDATE admin SET admin_img = ? WHERE admin_id = ?",
          [imageFilename, adminId]
        );
      }

      await connection.commit();

      res.status(201).json({
        success: true,
        message: "เพิ่มผู้ดูแลระบบเรียบร้อยแล้ว",
        adminId,
      });
    } catch (error) {
      await connection.rollback();
      // ลบไฟล์ถ้ามีและเกิดข้อผิดพลาด
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("🚨 Error adding admin:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "เกิดข้อผิดพลาดในการเพิ่มผู้ดูแลระบบ" 
    });
  }
});



// ใน server.js แก้ไข endpoint นี้
// // แก้ไข endpoint /api/upload-file
// app.post("/api/upload-file", uploadDataset.single("file"), async (req, res) => {
//   const { product_id } = req.body;
  
//   if (!req.file || !product_id) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Missing file or product_id" 
//     });
//   }

//   try {
//     // ดึงข้อมูลสินค้า
//     const [productRows] = await pool.query(
//       "SELECT product_name FROM products WHERE product_id = ?",
//       [product_id]
//     );

//     if (productRows.length === 0) {
//       fs.unlinkSync(req.file.path); // ลบไฟล์ชั่วคราว
//       return res.status(404).json({ 
//         success: false, 
//         message: "Product not found" 
//       });
//     }

//     // สร้างชื่อไฟล์ใหม่
//     const productName = productRows[0].product_name;
//     const sanitizedName = productName
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-z0-9-.]/g, '');
//     const fileExt = path.extname(req.file.originalname).toLowerCase();
//     const newFilename = `${sanitizedName}${fileExt}`;
//     const newPath = path.join(__dirname, "../admin/public/datasheet", newFilename);

//     // ลบไฟล์เดิมถ้ามี
//     const [existingDetails] = await pool.query(
//       "SELECT datasheet FROM product_details WHERE product_id = ?",
//       [product_id]
//     );

//     if (existingDetails.length > 0 && existingDetails[0].datasheet) {
//       const oldFilePath = path.join(__dirname, "../admin/public/datasheet", existingDetails[0].datasheet);
//       if (fs.existsSync(oldFilePath)) {
//         fs.unlinkSync(oldFilePath);
//       }
//     }

//     // เปลี่ยนชื่อไฟล์
//     fs.renameSync(req.file.path, newPath);

//     // อัปเดตฐานข้อมูล
//     const [detailRows] = await pool.query(
//       "SELECT * FROM product_details WHERE product_id = ?",
//       [product_id]
//     );

//     if (detailRows.length > 0) {
//       await pool.query(
//         "UPDATE product_details SET datasheet = ? WHERE product_id = ?",
//         [newFilename, product_id]
//       );
//     } else {
//       await pool.query(
//         "INSERT INTO product_details (product_id, datasheet) VALUES (?, ?)",
//         [product_id, newFilename]
//       );
//     }

//     res.status(200).json({ 
//       success: true, 
//       filePath: `/datasheet/${newFilename}`,
//       message: "File uploaded successfully"
//     });

//   } catch (error) {
//     console.error("Error uploading file:", error);
//     // ลบไฟล์ชั่วคราวถ้าเกิดข้อผิดพลาด
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(500).json({ 
//       success: false, 
//       message: "Error uploading file",
//       error: error.message 
//     });
//   }
// });
// แก้ไข endpoint /api/upload-file
app.post("/api/upload-file", uploadDataset.single("file"), async (req, res) => {
  const { product_id } = req.body;
  
  if (!req.file || !product_id) {
    return res.status(400).json({ 
      success: false, 
      message: "Missing file or product_id" 
    });
  }

  try {
    // ดึงข้อมูลสินค้า
    const [productRows] = await pool.query(
      "SELECT product_name FROM products WHERE product_id = ?",
      [product_id]
    );

    if (productRows.length === 0) {
      fs.unlinkSync(req.file.path); // ลบไฟล์ชั่วคราว
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // สร้างชื่อไฟล์ใหม่ - แก้ไขตรงนี้เพื่ออนุญาตให้ใช้ภาษาไทย
    const productName = productRows[0].product_name;
    const sanitizedName = productName
      .toLowerCase()
      .replace(/\s+/g, '-') // แทนที่ช่องว่างด้วย -
      .replace(/[^\u0E00-\u0E7Fa-z0-9-.]/g, ''); // อนุญาตให้ใช้ตัวอักษรไทย (Unicode \u0E00-\u0E7F) และ a-z, 0-9, -, .
    
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    const newFilename = `${sanitizedName}${fileExt}`;
    const newPath = path.join(__dirname, "../admin/public/datasheet", newFilename);

    // ลบไฟล์เดิมถ้ามี
    const [existingDetails] = await pool.query(
      "SELECT datasheet FROM product_details WHERE product_id = ?",
      [product_id]
    );

    if (existingDetails.length > 0 && existingDetails[0].datasheet) {
      const oldFilePath = path.join(__dirname, "../admin/public/datasheet", existingDetails[0].datasheet);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // เปลี่ยนชื่อไฟล์
    fs.renameSync(req.file.path, newPath);

    // อัปเดตฐานข้อมูล
    const [detailRows] = await pool.query(
      "SELECT * FROM product_details WHERE product_id = ?",
      [product_id]
    );

    if (detailRows.length > 0) {
      await pool.query(
        "UPDATE product_details SET datasheet = ? WHERE product_id = ?",
        [newFilename, product_id]
      );
    } else {
      await pool.query(
        "INSERT INTO product_details (product_id, datasheet) VALUES (?, ?)",
        [product_id, newFilename]
      );
    }

    res.status(200).json({ 
      success: true, 
      filePath: `/datasheet/${newFilename}`,
      message: "File uploaded successfully"
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    // ลบไฟล์ชั่วคราวถ้าเกิดข้อผิดพลาด
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ 
      success: false, 
      message: "Error uploading file",
      error: error.message 
    });
  }
});





app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});