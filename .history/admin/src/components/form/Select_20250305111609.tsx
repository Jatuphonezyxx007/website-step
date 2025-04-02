// import { useState } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// interface SelectProps {
//   options: Option[];
//   placeholder?: string;
//   onChange: (value: string) => void;
//   className?: string;
//   defaultValue?: string;
// }

// const Select: React.FC<SelectProps> = ({
//   options,
//   placeholder = "Select an option",
//   onChange,
//   className = "",
//   value = "",
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     onChange(value); // Trigger parent handler
//   };

//   return (
//     <select
//       className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`}
//       value={value} // ใช้ value แทน selectedValue
//       onChange={handleChange}
//     >
//       <option value="" disabled className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
//         {placeholder}
//       </option>
//       {options.map((option) => (
//         <option key={option.value} value={option.value} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Select;



// import React, { useState } from "react";

// interface Option {
//   value: string;
//   label: string;
// }

// interface SelectProps {
//   options: Option[];
//   placeholder?: string;
//   onChange: (value: string) => void;
//   className?: string;
//   defaultValue?: string;
// }

// const Select: React.FC<SelectProps> = ({
//   options,
//   placeholder = "Select an option",
//   onChange,
//   className = "",
//   defaultValue = "",
// }) => {
//   // Manage the selected value
//   const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     setSelectedValue(value);
//     onChange(value); // Trigger parent handler
//   };

//   return (
//     <select
//       className={`h-11 w-full appearance-none rounded-lg border border-gray-300  px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
//         selectedValue
//           ? "text-gray-800 dark:text-white/90"
//           : "text-gray-400 dark:text-gray-400"
//       } ${className}`}
//       value={selectedValue}
//       onChange={handleChange}
//     >
//       {/* Placeholder option */}
//       <option
//         value=""
//         disabled
//         className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
//       >
//         {placeholder}
//       </option>
//       {/* Map over options */}
//       {options.map((option) => (
//         <option
//           key={option.value}
//           value={option.value}
//           className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
//         >
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Select;


"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../Label";
import Select from "../Select";

export default function SelectInputs() {
  const { product_id } = useParams(); // รับ product_id จาก URL
  const [categories, setCategories] = useState([]); // เก็บรายการหมวดหมู่
  const [selectedCategory, setSelectedCategory] = useState(""); // เก็บค่าหมวดหมู่ที่เลือก

  // ดึงข้อมูลหมวดหมู่จาก API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("🔍 Fetching categories...");
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        console.log("📦 Categories API Response:", data);

        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("🚨 Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ดึง `category_id` ของสินค้า
  useEffect(() => {
    const fetchProductCategory = async () => {
      if (!product_id) return;
      try {
        console.log(`🔍 Fetching product category for product_id: ${product_id}`);
        const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
        const data = await response.json();
        console.log("📦 Product API Response:", data);

        if (data.success) {
          setSelectedCategory(data.product.category_id); // ตั้งค่า default
        }
      } catch (error) {
        console.error("🚨 Error fetching product:", error);
      }
    };

    fetchProductCategory();
  }, [product_id]);

  // เมื่อผู้ใช้เลือกหมวดหมู่ใหม่
  const handleSelectChange = (value: string) => {
    console.log("Selected category:", value);
    setSelectedCategory(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>หมวดหมู่</Label>
        <div className="relative">
          <Select
            options={categories} // ใช้ categories จาก API
            placeholder="เลือกหมวดหมู่"
            value={selectedCategory} // ตั้งค่าหมวดหมู่เริ่มต้น
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </div>
  );
}
