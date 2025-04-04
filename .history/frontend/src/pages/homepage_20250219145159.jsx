// src/pages/Homepage.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import './homepage.css';

export default function Homepage() {
  const products = [
    { id: 1, name: 'สินค้า A', price: '฿5,000', image: 'https://via.placeholder.com/300?text=สินค้า+A' },
    { id: 2, name: 'สินค้า B', price: '฿7,500', image: 'https://via.placeholder.com/300?text=สินค้า+B' },
    { id: 3, name: 'สินค้า C', price: '฿3,200', image: 'https://via.placeholder.com/300?text=สินค้า+C' },
    { id: 4, name: 'สินค้า D', price: '฿9,900', image: 'https://via.placeholder.com/300?text=สินค้า+D' },
  ];

  return (
    <div>
      <Navbar />
      <main className="homepage-container">
        <div className="homepage-header">
          <h1 className="homepage-title">ยินดีต้อนรับสู่หน้าแรก!</h1>
          <p className="homepage-description">
            นี่คือหน้า Homepage ที่แสดง Navbar อยู่ด้านบน หากต้องการปรับแต่งเพิ่มสามารถแจ้งได้เลยนะ!
          </p>
        </div>

        <section className="product-section">
          <h2 className="section-title">สินค้าแนะนำ</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button className="product-button">ดูรายละเอียด</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
