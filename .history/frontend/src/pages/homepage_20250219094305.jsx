// src/pages/Homepage.jsx
import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';

export default function Homepage() {
  return (
    <div>
      <Navbar />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-800">ยินดีต้อนรับสู่หน้าแรก!</h1>
          <p className="mt-4 text-lg text-gray-600">
            นี่คือหน้า Homepage ที่แสดง Navbar อยู่ด้านบน หากต้องการปรับแต่งเพิ่มสามารถแจ้งได้เลยนะ!
          </p>
        </div>
      </main>
    </div>
  );
}