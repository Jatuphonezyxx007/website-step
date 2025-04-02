// // // backend/server.js
// // const express = require('express');
// // const mysql = require('mysql2/promise');
// // const cors = require('cors');
// // const path = require('path');

// // const app = express();
// // const port = process.env.PORT || 5000;

// // // ✅ กำหนด CORS เพื่อรองรับ Production และ Localhost
// // const corsOptions = {
// //   origin: '*',
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true,
// // };
// // app.use(cors(corsOptions));
// // app.use(express.json());

// // // ✅ เสิร์ฟไฟล์รูปภาพจากโฟลเดอร์ uploads
// // app.use('/images/categories', express.static(path.join(__dirname, 'uploads/categories')));
// // app.use('/images/products', express.static(path.join(__dirname, 'uploads/products')));

// // // ✅ การตั้งค่าการเชื่อมต่อฐานข้อมูลแบบ Connection Pool
// // const dbConfig = {
// //   host: 'localhost',
// //   user: 'root',
// //   password: '',
// //   database: 'website',
// // };

// // let pool;
// // (async function initializeDB() {
// //   try {
// //     pool = await mysql.createPool(dbConfig);
// //     console.log('✅ MySQL Database Connected Successfully.');
// //   } catch (error) {
// //     console.error('❌ Database Connection Failed:', error);
// //   }
// // })();

// // // ✅ API: ดึงข้อมูลหมวดหมู่ตาม ID (ปรับเพิ่ม console.log เพื่อตรวจสอบข้อมูล)
// // app.get('/api/category/:id', async (req, res) => {
// //   const { id } = req.params;
// //   console.log(`📌 รับค่า categoryId: ${id}`); // ✅ DEBUG
// //   try {
// //     const [rows] = await pool.query(
// //       'SELECT id, name, CONCAT("/images/categories/", img_cate) AS img_cate FROM categories WHERE id = ?',
// //       [id]
// //     );
// //     console.log(`📦 ข้อมูลหมวดหมู่ที่พบ:`, rows); // ✅ DEBUG
// //     if (rows.length > 0) {
// //       res.json(rows[0]);
// //     } else {
// //       res.status(404).json({ message: 'Category not found.' });
// //     }
// //   } catch (error) {
// //     console.error('❌ Error fetching category:', error);
// //     res.status(500).json({ message: 'Failed to fetch category.', error });
// //   }
// // });

// // // ✅ API: ดึงข้อมูลสินค้าตามหมวดหมู่ (เพิ่ม console.log สำหรับ Debug)
// // app.get('/api/products/category/:categoryId', async (req, res) => {
// //   const { categoryId } = req.params;
// //   console.log(`📌 รับค่า categoryId สำหรับสินค้า: ${categoryId}`); // ✅ DEBUG
// //   try {
// //     const [rows] = await pool.query(
// //       `SELECT p.id, p.name, p.price, p.status, 
// //               IFNULL(CONCAT('/images/products/', pi.image_path), '/images/products/default.png') AS image_path
// //        FROM products p
// //        LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_main = 1
// //        WHERE p.category_id = ?`,
// //       [categoryId]
// //     );
// //     console.log(`📦 สินค้าที่พบ:`, rows); // ✅ DEBUG
// //     res.json(rows);
// //   } catch (error) {
// //     console.error('❌ Error fetching products:', error);
// //     res.status(500).json({ message: 'Failed to fetch products.', error });
// //   }
// // });

// // // 🚀 เริ่มต้นเซิร์ฟเวอร์
// // app.listen(port, () => {
// //   console.log(`🚀 Server running at http://localhost:${port}`);
// // });







// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");

// const app = express();
// app.use(cors());

// // การตั้งค่าการเชื่อมต่อฐานข้อมูล
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "website",
// });

// // ทดสอบการเชื่อมต่อฐานข้อมูล
// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err);
//     return;
//   }
//   console.log("Connected to the database.");
// });

// // คำสั่ง SQL สำหรับดึงข้อมูลสินค้าทั้งหมด
// const sqlProducts = `
// SELECT 
//     p.id,
//     p.name,
//     pd.installation_type,
//     pd.screen_size,
//     pd.resolution,
//     pd.brightness,
//     p.price,
//     p.status,
//     pi.image_path,
//     c.name AS category_name
// FROM 
//     products p
// INNER JOIN 
//     product_details pd ON p.id = pd.product_id
// INNER JOIN
//     categories c ON p.category_id = c.id
// LEFT JOIN 
//     product_images pi ON p.id = pi.product_id AND pi.is_main = 1
// `;

// // API สำหรับดึงข้อมูลสินค้าทั้งหมด
// app.get("/api/products", (req, res) => {
//   db.query(sqlProducts, (err, results) => {
//     if (err) {
//       console.error("Error fetching products:", err);
//       res.status(500).send("An error occurred while fetching products.");
//       return;
//     }
//     res.json(results);
//   });
// });

// // API สำหรับดึงข้อมูลสินค้าตาม id
// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;

//   const sqlProductById = `
// SELECT 
//     p.id,
//     p.name,
//     pd.installation_type,
//     pd.screen_size,
//     pd.resolution,
//     pd.brightness,
//     p.price,
//     p.status,
//     p.category_id,
//     pd.connectivity,
//     pd.operating_system,
//     c.name AS category_name,
//     (
//         SELECT pi.image_path 
//         FROM product_images pi 
//         WHERE pi.product_id = p.id AND pi.is_main = 1 LIMIT 1
//     ) AS image_path,
//     (
//         SELECT GROUP_CONCAT(pi.image_path)
//         FROM product_images pi
//         WHERE pi.product_id = p.id AND pi.is_main = 0
//     ) AS additional_images
// FROM 
//     products p
// INNER JOIN 
//     product_details pd ON p.id = pd.product_id
// INNER JOIN 
//     categories c ON p.category_id = c.id
// WHERE 
//     p.id = ?;

//   `;

//   db.query(sqlProductById, [productId], (err, results) => {
//     if (err) {
//       console.error("Error fetching product:", err);
//       res.status(500).send("An error occurred while fetching the product.");
//       return;
//     }

//     if (results.length === 0) {
//       res.status(404).send("Product not found.");
//       return;
//     }

//     res.json(results[0]); // ส่งสินค้าชิ้นเดียวกลับไป
//   });
// });

// // API สำหรับดึงข้อมูล categories
// const sqlCategories = `
// SELECT 
//     id, 
//     name, 
//     created_at, 
//     img_cate
// FROM 
//     categories
// `;

// app.get("/api/categories", (req, res) => {
//   db.query(sqlCategories, (err, results) => {
//     if (err) {
//       console.error("Error fetching categories:", err);
//       res.status(500).send("An error occurred while fetching categories.");
//       return;
//     }
//     res.json(results);
//   });
// });

