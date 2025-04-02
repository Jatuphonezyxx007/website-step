// // import React, { useEffect, useState } from "react";
// // import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// // const ProductList = () => {
// //   const [products, setProducts] = useState([]);

// //   // ฟังก์ชันดึงข้อมูลจาก API
// //   useEffect(() => {
// //     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
// //       .then((response) => response.json())
// //       .then((data) => setProducts(data))
// //       .catch((error) => console.error("Error fetching products:", error));
// //   }, []);

// //   return (
// //     <>
// //     <div className="container flex gap-8">
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold mb-4">Product List</h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {products.map((product) => (
// //           <div
// //             key={product.id}
// //             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
// //           >
// // <img
// //   src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
// //   alt={product.name}
// //   className="w-full h-48 object-cover rounded-lg shadow-md"
// // />

// //             <h2 className="text-lg font-semibold">{product.name}</h2>
// //             <p className="text-sm text-gray-500">{product.category_name}</p>
// //             <p className="font-bold text-lg mt-2">฿{product.price}</p>
// //             <p className="text-sm text-gray-700 mt-1">{product.screen_size}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //     </div>
// //     </>
// //   );

// // };

// // export default ProductList;


// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   // ฟังก์ชันดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   return (
//     <>
//       <div className="container flex flex-col gap-8">
//       <div className="w-1/4 p-4 border rounded shadow-md bg-white">
//                     <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//                     <form>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium mb-2">Category</label>
//                             <select className="w-full border rounded px-3 py-2">
//                                 <option value="">All Categories</option>
//                                 <option value="Category1">Category 1</option>
//                                 <option value="Category2">Category 2</option>
//                             </select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium mb-2">Price Range</label>
//                             <div className="flex gap-2">
//                                 <input
//                                     type="number"
//                                     className="w-1/2 border rounded px-3 py-2"
//                                     placeholder="Min"
//                                 />
//                                 <input
//                                     type="number"
//                                     className="w-1/2 border rounded px-3 py-2"
//                                     placeholder="Max"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium mb-2">Status</label>
//                             <select className="w-full border rounded px-3 py-2">
//                                 <option value="">All Statuses</option>
//                                 <option value="In Stock">In Stock</option>
//                                 <option value="Out of Stock">Out of Stock</option>
//                             </select>
//                         </div>
//                         <button
//                             type="button"
//                             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//                         >
//                             Apply Filters
//                         </button>
//                     </form>
//                 </div>

//       <div className="w-3/4">
//         {/* <div className="p-6"> */}
//           <h1 className="text-2xl font-bold mb-4">Product List</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <Card
//                 key={product.id}
//                 isPressable
//                 shadow="sm"
//                 onPress={() => console.log("item pressed")}
//                 className="max-w-full bg-white rounded-lg hover:shadow-lg transition-all"
//               >
//                 <CardBody className="overflow-hidden p-0">
//                   <Image
//                     alt={product.name}
//                     className="w-full object-cover h-64 rounded-lg shadow-md"
//                     src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//                     width="100%"
//                     height="100%"
//                     radius="lg"
//                   />
//                 </CardBody>
//                 <CardFooter className="text-small justify-between p-4">
//                   <div>
//                     <h2 className="text-lg font-semibold">{product.name}</h2>
//                     <p className="text-sm text-gray-500">{product.category_name}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold text-lg">฿{product.price}</p>
//                     <p className="text-sm text-gray-700">{product.screen_size}</p>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;




// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
// // import {Input} from "@nextui-org/input";
// import {Input} from "@nextui-org/react";
// import './ProductList.css'; // นำเข้าไฟล์ CSS

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   // ฟังก์ชันดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);
  

  

//   return (
//     <>
//       <div className="product-list-container">
//         <div className="filter-sidebar">
//           <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//           <form>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select className="w-full border rounded px-3 py-2">
//                 <option value="">All Categories</option>
//                 <option value="Category1">Category 1</option>
//                 <option value="Category2">Category 2</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Price Range</label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   className="w-1/2 border rounded px-3 py-2"
//                   placeholder="Min"
//                 />
//                 <input
//                   type="number"
//                   className="w-1/2 border rounded px-3 py-2"
//                   placeholder="Max"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Status</label>
//               <select className="w-full border rounded px-3 py-2">
//                 <option value="">All Statuses</option>
//                 <option value="In Stock">In Stock</option>
//                 <option value="Out of Stock">Out of Stock</option>
//               </select>
//             </div>
//             <button
//               type="button"
//               className="apply-filters-btn"
//             >
//               Apply Filters
//             </button>
//           </form>
//         </div>

