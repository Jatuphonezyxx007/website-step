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
//     // <div>
//     //   {/* <Navbar /> */}
//     //   <motion.main
//     //     className="homepage-container"
//     //     initial={{ opacity: 0, y: -50 }}
//     //     animate={{ opacity: 1, y: 0 }}
//     //     transition={{ duration: 0.8, ease: 'easeOut' }}
//     //   >
//     //     <div className="homepage-header">
//     //       <h1 className="homepage-title">Welcome Na Kha!</h1>
//     //       <p className="homepage-description">Hello World จ้า 69!</p>
//     //     </div>

//     //     <section className="product-section">
//     //       <h2 className="section-title">สินค้าแนะนำ</h2>
//     //       <div className="product-grid">
//     //         {products.map((product) => (
//     //           <motion.div
//     //             key={product.product_id}
//     //             className="product-card"
//     //             whileHover={{ scale: 1.05 }}
//     //             transition={{ type: 'spring', stiffness: 300 }}
//     //           >
//     //             <img 
//     //               src={`http://localhost:3000/products/${product.images_main}`} 
//     //               alt={product.product_name} 
//     //               className="product-image" 
//     //             />
//     //             <h3 className="product-name">{product.product_name}</h3>
//     //             {/* <button className="product-button">ดูรายละเอียด</button> */}
//     //           </motion.div>
//     //         ))}
//     //       </div>
//     //     </section>
//     //   </motion.main>
//     //   {/* <Footer /> */}
//     // </div>

//     <div className="product-list-container">
//     {/* Sidebar Filter */}
//     <div className="filter-sidebar sticky top-0 h-screen overflow-auto">
//       <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//       <form>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">หมวดหมู่สินค้า</label>
//           <CheckboxGroup 
//             value={selectedCategories} 
//             onChange={handleCategoryChange}
//           >
//             {categories.map((category) => (
//               <Checkbox key={category.id} value={category.name}>
//                 {category.name}
//               </Checkbox>
//             ))}
//           </CheckboxGroup>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Price Range</label>
//           <div className="flex gap-2">
//             <input
//               type="number"
//               className="w-1/2 border rounded px-3 py-2"
//               placeholder="Min"
//             />
//             <input
//               type="number"
//               className="w-1/2 border rounded px-3 py-2"
//               placeholder="Max"
//             />
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Status</label>
//           <select className="w-full border rounded px-3 py-2">
//             <option value="">All Statuses</option>
//             <option value="In Stock">In Stock</option>
//             <option value="Out of Stock">Out of Stock</option>
//           </select>
//         </div>
//         <button
//           type="button"
//           className="apply-filters-btn"
//         >
//           Apply Filters
//         </button>
//       </form>
//     </div>

//     {/* Product Grid */}
//     <div className="product-grid">
//       <h1 className="text-2xl font-bold mb-4">
//         {categories.length > 0 ? categories[0].name : "ไม่มีหมวดหมู่"}
//       </h1>
      
//       {/* ฟอร์มการค้นหาสินค้า */}
//       <div className="search-container mb-4">
//         <Input
//           value={searchQuery}
//           onChange={handleSearchChange}
//           isClearable
//           classNames={{
//             label: "text-black/50 dark:text-white/90",
//             input: [
//               "bg-transparent",
//               "text-black/90 dark:text-white/90",
//               "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//             ],
//             innerWrapper: "bg-transparent",
//             inputWrapper: [
//               "shadow-xl",
//               "bg-default-200/50",
//               "dark:bg-default/60",
//               "backdrop-blur-xl",
//               "backdrop-saturate-200",
//               "hover:bg-default-200/70",
//               "dark:hover:bg-default/70",
//               "group-data-[focus=true]:bg-default-200/50",
//               "dark:group-data-[focus=true]:bg-default/60",
//               "!cursor-text",
//             ],
//           }}
//           label="ค้นหา"
//           placeholder="ค้นหารายการสินค้า..."
//           radius="lg"
//           startContent={
//             <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//           }
//         />
//       </div>

//       <div className="grid-container">
//         {displayedProducts.length > 0 ? (
//           displayedProducts.map((product) => (
//             <Card
//               key={product.id}
//               isPressable
//               shadow="sm"
//               onPress={() => handleCardClick(product.id)} // เรียกใช้ฟังก์ชันเมื่อคลิก
//               className="product-card"
//             >
//               <CardBody className="overflow-hidden p-0">
//                 <Image
//                   isZoomed
//                   alt={product.name}
//                   className="product-image"
//                   src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//                   width="100%"
//                   height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
//                   radius="lg"
//                 />
//               </CardBody>

//               <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
//                 <div className="product-details text-center">
//                   <h2 className="product-name">{product.name}</h2>
//                   <p className="product-price">
//                     ฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                   </p>
//                   <p className="product-category">{product.category_name}</p>
//                 </div>

//                 <div className="product-status mt-2">
//                   <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
//                     {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
//                   </p>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <p>ไม่มีสินค้าในขณะนี้</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <br></br>
//       <div className="pagination-container mt-4 flex justify-center">
//         <Pagination
//           showControls
//           initialPage={currentPage}
//           total={totalPages}
//           onChange={handlePageChange}
//         />
//       </div>
//     </div>
//   </div>

//   );
// }

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Checkbox, CheckboxGroup, Input, Pagination } from '@nextui-org/react'; // นำเข้าคอมโพเนนต์
import { SearchIcon } from '@heroicons/react/outline';

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (newSelection) => {
    setSelectedCategories(newSelection);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCardClick = (productId) => {
    console.log(`Clicked product ID: ${productId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // กรองสินค้าตามหมวดหมู่และการค้นหา
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategories.length === 0 || selectedCategories.includes(product.category_name)) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // คำนวณหน้าทั้งหมด
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="product-list-container">
      <div className="filter-sidebar sticky top-0 h-screen overflow-auto p-4">
        <h3 className="text-xl font-bold mb-4">Filter Products</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">หมวดหมู่สินค้า</label>
            <CheckboxGroup value={selectedCategories} onChange={handleCategoryChange}>
              {categories.map((category) => (
                <Checkbox key={category.id} value={category.name}>
                  {category.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <button type="button" className="apply-filters-btn mt-4">
            Apply Filters
          </button>
        </form>
      </div>

      <div className="product-grid">
        <h1 className="text-2xl font-bold mb-4">
          {categories.length > 0 ? categories[0].name : 'ไม่มีหมวดหมู่'}
        </h1>

        <div className="search-container mb-4">
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            isClearable
            label="ค้นหา"
            placeholder="ค้นหารายการสินค้า..."
            radius="lg"
            startContent={<SearchIcon className="text-slate-400 flex-shrink-0" />}
          />
        </div>

        <div className="grid-container">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <div key={product.id} className="product-card" onClick={() => handleCardClick(product.id)}>
                <img
                  alt={product.name}
                  className="product-image"
                  src={product.image_path ? `/products${product.image_path}` : 'https://via.placeholder.com/500x500'}
                />
                <div className="product-details text-center">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-price">
                    ฿ {parseFloat(product.price).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="product-category">{product.category_name}</p>
                </div>
                <div className="product-status mt-2">
                  <p className={`status-badge ${product.status === 'in_stock' ? 'in-stock' : 'out-of-stock'}`}>
                    {product.status === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>ไม่มีสินค้าในขณะนี้</p>
          )}
        </div>

        <div className="pagination-container mt-4 flex justify-center">
          <Pagination showControls initialPage={currentPage} total={totalPages} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}
