import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Selects({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        console.log("API Response:", response.data);
        if (Array.isArray(response.data.categories)) {
          const sortedCategories = response.data.categories
            .filter(cat => cat && typeof cat.value !== 'undefined' && typeof cat.label !== 'undefined')
            .sort((a, b) => a.value - b.value);
          setCategories(sortedCategories);
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

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    if (!selectedValue || !categories.some(cat => cat.value.toString() === selectedValue)) return;
    onCategoryChange(selectedValue);
    navigate(`/categories/${selectedValue}`);
  };

  return (
    <div className="hidden-mobile">
      <label htmlFor="category-select" className="sr-only">เลือกหมวดหมู่สินค้า</label>
      <select
        id="category-select"
        className="category-dropdown"
        value={selectedCategory || ""}
        onChange={handleCategoryChange}
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
