// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import {Avatar} from "@nextui-org/avatar";

// import Logo from "../../assets/logo/step-solutions-logo.jpg";

// const Navbar = () => {

    
//     return (
//         <nav className="navbar">
//             <div className="logo">
//                 <Link to="/">
//                 <img src={Logo} alt="Logo" />
//                 </Link>
//             </div>
//             {/* กลุ่มลิงก์และโปรไฟล์ */}
//             <div className="navbar-right">
//                 <ul className="navbar-links">
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/about">About</Link></li>
//                     <li><Link to="/services">Services</Link></li>
//                     <li><Link to="/contact">Contact</Link></li>
//                 </ul>
//                 {/* ไอคอนโปรไฟล์ */}
//                 <div className="profile-icon">
//                     <Link to="/profile">
//                     <Avatar isBordered color="danger" src="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/Charlie_Puth_-_Publicity_01_-_07-30-19_akni02/charlie-puth-new-single-i-warned-myself-benny-blanco.jpg" alt="Profile" />
//                         {/* <img src="https://thefader-res.cloudinary.com/private_images/w_760,c_limit,f_auto,q_auto:best/Charlie_Puth_-_Publicity_01_-_07-30-19_akni02/charlie-puth-new-single-i-warned-myself-benny-blanco.jpg" alt="Profile" /> */}
//                     </Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import logo from '../../assets/logo/step-solutions-logo.png';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-logo">
//           <Link to="/">
//             <img src={logo} alt="Step Solutions Logo" />
//           </Link>
//         </div>

//         <div className="category-button">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//           <span>หมวดหมู่สินค้า</span>
//         </div>

//         <div className="search-bar">
//           <input type="text" placeholder="ค้นหาสินค้า" />
//         </div>

//         <div className="navbar-links">
//           <Link to="/" className="navbar-link active">
//             หน้าแรก
//           </Link>
//           <Link to="/computers" className="navbar-link">
//             คอมพิวเตอร์เซ็ต
//           </Link>
//           <Link to="/accessories" className="navbar-link">
//             อุปกรณ์คอม
//           </Link>
//           <Link to="/blog" className="navbar-link">
//             บทความ
//           </Link>
//           <Link to="/contact" className="navbar-link">
//             ติดต่อเรา
//           </Link>
//         </div>

//         <div className="profile-icon">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>
//         </div>
//       </div>
//     </nav>
//   );
// }



// // src/components/Navbar/Navbar.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   HomeIcon,
//   Squares2X2Icon,
//   WrenchScrewdriverIcon,
//   ShoppingBagIcon,
//   MagnifyingGlassIcon,
//   UserIcon,
// } from '@heroicons/react/24/outline';
// import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
// import logo from '../../assets/logo/step-solutions-logo.png';
// import './Navbar.css';

// export default function Navbar() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/categories');
//         console.log('API Response:', response.data);
        
//         // ตรวจสอบว่าข้อมูลที่ได้เป็น array หรือไม่
//         if (Array.isArray(response.data)) {
//           setCategories(response.data);
//         } else if (Array.isArray(response.data.categories)) {
//           setCategories(response.data.categories);
//         } else {
//           console.error('❌ Unexpected API response format:', response.data);
//           setCategories([]);
//         }
//       } catch (error) {
//         console.error('❌ Failed to fetch categories:', error);
//         setCategories([]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategorySelect = (categoryId) => {
//     navigate(`/categories/${categoryId}`);
//   };

//   return (
//     <>
//       <motion.nav
//         className="navbar"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//       >
//         <div className="navbar-container">
//           <div className="navbar-left">
//             <Link to="/" className="navbar-logo">
//               <motion.img
//                 src={logo}
//                 alt="Step Solutions Logo"
//                 className="logo-image"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               />
//             </Link>
//           </div>

//           <div className="search-bar-container">
//             <div className="search-bar">
//               <MagnifyingGlassIcon className="search-icon" />
//               <input type="text" placeholder="ค้นหาสินค้า" className="search-input" />
//             </div>

