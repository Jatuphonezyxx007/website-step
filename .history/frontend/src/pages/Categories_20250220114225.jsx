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
        {/* <img src={categoryInfo.img_cate} alt={categoryInfo.name} className="category-banner" /> */}
        <h1 className="category-title text-start">{categoryInfo.name}</h1>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
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