// // src/components/form/form-elements/DefaultInputs.tsx
// import { useState, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Input from "../input/InputField";
// import Select from "../Select";
// import TextArea from "./TextAreaInput";

// export interface DefaultInputsProps {
//   initialValues?: {
//     productName?: string;
//     detail?: string;
//     categoryId?: string | number; // รองรับทั้ง string และ number
//   };
//   // categories array จากตาราง categories, แต่ละอันมี key "value" และ "label"
//   categories?: { value: string; label: string }[];
// }

// export default function DefaultInputs({ initialValues = {}, categories = [] }: DefaultInputsProps) {
//   const [productName, setProductName] = useState(initialValues.productName || "");
//   const [detail, setDetail] = useState(initialValues.detail || "");
//   const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   useEffect(() => {
//     setProductName(initialValues.productName || "");
//     setDetail(initialValues.detail || "");
//     setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
//   }, [initialValues]);

//   const handleSelectChange = (value: string) => {
//     setSelectedCategory(value);
//   };

//   return (
//     <ComponentCard title="รายละเอียด">
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">ชื่อสินค้า</Label>
//           <Input
//             type="text"
//             id="input"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>

//         <div>
//           <Label>รายละเอียดสินค้า</Label>
//           <TextArea initialValues={{ detail: product?.detail || "" }} />
//           </div>

//         <div>
//           <Label>หมวดหมู่</Label>
//           <Select
//             options={categories}
//             placeholder="กรุณาเลือกหมวดหมู่สินค้า"
//             onChange={handleSelectChange}
//             value={selectedCategory} // ใช้ value แทน defaultValue
//             className="dark:bg-dark-900"
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }


// import { useState, useEffect } from "react";
// import Label from "../Label";
// import Input from "../input/InputField";

// export interface DefaultInputsProps {
//   initialValues?: {
//     productName?: string;
//     detail?: string;
//     categoryId?: string | number;
//   };
//   productId?: string;
//   categories?: { value: string; label: string }[];
// }

// export default function DefaultInputs({ initialValues = {}, productId, categories = [] }: DefaultInputsProps) {
//   const [productName, setProductName] = useState(initialValues.productName || "");
//   // const [detail, setDetail] = useState(initialValues.detail || "");
//   const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   useEffect(() => {
//     setProductName(initialValues.productName || "");
//     // setDetail(initialValues.detail || "");
//     setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
//   }, [initialValues]);

//   const handleSelectChange = (value: string) => {
//     setSelectedCategory(value);
//   };

//   return (
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">ชื่อสินค้า</Label>
//           <Input
//             type="text"
//             id="input"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>
//         </div>
//   );
// }





// import { useState } from "react";
// import Label from "../Label";
// import Input from "../input/InputField";


// interface DefaultInputsProps {
//   name: string;
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const DefaultInputs: React.FC<DefaultInputsProps> = ({ name, label, value, onChange }) => {

//   return (
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">{label}</Label>
//           <Input 
//             type="text" 
//             name={name}
//             value={value}
//             onChange={onChange}
//               />
//         </div>
//         </div>
//   );
// };

// export default DefaultInputs;


// "use client";
// import React, { useState } from "react";
// import Label from "../Label";
// import Input from "../input/InputField";

// export default function DefaultInputs() {
//   return (
//       <div className="space-y-6">
//         <div>
//           <Label>ชื่อสินค้า</Label>
//           <Input type="text" />
//         </div>
//       </div>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Label from "../Label";
import Input from "../input/InputField";

export default function DefaultInputs() {
  const { product_id } = useParams(); // รับ product_id จาก URL
  const [productName, setProductName] = useState("");

  useEffect(() => {
    console.log("🔹 product_id from URL:", product_id); // เช็คค่า product_id

    const fetchProduct = async () => {
      if (!product_id) {
        console.warn("⚠️ No product_id provided!");
        return;
      } 

      try {
        console.log(`🔍 Fetching product data from /api/products/${product_id}`);
        const response = await fetch(`/api/products/${product_id}`);
        const data = await response.json();

        console.log("📦 API Response:", data); // ดูข้อมูลที่ได้จาก API

        if (data.success) {
          console.log("✅ Product name:", data.product.product_name);
          setProductName(data.product.product_name);
        } else {
          console.error("❌ API returned an error:", data.message);
        }
      } catch (error) {
        console.error("🚨 Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product_id]);

  return (
    <div className="space-y-6">
      <div>
        <Label>ชื่อสินค้า</Label>
        <Input 
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
    </div>
  );
}
