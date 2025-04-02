// // src/pages/Categories.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './Categories.css';

// const BASE_URL = 'http://localhost:3000';

// export default function Categories() {
//   const { categoryId } = useParams();
//   const [categoryInfo, setCategoryInfo] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const [categoryResponse, productsResponse] = await Promise.all([
//           axios.get(`${BASE_URL}/api/category/${categoryId}`).catch((err) => {
//             console.error('❌ Category API Error:', err.response?.data || err.message);
//             throw err;
//           }),
//           axios.get(`${BASE_URL}/api/products/category/${categoryId}`).catch((err) => {
//             console.error('❌ Products API Error:', err.response?.data || err.message);
//             throw err;
//           }),
//         ]);

//         console.log('📦 ข้อมูลหมวดหมู่:', categoryResponse.data);
//         console.log('📦 สินค้าที่ดึงได้:', productsResponse.data);

//         setCategoryInfo(categoryResponse.data);
//         setProducts(productsResponse.data);
//       } catch (error) {
//         console.error('❌ Failed to fetch data:', error);
//         setError('เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [categoryId]);

//   if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
//   if (error) return <p>❌ {error}</p>;

//   return (
//     <div className="categories-page-container">
//       <div className="category-header">
//         {categoryInfo ? (
//           <>
//             <img
//               src={`${BASE_URL}${categoryInfo.img_cate}`}
//               alt={categoryInfo.name}
//               className="category-banner"
//               onError={(e) => (e.target.src = 'https://via.placeholder.com/500x300')}
//             />
//             <h1 className="category-title text-start">{categoryInfo.name}</h1>
//           </>
//         ) : (
//           <p>🔍 ไม่พบข้อมูลหมวดหมู่ที่เลือก</p>
//         )}
//       </div>

//       <div className="product-grid">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="product-card"
//               onClick={() => navigate(`/products/${product.id}`)}
//               style={{ cursor: 'pointer' }}
//             >
//               <img
//                 src={`${BASE_URL}${product.image_path}`}
//                 alt={product.name}
//                 onError={(e) => (e.target.src = 'https://via.placeholder.com/500x500')}
//                 className="product-image"
//               />
//               <div className="product-details">
//                 <h3 className="product-name">{product.name}</h3>
//                 <p className="product-status">
//                   สถานะ: {product.status === 'in_stock' ? 'พร้อมจำหน่าย ✅' : 'สินค้าหมด ❌'}
//                 </p>
//                 <p className="product-price">ราคา: ฿{product.price}</p>
//               </div>
//               <button className="product-button">ดูรายละเอียดสินค้า</button>
//             </div>
//           ))
//         ) : (
//           <p className="no-products-message">🚫 ไม่มีสินค้าที่จะแสดงในขณะนี้</p>
//         )}
//       </div>
//     </div>
//   );
// }





// // src/pages/Categories.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './Categories.css';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// export default function Categories() {
//   const { categoryId } = useParams();
//   const [categoryInfo, setCategoryInfo] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategoryData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         // ✅ ปรับเส้นทาง API ให้สอดคล้องกับ Backend
//         const [categoryResponse, productsResponse] = await Promise.all([
//           axios.get(`${BASE_URL}/api/category/${categoryId}`),
//           axios.get(`${BASE_URL}/api/products/category/${categoryId}`),
//         ]);

//         console.log('📦 ข้อมูลหมวดหมู่:', categoryResponse.data);
//         console.log('📦 สินค้าที่ดึงได้:', productsResponse.data);

//         setCategoryInfo(categoryResponse.data);
//         setProducts(productsResponse.data);
//       } catch (error) {
//         console.error('❌ Failed to fetch data:', error.response?.data || error.message);
//         setError('เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryData();
//   }, [categoryId]);

//   if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
//   if (error) return <p>❌ {error}</p>;

//   return (
//     <div className="categories-page-container">
//       <div className="category-header">
//         {categoryInfo ? (
//           <>
//             <img
//               src={`${BASE_URL}${categoryInfo.img_cate}`}
//               alt={categoryInfo.name}
//               className="category-banner"
//               onError={(e) => (e.target.src = 'https://via.placeholder.com/500x300')}
//             />
//             <h1 className="category-title text-start">{categoryInfo.name}</h1>
//           </>
//         ) : (
//           <p>🔍 ไม่พบข้อมูลหมวดหมู่ที่เลือก</p>
//         )}
//       </div>

//       <div className="product-grid">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div
//               key={product.id}
//               className="product-card"
//               onClick={() => navigate(`/products/${product.id}`)}
//               style={{ cursor: 'pointer' }}
//             >
//               <img
//                 src={`${BASE_URL}/images/products/${product.image_path}`}
//                 alt={product.name}
//                 onError={(e) => (e.target.src = 'https://via.placeholder.com/500x500')}
//                 className="product-image"
//               />
//               <div className="product-details">
//                 <h3 className="product-name">{product.name}</h3>
//                 <p className="product-status">
//                   สถานะ: {product.status === 'in_stock' ? 'พร้อมจำหน่าย ✅' : 'สินค้าหมด ❌'}
//                 </p>
//                 <p className="product-price">ราคา: ฿{product.price}</p>
//               </div>
//               <button className="product-button">ดูรายละเอียดสินค้า</button>
//             </div>
//           ))
//         ) : (
//           <p className="no-products-message">🚫 ไม่มีสินค้าที่จะแสดงในขณะนี้</p>
//         )}
//       </div>
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import './Categories.css';

