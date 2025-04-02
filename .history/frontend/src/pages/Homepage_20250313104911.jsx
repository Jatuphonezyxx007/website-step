// // // src/pages/Homepage.jsx
// // import React from 'react';
// // import Navbar from '../components/Navbar/Navbar.jsx';
// // import './Homepage.css';
// // import Footer from '../components/Footer/Footer.jsx';
// // import { motion } from 'framer-motion';

// // export default function Homepage() {
// //   const products = [
// //     { id: 1, name: 'สินค้า A', price: '฿5,000', image: 'https://placehold.co/400x600' },
// //     { id: 2, name: 'สินค้า B', price: '฿7,500', image: 'https://placehold.co/400x600' },
// //     { id: 3, name: 'สินค้า C', price: '฿3,200', image: 'https://placehold.co/400x600' },
// //     { id: 4, name: 'สินค้า D', price: '฿9,900', image: 'https://placehold.co/400x600' },
// //   ];

// //   return (
// //     <div>
// //       {/* <Navbar /> */}
// //       <motion.main
// //         className="homepage-container"
// //         initial={{ opacity: 0, y: -50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, ease: 'easeOut' }}
// //       >
// //         <div className="homepage-header">
// //           <h1 className="homepage-title">Welcome Na Kha!</h1>
// //           <p className="homepage-description">
// //             Hello World จ้า 69!
// //           </p>
// //         </div>

// //         <section className="product-section">
// //           <h2 className="section-title">สินค้าแนะนำ</h2>
// //           <div className="product-grid">
// //             {products.map((product) => (
// //               <motion.div
// //                 key={product.id}
// //                 className="product-card"
// //                 whileHover={{ scale: 1.05 }}
// //                 transition={{ type: 'spring', stiffness: 300 }}
// //               >
// //                 <img src={product.image} alt={product.name} className="product-image" />
// //                 <h3 className="product-name">{product.name}</h3>
// //                 <p className="product-price">{product.price}</p>
// //                 <button className="product-button">ดูรายละเอียด</button>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </section>
// //       </motion.main>
// //       {/* <Footer /> */}
// //     </div>
// //   );
// // }


// // import React, { useEffect, useState } from 'react';
// // import Navbar from '../components/Navbar/Navbar.jsx';
// // import './Homepage.css';
// // import Footer from '../components/Footer/Footer.jsx';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';

// // export default function Homepage() {
// //   const [products, setProducts] = useState([]);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3000/api/products');
// //         if (response.data.success) {
// //           setProducts(response.data.products);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //       }
// //     };
// //     fetchProducts();
// //   }, []);

// //   return (
// //     <div>
// //       {/* <Navbar /> */}
// //       <motion.main
// //         className="homepage-container"
// //         initial={{ opacity: 0, y: -50 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8, ease: 'easeOut' }}
// //       >
// //         <div className="homepage-header">
// //           <h1 className="homepage-title">Products</h1>
// //           {/* <p className="homepage-description">Hello World จ้า 69!</p> */}
// //         </div>

// //         {/* Filter Section */}


        
// //         <section className="product-section">
// //           {/* <h2 className="section-title">สินค้าแนะนำ</h2> */}
// //           <div className="product-grid">
// //             {products.map((product) => (
// //               <motion.div
// //                 key={product.product_id}
// //                 className="product-card"
// //                 whileHover={{ scale: 1.05 }}
// //                 transition={{ type: 'spring', stiffness: 300 }}
// //               >
// //                 <img 
// //                   src={`http://localhost:3000/products/${product.images_main}`} 
// //                   alt={product.product_name} 
// //                   className="product-image" 
// //                 />
// //                 <h3 className="product-name">{product.product_name}</h3>
// //                 {/* <button className="product-button">ดูรายละเอียด</button> */}
// //               </motion.div>
// //             ))}
// //           </div>
// //         </section>
// //       </motion.main>
// //       {/* <Footer /> */}
// //     </div>
// //   );
// // }