//         <div className="product-grid">
//           <h1 className="text-2xl font-bold mb-4">กลุ่มลิงก์และโปรไฟล์</h1>



// // ส่วนของการเพิ่ม Input สำหรับค้นหาสินค้า
          

          
//           <div className="grid-container">
//             {products.map((product) => (
//               <Card
//   key={product.id}
//   isPressable
//   shadow="sm"
//   onPress={() => console.log("item pressed")}
//   className="product-card"
// >
//   <CardBody className="overflow-hidden p-0">
//     <Image
//       alt={product.name}
//       className="product-image"
//       src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//       width="100%"
//       height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
//       radius="lg"
//     />
//   </CardBody>

//   <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
//     <div className="product-details text-center">
//       <h2 className="product-name">{product.name}</h2>
//       <p className="product-price">฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
//       <p className="product-category">{product.category_name}</p>
//     </div>

//     <div className="product-status mt-2">
//       <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
//         {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
//       </p>
//     </div>
//   </CardFooter>
// </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;



// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image, Input } from "@nextui-org/react";
// import './ProductList.css'; // นำเข้าไฟล์ CSS

// const SearchIcon = (props) => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="1em"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="1em"
//       {...props}
//     >
//       <path
//         d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//       <path
//         d="M22 22L20 20"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // ฟังก์ชันดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <>
//       <div className="product-list-container">
//         <div className="filter-sidebar">
//           <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//           <form>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select className="w-full border rounded px-3 py-2">
//                 <option value="">All Categories</option>
//                 <option value="Category1">Category 1</option>
//                 <option value="Category2">Category 2</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Price Range</label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   className="w-1/2 border rounded px-3 py-2"
//                   placeholder="Min"
//                 />
//                 <input
//                   type="number"
//                   className="w-1/2 border rounded px-3 py-2"
//                   placeholder="Max"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Status</label>
//               <select className="w-full border rounded px-3 py-2">
//                 <option value="">All Statuses</option>
//                 <option value="In Stock">In Stock</option>
//                 <option value="Out of Stock">Out of Stock</option>
//               </select>
//             </div>
//             <button
//               type="button"
//               className="apply-filters-btn"
//             >
//               Apply Filters
//             </button>
//           </form>
//         </div>

//         <div className="product-grid">
//           <h1 className="text-2xl font-bold mb-4">กลุ่มลิงก์และโปรไฟล์</h1>

//           {/* ฟอร์มการค้นหาสินค้า */}
//           <div className="search-container mb-4">
//             <Input
//               value={searchQuery}
//               onChange={handleSearchChange}
//               isClearable
//               classNames={{
//                 label: "text-black/50 dark:text-white/90",
//                 input: [
//                   "bg-transparent",
//                   "text-black/90 dark:text-white/90",
//                   "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//                 ],
//                 innerWrapper: "bg-transparent",
//                 inputWrapper: [
//                   "shadow-xl",
//                   "bg-default-200/50",
//                   "dark:bg-default/60",
//                   "backdrop-blur-xl",
//                   "backdrop-saturate-200",
//                   "hover:bg-default-200/70",
//                   "dark:hover:bg-default/70",
//                   "group-data-[focus=true]:bg-default-200/50",
//                   "dark:group-data-[focus=true]:bg-default/60",
//                   "!cursor-text",
//                 ],
//               }}
//               label="ค้นหา"
//               placeholder="ค้นหารายการสินค้า..."
//               radius="lg"
//               startContent={
//                 <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//               }
//             />
//           </div>

//           <div className="grid-container">
//             {products
//               .filter((product) =>
//                 product.name.toLowerCase().includes(searchQuery.toLowerCase())
//               )
//               .map((product) => (
//                 <Card
//                   key={product.id}
//                   isPressable
//                   shadow="sm"
//                   onPress={() => console.log("item pressed")}
//                   className="product-card"
//                 >
//                   <CardBody className="overflow-hidden p-0">
//                     <Image
//                       alt={product.name}
//                       className="product-image"
//                       src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//                       width="100%"
//                       height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
//                       radius="lg"
//                     />
//                   </CardBody>

//                   <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
//                     <div className="product-details text-center">
//                       <h2 className="product-name">{product.name}</h2>
//                       <p className="product-price">
//                         ฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                       </p>
//                       <p className="product-category">{product.category_name}</p>
//                     </div>

//                     <div className="product-status mt-2">
//                       <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
//                         {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
//                       </p>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;



// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image, Input } from "@nextui-org/react";
// import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory
// import './ProductList.css'; // นำเข้าไฟล์ CSS