//             <div className="hidden-mobile">
//               <Dropdown>
//                 <DropdownTrigger>
//                   <div className="category-icon">
//                     <Squares2X2Icon className="w-8 h-8 text-gray-600" />
//                   </div>
//                 </DropdownTrigger>
//                 <DropdownMenu aria-label="หมวดหมู่สินค้า">
//                   {categories.length > 0 ? (
//                     categories.map((category) => (
//                       <DropdownItem
//                         key={category.id}
//                         className="category-item"
//                         onClick={() => handleCategorySelect(category.id)}
//                       >
//                         {category.name}
//                       </DropdownItem>
//                     ))
//                   ) : (
//                     <DropdownItem disabled>ไม่มีหมวดหมู่สินค้า</DropdownItem>
//                   )}
//                 </DropdownMenu>
//               </Dropdown>
//             </div>
//           </div>

//           <div className="profile-icon hidden-mobile">
//             <Avatar isBordered>
//               <UserIcon className="w-10 h-10 text-gray-500" />
//             </Avatar>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Bottom Navbar for Mobile Only */}
//       <div className="bottom-navbar">
//         <Link to="/" className="bottom-navbar-item active">
//           <HomeIcon className="w-6 h-6" />
//           <span>หน้าแรก</span>
//         </Link>
//         <Link to="/categories" className="bottom-navbar-item">
//           <Squares2X2Icon className="w-6 h-6" />
//           <span>หมวดหมู่</span>
//         </Link>
//         <Link to="/customize" className="bottom-navbar-item">
//           <WrenchScrewdriverIcon className="w-6 h-6" />
//           <span>จัดสเปกคอม</span>
//         </Link>
//         <Link to="/cart" className="bottom-navbar-item">
//           <ShoppingBagIcon className="w-6 h-6" />
//           <span>ตะกร้า</span>
//         </Link>
//         <Link to="/user-circle" className="bottom-navbar-item">
//           <UserIcon className="w-6 h-6" />
//           <span>บัญชี</span>
//         </Link>
//       </div>
//     </>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   HomeIcon,
//   Squares2X2Icon,
//   WrenchScrewdriverIcon,
//   ShoppingBagIcon,
//   MagnifyingGlassIcon,
//   UserIcon,
// } from '@heroicons/react/24/outline';
// // import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

// import {Avatar, Autocomplete, AutocompleteItem, Button} from "@heroui/react";

// import logo from '../../assets/logo/step-solutions-logo.png';
// import './Navbar.css';


// const SelectorIcon = (props) => (
//   <svg
//     aria-hidden="true"
//     fill="none"
//     focusable="false"
//     height="1em"
//     role="presentation"
//     stroke="currentColor"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth="1.5"
//     viewBox="0 0 24 24"
//     width="1em"
//     {...props}
//   >
//     <path d="M0 0h24v24H0z" fill="none" stroke="none" />
//     <path d="M8 9l4 -4l4 4" />
//     <path d="M16 15l-4 4l-4 -4" />
//   </svg>
// );


// export default function Navbar() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/categories");
//         console.log("API Response:", response.data);
//         if (Array.isArray(response.data)) {
//           setCategories(response.data);
//         } else if (Array.isArray(response.data.categories)) {
//           setCategories(response.data.categories);
//         } else {
//           console.error("❌ Unexpected API response format:", response.data);
//           setCategories([]);
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch categories:", error);
//         setCategories([]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <>
//       <motion.nav
//         className="navbar"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//       >
//         <div className="navbar-container">
//           <div className="navbar-left">
//             <Link to="/" className="navbar-logo">
//               <motion.img
//                 src={logo}
//                 alt="Step Solutions Logo"
//                 className="logo-image"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               />
//             </Link>
//           </div>

//           <div className="search-bar-container">
//             <div className="search-bar">
//               <MagnifyingGlassIcon className="search-icon" />
//               <input type="text" placeholder="ค้นหาสินค้า" className="search-input" />
//             </div>

//             <div className="hidden-mobile">
//             <Autocomplete
//   disableSelectorIconRotation
//   className="max-w-xs"
//   defaultItems={categories
//     .filter(cat => cat.id !== undefined && cat.id !== null)
//     .map((cat) => ({ key: cat.id.toString(), label: cat.name }))}
//     label="หมวดหมู่สินค้า"
//   labelPlacement="outside"
//   placeholder="ค้นหาหมวดหมู่"
//   selectorIcon={<SelectorIcon />}
//   onSelectionChange={(key) => {
//     const selectedCategory = categories.find((cat) => cat.id.toString() === key);
//     if (selectedCategory) {
//       navigate(`/categories/${selectedCategory.id}`);
//     }
//   }}
// >
//   {(category) => (
//     <AutocompleteItem key={category.key} textValue={category.label}>
//       {category.label}
//     </AutocompleteItem>
//   )}
// </Autocomplete>
//           </div>
//         </div>