// // import React, { useEffect, useState } from 'react';
// // import './Homepage.css';
// // import { motion } from 'framer-motion';
// // import axios from 'axios';
// // import { Card, CardBody, CardFooter, Image, Pagination, CheckboxGroup, Checkbox } from "@nextui-org/react";

// // const Homepage = () => {
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [selectedCategories, setSelectedCategories] = useState([]);
// //   const [sortOption, setSortOption] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 6;

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3000/api/products');
// //         if (response.data.success) {
// //           setProducts(response.data.products);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching products:', error);
// //       }
// //     };

// //     const fetchCategories = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3000/api/categories');
// //         if (response.data.success) {
// //           setCategories(response.data.categories);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching categories:', error);
// //       }
// //     };

// //     fetchProducts();
// //     fetchCategories();
// //   }, []);

// //   const handlePageChange = (page) => setCurrentPage(page);
// //   const handleCategoryChange = (checkedValues) => setSelectedCategories(checkedValues);

// //   const sortedProducts = [...products].sort((a, b) => {
// //     if (sortOption === "priceLowHigh") return a.price - b.price;
// //     if (sortOption === "priceHighLow") return b.price - a.price;
// //     if (sortOption === "nameAsc") return a.product_name.localeCompare(b.product_name);
// //     if (sortOption === "nameDesc") return b.product_name.localeCompare(a.product_name);
// //     return 0;
// //   });

// //   const filteredProducts = sortedProducts.filter((product) => {
// //     const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_id.toString());
// //     return matchesCategory;
// //   });

// //   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
// //   const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// //   return (
// //     <motion.div className="homepage-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
// //       <div className="product-list-container">
// //         <motion.div className="filter-sidebar" initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
// //           <h3>Filter Products</h3>
// //           <CheckboxGroup value={selectedCategories} onChange={handleCategoryChange}>
// //             {categories.map((category) => (
// //               <Checkbox key={category.value} value={category.value.toString()}>{category.label}</Checkbox>
// //             ))}
// //           </CheckboxGroup>
// //         </motion.div>
// //         <div className="product-grid">
// //           <motion.div className="grid-container" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
// //             {displayedProducts.map((product) => (
// //               <motion.div key={product.product_id} whileHover={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
// //                 <Card isPressable shadow="sm">
// //                   <CardBody>
// //                     <Image alt={product.product_name} src={product.images_main || "https://via.placeholder.com/500x500"} width="100%" height="auto" radius="lg" />
// //                   </CardBody>
// //                   <CardFooter>
// //                     <h2 className="product-name">{product.product_name}</h2>
// //                     <p className="product-price">฿{product.price}</p>
// //                   </CardFooter>
// //                 </Card>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //           <Pagination showControls total={totalPages} onChange={handlePageChange} className="custom-pagination" />
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default Homepage;
// // export default ProductList;


// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image, Input, Pagination, CheckboxGroup, Checkbox } from "@nextui-org/react";
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import './Homepage.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:3000/api/products")
//       .then((response) => response.json())
//       .then((data) => setProducts(data.products || []))
//       .catch((error) => console.error("Error fetching products:", error));

//     fetch("http://localhost:3000/api/categories")
//       .then((response) => response.json())
//       .then((data) => setCategories(data.categories || []))
//       .catch((error) => console.error("Error fetching categories:", error));
//   }, []);

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handleCardClick = (productId) => navigate(`/productdetail/${productId}`);
//   const handlePageChange = (page) => setCurrentPage(page);
//   const handleCategoryChange = (checkedValues) => setSelectedCategories(checkedValues);

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_id.toString());
//     return matchesSearch && matchesCategory;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="product-list-container">
//       <motion.div className="filter-sidebar" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//         <h3>Filter Products</h3>
//         <CheckboxGroup value={selectedCategories} onChange={handleCategoryChange}>
//           {categories.map((category) => (
//             <Checkbox key={category.value} value={category.value.toString()}>{category.label}</Checkbox>
//           ))}
//         </CheckboxGroup>
//       </motion.div>
      