// const SearchIcon = (props) => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="1em"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="1em"
//       {...props}
//     >
//       <path
//         d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//       <path
//         d="M22 22L20 20"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

//   // ฟังก์ชันดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
//         setProducts(data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCardClick = (productId) => {
//     // ใช้ navigate แทน history.push ใน React Router v6
//     navigate(`/productdetail/${productId}`);
//   };

//   return (
//     <>
//       <div className="product-list-container">
//         <div className="filter-sidebar">
//           <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//           <form>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select className="w-full border rounded px-3 py-2">
//                 <option value="">All Categories</option>
//                 <option value="Category1">Category 1</option>
//                 <option value="Category2">Category 2</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Price Range</label>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   className="w-1/2 border rounded px-3 py-2"
//                   placeholder="Min"
//                 />
//                 <input
//                   type="number"
//                   className="w-1/2 border rounded px-3 py-2"
//                   placeholder="Max"
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Status</label>
//               <select className="w-full border rounded px-3 py-2">
//                 <option value="">All Statuses</option>
//                 <option value="In Stock">In Stock</option>
//                 <option value="Out of Stock">Out of Stock</option>
//               </select>
//             </div>
//             <button
//               type="button"
//               className="apply-filters-btn"
//             >
//               Apply Filters
//             </button>
//           </form>
//         </div>

//         <div className="product-grid">
//           <h1 className="text-2xl font-bold mb-4">กลุ่มลิงก์และโปรไฟล์</h1>

//           {/* ฟอร์มการค้นหาสินค้า */}
//           <div className="search-container mb-4">
//             <Input
//               value={searchQuery}
//               onChange={handleSearchChange}
//               isClearable
//               classNames={{
//                 label: "text-black/50 dark:text-white/90",
//                 input: [
//                   "bg-transparent",
//                   "text-black/90 dark:text-white/90",
//                   "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//                 ],
//                 innerWrapper: "bg-transparent",
//                 inputWrapper: [
//                   "shadow-xl",
//                   "bg-default-200/50",
//                   "dark:bg-default/60",
//                   "backdrop-blur-xl",
//                   "backdrop-saturate-200",
//                   "hover:bg-default-200/70",
//                   "dark:hover:bg-default/70",
//                   "group-data-[focus=true]:bg-default-200/50",
//                   "dark:group-data-[focus=true]:bg-default/60",
//                   "!cursor-text",
//                 ],
//               }}
//               label="ค้นหา"
//               placeholder="ค้นหารายการสินค้า..."
//               radius="lg"
//               startContent={
//                 <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//               }
//             />
//           </div>

//           <div className="grid-container">
//             {products.length > 0 ? (
//               products
//                 .filter((product) =>
//                   product.name.toLowerCase().includes(searchQuery.toLowerCase())
//                 )
//                 .map((product) => (
//                   <Card
//                     key={product.id}
//                     isPressable
//                     shadow="sm"
//                     onPress={() => handleCardClick(product.id)} // เรียกใช้ฟังก์ชันเมื่อคลิก
//                     className="product-card"
//                   >
//                     <CardBody className="overflow-hidden p-0">
//                       <Image
//                         alt={product.name}
//                         className="product-image"
//                         src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//                         width="100%"
//                         height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
//                         radius="lg"
//                       />
//                     </CardBody>

//                     <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
//                       <div className="product-details text-center">
//                         <h2 className="product-name">{product.name}</h2>
//                         <p className="product-price">
//                           ฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                         </p>
//                         <p className="product-category">{product.category_name}</p>
//                       </div>

//                       <div className="product-status mt-2">
//                         <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
//                           {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
//                         </p>
//                       </div>
//                     </CardFooter>
//                   </Card>
//                 ))
//             ) : (
//               <p>ไม่มีสินค้าในขณะนี้</p> // แสดงข้อความเมื่อไม่มีสินค้า
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;




// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image, Input, Pagination } from "@nextui-org/react";
// import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory
// import './ProductList.css'; // นำเข้าไฟล์ CSS

// const SearchIcon = (props) => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="1em"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="1em"
//       {...props}
//     >
//       <path
//         d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//       <path
//         d="M22 22L20 20"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // กำหนดจำนวนสินค้าในแต่ละหน้า
//   const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

//   // ฟังก์ชันดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
//         setProducts(data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     setCurrentPage(1); // รีเซ็ตหน้าปัจจุบันเมื่อมีการค้นหา
//   };

