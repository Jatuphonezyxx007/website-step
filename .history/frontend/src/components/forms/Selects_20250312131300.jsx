import React from 'react';

export default function Selects({ categories, selectedCategory, onCategoryChange }) {
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
          <option key={`${cat.id}-${index}`} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
