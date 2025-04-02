// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?categoryId=${categoryId}`);
        setProducts(response.data);
      } catch (error) {
        console.error('❌ Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="category-page-container">
      <h1 className="category-page-title">สินค้าทั้งหมดในหมวดหมู่</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">฿{product.price}</p>
            <button className="product-button">ดูรายละเอียด</button>
          </div>
        ))}
      </div>
    </div>
  );
}