//   const handleCardClick = (productId) => {
//     navigate(`/productdetail/${productId}`);
//   };

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const displayedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
//       <div className="product-list-container">
//         <div className="filter-sidebar">
//           <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//           <form>
//           <div className="mb-4">
//                             <label className="block text-sm font-medium mb-2">Category</label>
//                             <select className="w-full border rounded px-3 py-2">
//                                 <option value="">All Categories</option>
//                                 <option value="Category1">Category 1</option>
//                                 <option value="Category2">Category 2</option>
//                             </select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium mb-2">Price Range</label>
//                             <div className="flex gap-2">
//                                 <input
//                                     type="number"
//                                     className="w-1/2 border rounded px-3 py-2"
//                                     placeholder="Min"
//                                 />
//                                 <input
//                                     type="number"
//                                     className="w-1/2 border rounded px-3 py-2"
//                                     placeholder="Max"
//                                 />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium mb-2">Status</label>
//                             <select className="w-full border rounded px-3 py-2">
//                                 <option value="">All Statuses</option>
//                                 <option value="In Stock">In Stock</option>
//                                 <option value="Out of Stock">Out of Stock</option>
//                             </select>
//                         </div>
//                         <button
//                             type="button"
//                             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//                         >
//                             Apply Filters
//                         </button>
//           </form>
//         </div>

//         <div className="product-grid">
//           <h1 className="text-2xl font-bold mb-4">กลุ่มลิงก์และโปรไฟล์</h1>

//           {/* ฟอร์มการค้นหาสินค้า */}
//           <div className="search-container mb-4">
//             <Input
//               value={searchQuery}
//               onChange={handleSearchChange}
//               isClearable
//               classNames={{
//                 label: "text-black/50 dark:text-white/90",
//                 input: [
//                   "bg-transparent",
//                   "text-black/90 dark:text-white/90",
//                   "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//                 ],
//                 innerWrapper: "bg-transparent",
//                 inputWrapper: [
//                   "shadow-xl",
//                   "bg-default-200/50",
//                   "dark:bg-default/60",
//                   "backdrop-blur-xl",
//                   "backdrop-saturate-200",
//                   "hover:bg-default-200/70",
//                   "dark:hover:bg-default/70",
//                   "group-data-[focus=true]:bg-default-200/50",
//                   "dark:group-data-[focus=true]:bg-default/60",
//                   "!cursor-text",
//                 ],
//               }}
//               label="ค้นหา"
//               placeholder="ค้นหารายการสินค้า..."
//               radius="lg"
//               startContent={
//                 <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//               }
//             />
//           </div>

//           <div className="grid-container">
//             {displayedProducts.length > 0 ? (
//               displayedProducts.map((product) => (
//                 <Card
//                   key={product.id}
//                   isPressable
//                   shadow="sm"
//                   onPress={() => handleCardClick(product.id)}
//                   className="product-card"
//                 >
//                   <CardBody className="overflow-hidden p-0">
//                     <Image
//                       alt={product.name}
//                       className="product-image"
//                       src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//                       width="100%"
//                       height="100%"
//                       radius="lg"
//                     />
//                   </CardBody>

//                   <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
//                     <div className="product-details text-center">
//                       <h2 className="product-name">{product.name}</h2>
//                       <p className="product-price">
//                         ฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                       </p>
//                       <p className="product-category">{product.category_name}</p>
//                     </div>

//                     <div className="product-status mt-2">
//                       <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
//                         {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
//                       </p>
//                     </div>
//                   </CardFooter>
//                 </Card>
//               ))
//             ) : (
//               <p>ไม่มีสินค้าในขณะนี้</p>
//             )}
//           </div>

//           <div className="pagination-container mt-4">
//             <Pagination
//               showControls
//               initialPage={currentPage}
//               total={totalPages}
//               onChange={(page) => setCurrentPage(page)}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductList;





// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image, Input, Pagination } from "@nextui-org/react";
// import {CheckboxGroup, Checkbox} from "@nextui-org/react";
// import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory
// import './ProductList.css'; // นำเข้าไฟล์ CSS

// const SearchIcon = (props) => {
//   return (
//     <svg
//       aria-hidden="true"
//       fill="none"
//       focusable="false"
//       height="1em"
//       role="presentation"
//       viewBox="0 0 24 24"
//       width="1em"
//       {...props}
//     >
//       <path
//         d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//       <path
//         d="M22 22L20 20"
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//       />
//     </svg>
//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