// export default function Categories() {
//   const { id } = useParams();
//   const [category, setCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCategoryDetails = async () => {
//       try {
//         console.log(`📌 Fetching category ID: ${id}`);
//         const categoryResponse = await axios.get(`http://localhost:3000/api/categories/${id}`);
//         if (categoryResponse.data && categoryResponse.status === 200) {
//           setCategory(categoryResponse.data);
//         } else {
//           console.warn(`⚠️ API returned unexpected response:`, categoryResponse);
//           setError("ไม่พบหมวดหมู่ที่เลือก");
//         }
//       } catch (err) {
//         console.error(`❌ Error fetching category ${id}:`, err);
//         setError("ไม่สามารถดึงข้อมูลหมวดหมู่ได้ หรือหมวดหมู่นี้ไม่มีอยู่ในระบบ");
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         console.log(`📌 Fetching products for category ID: ${id}`);
//         const productsResponse = await axios.get(`http://localhost:3000/api/products?category=${id}`);
//         console.log("📌 API Response:", productsResponse.data);
   
//         if (productsResponse.data.success && Array.isArray(productsResponse.data.products)) {
//           console.log("✅ Products found:", productsResponse.data.products);
//           setProducts(productsResponse.data.products);
//         } else {
//           console.warn("⚠️ Unexpected product API response:", productsResponse);
//         }
//       } catch (err) {
//         console.error("❌ Failed to fetch products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };


//     if (id) {
//       fetchCategoryDetails();
//       fetchProducts();
//     }
//   }, [id]);

//   if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
//   if (error) return <p>❌ {error}</p>;
//   if (!category) return <p>⚠️ ไม่พบข้อมูลหมวดหมู่</p>;

//   return (
//     <div className="category-container">
//       <motion.main
//         className="category-content"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       >
//         <div className="category-header">
//           <h1 className="category-title">หมวดหมู่ : {category.label}</h1>
//           <p className="category-description">รหัสหมวดหมู่ : {category.value}</p>
//         </div>

//         <section className="product-section">
//           <h2 className="section-title">สินค้าในหมวดหมู่นี้</h2>
//           <div className="product-grid">
// {products.length > 0 ? (
//    products.map((product, index) => (
//      <motion.div
//        key={product.id || index} // ✅ Key ต้องไม่ซ้ำกัน
//        className="product-card"
//        whileHover={{ scale: 1.05 }}
//        transition={{ type: 'spring', stiffness: 300 }}
//      >
//        <img 
//          src={product.image ? `http://localhost:3000/uploads/${product.image}` : 'https://placehold.co/400x600'}
//          alt={product.name}
//          className="product-image"
//        />
//        <h3 className="product-name">{product.name}</h3>  {/* ✅ ใช้ product.name แทน */}
//        <button className="product-button">ดูรายละเอียด</button>
//      </motion.div>
//    ))
// ) : (
//    <p className="no-products">ไม่มีสินค้าในหมวดหมู่นี้</p>
// )}
//           </div>
//         </section>
//       </motion.main>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './ProductList.css';

export default function Categories() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      if (!id) {
        console.warn("⚠️ Category ID is undefined!");
        setError("หมวดหมู่ไม่ถูกต้อง");
        return;
      }
  
      try {
        console.log(`📌 Fetching category ID: ${id}`);
        const { data, status } = await axios.get(`http://localhost:3000/api/categories/${id}`);
        if (data && status === 200 && data.success) {
          setCategory(data.category);
        } else {
          console.warn(`⚠️ API returned unexpected response:`, data);
          setError("ไม่พบหมวดหมู่ที่เลือก");
        }
      } catch (err) {
        console.error(`❌ Error fetching category ${id}:`, err);
        setError("ไม่สามารถดึงข้อมูลหมวดหมู่ได้");
      }
    };
  
    const fetchProducts = async () => {
      if (!id) {
        console.warn("⚠️ Cannot fetch products, category ID is undefined!");
        return;
      }
  
      try {
        console.log(`📌 Fetching products for category ID: ${id}`);
        const { data } = await axios.get(`http://localhost:3000/api/product?category=${id}`);
        console.log("📌 API Response:", data);
  
        if (data.success && Array.isArray(data.products)) {
          console.log("✅ Products found:", data.products);
          setProducts(data.products);
        } else {
          console.warn("⚠️ Unexpected product API response:", data);
          setProducts([]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchCategoryDetails();
      fetchProducts();
    }
  }, [id]);
  
  if (loading) return <p>⏳ กำลังโหลดข้อมูล...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!category) return <p>⚠️ ไม่พบข้อมูลหมวดหมู่</p>;

  return (
    <div className="category-container">
      <motion.main
        className="category-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="category-header">
          <h1 className="category-title">หมวดหมู่ : {category.label}</h1>
          <p className="category-description">รหัสหมวดหมู่ : {category.value}</p>
        </div>

        <section className="product-section">
          <h2 className="section-title">สินค้าในหมวดหมู่นี้</h2>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id || index}
                  className="product-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img
                    src={product.image ? `http://localhost:3000/products${product.images_main}` : 'https://placehold.co/400x600'}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <button className="product-button">ดูรายละเอียด</button>
                </motion.div>
              ))
            ) : (
              <p className="no-products">ไม่มีสินค้าในหมวดหมู่นี้</p>
            )}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
