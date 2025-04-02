// src/pages/Categories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Categories.css';

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
        {categoryInfo && (
          <>
            <img
              src={`${BASE_URL}${categoryInfo.img_cate}`}
              alt={categoryInfo.name}
              className="category-banner"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/500x300')}
            />
            <h1 className="category-title text-start">{categoryInfo.name}</h1>
          </>
        )}
      </div>

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={`${BASE_URL}${product.image_path}`}
                alt={product.name}
                onError={(e) => (e.target.src = 'https://via.placeholder.com/500x500')}
                className="product-image"
              />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-status">
                  สถานะ: {product.status === 'in_stock' ? 'พร้อมจำหน่าย ✅' : 'สินค้าหมด ❌'}
                </p>
                <p className="product-price">ราคา: ฿{product.price}</p>
              </div>
              <button className="product-button">ดูรายละเอียดสินค้า</button>
            </div>
          ))
        ) : (
          <p className="no-products-message">🚫 ไม่มีสินค้าที่จะแสดงในขณะนี้</p>
        )}
      </div>
    </div>
  );
}