//           {/* ปุ่มบัญชี -> ไปที่ /admin/login */}
//           {/* <div 
//             className="profile-icon hidden-mobile" 
//             onClick={handleAccountClick} 
//             style={{ cursor: "pointer" }}
//           >
//             <Avatar isBordered>
//               <UserIcon className="w-10 h-10 text-gray-500" />
//             </Avatar>
//           </div> */}
//         </div>
//       </motion.nav>

//       {/* Bottom Navbar for Mobile Only */}
//       <div className="bottom-navbar">
//         <Link to="/" className="bottom-navbar-item active">
//           <HomeIcon className="w-6 h-6" />
//           <span>หน้าแรก</span>
//         </Link>
//         <Link to="/categories" className="bottom-navbar-item">
//           <Squares2X2Icon className="w-6 h-6" />
//           <span>หมวดหมู่</span>
//         </Link>
//         <Link to="/customize" className="bottom-navbar-item">
//           <WrenchScrewdriverIcon className="w-6 h-6" />
//           <span>จัดสเปกคอม</span>
//         </Link>
//         <Link to="/cart" className="bottom-navbar-item">
//           <ShoppingBagIcon className="w-6 h-6" />
//           <span>ตะกร้า</span>
//         </Link>
//         <Link to="/admin/login" className="bottom-navbar-item">
//           <UserIcon className="w-6 h-6" />
//           <span>บัญชี</span>
//         </Link>
//       </div>
//     </>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   HomeIcon,
//   Squares2X2Icon,
//   WrenchScrewdriverIcon,
//   ShoppingBagIcon,
//   MagnifyingGlassIcon,
//   UserIcon,
// } from '@heroicons/react/24/outline';

// import { Avatar, Button } from "@heroui/react";
// import Selects from "../forms/Selects";
// import logo from '../../assets/logo/step-solutions-logo.png';
// import './Navbar.css';

// export default function Navbar() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/categories");
//         console.log("API Response:", response.data);
//         if (Array.isArray(response.data.categories)) {
//           setCategories(response.data.categories);
//         } else {
//           console.error("❌ Unexpected API response format:", response.data);
//           setCategories([]);
//         }
//       } catch (error) {
//         console.error("❌ Failed to fetch categories:", error);
//         setCategories([]);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryChange = (event) => {
//     const value = event.target.value;
//     setSelectedCategory(value);
//     navigate(`/categories/${value}`);
//   };

//   return (
//     <>
//       <motion.nav
//         className="navbar"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//       >
//         <div className="navbar-container">
//           <div className="navbar-left">
//             <Link to="/" className="navbar-logo">
//               <motion.img
//                 src={logo}
//                 alt="Step Solutions Logo"
//                 className="logo-image"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               />
//             </Link>
//           </div>

//           <div className="search-bar-container">
//             <div className="search-bar">
//               <MagnifyingGlassIcon className="search-icon" />
//               <input type="text" placeholder="ค้นหาสินค้า" className="search-input" />
//             </div>
            
//             <Selects
//               categories={categories}
//               selectedCategory={selectedCategory}
//               onCategoryChange={handleCategoryChange}
//             />
//           </div>
          
//           <div className="profile-icon hidden-mobile gap-5">
//             <Avatar isBordered>
//               <UserIcon className="w-10 h-10 text-gray-500" />
//               </Avatar>
//               </div>


//         </div>
//       </motion.nav>

//       <div className="bottom-navbar">
//         <Link to="/" className="bottom-navbar-item active">
//           <HomeIcon className="w-6 h-6" />
//           <span>หน้าแรก</span>
//         </Link>
//         <Link to="/categories" className="bottom-navbar-item">
//           <Squares2X2Icon className="w-6 h-6" />
//           <span>หมวดหมู่</span>
//         </Link>
//         <Link to="/customize" className="bottom-navbar-item">
//           <WrenchScrewdriverIcon className="w-6 h-6" />
//           <span>จัดสเปกคอม</span>
//         </Link>
//         <Link to="/cart" className="bottom-navbar-item">
//           <ShoppingBagIcon className="w-6 h-6" />
//           <span>ตะกร้า</span>
//         </Link>
//         <Link to="/admin/login" className="bottom-navbar-item">
//           <UserIcon className="w-6 h-6" />
//           <span>บัญชี</span>
//         </Link>
//       </div>
//     </>
//   );
// }



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   HomeIcon,
//   Squares2X2Icon,
//   WrenchScrewdriverIcon,
//   ShoppingBagIcon,
//   MagnifyingGlassIcon,
//   UserIcon,
// } from '@heroicons/react/24/outline';