//   // ฟังก์ชันดึงข้อมูลจาก API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/products") // เชื่อมต่อ API backend
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
//         setProducts(data);
//       })
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCardClick = (productId) => {
//     // ใช้ navigate แทน history.push ใน React Router v6
//     navigate(`/productdetail/${productId}`);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // คำนวณรายการสินค้าสำหรับแต่ละหน้า
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );
//   const totalItems = filteredProducts.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const displayedProducts = filteredProducts.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="product-list-container">
//       {/* Sidebar Filter */}
//       <div className="filter-sidebar sticky top-0 h-screen overflow-auto">
//         <h3 className="text-xl font-bold mb-4">Filter Products</h3>
//         <form>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">หมวดหมู่สินค้า</label>
//             <CheckboxGroup defaultValue={["buenos-aires", "london"]} label="เลือกหมวดหมู่สินค้า">
//               <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
//               <Checkbox value="sydney">Sydney</Checkbox>
//               <Checkbox value="san-francisco">San Francisco</Checkbox>
//               <Checkbox value="london">London</Checkbox>
//               <Checkbox value="tokyo">Tokyo</Checkbox>
//             </CheckboxGroup>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Price Range</label>
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 className="w-1/2 border rounded px-3 py-2"
//                 placeholder="Min"
//               />
//               <input
//                 type="number"
//                 className="w-1/2 border rounded px-3 py-2"
//                 placeholder="Max"
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Status</label>
//             <select className="w-full border rounded px-3 py-2">
//               <option value="">All Statuses</option>
//               <option value="In Stock">In Stock</option>
//               <option value="Out of Stock">Out of Stock</option>
//             </select>
//           </div>
//           <button
//             type="button"
//             className="apply-filters-btn"
//           >
//             Apply Filters
//           </button>
//         </form>
//       </div>

//       {/* Product Grid */}
//       <div className="product-grid">
//         <h1 className="text-2xl font-bold mb-4">กลุ่มลิงก์และโปรไฟล์</h1>

//         {/* ฟอร์มการค้นหาสินค้า */}
//         <div className="search-container mb-4">
//           <Input
//             value={searchQuery}
//             onChange={handleSearchChange}
//             isClearable
//             classNames={{
//               label: "text-black/50 dark:text-white/90",
//               input: [
//                 "bg-transparent",
//                 "text-black/90 dark:text-white/90",
//                 "placeholder:text-default-700/50 dark:placeholder:text-white/60",
//               ],
//               innerWrapper: "bg-transparent",
//               inputWrapper: [
//                 "shadow-xl",
//                 "bg-default-200/50",
//                 "dark:bg-default/60",
//                 "backdrop-blur-xl",
//                 "backdrop-saturate-200",
//                 "hover:bg-default-200/70",
//                 "dark:hover:bg-default/70",
//                 "group-data-[focus=true]:bg-default-200/50",
//                 "dark:group-data-[focus=true]:bg-default/60",
//                 "!cursor-text",
//               ],
//             }}
//             label="ค้นหา"
//             placeholder="ค้นหารายการสินค้า..."
//             radius="lg"
//             startContent={
//               <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
//             }
//           />
//         </div>

//         <div className="grid-container">
//           {displayedProducts.length > 0 ? (
//             displayedProducts.map((product) => (
//               <Card
//                 key={product.id}
//                 isPressable
//                 shadow="sm"
//                 onPress={() => handleCardClick(product.id)} // เรียกใช้ฟังก์ชันเมื่อคลิก
//                 className="product-card"
//               >
//                 <CardBody className="overflow-hidden p-0">
//                   <Image
//                     alt={product.name}
//                     className="product-image"
//                     src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
//                     width="100%"
//                     height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
//                     radius="lg"
//                   />
//                 </CardBody>

//                 <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
//                   <div className="product-details text-center">
//                     <h2 className="product-name">{product.name}</h2>
//                     <p className="product-price">
//                       ฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//                     </p>
//                     <p className="product-category">{product.category_name}</p>
//                   </div>

//                   <div className="product-status mt-2">
//                     <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
//                       {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
//                     </p>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))
//           ) : (
//             <p>ไม่มีสินค้าในขณะนี้</p> // แสดงข้อความเมื่อไม่มีสินค้า
//           )}
//         </div>

//         {/* Pagination */}
//         <br></br>
//         <div className="pagination-container mt-4 flex justify-center">
//           <Pagination
//             showControls
//             initialPage={currentPage}
//             total={totalPages}
//             onChange={handlePageChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductList;






import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, Image, Input, Pagination } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory
import './ProductList.css'; // นำเข้าไฟล์ CSS
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
            <label className="block text-sm font-medium mb-2">หมวดหมู่สินค้า</label>
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
