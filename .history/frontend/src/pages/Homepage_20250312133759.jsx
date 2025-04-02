// src/pages/Homepage.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import './Homepage.css';
import Footer from '../components/Footer/Footer.jsx';
import { motion } from 'framer-motion';

export default function Homepage() {
  const products = [
    { id: 1, name: 'สินค้า A', price: '฿5,000', image: 'https://placehold.co/400x600' },
    { id: 2, name: 'สินค้า B', price: '฿7,500', image: 'https://placehold.co/400x600' },
    { id: 3, name: 'สินค้า C', price: '฿3,200', image: 'https://placehold.co/400x600' },
    { id: 4, name: 'สินค้า D', price: '฿9,900', image: 'https://placehold.co/400x600' },
  ];

  return (
    <div>
      {/* <Navbar /> */}
      <motion.main
        className="homepage-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="homepage-header">
          <h1 className="homepage-title">Welcome Na Kha!</h1>
          <p className="homepage-description">
            Hello World จ้า 69!
          </p>
        </div>

        <section className="product-section">
          <h2 className="section-title">สินค้าแนะนำ</h2>
          <div className="product-grid">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="product-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={product.image} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button className="product-button">ดูรายละเอียด</button>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.main>
      {/* <Footer /> */}
    </div>
  );
}
