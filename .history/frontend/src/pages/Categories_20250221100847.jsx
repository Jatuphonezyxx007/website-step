// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Categories.css';

// 📌 กำหนด BASE_URL จาก environment variable หรือ fallback เป็นเส้นทางปัจจุบัน
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export default function Categories() {
  const { categoryId } = useParams();
  const [categoryInfo, setCategoryInfo] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/api/category/${categoryId}`),
          axios.get(`${BASE_URL}/api/products/category/${categoryId}`),
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
          src={`${BASE_URL}/images/categories/${categoryInfo.img_cate}`}
          alt={categoryInfo.name}
          className="category-banner"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/500x300')}
        />
        <h1 className="category-title text-start">{categoryInfo.name}</h1>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={`${BASE_URL}/images/products/${product.image_path}`}
              alt={product.name}
              onError={(e) => (e.target.src = 'https://via.placeholder.com/500x500')}
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
