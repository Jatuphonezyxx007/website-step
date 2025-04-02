// // src/pages/Homepage.jsx
// import React from 'react';
// import Navbar from '../components/Navbar/Navbar.jsx';
// import './Homepage.css';
// import Footer from '../components/Footer/Footer.jsx';
// import { motion } from 'framer-motion';

// export default function Homepage() {
//   const products = [
//     { id: 1, name: 'สินค้า A', price: '฿5,000', image: 'https://placehold.co/400x600' },
//     { id: 2, name: 'สินค้า B', price: '฿7,500', image: 'https://placehold.co/400x600' },
//     { id: 3, name: 'สินค้า C', price: '฿3,200', image: 'https://placehold.co/400x600' },
//     { id: 4, name: 'สินค้า D', price: '฿9,900', image: 'https://placehold.co/400x600' },
//   ];

//   return (
//     <div>
//       {/* <Navbar /> */}
//       <motion.main
//         className="homepage-container"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       >
//         <div className="homepage-header">
//           <h1 className="homepage-title">Welcome Na Kha!</h1>
//           <p className="homepage-description">
//             Hello World จ้า 69!
//           </p>
//         </div>

//         <section className="product-section">
//           <h2 className="section-title">สินค้าแนะนำ</h2>
//           <div className="product-grid">
//             {products.map((product) => (
//               <motion.div
//                 key={product.id}
//                 className="product-card"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <img src={product.image} alt={product.name} className="product-image" />
//                 <h3 className="product-name">{product.name}</h3>
//                 <p className="product-price">{product.price}</p>
//                 <button className="product-button">ดูรายละเอียด</button>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </motion.main>
//       {/* <Footer /> */}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import './Homepage.css';
import Footer from '../components/Footer/Footer.jsx';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Homepage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    // <div>
    //   {/* <Navbar /> */}
    //   <motion.main
    //     className="homepage-container"
    //     initial={{ opacity: 0, y: -50 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.8, ease: 'easeOut' }}
    //   >
    //     <div className="homepage-header">
    //       <h1 className="homepage-title">Welcome Na Kha!</h1>
    //       <p className="homepage-description">Hello World จ้า 69!</p>
    //     </div>

    //     {/* Filter Section */}


    //     <section className="product-section">
    //       <h2 className="section-title">สินค้าแนะนำ</h2>
    //       <div className="product-grid">
    //         {products.map((product) => (
    //           <motion.div
    //             key={product.product_id}
    //             className="product-card"
    //             whileHover={{ scale: 1.05 }}
    //             transition={{ type: 'spring', stiffness: 300 }}
    //           >
    //             <img 
    //               src={`http://localhost:3000/products/${product.images_main}`} 
    //               alt={product.product_name} 
    //               className="product-image" 
    //             />
    //             <h3 className="product-name">{product.product_name}</h3>
    //             {/* <button className="product-button">ดูรายละเอียด</button> */}
    //           </motion.div>
    //         ))}
    //       </div>
    //     </section>
    //   </motion.main>
    //   {/* <Footer /> */}
    // </div>

    <div className="category-container">
    <motion.main
      className="category-content"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="category-header">
        {/* <h1 className="category-title">หมวดหมู่ : {category.label}</h1>
        <p className="category-description">รหัสหมวดหมู่ : {category.value}</p> */}
      </div>

      {/* Layout with Sidebar & Products */}
      <div className="category-layout">
        {/* Sidebar Filter */}
        <aside className="filter-sidebar">
          <h3>ตัวกรองสินค้า</h3>
          <label>
            <input type="checkbox" /> มีสต็อกสินค้า
          </label>
          <label>
            <input type="checkbox" /> สินค้าลดราคา
          </label>
          <label>
            <input type="checkbox" /> สินค้าใหม่
          </label>
        </aside>

        {/* Product Section */}
        <section className="product-section">
          <h2 className="section-title">สินค้าในหมวดหมู่นี้</h2>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id || index} // ✅ เพิ่ม key ที่ไม่ซ้ำกัน
                  className="product-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img 
                    src={product.image ? `http://localhost:3000/uploads/${product.image}` : 'https://placehold.co/400x600'}
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
      </div>
    </motion.main>
  </div>

  );
}
