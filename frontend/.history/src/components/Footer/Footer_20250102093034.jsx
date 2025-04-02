import React from "react";
import "./Footer.css"; // Import ไฟล์ CSS

const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2025 Your Company Name. All rights reserved.</p>
      </div>
      <div>
        <a href="/privacy-policy">Privacy Policy</a>
        {" | "}
        <a href="/terms-of-service">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
