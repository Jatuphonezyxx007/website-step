// import { useState } from "react";
// import Label from "../Label";
// import Select from "../Select";

// export default function SelectInputs() {
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];
//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };
//   const [selectedValues, setSelectedValues] = useState<string[]>([]);

//   const multiOptions = [
//     { value: "1", text: "Option 1", selected: false },
//     { value: "2", text: "Option 2", selected: false },
//     { value: "3", text: "Option 3", selected: false },
//     { value: "4", text: "Option 4", selected: false },
//     { value: "5", text: "Option 5", selected: false },
//   ];
//   return (
//       <div className="space-y-6">
//         <div>
//           <Label>หมวดหมู่</Label>
//           <Select
//             options={options}
//             placeholder="Select Option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
//       </div>
//   );
// }

// interface SelectInputsProps {
//   name: string;
//   label: string;
//   value: number;
//   options: { value: number; label: string }[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const SelectInputs: React.FC<SelectInputsProps> = ({ name, label, value, options, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="block">{label}</label>
//       <select name={name} value={value} onChange={onChange} className="border p-2 w-full">
//         <option value="">เลือกหมวดหมู่</option>
//         {options.map(option => (
//           <option key={option.value} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectInputs;




// "use client";
// import React, { useState } from "react";
// import Label from "../Label";
// import Select from "../Select";
// // import { ChevronDownIcon } from "@/icons";

// export default function SelectInputs() {
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];


//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };


//   return (
//       <div className="space-y-6">
//         <div>
//           <Label>หมวดหมู่</Label>
//          <div className="relative">
//            <Select
//             options={options}
//             placeholder="Select Option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//          </div>
//         </div>
//       </div>
//   );
// }


// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Label from "../Label";
// import Select from "../Select";

// export default function SelectInputs() {
//   const { product_id } = useParams(); // รับ product_id จาก URL
//   const [categories, setCategories] = useState([]); // รายการหมวดหมู่
//   const [selectedCategory, setSelectedCategory] = useState(""); // หมวดหมู่ที่เลือก
//   const [productCategory, setProductCategory] = useState(""); // category_id ของสินค้า

//   // 🔍 ดึงข้อมูลหมวดหมู่จาก API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         console.log("🔍 Fetching categories...");
//         const response = await fetch("http://localhost:3000/api/categories");
//         const data = await response.json();
//         console.log("📦 Categories API Response:", data);

//         if (data.success) {
//           setCategories(data.categories);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // 🔍 ดึง `category_id` ของสินค้านั้นๆ
//   useEffect(() => {
//     const fetchProductCategory = async () => {
//       if (!product_id) return;
//       try {
//         console.log(`🔍 Fetching product category for product_id: ${product_id}`);
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();
//         console.log("📦 Product API Response:", data);

//         if (data.success) {
//           const categoryId = String(data.product.category_id); // แปลงเป็น string
//           setProductCategory(categoryId);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching product:", error);
//       }
//     };

//     fetchProductCategory();
//   }, [product_id]);

//   // 🛠 ตั้งค่าหมวดหมู่เริ่มต้น เมื่อ `categories` และ `productCategory` โหลดเสร็จ
//   useEffect(() => {
//     if (categories.length > 0 && productCategory) {
//       const foundCategory = categories.find((c) => String(c.value) === productCategory);
//       if (foundCategory) {
//         console.log("✅ Setting default category:", foundCategory.value);
//         setSelectedCategory(foundCategory.value);
//       } else {
//         console.warn("⚠️ Category not found in list:", productCategory);
//       }
//     }
//   }, [categories, productCategory]);

//   // 🎯 เมื่อผู้ใช้เปลี่ยนหมวดหมู่
//   const handleSelectChange = (value: string) => {
//     console.log("Selected category:", value);
//     setSelectedCategory(value);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <Label>หมวดหมู่</Label>
//         <div className="relative">
//           <Select
//             options={categories} // ใช้ categories จาก API
//             placeholder="เลือกหมวดหมู่"
//             value={selectedCategory} // ตั้งค่า default เป็น `category_id` ของสินค้า
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../Label";
import Select from "../Select";
import Input from "../input/InputField"; // ✅ เพิ่ม input field

interface Props {
  categoryName: string;
  setCategoryName: (value: string) => void;
}

export default function SelectInputs({ categoryName, setCategoryName, isAddingCategory, setIsAddingCategory }) {
  const { product_id } = useParams();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryName);

  // 🔍 โหลดหมวดหมู่จาก API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("🚨 Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔍 โหลดข้อมูลหมวดหมู่ของสินค้า เมื่อแก้ไข
  useEffect(() => {
    if (product_id) {
      fetch(`http://localhost:3000/api/products/${product_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSelectedCategory(data.product.category_id);
            setCategoryName(data.product.category_id);
          }
        })
        .catch((err) => console.error("🚨 Error fetching product category:", err));
    }
  }, [product_id]);

  // 🎯 เมื่อผู้ใช้เลือกหมวดหมู่
  const handleSelectChange = (value: string) => {
    if (value === "add_new") {
      setIsAddingCategory(true);
      setCategoryName(""); // ล้างค่าหมวดหมู่เก่า
    } else {
      setIsAddingCategory(false);
      setCategoryName(value);
    }
    setSelectedCategory(value);
  };

  return (
    <div className="space-y-4">
      <Label>หมวดหมู่</Label>
      <Select
        options={[
          ...categories,
          { value: "add_new", label: "➕ เพิ่มหมวดหมู่ใหม่" }, // ✅ เพิ่มตัวเลือกพิเศษ
        ]}
        placeholder="เลือกหมวดหมู่"
        value={selectedCategory} // ✅ ใช้ค่า category_id
        onChange={handleSelectChange}
        className="dark:bg-dark-900"
      />

      {isAddingCategory && (
        <div>
          <Label>ชื่อหมวดหมู่ใหม่</Label>
          <Input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="กรอกชื่อหมวดหมู่ใหม่"
          />
        </div>
      )}
    </div>
  );
}
