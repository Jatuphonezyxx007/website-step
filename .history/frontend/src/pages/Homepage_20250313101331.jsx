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




// import React, { useEffect, useState } from 'react';
// import './Homepage.css';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { Card, CardBody, CardFooter, Image, Pagination, CheckboxGroup, Checkbox } from "@nextui-org/react";

// const Homepage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [sortOption, setSortOption] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

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

//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/categories');
//         if (response.data.success) {
//           setCategories(response.data.categories);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const handlePageChange = (page) => setCurrentPage(page);
//   const handleCategoryChange = (checkedValues) => setSelectedCategories(checkedValues);

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortOption === "priceLowHigh") return a.price - b.price;
//     if (sortOption === "priceHighLow") return b.price - a.price;
//     if (sortOption === "nameAsc") return a.product_name.localeCompare(b.product_name);
//     if (sortOption === "nameDesc") return b.product_name.localeCompare(a.product_name);
//     return 0;
//   });

//   const filteredProducts = sortedProducts.filter((product) => {
//     const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_id.toString());
//     return matchesCategory;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <motion.div className="homepage-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//       <div className="product-list-container">
//         <motion.div className="filter-sidebar" initial={{ x: -50 }} animate={{ x: 0 }} transition={{ duration: 0.3 }}>
//           <h3>Filter Products</h3>
//           <CheckboxGroup value={selectedCategories} onChange={handleCategoryChange}>
//             {categories.map((category) => (
//               <Checkbox key={category.value} value={category.value.toString()}>{category.label}</Checkbox>
//             ))}
//           </CheckboxGroup>
//         </motion.div>
//         <div className="product-grid">
//           <motion.div className="grid-container" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
//             {displayedProducts.map((product) => (
//               <motion.div key={product.product_id} whileHover={{ scale: 1.1, boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
//                 <Card isPressable shadow="sm">
//                   <CardBody>
//                     <Image alt={product.product_name} src={product.images_main || "https://via.placeholder.com/500x500"} width="100%" height="auto" radius="lg" />
//                   </CardBody>
//                   <CardFooter>
//                     <h2 className="product-name">{product.product_name}</h2>
//                     <p className="product-price">฿{product.price}</p>
//                   </CardFooter>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//           <Pagination showControls total={totalPages} onChange={handlePageChange} className="custom-pagination" />
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Homepage;
// export default ProductList;
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Input, Pagination, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const SearchIcon = (props) => (
  <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

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

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCardClick = (productId) => navigate(`/productdetail/${productId}`);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleCategoryChange = (checkedValues) => setSelectedCategories(checkedValues);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_id.toString());
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="product-list-container">
      <div className="filter-sidebar">
        <h3>Filter Products</h3>
        <CheckboxGroup value={selectedCategories} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <Checkbox key={category.value} value={category.value.toString()}>{category.label}</Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <div className="product-grid">
        <Input value={searchQuery} onChange={handleSearchChange} placeholder="ค้นหารายการสินค้า..." startContent={<SearchIcon />} />
        <div className="grid-container">
          {displayedProducts.map((product) => (
            <Card key={product.product_id} isPressable shadow="sm" onPress={() => handleCardClick(product.product_id)}>
              <CardBody>
                <Image alt={product.product_name} src={product.images_main || "https://via.placeholder.com/500x500"} width="100%" height="auto" radius="lg" />
              </CardBody>
              <CardFooter>
                <h2>{product.product_name}</h2>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Pagination showControls total={totalPages} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ProductList;