// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Categories.css';

export default function Categories() {
  const { categoryId } = useParams();
  const [categoryInfo, setCategoryInfo] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/category/${categoryId}`),
          axios.get(`http://localhost:5000/api/products/${categoryId}`),
        ]);

        setCategoryInfo(categoryResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('❌ Failed to fetch category data:', error);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  return (
    <div className="categories-page-container">
      <div className="category-header">
        <img
          src={`http://localhost:5000/images/categories/${categoryInfo.img_cate}` ||
            'https://via.placeholder.com/500x300'}
          alt={categoryInfo.name}
          className="category-banner"
        />
        <h1 className="category-title text-start">{categoryInfo.name}</h1>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`http://localhost:5000/images/products/${product.image_filename}${product.file_extension}` ||
                'https://via.placeholder.com/500x500'}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">฿{product.price}</p>
            <p className="product-status">
              {product.status === 'in_stock' ? 'พร้อมจำหน่าย' : 'สินค้าหมด'}
            </p>
            <button className="product-button">ดูรายละเอียด</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* โครงสร้างไฟล์รูปภาพ */
// backend/uploads/categories/ ชื่อไฟล์รูปภาพหมวดหมู่ (เช่น electronics.webp)
// backend/uploads/products/ ชื่อไฟล์รูปภาพสินค้า (เช่น product1.jpg)

/* เส้นทาง API ใน server.js ควรเสิร์ฟ static files แบบนี้ */
// app.use('/images/categories', express.static(path.join(__dirname, 'uploads/categories')));
// app.use('/images/products', express.static(path.join(__dirname, 'uploads/products')));