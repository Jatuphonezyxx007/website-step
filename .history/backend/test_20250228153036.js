const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const argon2 = require("argon2"); // สำหรับการเข้ารหัสรหัสผ่าน
const path = require("path");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ ใช้ multer().any() เป็น middleware เพื่อรองรับ multipart/form-data
app.use(multer().any()); 

// ให้บริการไฟล์ static สำหรับรูปสินค้า
app.use("/products", express.static(path.join(__dirname, "../admin/public/products")));

// ตั้งค่าการเชื่อมต่อ MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "step",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ตรวจสอบการเชื่อมต่อฐานข้อมูล
async function checkDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Database Connected Successfully.");
    connection.release();
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
}
checkDBConnection();

// ✅ ตั้งค่า Multer สำหรับอัปโหลดรูปภาพ
const storageProducts = multer.diskStorage({
  destination: path.join(__dirname, "../admin/public/products"),
  filename: (req, file, cb) => {
    const { product_id, index } = req.params;
    const ext = path.extname(file.originalname);
    cb(null, `${product_id}_${index}${ext}`);
  },
});
const uploadProductImages = multer({
  storage: storageProducts,
  limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาดไฟล์ที่ 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("❌ อัปโหลดได้เฉพาะไฟล์รูปภาพเท่านั้น"));
    }
    cb(null, true);
  },
});

// ✅ ตั้งค่า Multer สำหรับอัปโหลดไฟล์ 3D Model
const storage3D = multer.diskStorage({
  destination: path.join(__dirname, "../admin/public/products-3d"),
  filename: (req, file, cb) => {
    const { product_id } = req.params;
    cb(null, `${product_id}.glb`);
  },
});
const upload3DModel = multer({ storage: storage3D });

// ✅ API อัปโหลดรูปภาพสินค้า
app.post(
  "/api/upload/image/:product_id/:index",
  uploadProductImages.single("image"),
  (req, res) => {
    console.log("📌 req.body:", req.body); // ✅ ตรวจสอบข้อมูลที่ส่งมา
    console.log("📌 req.file:", req.file); // ✅ ตรวจสอบว่าไฟล์ถูกส่งมาหรือไม่

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์รูปภาพ" });
    }

    res.json({
      success: true,
      path: req.file.filename,
      message: "✅ อัปโหลดรูปภาพสำเร็จ",
    });
  }
);

// ✅ API อัปโหลดไฟล์ 3D Model
app.post("/api/upload/3d/:product_id", upload3DModel.single("model"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์ 3D" });
  }
  res.json({ success: true, path: req.file.filename, message: "✅ อัปโหลดไฟล์ 3D สำเร็จ" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
