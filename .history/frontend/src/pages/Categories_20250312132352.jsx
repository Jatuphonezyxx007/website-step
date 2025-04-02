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



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Selects({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data.categories)) {
          const sortedCategories = response.data.categories.sort((a, b) => a.value - b.value);
          setCategories(sortedCategories);
        } else {
          console.error("❌ Unexpected API response format:", response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    onCategoryChange(selectedValue);
    navigate(`/categories/${selectedValue}`);
  };

  return (
    <div className="hidden-mobile">
      <label htmlFor="category-select" className="sr-only">เลือกหมวดหมู่สินค้า</label>
      <select
        id="category-select"
        className="category-dropdown"
        value={selectedCategory || ""}
        onChange={handleCategoryChange}
      >
        <option value="" disabled>เลือกหมวดหมู่สินค้า</option>
        {categories.map((cat, index) => (
          <option key={`${cat.value}-${index}`} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
