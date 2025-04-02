// import React from "react";
// import "./Footer.css"; // Import ไฟล์ CSS

// const Footer = () => {
//   return (
//     <footer>
//       <div>
//         <p>&copy; 2025 Your Company Name. All rights reserved.</p>
//       </div>
//       <div>
//         <a href="/privacy-policy">Privacy Policy</a>
//         {" | "}
//         <a href="/terms-of-service">Terms of Service</a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// src/components/Footer/Footer.jsx
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaLine, FaLinkedinIn, FaYoutube, FaMapMarkerAlt } from 'react-icons/fa';
import Standard from '../../assets/iso-9001.webp';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section services">
          <h3 className="footer-title">บริการของเรา</h3>
          <ul>
            <li>Kiosk</li>
            <li>Display / AV</li>
            <li>Industrial PC</li>
            <li>AI Platform</li>
            <li>Solutions</li>
          </ul>
        </div>

        <div className="footer-section company">
          <h3 className="footer-title">เกี่ยวกับบริษัท</h3>
          <ul>
            <li><a href="https://step-solutions.com/">เกี่ยวกับเรา</a></li>
            <li><a href="https://step-solutions.com/our-factory/">โรงงานของเรา</a></li>
            <li><a href="https://step-solutions.com/blog/">ข่าวสารและกิจกรรม</a></li>
            <li><a href="https://step-solutions.com/">สมัครงาน</a></li>
            <li><a href="https://step-solutions.com/">ติดต่อเรา</a></li>
          </ul>
        </div>

        <div className="footer-section about">
          <h2 className="footer-title">STEP SOLUTIONS</h2>
          <p>
            บริษัท สเตป โซลูชั่นส์ จำกัด พร้อมที่จะนำเทคโนโลยีเพื่อเปลี่ยนรูปแบบการนำเสนอสินค้าและบริการของคุณ
            ให้ทันสมัยและสามารถตอบโจทย์ด้วยระบบอัตโนมัติ
          </p>
          <p><strong>เยี่ยมชมเราได้ที่:</strong></p>
          <p>75 Nimitmai Road, Samwa Tawan Ok, Klong Samwa, Bangkok 10510</p>
          <p><strong>เวลาทำการ:</strong> จันทร์ – ศุกร์ 8.30 น. – 17.30 น.</p>
          <p><strong>Email:</strong><a href="mailto:sales@step-solutions.com"> sales@step-solutions.com</a></p>
          <div className="footer-social">
            <a href="https://www.facebook.com/step.solutions.company" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/step.solutions/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://line.me/R/ti/p/@esv1182i" target="_blank" rel="noopener noreferrer"><FaLine /></a>
            <a href="https://www.linkedin.com/company/step-solutions-th" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="http://www.youtube.com/@stepsolutions5859" target="_blank" rel="noopener noreferrer"><FaYoutube /></a> 
            <a href="https://maps.app.goo.gl/PGqDMQdDQssk9Toq9" target="_blank" rel="noopener noreferrer"><FaMapMarkerAlt /></a>
          </div>
        </div>

        <div className="footer-section certification">
          <img src={Standard} alt="ISO 9001" className="certification-img" />
        </div>
      </div>

      <div className="footer-hashtags">
        <p>
          #DigitalSignage, #คีออส, #KioskDesign, #DisplayAV, #Videowall, #Horion, #IndustrialPC,
          #Interactiveอุปกรณ์อัจฉริยะ, #LEDOutdoor, #VideoAnalytic, #AIPlatform, #ระบบคิว, #DriveThru, #FaceRecognition
        </p>
      </div>

      <div className="footer-bottom">
  <p>© 2025 Step Solutions Co., Ltd. All Rights Reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/cookie">Cookie Policy</a></p>
  <button className="line-contact-btn">
    <a href="https://line.me/R/ti/p/@esv1182i" target="_blank" rel="noopener noreferrer">สอบถาม - สั่งซื้อ ผ่าน @LINE สะดวกกว่า</a>
  </button>
</div>
    </footer>
  );
}
