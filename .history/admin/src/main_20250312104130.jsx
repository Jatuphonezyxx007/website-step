// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import '@heroui/react/dist/index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ เพิ่ม BrowserRouter
import "./index.css";
import App from "./App.jsx";
import "@heroui/react/dist/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ ครอบ App ด้วย BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
