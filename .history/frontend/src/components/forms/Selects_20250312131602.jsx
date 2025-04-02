import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Selects({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("❌ Unexpected API response format:", response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="hidden-mobile">
      <label htmlFor="category-select" className="sr-only">เลือกหมวดหมู่สินค้า</label>
      <select
        id="category-select"
        className="category-dropdown"
        value={selectedCategory || ""}
        onChange={onCategoryChange}
      >
        <option value="" disabled>เลือกหมวดหมู่สินค้า</option>
        {categories.map((cat, index) => (
          <option key={`${cat.value}-${index}`} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
}
