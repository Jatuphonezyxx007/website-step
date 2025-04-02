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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import logo from '../../assets/logo/step-solutions-logo.png';
import './Navbar.css';

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        console.log('API Response:', response.data);
        
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error('❌ Unexpected API response format:', response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error('❌ Failed to fetch categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  const handleAccountClick = () => {
    navigate('/admin/signin');
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
              <input type="text" placeholder="ค้นหาสินค้า" className="search-input" />
            </div>

            <div className="hidden-mobile">
              <Dropdown>
                <DropdownTrigger>
                  <div className="category-icon">
                    <Squares2X2Icon className="w-8 h-8 text-gray-600" />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="หมวดหมู่สินค้า">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <DropdownItem
                        key={category.id}
                        className="category-item"
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        {category.name}
                      </DropdownItem>
                    ))
                  ) : (
                    <DropdownItem disabled>ไม่มีหมวดหมู่สินค้า</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* ปุ่มบัญชี -> ไปที่ /admin/login */}
          <div 
            className="profile-icon hidden-mobile" 
            onClick={handleAccountClick} 
            style={{ cursor: "pointer" }}
          >
            <Avatar isBordered>
              <UserIcon className="w-10 h-10 text-gray-500" />
            </Avatar>
          </div>
        </div>
      </motion.nav>

      {/* Bottom Navbar for Mobile Only */}
      <div className="bottom-navbar">
        <Link to="/" className="bottom-navbar-item active">
          <HomeIcon className="w-6 h-6" />
          <span>หน้าแรก</span>
        </Link>
        <Link to="/categories" className="bottom-navbar-item">
          <Squares2X2Icon className="w-6 h-6" />
          <span>หมวดหมู่</span>
        </Link>
        <Link to="/customize" className="bottom-navbar-item">
          <WrenchScrewdriverIcon className="w-6 h-6" />
          <span>จัดสเปกคอม</span>
        </Link>
        <Link to="/cart" className="bottom-navbar-item">
          <ShoppingBagIcon className="w-6 h-6" />
          <span>ตะกร้า</span>
        </Link>
        <Link to="/admin/signin" className="bottom-navbar-item">
          <UserIcon className="w-6 h-6" />
          <span>บัญชี</span>
        </Link>
      </div>
    </>
  );
}
