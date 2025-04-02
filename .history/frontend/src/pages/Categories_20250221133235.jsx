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








import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Image, Input, Pagination } from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate แทน useHistory
import './Categories.css'; // นำเข้าไฟล์ CSS
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
  const itemsPerPage = 6;
  const navigate = useNavigate(); // ใช้ useNavigate แทน useHistory

  // ฟังก์ชันดึงข้อมูลจาก API
  useEffect(() => {
    // ดึงข้อมูลสินค้าจาก API
    fetch("http://localhost:3000/api/products") 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // ดึงข้อมูลหมวดหมู่จาก API
    fetch("http://localhost:3000/api/categories") 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // ตรวจสอบข้อมูลที่ได้จาก API
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
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
                <Checkbox key={category.id} value={category.name}>
                  {category.name}
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
        <div className="search-container mb-4">
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
        </div>

        <div className="grid-container">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <Card
                key={product.id}
                isPressable
                shadow="sm"
                onPress={() => handleCardClick(product.id)} // เรียกใช้ฟังก์ชันเมื่อคลิก
                className="product-card"
              >
                <CardBody className="overflow-hidden p-0">
                  <Image
                    isZoomed
                    alt={product.name}
                    className="product-image"
                    src={`/products${product.image_path}` || "https://via.placeholder.com/500x500"}
                    width="100%"
                    height="100%" // เปลี่ยนให้ความสูงเป็นเต็ม
                    radius="lg"
                  />
                </CardBody>

                <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
                  <div className="product-details text-center">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">
                      ฿ {(parseFloat(product.price) || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
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
