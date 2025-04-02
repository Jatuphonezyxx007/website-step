import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  Squares2X2Icon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@heroui/react";
import logo from "../../assets/logo/step-solutions-logo.png";
import "./Navbar.css";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetch(`http://localhost:3000/api/products/search?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data.products || []))
        .catch((error) =>
          console.error("Error fetching search results:", error)
        );
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResultClick = (productId) => {
    navigate(`/product-detail/${productId}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="navbar-container">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <motion.img
                src={logo}
                alt="Step Solutions Logo"
                className="logo-image"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Link>
          </div>

          {/* <div className="search-bar-container">
            <div className="search-bar">
              <MagnifyingGlassIcon className="search-icon" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li
                    key={product.product_id}
                    className="search-result-item"
                    onClick={() => handleResultClick(product.product_id)}
                  >
                    {product.product_name}
                  </li>
                ))}
              </ul>
            )}
          </div> */}
        </div>
      </motion.nav>

      <div className="bottom-navbar">
        <Link to="/" className="bottom-navbar-item active">
          <HomeIcon className="w-6 h-6" />
          <span>หน้าแรก</span>
        </Link>
        <Link to="/categories" className="bottom-navbar-item">
          <Squares2X2Icon className="w-6 h-6" />
          <span>หมวดหมู่</span>
        </Link>
      </div>
    </>
  );
}