//       <div className="product-grid">
//         <div className="grid-container">
//           {displayedProducts.map((product) => (
//             <motion.div key={product.product_id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Card isPressable shadow="sm" onPress={() => handleCardClick(product.product_id)} className="product-card">
//                 <CardBody>
//                   <Image className="product-image" alt={product.product_name} src={product.images_main || "https://via.placeholder.com/500x500"} width="100%" height="auto" radius="lg" />
//                 </CardBody>
//                 <CardFooter className="product-details">
//                   <h2 className="product-name">{product.product_name}</h2>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//         <div className="pagination-container">
//           <Pagination showControls total={totalPages} onChange={handlePageChange} />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductList;


import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Input, Pagination } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory
import './Homepage.css'; // นำเข้าไฟล์ CSS
// import {Select, SelectSection, SelectItem} from "@nextui-org/select";
// import {Image} from "@nextui-org/react";

const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // state สำหรับหมวดหมู่
  const [selectedCategories, setSelectedCategories] = useState([]); // state สำหรับหมวดหมู่ที่เลือก
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

  // ฟังก์ชันดึงข้อมูลจาก API
  // useEffect(() => {
  //   // ดึงข้อมูลสินค้าจาก API
  //   fetch("http://localhost:3000/api/products") 
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
  //       setProducts(data);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));

  //   // ดึงข้อมูลหมวดหมู่จาก API
  //   fetch("http://localhost:3000/api/categories") 
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
  //       setCategories(data);
  //     })
  //     .catch((error) => console.error("Error fetching categories:", error));
  // }, []);
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories || []))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);


  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleCardClick = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues); // อัพเดตค่าหมวดหมู่ที่เลือก
  };

  // คำนวณรายการสินค้าสำหรับแต่ละหน้า
  const filteredProducts = products.filter((product) => {
    const productName = product.name ?? ''; // ป้องกัน undefined/null
    const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_name);
    return matchesSearch && matchesCategory;
  });
  
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="product-list-container">
      {/* Sidebar Filter */}
      <div className="filter-sidebar sticky top-0 h-screen overflow-auto">
        <h3 className="text-xl font-bold mb-4">Filter Products</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-3">หมวดหมู่สินค้า</label>
            <CheckboxGroup 
              value={selectedCategories} 
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <Checkbox key={category.value} value={category.value.toString()}>{category.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 border rounded px-3 py-2"
                placeholder="Min"
              />
              <input
                type="number"
                className="w-1/2 border rounded px-3 py-2"
                placeholder="Max"
              />
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
          <button
            type="button"
            className="apply-filters-btn"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        <h1 className="text-2xl font-bold mb-4">
          {categories.length > 0 ? categories[0].name : "ไม่มีหมวดหมู่"}
        </h1>
        
        {/* ฟอร์มการค้นหาสินค้า */}
        {/* <div className="search-container mb-4">
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            isClearable
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            label="ค้นหา"
            placeholder="ค้นหารายการสินค้า..."
            radius="lg"
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div> */}

        <div className="grid-container">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Card
                key={product.id}
                isPressable
                shadow="sm"
                onPress={() => handleCardClick(product.product_id)} // เรียกใช้ฟังก์ชันเมื่อคลิก
                className="product-card"
              >
                <CardBody className="overflow-hidden p-0">
                  <Image
                    isZoomed
                    alt={product.product_name}
                    className="product-image"
                    src={`http://localhost:3000/products/${product.images_main}` || "https://via.placeholder.com/500x500"}
                    width="100%"
                    height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
                    radius="lg"
                  />
                </CardBody>

                <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
                  <div className="product-details text-center">
                    <h2 className="product-name">{product.product_name}</h2>
                    <p className="product-category">{product.category_name}</p>
                  </div>

                  <div className="product-status mt-2">
                    <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
                      {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>ไม่มีสินค้าในขณะนี้</p>
          )}
        </div>

        {/* Pagination */}
        <br></br>
        <div className="pagination-container mt-4 flex justify-center">
          <Pagination
            showControls
            initialPage={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
