// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Homepage from './pages/Homepage.jsx';
// import Categories from './pages/Categories.jsx';
// import Navbar from './components/Navbar/Navbar.jsx';
// import Footer from './components/Footer/Footer.jsx';

// export default function App() {
//   return (
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/categories/:categoryId" element={<Categories />} />
//       </Routes>
//   );
// }
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.jsx';
import Categories from './pages/Categories.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories/:id" element={<Categories />} />
      </Routes>
      <Footer />
    </>
  );
}