// // เปิดเซิร์ฟเวอร์
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });









// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const crypto = require('crypto');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ✅ ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'website',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ✅ ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // ✅ API: เข้าสู่ระบบ
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

//   try {
//     const [rows] = await pool.query(
//       `SELECT emp_id, emp_name, emp_last, emp_email, emp_img FROM employees 
//        WHERE emp_user = ? AND emp_pwd = ?`,
//       [username, hashedPassword]
//     );

//     if (rows.length > 0) {
//       console.log('✅ เข้าสู่ระบบสำเร็จ:', rows[0]);
//       res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: rows[0] });
//     } else {
//       console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });






// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const crypto = require('crypto');
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// // ระบุ path ให้ตรงกับตำแหน่งที่เก็บไฟล์ภาพจริง (D:\ecom\admin\public\products)
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ✅ ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ✅ ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // ✅ API: เข้าสู่ระบบ
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ? AND admin_pwd = ?`,
//       [username, hashedPassword]
//     );

//     if (rows.length > 0) {
//       console.log('✅ เข้าสู่ระบบสำเร็จ:', rows[0]);
//       res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: rows[0] });
//     } else {
//       console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // ✅ API: ดึงข้อมูลสินค้าจากตาราง products พร้อมรูปหลักจาก product_images
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//     SELECT 
//   p.product_id, 
//   p.product_name,  
//   p.category_id,
//   p.images_main, 
//   p.created_at,
//   p.series_id,
//   pi.path
// FROM products p
// LEFT JOIN product_images pi 
//   ON p.product_id = pi.product_id
// ORDER BY p.category_id ASC, p.created_at DESC;
// `;

//     const [rows] = await pool.query(query);
//     res.status(200).json({ success: true, products: rows });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });



// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const argon2 = require('argon2'); // ใช้ argon2 สำหรับการเข้ารหัสด้วย Argon2id
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // API: เข้าสู่ระบบ โดยใช้ Argon2id ในการตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     // ค้นหาผู้ดูแลระบบตาม username
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length > 0) {
//       const admin = rows[0];
      
//       // Debug: แสดงข้อมูล admin ที่ได้มา
//       console.log("Admin record:", admin);

//       // ตรวจสอบว่ามีฟิลด์ admin_pwd ก่อนใช้ argon2.verify
//       if (!admin.admin_pwd) {
//         console.error("❌ admin.admin_pwd is undefined for user:", username);
//         return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }

//       // ตรวจสอบรหัสผ่านด้วย argon2.verify
//       const validPassword = await argon2.verify(admin.admin_pwd, password);
//       if (validPassword) {
//         console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
//         res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
//       } else {
//         console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//         res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }
//     } else {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // API: ดึงข้อมูลสินค้าจากตาราง products พร้อมรูปหลักจาก product_images
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name,  
//         p.category_id,
//         p.images_main, 
//         p.created_at,
//         p.series_id,
//         pi.path
//       FROM products p
//       LEFT JOIN product_images pi 
//         ON p.product_id = pi.product_id
//       ORDER BY p.product_id ASC, p.category_id;
//     `;
//     const [rows] = await pool.query(query);
//     res.status(200).json({ success: true, products: rows });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });



// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const argon2 = require('argon2'); // สำหรับการเข้ารหัสรหัสผ่าน
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // API: เข้าสู่ระบบ โดยใช้ Argon2id สำหรับตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length > 0) {
//       const admin = rows[0];
//       console.log("Admin record:", admin);

//       if (!admin.admin_pwd) {
//         console.error("❌ admin.admin_pwd is undefined for user:", username);
//         return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }

//       const validPassword = await argon2.verify(admin.admin_pwd, password);
//       if (validPassword) {
//         console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
//         res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
//       } else {
//         console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//         res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }
//     } else {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name,  
//         p.category_id,
//         p.images_main, 
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

// // API: ดึงรายละเอียดสินค้าโดย product_id สำหรับหน้าแก้ไข (edit_form.tsx)
// // ตัวอย่าง query JOIN กับ product_images (เฉพาะรูปหลัก) และ product_details (ถ้ามี)
// app.get('/api/products/:product_id', async (req, res) => {
//   try {
//     const { product_id } = req.params;
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name, 
//         p.category_id,
//         p.series_id,
//         p.images_main,
//         p.created_at,
//         pd.detail,
//         s.*, 
//         c.*,
//         pi.path AS image_path
//       FROM products p
//       LEFT JOIN product_details pd ON p.product_id = pd.product_id
//       LEFT JOIN product_images pi ON p.product_id = pi.product_id
//       LEFT JOIN series s ON p.series_id = s.series_id
//       LEFT JOIN categories c ON p.category_id = c.category_id
//       WHERE p.product_id = ?
//       LIMIT 1
//     `;
//     const [rows] = await pool.query(query, [product_id]);
//     if (rows.length > 0) {
//       res.status(200).json({ success: true, product: rows[0] });
//     } else {
//       res.status(404).json({ success: false, message: "Product not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching product details:", error);
//     res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });






// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const argon2 = require('argon2'); // สำหรับการเข้ารหัสรหัสผ่าน
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// require('dotenv').config(); // โหลดค่าจากไฟล์ .env

// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const argon2 = require('argon2');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');

// const app = express();
// const port = process.env.PORT || 3000; // ใช้ค่าจาก .env หากมี

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: process.env.DB_HOST, // ใช้ค่าจาก .env
//   user: process.env.DB_USER, // ใช้ค่าจาก .env
//   password: process.env.DB_PASSWORD, // ใช้ค่าจาก .env
//   database: process.env.DB_NAME, // ใช้ค่าจาก .env
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // const multer = require('multer');

// // ตั้งค่า multer ให้จัดเก็บไฟล์ในโฟลเดอร์ uploads
// // กำหนดที่เก็บไฟล์
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../admin/public/products/')); // บันทึกที่โฟลเดอร์นี้
//   },
//   filename: (req, file, cb) => {
//     const { product_id, index } = req.params;

//     // ดึงนามสกุลไฟล์ เช่น .jpg, .png
//     const fileExt = path.extname(file.originalname);

//     // กำหนดชื่อไฟล์ใหม่ -> productid_2.jpg, productid_3.png
//     const newFileName = `${product_id}_${parseInt(index) + 1}${fileExt}`;

//     cb(null, newFileName);
//   }
// });

// const upload = multer({ storage: storage });

// // ตั้งค่า multer สำหรับอัปโหลดไฟล์ 3D
// const storage3D = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/3d/'); // กำหนดโฟลเดอร์สำหรับไฟล์ 3D
//   },
//   filename: (req, file, cb) => {
//     const newFileName = req.params.product_id + path.extname(file.originalname);
//     cb(null, newFileName);
//   }
// });

// const upload3DModel = multer({ storage: storage3D });

// // กำหนดตัวเลือกและฟังก์ชันการอัปโหลด
// // const uploadProductImages = multer({ storage: storage });
// // const upload3DModel = multer({ storage: multer.diskStorage({ /* การตั้งค่าการอัปโหลดไฟล์ 3D */ }) });



// // API และ route ที่เหลือสามารถทำตามปกติ

// // API: เข้าสู่ระบบ โดยใช้ Argon2id สำหรับตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length > 0) {
//       const admin = rows[0];
//       console.log("Admin record:", admin);

//       if (!admin.admin_pwd) {
//         console.error("❌ admin.admin_pwd is undefined for user:", username);
//         return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }

//       const validPassword = await argon2.verify(admin.admin_pwd, password);
//       if (validPassword) {
//         console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
//         res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
//       } else {
//         console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//         res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }
//     } else {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name,  
//         p.category_id,
//         p.images_main, 
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

// // API: ดึงรายละเอียดสินค้าโดย product_id สำหรับหน้าแก้ไข (edit_form.tsx)
// // JOIN กับ product_details, product_images (เฉพาะรูปหลัก), series, และ categories
// // app.get('/api/products/:product_id', async (req, res) => {
// //   try {
// //     const { product_id } = req.params;
// //     const query = `
// //       SELECT 
// //         p.product_id, 
// //         p.product_name, 
// //         p.category_id,
// //         p.series_id,
// //         p.images_main,
// //         p.created_at,
// //         pd.detail,
// //         pi.path,
// //         s.series_name, 
// //         c.category_name
// //       FROM products p
// //       LEFT JOIN product_details pd ON p.product_id = pd.product_id
// //       LEFT JOIN series s ON p.series_id = s.series_id
// //       LEFT JOIN product_images pi ON p.product_id = pi.product_id
// //       LEFT JOIN categories c ON p.category_id = c.category_id
// //       WHERE p.product_id = ?
// //       LIMIT 1
// //     `;
// //     const [rows] = await pool.query(query, [product_id]);
// //     if (rows.length > 0) {
// //       res.status(200).json({ success: true, product: rows[0] });
// //     } else {
// //       res.status(404).json({ success: false, message: "Product not found" });
// //     }
// //   } catch (error) {
// //     console.error("Error fetching product details:", error);
// //     res.status(500).json({ success: false, message: "Error fetching product details", error: error.message });
// //   }
// // });

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

// // API: ดึงข้อมูล product_details สำหรับ droplist
// // app.get('/api/product_detail', async (req, res) => {
// //   try {
// //     const query = `
// //       SELECT 
// //         category_id AS value, 
// //         category_name AS label
// //       FROM categories
// //       ORDER BY category_name ASC
// //     `;
// //     const [rows] = await pool.query(query);
// //     res.status(200).json({ success: true, categories: rows });
// //   } catch (error) {
// //     console.error("Error fetching categories:", error);
// //     res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
// //   }
// // });


// // //API สำหรับการ PUT ข้อมูลไป Update ใน Database
// // app.put('/api/products/:product_id', async (req, res) => {
// //   const { product_id } = req.params;
// //   const { product_name, category_id, detail, images_main, supplementary_images, model_path } = req.body;
  
// //   // รับนามสกุลของไฟล์จากการอัปโหลด
// // const fileExtension = images_main.split('.').pop(); // ดึงนามสกุลไฟล์ (เช่น png, jpg)
// // const imageName = `/${product_id}_1.${fileExtension}`; // กำหนดชื่อไฟล์ใหม่

// //   const connection = await pool.getConnection();
// //   try {
// //     await connection.beginTransaction();

// //     // อัปเดตข้อมูลสินค้า (ชื่อสินค้า, หมวดหมู่ และ updated_at)
// //     await connection.query(
// //       `UPDATE products SET product_name = ?, category_id = ?, updated_at = NOW() WHERE product_id = ?`,
// //       [product_name, category_id, product_id]
// //     );

// //     // อัปเดตรายละเอียดสินค้า
// //     await connection.query(
// //       `INSERT INTO product_details (product_id, detail) 
// //        VALUES (?, ?)
// //        ON DUPLICATE KEY UPDATE detail = VALUES(detail)`,
// //       [product_id, detail]
// //     );
    
    
    

// // // อัปเดตรูปภาพหลักในฐานข้อมูล
// // await connection.query(
// //   `UPDATE products SET images_main = ? WHERE product_id = ?`,
// //   [imageName, product_id]
// // );

// //     // ลบรูปภาพรองเก่า
// //     await connection.query(`DELETE FROM product_images WHERE product_id = ?`, [product_id]);

// //     // เพิ่มรูปภาพรองใหม่

    
// //     if (supplementary_images.length > 0) {
// //       const imageValues = supplementary_images.map((path) => [product_id, path]);
    
// //       console.log("📌 imageValues:", imageValues); // ตรวจสอบค่า
    
// //       const sql = `
// //         INSERT INTO product_images (product_id, path) 
// //         VALUES ${imageValues.map(() => "(?, ?)").join(", ")}
// //         ON DUPLICATE KEY UPDATE path = VALUES(path)
// //       `;
    
// //       await connection.query(sql, imageValues.flat()); // ใช้ `.flat()` เพื่อแปลงเป็น Array เดียว
// //     }

    
// //     // อัปเดตโมเดล 3D
// //     await connection.query(
// //       `UPDATE product_3d_models SET path = ? WHERE product_id = ?`,
// //       [model_path, product_id]
// //     );

// //     await connection.commit();
// //     res.status(200).json({ success: true, message: "✅ อัปเดตสินค้าสำเร็จ" });
// //   } catch (error) {
// //     await connection.rollback();
// //     console.error("❌ Error updating product:", error);
// //     res.status(500).json({ success: false, message: "❌ อัปเดตสินค้าไม่สำเร็จ", error: error.message });
// //   } finally {
// //     connection.release();
// //   }
// // });

// // console.log("images_main:", images_main);


// // API สำหรับการ PUT ข้อมูลไป Update ใน Database
// // API สำหรับการ PUT ข้อมูลไป Update ใน Database
// app.put('/api/products/:product_id', async (req, res) => {
//   const { product_id } = req.params;
//   const { product_name, category_id, detail, images_main, supplementary_images, model_path } = req.body;

//   console.log("📌 รับค่า images_main:", images_main); // ตรวจสอบค่าที่ได้รับ

//   let imageName = null;
//   if (images_main && images_main.includes('.')) {
//     const fileExtension = images_main.split('.').pop().split('?')[0]; // ดึงนามสกุลไฟล์ และตัด query string ออก
//     imageName = `/${product_id}_1.${fileExtension}`; // กำหนดชื่อไฟล์ใหม่
//   } else {
//     console.warn("⚠️ images_main ไม่มีนามสกุลหรือเป็นค่า null");
//   }

//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     // อัปเดตข้อมูลสินค้า
//     await connection.query(
//       `UPDATE products SET product_name = ?, category_id = ?, updated_at = NOW() WHERE product_id = ?`,
//       [product_name, category_id, product_id]
//     );

//     // อัปเดตรายละเอียดสินค้า
//     await connection.query(
//       `INSERT INTO product_details (product_id, detail) 
//        VALUES (?, ?)
//        ON DUPLICATE KEY UPDATE detail = VALUES(detail)`,
//       [product_id, detail]
//     );

//     // อัปเดตรูปภาพหลัก
//     if (imageName) {
//       console.log("✅ imageName ที่ใช้บันทึก:", imageName);
//       await connection.query(
//         `UPDATE products SET images_main = ? WHERE product_id = ?`,
//         [imageName, product_id]
//       );
//     }

//     // ลบรูปภาพรองเก่า
//     await connection.query(`DELETE FROM product_images WHERE product_id = ?`, [product_id]);

//     // เพิ่มรูปภาพรองใหม่
//     if (Array.isArray(supplementary_images) && supplementary_images.length > 0) {
//       const imageValues = supplementary_images.map((path) => [product_id, path]);

//       console.log("📌 imageValues:", imageValues); // ตรวจสอบค่า

//       const sql = `
//         INSERT INTO product_images (product_id, path) 
//         VALUES ${imageValues.map(() => "(?, ?)").join(", ")}
//         ON DUPLICATE KEY UPDATE path = VALUES(path)
//       `;

//       await connection.query(sql, imageValues.flat());
//     }

//     // อัปเดตโมเดล 3D
//     await connection.query(
//       `UPDATE product_3d_models SET path = ? WHERE product_id = ?`,
//       [model_path, product_id]
//     );

//     await connection.commit();
//     res.status(200).json({ success: true, message: "✅ อัปเดตสินค้าสำเร็จ" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("❌ Error updating product:", error);
//     res.status(500).json({ success: false, message: "❌ อัปเดตสินค้าไม่สำเร็จ", error: error.message });
//   } finally {
//     connection.release();
//   }
// });



// // API: อัปโหลดรูปภาพสินค้า
// // const upload = multer({ storage: storage });
// // app.post("/api/upload/image/:product_id/:index", uploadProductImages.single("image"), (req, res) => {
// //   console.log("📌 req.file:", req.file); // ตรวจสอบว่าไฟล์ถูกส่งมาหรือไม่
// //   if (!req.file) {
// //     return res.status(400).json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์รูปภาพ" });
// //   }
// //   res.json({ success: true, path: req.file.filename, message: "✅ อัปโหลดรูปภาพสำเร็จ" });
// // });
// // Route สำหรับอัพโหลด
// // API: อัปโหลดรูปภาพสินค้า
// // const upload = multer({ storage: storage });


// // // API: อัปโหลดรูปภาพสินค้า
// // app.post('/api/upload/image/:product_id/:index', upload.single('image'), async (req, res) => {
// //   const { product_id, index } = req.params;

// //   // ตรวจสอบค่า product_id และ index ว่าถูกต้องหรือไม่
// //   if (!product_id || !index || isNaN(index)) {
// //     return res.status(400).json({ success: false, message: '❌ ค่าของ product_id หรือ index ไม่ถูกต้อง' });
// //   }

// //   if (!req.file) {
// //     return res.status(400).json({ success: false, message: '❌ กรุณาอัปโหลดไฟล์' });
// //   }

// //   const filePath = `/products/${req.file.filename}`;

// //   try {
// //     // ตรวจสอบก่อนว่า product_id มีอยู่จริงในตาราง products หรือไม่
// //     const [productExists] = await pool.query(`SELECT product_id FROM products WHERE product_id = ?`, [product_id]);
    
// //     if (productExists.length === 0) {
// //       return res.status(400).json({ success: false, message: '❌ ไม่พบสินค้านี้ในระบบ' });
// //     }

// //     // บันทึกข้อมูลรูปภาพลงฐานข้อมูล
// //     await pool.query(
// //       `INSERT INTO product_images (product_id, path) VALUES (?, ?)
// //        ON DUPLICATE KEY UPDATE path = VALUES(path)`,
// //       [product_id, filePath]
// //     );

// //     res.status(200).json({ success: true, path: filePath });
// //   } catch (error) {
// //     console.error('❌ Error uploading image:', error);
// //     res.status(500).json({ success: false, message: '❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' });
// //   }
// // });

// // API สำหรับอัปโหลดรูปภาพสินค้า
// app.post('/api/upload/image/:product_id/:index', upload.single('image'), async (req, res) => {
//   const { product_id, index } = req.params;

//   console.log("📌 API received:", { product_id, index });

//   if (!product_id || isNaN(index)) {
//     return res.status(400).json({ success: false, message: '❌ product_id หรือ index ไม่ถูกต้อง' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ success: false, message: '❌ กรุณาอัปโหลดไฟล์' });
//   }

//   try {
//     const [productExists] = await pool.query(
//       `SELECT product_id FROM products WHERE product_id = ?`, 
//       [product_id]
//     );

//     if (productExists.length === 0) {
//       console.log("❌ ไม่พบสินค้านี้ในระบบ:", product_id);
//       return res.status(400).json({ success: false, message: '❌ ไม่พบสินค้านี้ในระบบ' });
//     }

//     const fileExt = path.extname(req.file.originalname);
//     const newFileName = `${product_id}_${parseInt(index) + 1}${fileExt}`;
//     const filePath = `/${newFileName}`;

//     await pool.query(
//       `INSERT INTO product_images (product_id, path) VALUES (?, ?)
//        ON DUPLICATE KEY UPDATE path = VALUES(path)`,
//       [product_id, filePath]
//     );

//     res.status(200).json({ success: true, path: filePath });
//   } catch (error) {
//     console.error('❌ Error uploading image:', error);
//     res.status(500).json({ success: false, message: '❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' });
//   }
// });



// // API ลบรูปภาพ
// app.delete('/api/delete/image/:product_id/:index', async (req, res) => {
//   const { product_id, index } = req.params;

//   try {
//     const [rows] = await pool.query(
//       `SELECT path FROM product_images WHERE product_id = ? LIMIT ?,1`,
//       [product_id, parseInt(index)]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ success: false, message: "❌ ไม่พบรูปภาพ" });
//     }

//     const imagePath = path.join(__dirname, '../admin/public', rows[0].path);
//     fs.unlink(imagePath, (err) => {
//       if (err) console.error("⚠️ Failed to delete file:", err);
//     });

//     await pool.query(`DELETE FROM product_images WHERE product_id = ? LIMIT 1 OFFSET ?`, [product_id, parseInt(index)]);
//     res.status(200).json({ success: true, message: "✅ ลบรูปภาพสำเร็จ" });
//   } catch (error) {
//     console.error("❌ Error deleting image:", error);
//     res.status(500).json({ success: false, message: "❌ ลบรูปไม่สำเร็จ" });
//   }
// });


// // API: อัปโหลดไฟล์ 3D Model
// app.post("/api/upload/3d/:product_id", upload3DModel.single("model"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์ 3D" });
//   }
//   const filePath = `/uploads/3d/${req.file.filename}`;

//   // บันทึก path ลงในฐานข้อมูล
//   pool.query(
//     `INSERT INTO product_3d_models (product_id, path) VALUES (?, ?) 
//      ON DUPLICATE KEY UPDATE path = VALUES(path)`,
//     [req.params.product_id, filePath],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ success: false, message: "❌ บันทึกไฟล์ 3D ไม่สำเร็จ" });
//       }
//       res.json({ success: true, path: filePath, message: "✅ อัปโหลดไฟล์ 3D สำเร็จ" });
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




// const express = require('express');
// const mysql = require('mysql2/promise');
// const cors = require('cors');
// const multer = require("multer");
// const argon2 = require('argon2'); // สำหรับการเข้ารหัสรหัสผ่าน
// const path = require('path');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());
// app.use(express.json());

// // ให้บริการไฟล์ static สำหรับรูปสินค้า
// app.use('/products', express.static(path.join(__dirname, '../admin/public/products')));

// // ตั้งค่าการเชื่อมต่อ MySQL
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'step',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ตรวจสอบการเชื่อมต่อฐานข้อมูล
// async function checkDBConnection() {
//   try {
//     const connection = await pool.getConnection();
//     console.log('✅ MySQL Database Connected Successfully.');
//     connection.release();
//   } catch (error) {
//     console.error('❌ Database Connection Failed:', error);
//     process.exit(1);
//   }
// }
// checkDBConnection();

// // ตั้งค่าการอัปโหลดรูปภาพสินค้า
// const storageProducts = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../admin/public/products"));
//   },
//   filename: (req, file, cb) => {
//     const { product_id, index } = req.params;
//     const ext = path.extname(file.originalname);
//     cb(null, `${product_id}_${index}${ext}`);
//   },
// });

// const uploadProductImages = multer({ storage: storageProducts });


// // ตั้งค่าการอัปโหลดไฟล์ 3D Model
// const storage3D = multer.diskStorage({
//   destination: path.join(__dirname, "../admin/public/products-3d"), // เก็บไฟล์ 3D ในโฟลเดอร์นี้
//   filename: (req, file, cb) => {
//     const { product_id } = req.params;
//     cb(null, `${product_id}.glb`); // ตั้งชื่อไฟล์เป็น "product_id.glb"
//   },
// });
// const upload3DModel = multer({ storage: storage3D });


// // API: เข้าสู่ระบบ โดยใช้ Argon2id สำหรับตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length > 0) {
//       const admin = rows[0];
//       console.log("Admin record:", admin);

//       if (!admin.admin_pwd) {
//         console.error("❌ admin.admin_pwd is undefined for user:", username);
//         return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }

//       const validPassword = await argon2.verify(admin.admin_pwd, password);
//       if (validPassword) {
//         console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
//         res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
//       } else {
//         console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//         res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }
//     } else {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });

// // API: ดึงข้อมูลสินค้าทั้งหมด (รายการในหน้าหลัก)
// app.get('/api/products', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         p.product_id, 
//         p.product_name,  
//         p.category_id,
//         p.images_main, 
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

// // API: อัปเดตสินค้า
// app.put('/api/products/:product_id', async (req, res) => {
//   const { product_id } = req.params;
//   const { product_name, category_id, detail, images_main, supplementary_images, model_path } = req.body;

//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     // อัปเดตข้อมูลสินค้า (ชื่อสินค้า, หมวดหมู่ และ updated_at)
//     await connection.query(
//       `UPDATE products SET product_name = ?, category_id = ?, updated_at = NOW() WHERE product_id = ?`,
//       [product_name, category_id, product_id]
//     );

//     // อัปเดตรายละเอียดสินค้า
//     await connection.query(
//       `UPDATE product_details SET detail = ? WHERE product_id = ?`,
//       [detail, product_id]
//     );

//     // อัปเดตรูปภาพหลัก
//     await connection.query(
//       `UPDATE products SET images_main = ? WHERE product_id = ?`,
//       [images_main, product_id]
//     );

//     // ลบรูปภาพรองเก่า
//     await connection.query(`DELETE FROM product_images WHERE product_id = ?`, [product_id]);

//     // เพิ่มรูปภาพรองใหม่
//     if (supplementary_images.length > 0) {
//       const imageValues = supplementary_images.map((path) => [product_id, path]);
//       await connection.query(
//         `INSERT INTO product_images (product_id, path) VALUES ?`,
//         [imageValues]
//       );
//     }

//     // อัปเดตโมเดล 3D
//     await connection.query(
//       `UPDATE product_3d_models SET path = ? WHERE product_id = ?`,
//       [model_path, product_id]
//     );

//     await connection.commit();
//     res.status(200).json({ success: true, message: "✅ อัปเดตสินค้าสำเร็จ" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("❌ Error updating product:", error);
//     res.status(500).json({ success: false, message: "❌ อัปเดตสินค้าไม่สำเร็จ", error: error.message });
//   } finally {
//     connection.release();
//   }
// });


// // API: อัปโหลดรูปภาพสินค้า
// app.post("/api/upload/image/:product_id/:index", uploadProductImages.single("image"), (req, res) => {
//   console.log("📌 req.file:", req.file); // ✅ ตรวจสอบว่าไฟล์ถูกส่งมาหรือไม่
//   if (!req.file) {
//     return res.status(400).json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์รูปภาพ" });
//   }
//   res.json({ success: true, path: req.file.filename, message: "✅ อัปโหลดรูปภาพสำเร็จ" });
// });

// // API: อัปโหลดไฟล์ 3D Model
// app.post("/api/upload/3d/:product_id", upload3DModel.single("model"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์ 3D" });
//   }
//   res.json({ success: true, path: req.file.filename, message: "✅ อัปโหลดไฟล์ 3D สำเร็จ" });
// });


// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });





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

// const upload = multer({ storage: storage });

// ตั้งค่า multer สำหรับอัปโหลดไฟล์ 3D
// const storage3D = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/3d/'); // กำหนดโฟลเดอร์สำหรับไฟล์ 3D
//   },
//   filename: (req, file, cb) => {
//     const newFileName = req.params.product_id + path.extname(file.originalname);
//     cb(null, newFileName);
//   }
// });

// const upload3DModel = multer({ storage: storage3D });

// // API: เข้าสู่ระบบ โดยใช้ Argon2id สำหรับตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin 
//        WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length > 0) {
//       const admin = rows[0];
//       console.log("Admin record:", admin);

//       if (!admin.admin_pwd) {
//         console.error("❌ admin.admin_pwd is undefined for user:", username);
//         return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }

//       const validPassword = await argon2.verify(admin.admin_pwd, password);
//       if (validPassword) {
//         console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);
//         res.status(200).json({ success: true, message: '✅ เข้าสู่ระบบสำเร็จ', user: admin });
//       } else {
//         console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//         res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//       }
//     } else {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }
//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
//   if (isMatch) {
//     res.json({
//       success: true,
//       user: {
//         admin_id: admin.admin_id,
//         admin_user: admin.admin_user,
//         admin_name: admin.admin_name,
//         admin_lastname: admin.admin_lastname,
//         admin_email: admin.admin_email,
//         admin_phone: admin.admin_phone,
//         admin_position: admin.admin_position,
//         admin_img: admin.admin_img,
//       },
//     })
//   }
// });

// API: เข้าสู่ระบบ โดยใช้ Argon2id สำหรับตรวจสอบรหัสผ่าน
// app.post('/api/admin/login', async (req, res) => {
//   console.log('📌 API /api/admin/login ถูกเรียกใช้');
  
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
//   }

//   try {
//     const [rows] = await pool.query(
//       `SELECT * FROM admin WHERE admin_user = ?`,
//       [username]
//     );

//     if (rows.length === 0) {
//       console.log('❌ ผู้ใช้ไม่ถูกต้อง');
//       return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }

//     const admin = rows[0];
//     console.log("Admin record:", admin);

//     if (!admin.admin_pwd) {
//       console.error("❌ admin.admin_pwd is undefined for user:", username);
//       return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }

//     const validPassword = await argon2.verify(admin.admin_pwd, password);
//     if (!validPassword) {
//       console.log('❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
//       return res.status(401).json({ success: false, message: '❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
//     }

//     console.log('✅ เข้าสู่ระบบสำเร็จ:', admin);

//     // ลบรหัสผ่านออกจากข้อมูลที่ส่งกลับ
//     delete admin.admin_pwd;

//     return res.status(200).json({
//       success: true,
//       message: '✅ เข้าสู่ระบบสำเร็จ',
//       user: {
//         admin_id: admin.admin_id,
//         admin_user: admin.admin_user,
//         admin_name: admin.admin_name,
//         admin_lastname: admin.admin_lastname,
//         admin_email: admin.admin_email,
//         admin_phone: admin.admin_phone,
//         admin_position: admin.admin_position,
//         admin_img: admin.admin_img,
//       },
//     });

//   } catch (error) {
//     console.error('❌ Error during login:', error);
//     return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาด', error: error.message });
//   }
// });
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

// API สำหรับการ PUT ข้อมูลไป Update ใน Database
// app.put('/api/products/:product_id', async (req, res) => {
//   const { product_id } = req.params;
//   const { product_name, category_id, detail, images_main, supplementary_images, model_path } = req.body;

//   console.log("📌 รับค่า images_main:", images_main); // ตรวจสอบค่าที่ได้รับ

//   let imageName = null;
//   if (images_main && images_main.includes('.')) {
//     const fileExtension = images_main.split('.').pop().split('?')[0]; // ดึงนามสกุลไฟล์ และตัด query string ออก
//     imageName = `/${product_id}_1.${fileExtension}`; // กำหนดชื่อไฟล์ใหม่
//   } else {
//     console.warn("⚠️ images_main ไม่มีนามสกุลหรือเป็นค่า null");
//   }

//   const connection = await pool.getConnection();
//   try {
//     await connection.beginTransaction();

//     // อัปเดตข้อมูลสินค้า
//     await connection.query(
//       `UPDATE products SET product_name = ?, category_id = ?, updated_at = NOW() WHERE product_id = ?`,
//       [product_name, category_id, product_id]
//     );

//     // อัปเดตรายละเอียดสินค้า
//     await connection.query(
//       `INSERT INTO product_details (product_id, detail) 
//        VALUES (?, ?)
//        ON DUPLICATE KEY UPDATE detail = VALUES(detail)`,
//       [product_id, detail]
//     );

//     // อัปเดตรูปภาพหลัก
//     if (imageName) {
//       console.log("✅ imageName ที่ใช้บันทึก:", imageName);
//       await connection.query(
//         `UPDATE products SET images_main = ? WHERE product_id = ?`,
//         [imageName, product_id]
//       );
//     }

//     // ลบรูปภาพรองเก่า
//     await connection.query(`DELETE FROM product_images WHERE product_id = ?`, [product_id]);

//     // เพิ่มรูปภาพรองใหม่
//     if (Array.isArray(supplementary_images) && supplementary_images.length > 0) {
//       const imageValues = supplementary_images.map((path) => [product_id, path]);

//       console.log("📌 imageValues:", imageValues); // ตรวจสอบค่า

//       const sql = `
//         INSERT INTO product_images (product_id, path) 
//         VALUES ${imageValues.map(() => "(?, ?)").join(", ")}
//         ON DUPLICATE KEY UPDATE path = VALUES(path)
//       `;

//       await connection.query(sql, imageValues.flat());
//     }

//     // อัปเดตโมเดล 3D
//     await connection.query(
//       `UPDATE product_3d_models SET path = ? WHERE product_id = ?`,
//       [model_path, product_id]
//     );

//     await connection.commit();
//     res.status(200).json({ success: true, message: "✅ อัปเดตสินค้าสำเร็จ" });
//   } catch (error) {
//     await connection.rollback();
//     console.error("❌ Error updating product:", error);
//     res.status(500).json({ success: false, message: "❌ อัปเดตสินค้าไม่สำเร็จ", error: error.message });
//   } finally {
//     connection.release();
//   }
// });

// // API สำหรับอัปโหลดรูปภาพสินค้า
// app.post('/api/upload/image/:product_id/:index', upload.single('image'), async (req, res) => {
//   const { product_id, index } = req.params;

//   console.log("📌 API received:", { product_id, index });

//   if (!product_id || isNaN(index)) {
//     return res.status(400).json({ success: false, message: '❌ product_id หรือ index ไม่ถูกต้อง' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ success: false, message: '❌ กรุณาอัปโหลดไฟล์' });
//   }

//   try {
//     const [productExists] = await pool.query(
//       `SELECT product_id FROM products WHERE product_id = ?`, 
//       [product_id]
//     );

//     if (productExists.length === 0) {
//       console.log("❌ ไม่พบสินค้านี้ในระบบ:", product_id);
//       return res.status(400).json({ success: false, message: '❌ ไม่พบสินค้านี้ในระบบ' });
//     }

//     const fileExt = path.extname(req.file.originalname);
//     const newFileName = `${product_id}_${parseInt(index) + 1}${fileExt}`;
//     const filePath = `/${newFileName}`;

//     await pool.query(
//       `INSERT INTO product_images (product_id, path) VALUES (?, ?)
//        ON DUPLICATE KEY UPDATE path = VALUES(path)`,
//       [product_id, filePath]
//     );

//     res.status(200).json({ success: true, path: filePath });
//   } catch (error) {
//     console.error('❌ Error uploading image:', error);
//     res.status(500).json({ success: false, message: '❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' });
//   }
// });



// // API ลบรูปภาพ
// app.delete('/api/delete/image/:product_id/:index', async (req, res) => {
//   const { product_id, index } = req.params;

//   try {
//     const [rows] = await pool.query(
//       `SELECT path FROM product_images WHERE product_id = ? LIMIT ?,1`,
//       [product_id, parseInt(index)]
//     );

//     if (rows.length === 0) {
//       return res.status(404).json({ success: false, message: "❌ ไม่พบรูปภาพ" });
//     }

//     const imagePath = path.join(__dirname, '../admin/public', rows[0].path);
//     fs.unlink(imagePath, (err) => {
//       if (err) console.error("⚠️ Failed to delete file:", err);
//     });

//     await pool.query(`DELETE FROM product_images WHERE product_id = ? LIMIT 1 OFFSET ?`, [product_id, parseInt(index)]);
//     res.status(200).json({ success: true, message: "✅ ลบรูปภาพสำเร็จ" });
//   } catch (error) {
//     console.error("❌ Error deleting image:", error);
//     res.status(500).json({ success: false, message: "❌ ลบรูปไม่สำเร็จ" });
//   }
// });


// // API: อัปโหลดไฟล์ 3D Model
// app.post("/api/upload/3d/:product_id", upload3DModel.single("model"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ success: false, message: "❌ กรุณาอัปโหลดไฟล์ 3D" });
//   }
//   const filePath = `/uploads/3d/${req.file.filename}`;

//   // บันทึก path ลงในฐานข้อมูล
//   pool.query(
//     `INSERT INTO product_3d_models (product_id, path) VALUES (?, ?) 
//      ON DUPLICATE KEY UPDATE path = VALUES(path)`,
//     [req.params.product_id, filePath],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ success: false, message: "❌ บันทึกไฟล์ 3D ไม่สำเร็จ" });
//       }
//       res.json({ success: true, path: filePath, message: "✅ อัปโหลดไฟล์ 3D สำเร็จ" });
//     }
//   );
// });



// ✅ API: อัปเดตข้อมูลสินค้า
// app.put("/api/products/:product_id", async (req, res) => {
//   try {
//     const { product_id } = req.params;
//     const { product_name, category_id, series_id, detail } = req.body;

//     if (!product_name || !category_id) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const query = `
//       UPDATE products 
//       SET product_name = ?, category_id = ?, series_id = ? 
//       WHERE product_id = ?
//     `;

//     await pool.query(query, [product_name, category_id, series_id, product_id]);

//     // ✅ อัปเดต product_details
//     if (detail) {
//       await pool.query(
//         "INSERT INTO product_details (product_id, detail) VALUES (?, ?) ON DUPLICATE KEY UPDATE detail = ?",
//         [product_id, detail, detail]
//       );
//     }

//     res.status(200).json({ success: true, message: "Product updated successfully" });
//   } catch (error) {
//     console.error("🚨 Error updating product:", error);
//     res.status(500).json({ success: false, message: "Error updating product" });
//   }
// });




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
// app.post("/api/upload-image-temp", upload.single("image"), async (req, res) => {
//   try {
//     const { product_id } = req.body;
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     if (!product_id || isNaN(product_id)) {
//       return res.status(400).json({ success: false, message: "❌ Product ID is missing or invalid" });
//     }

//     const fileExt = path.extname(req.file.originalname);

//     // 🔍 ตรวจสอบจำนวนรูปภาพที่มีอยู่แล้ว
//     const [imageCount] = await pool.query(
//       "SELECT COUNT(*) AS count FROM product_images WHERE product_id = ?",
//       [product_id]
//     );
//     const index = imageCount[0].count + 1; // กำหนด index ถัดไป
//     const filename = `${product_id}_${index}${fileExt}`;

//     // 🛑 ยังไม่ copy ไปที่ `/public/products`
//     console.log("📸 Temporary uploaded image:", filename);

//     res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });
//   } catch (error) {
//     console.error("🚨 Error uploading image:", error);
//     res.status(500).json({ success: false, message: "Error uploading image" });
//   }
// });


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
// app.post("/api/save-images", async (req, res) => {
//   try {
//     const { product_id } = req.body;
//     if (!product_id || isNaN(product_id)) {
//       return res.status(400).json({ success: false, message: "❌ Invalid product_id" });
//     }

//     console.log("🔍 Processing product_id:", product_id);

//     // ✅ ใช้ path admin/public/products
//     const savePath = path.join(__dirname, "../admin/public/products");

//     if (!fs.existsSync(savePath)) {
//       fs.mkdirSync(savePath, { recursive: true });
//       console.log("📂 Created directory:", savePath);
//     }

//     res.status(200).json({ success: true, message: "Images saved successfully" });
//   } catch (error) {
//     console.error("🚨 Error saving images:", error);
//     res.status(500).json({ success: false, message: "Error saving images" });
//   }
// });



// // ✅ API: อัปโหลดรูปภาพแบบชั่วคราว
// app.post("/api/upload-image-temp", upload.single("image"), async (req, res) => {
//   try {
//     const { product_id } = req.body;
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     if (!product_id) {
//       return res.status(400).json({ success: false, message: "Product ID is missing" });
//     }

//     const fileExt = path.extname(req.file.originalname);
//     const filename = `${product_id}_${Date.now()}${fileExt}`; // ใช้ timestamp ป้องกันชื่อไฟล์ซ้ำ

//     // 🛑 ส่งค่า base64 กลับไปให้แสดงผลชั่วคราว
//     console.log("📸 Temporary uploaded image:", filename);
//     res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });

//   } catch (error) {
//     console.error("🚨 Error uploading image:", error);
//     res.status(500).json({ success: false, message: "Error uploading image" });
//   }
// });

// // ✅ API: บันทึกภาพถาวร (ลงโฟลเดอร์และฐานข้อมูล)
// app.post("/api/save-images", upload.array("images"), async (req, res) => {
//   try {
//     const { product_id } = req.body;
//     const images = req.files;

//     console.log("🔍 Received product_id:", product_id);
//     console.log("🖼️ Received images:", images.length);

//     if (!product_id || !images || images.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid data (missing product_id or images)" });
//     }

//     // ✅ ใช้ path `admin/public/products`
//     const savePath = path.join(__dirname, "../admin/public/products");
//     if (!fs.existsSync(savePath)) {
//       fs.mkdirSync(savePath, { recursive: true });
//       console.log("📂 Created directory:", savePath);
//     }

//     // ✅ ดึงจำนวนภาพที่มีอยู่ก่อนจากฐานข้อมูล
//     const [existingImages] = await pool.query(
//       "SELECT path FROM product_images WHERE product_id = ?",
//       [product_id]
//     );
//     const existingImageSet = new Set(existingImages.map(img => img.path));

//     let imageIndex = existingImages.length + 1; // ลำดับภาพที่ต้องใช้ต่อจากที่มีอยู่

//     for (let index = 0; index < images.length; index++) {
//       const file = images[index];
//       const fileExt = path.extname(file.originalname);
//       let filename = `${product_id}_${imageIndex}${fileExt}`;

//       // ✅ บันทึกชื่อไฟล์ลงฐานข้อมูลก่อน
//       if (imageIndex === 1) {
//         // ✅ บันทึกเป็นภาพหลักของสินค้า
//         await pool.query("UPDATE products SET images_main = ? WHERE product_id = ?", [filename, product_id]);
//         console.log(`📦 Updated main product image in DB: ${filename}`);
//       } else {
//         // ✅ บันทึกเป็นภาพรองลงตาราง product_images
//         await pool.query("INSERT INTO product_images (product_id, path) VALUES (?, ?)", [product_id, filename]);
//         console.log(`📦 Inserted into product_images: ${filename}`);
//       }

//       imageIndex++; // เพิ่มลำดับภาพ

//       // ✅ เปลี่ยนชื่อไฟล์จริงและคัดลอกไปที่โฟลเดอร์
//       const tempFilePath = path.join(savePath, file.filename); // ไฟล์ชั่วคราวจาก multer
//       const finalFilePath = path.join(savePath, filename); // ไฟล์ใหม่

//       fs.renameSync(tempFilePath, finalFilePath);
//       console.log(`✅ Moved image from temp to final: ${finalFilePath}`);
//     }

//     res.status(200).json({ success: true, message: "Images saved successfully" });

//   } catch (error) {
//     console.error("🚨 Error saving images:", error);
//     res.status(500).json({ success: false, message: "Error saving images" });
//   }
// });

// // ✅ API: อัปโหลดรูปภาพ (ยังไม่บันทึกลง `/public/products`)
// app.post("/api/upload-image-temp", upload.single("image"), async (req, res) => {
//   try {
//     const { product_id } = req.body;
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No file uploaded" });
//     }

//     if (!product_id) {
//       return res.status(400).json({ success: false, message: "Product ID is missing" });
//     }

//     const fileExt = path.extname(req.file.originalname);
    
//     // 🔍 ตรวจสอบจำนวนรูปภาพที่มีอยู่แล้ว
//     const [imageCount] = await pool.query(
//       "SELECT COUNT(*) AS count FROM product_images WHERE product_id = ?",
//       [product_id]
//     );
//     const index = imageCount[0].count + 1; // กำหนด index ถัดไป
//     const filename = `/${product_id}_${index}${fileExt}`;

//     // 🛑 ยังไม่ copy ไปที่ `/public/products`
//     console.log("📸 Temporary uploaded image:", filename);

//     res.status(200).json({ success: true, filename, fileBuffer: req.file.buffer.toString("base64") });
//   } catch (error) {
//     console.error("🚨 Error uploading image:", error);
//     res.status(500).json({ success: false, message: "Error uploading image" });
//   }
// });

// // ✅ API บันทึกภาพ (หลังจากกดบันทึก)
// app.post("/api/save-images", upload.array("images"), async (req, res) => {
//   try {
//     const { product_id } = req.body;
//     const images = req.files;

//     console.log("🔍 Received product_id:", product_id);
//     console.log("🖼️ Received images:", images.length);

//     if (!product_id || !images || images.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid data (missing product_id or images)" });
//     }

//     const savePath = path.join(__dirname, "../admin/public/products");
//     if (!fs.existsSync(savePath)) {
//       fs.mkdirSync(savePath, { recursive: true });
//     }

//     for (let index = 0; index < images.length; index++) {
//       const file = images[index];
//       const fileExt = path.extname(file.originalname);
//       const filename = `${product_id}_${index + 1}${fileExt}`;
//       const filePath = path.join(savePath, filename);
//       fs.writeFileSync(filePath, file.buffer);

//       if (index === 0) {
//         // ✅ บันทึกเป็นภาพหลัก
//         await pool.query("UPDATE products SET images_main = ? WHERE product_id = ?", [filename, product_id]);
//       } else {
//         // ✅ บันทึกเป็นภาพรอง
//         await pool.query("INSERT INTO product_images (product_id, path) VALUES (?, ?)", [product_id, filename]);
//       }
//     }

//     res.status(200).json({ success: true, message: "Images saved successfully" });
//   } catch (error) {
//     console.error("🚨 Error saving images:", error);
//     res.status(500).json({ success: false, message: "Error saving images" });
//   }
// });



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

// ✅ API: เพิ่มสินค้าใหม่ (บันทึกลงฐานข้อมูลก่อน)
// 🚀 API: เพิ่มสินค้าใหม่
app.post("/api/products", async (req, res) => {
  try {
    const { product_name, category_id, detail, installation_type, screen_size } = req.body;

    if (!product_name || !category_id) {
      return res.status(400).json({ success: false, message: "ชื่อสินค้าและหมวดหมู่จำเป็นต้องระบุ" });
    }

    const [productResult] = await pool.query(
      "INSERT INTO products (product_name, category_id, images_main) VALUES (?, ?, ?)",
      [product_name, category_id, null]
    );
    const product_id = productResult.insertId;

    await pool.query(
      "INSERT INTO product_details (product_id, detail, installation_type, screen_size) VALUES (?, ?, ?, ?)",
      [product_id, detail, installation_type, screen_size]
    );

    res.json({ success: true, message: "เพิ่มสินค้าสำเร็จ!", product_id });
  } catch (error) {
    console.error("❌ Error inserting product:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาด" });
  }
});

// 🚀 API: อัปเดตสินค้า
app.put("/api/products/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const { product_name, category_id, detail, installation_type, screen_size } = req.body;

    if (!product_name || !category_id) {
      return res.status(400).json({ success: false, message: "ข้อมูลไม่ครบถ้วน" });
    }

    await pool.query(
      "UPDATE products SET product_name = ?, category_id = ? WHERE product_id = ?",
      [product_name, category_id, product_id]
    );

    await pool.query(
      "UPDATE product_details SET detail = ?, installation_type = ?, screen_size = ? WHERE product_id = ?",
      [detail, installation_type, screen_size, product_id]
    );

    res.json({ success: true, message: "อัปเดตสินค้าสำเร็จ!" });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาด" });
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
    const filename = `${product_id}_${index}${fileExt}`;

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
      const filename = `${product_id}_${index + 1}${fileExt}`;
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


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});