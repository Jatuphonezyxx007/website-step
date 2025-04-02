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


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar/Navbar.jsx';
// import './Homepage.css';
// import Footer from '../components/Footer/Footer.jsx';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// export default function Homepage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/products');
//         if (response.data.success) {
//           setProducts(response.data.products);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProducts();
//   }, []);

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
//           <h1 className="homepage-title">Products</h1>
//           {/* <p className="homepage-description">Hello World จ้า 69!</p> */}
//         </div>

//         {/* Filter Section */}


        
//         <section className="product-section">
//           {/* <h2 className="section-title">สินค้าแนะนำ</h2> */}
//           <div className="product-grid">
//             {products.map((product) => (
//               <motion.div
//                 key={product.product_id}
//                 className="product-card"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <img 
//                   src={`http://localhost:3000/products/${product.images_main}`} 
//                   alt={product.product_name} 
//                   className="product-image" 
//                 />
//                 <h3 className="product-name">{product.product_name}</h3>
//                 {/* <button className="product-button">ดูรายละเอียด</button> */}
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
  const [sortOption, setSortOption] = useState(""); // เก็บค่าการเรียงลำดับ

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

  // ฟังก์ชันเรียงลำดับสินค้า
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceLowHigh") {
      return a.price - b.price;
    }
    if (sortOption === "priceHighLow") {
      return b.price - a.price;
    }
    if (sortOption === "nameAsc") {
      return a.product_name.localeCompare(b.product_name);
    }
    if (sortOption === "nameDesc") {
      return b.product_name.localeCompare(a.product_name);
    }
    return 0;
  });

  return (
    <div>
      <motion.main
        className="homepage-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="homepage-header">
          <h1 className="homepage-title">Products</h1>
        </div>

        {/* Filter + Product Grid Section */}
        <div className="filter-section">
          {/* Sidebar Filters */}
          <div className="filter-sidebar">
            <h3 className="text-xl font-bold mb-4">Filter Products</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">หมวดหมู่สินค้า</label>
                <select className="w-full border rounded px-3 py-2">
                  <option value="">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex gap-2">
                  <input type="number" className="w-1/2 border rounded px-3 py-2" placeholder="Min" />
                  <input type="number" className="w-1/2 border rounded px-3 py-2" placeholder="Max" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select className="w-full border rounded px-3 py-2">
                  <option value="">All Statuses</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <button type="button" className="apply-filters-btn">Apply Filters</button>
            </form>
          </div>

          {/* Product Grid */}
          <section className="product-section">
            {/* Sort Dropdown */}
            <div className="sort-section text-end">
              <label htmlFor="sort" className="sort-label">เรียงตาม:</label>
              <select 
                id="sort" 
                className="sort-dropdown" 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">-- เลือกการเรียงลำดับ --</option>
                <option value="priceLowHigh">ราคาต่ำ → สูง</option>
                <option value="priceHighLow">ราคาสูง → ต่ำ</option>
                <option value="nameAsc">ชื่อ A → Z</option>
                <option value="nameDesc">ชื่อ Z → A</option>
              </select>
            </div>

            <div className="product-grid">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.product_id}
                  className="product-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img 
                    src={`http://localhost:3000/products/${product.images_main}`} 
                    alt={product.product_name} 
                    className="product-image" 
                  />
                  <h3 className="product-name">{product.product_name}</h3>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.main>
    </div>
  );
}