// import { Avatar, Button } from "@heroui/react";
// import Selects from "../forms/Selects";
// import logo from '../../assets/logo/step-solutions-logo.png';
// import './Navbar.css';

// export default function Navbar() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const navigate = useNavigate();

//   const handleCategoryChange = (value) => {
//     console.log("📌 Category selected in Navbar:", value);
//     setSelectedCategory(value);
//     navigate(`/categories/${value}`);
//   };

//   return (
//     <>
//       <motion.nav
//         className="navbar"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, ease: 'easeOut' }}
//       >
//         <div className="navbar-container">
//           <div className="navbar-left">
//             <Link to="/" className="navbar-logo">
//               <motion.img
//                 src={logo}
//                 alt="Step Solutions Logo"
//                 className="logo-image"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               />
//             </Link>
//           </div>

//           <div className="search-bar-container">
//             <div className="search-bar">
//               <MagnifyingGlassIcon className="search-icon" />
//               <input type="text" placeholder="ค้นหาสินค้า" className="search-input" />
//             </div>
            
//             {/* <Selects
//               selectedCategory={selectedCategory}
//               onCategoryChange={handleCategoryChange}
//             /> */}
//           </div>

//           <div className="profile-icon hidden-mobile gap-5">
//             <Avatar isBordered>
//               <UserIcon className="w-10 h-10 text-gray-500" />
//             </Avatar>
//           </div>
//         </div>
//       </motion.nav>

//       <div className="bottom-navbar">
//         <Link to="/" className="bottom-navbar-item active">
//           <HomeIcon className="w-6 h-6" />
//           <span>หน้าแรก</span>
//         </Link>
//         <Link to="/categories" className="bottom-navbar-item">
//           <Squares2X2Icon className="w-6 h-6" />
//           <span>หมวดหมู่</span>
//         </Link>
//         <Link to="/customize" className="bottom-navbar-item">
//           <WrenchScrewdriverIcon className="w-6 h-6" />
//           <span>จัดสเปกคอม</span>
//         </Link>
//         <Link to="/cart" className="bottom-navbar-item">
//           <ShoppingBagIcon className="w-6 h-6" />
//           <span>ตะกร้า</span>
//         </Link>
//         <Link to="/admin/login" className="bottom-navbar-item">
//           <UserIcon className="w-6 h-6" />
//           <span>บัญชี</span>
//         </Link>
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  Squares2X2Icon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { Avatar } from "@heroui/react";
import logo from '../../assets/logo/step-solutions-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetch(`http://localhost:3000/api/products/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.products || []))
        .catch((error) => console.error("Error fetching search results:", error));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResultClick = (productId) => {
    navigate(`/product-detail/${productId}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <motion.img
                src={logo}
                alt="Step Solutions Logo"
                className="logo-image"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </Link>
          </div>

          <div className="search-bar-container">
            <div className="search-bar">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li
                    key={product.product_id}
                    className="search-result-item"
                    onClick={() => handleResultClick(product.product_id)}
                  >
                    {product.product_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.nav>

      {/* <div className="bottom-navbar">
        <Link to="/" className="bottom-navbar-item active">
          <HomeIcon className="w-6 h-6" />
          <span>หน้าแรก</span>
        </Link>
        <Link to="/categories" className="bottom-navbar-item">
          <Squares2X2Icon className="w-6 h-6" />
          <span>หมวดหมู่</span>
        </Link>
      </div> */}
      // Navbar.jsx
<div className="bottom-navbar">
  <Link to="/" className="bottom-navbar-item active">
    <HomeIcon className="w-6 h-6" />
    <span>หน้าแรก</span>
  </Link>
  <Link to="/categories" className="bottom-navbar-item">
    <Squares2X2Icon className="w-6 h-6" />
    <span>หมวดหมู่</span>
  </Link>
  {/* เพิ่มปุ่มสำหรับเปิดแถบ filter ในหน้าจอเล็ก */}
  <button className="bottom-navbar-item" onClick={() => setIsFilterOpen(!isFilterOpen)}>
    <WrenchScrewdriverIcon className="w-6 h-6" />
    <span>Filter</span>
  </button>
</div>
    </>
  );
}
