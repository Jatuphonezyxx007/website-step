// import { useState } from "react";
// import TextArea from "../input/TextArea";


// export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");

//   return (
//       <div className="space-y-6">
//         <div>
//           <TextArea
//             value={message}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>
//       </div>
//   );
// }



// import { useState } from "react";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// interface TextAreaInputProps {
//   name: string;
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
// }

// const TextAreaInput: React.FC<TextAreaInputProps> = ({ name, label, value, onChange }) => {
  
// // export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");

//   return (
//       <div className="space-y-6">
//         <div>
//           <Label>{label}</Label>
//           <TextArea
//             name={name}
//             value={value}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>
//       </div>
//   );
// };

// export default TextAreaInput;



// "use client";
// import React, { useState } from "react";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");
//   const { product_id } = useParams();
//   const { productDetail, setc } = useState("");

//   const fetchProduct = async () => {
//     if (!product_id) {
//       console.warn("⚠️ No product_id provided!");
//       return;
//     } 
  
//     try {
//       console.log(`🔍 Fetching product data from /api/products/${product_id}`);
//       // const response = await fetch(`/api/products/${product_id}`);
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`);

  
//       console.log("🌐 Raw response:", response); // ตรวจสอบ response
  
//       if (!response.ok) {
//         console.error(`❌ HTTP Error: ${response.status} - ${response.statusText}`);
//         return;
//       }
  
//       const data = await response.json();
//       console.log("📦 API Response:", data);
  
//       if (data.success) {
//         console.log("✅ Product name:", data.product.product_name);
//         setProductDetail(data.product.detail);
//       } else {
//         console.error("❌ API returned an error:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error fetching product:", error);
//     }
//   };
  
//   fetchProduct();
// }, [product_id]);

//   return (
//       <div className="space-y-6">
//         {/* Default TextArea */}
//         <div>
//           <Label>รายละเอียดสินค้า</Label>
//           <TextArea
//             value={message}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>
//       </div>
//   );
// }



// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// export default function TextAreaInput() {
//   const { product_id } = useParams(); // ดึง product_id จาก URL
//   const [productDetail, setProductDetail] = useState(""); // เก็บรายละเอียดสินค้า

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!product_id) {
//         console.warn("⚠️ No product_id provided!");
//         return;
//       }

//       try {
//         console.log(`🔍 Fetching product data from /api/products/${product_id}`);
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);

//         console.log("🌐 Raw response:", response);

//         if (!response.ok) {
//           console.error(`❌ HTTP Error: ${response.status} - ${response.statusText}`);
//           return;
//         }

//         const data = await response.json();
//         console.log("📦 API Response:", data);

//         if (data.success) {
//           console.log("✅ Product detail:", data.product.detail);
//           setProductDetail(data.product.detail); // อัปเดตรายละเอียดสินค้า
//         } else {
//           console.error("❌ API returned an error:", data.message);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [product_id]); // เรียก API เมื่อ product_id เปลี่ยน

//   return (
//     <div className="space-y-6">
//       <div>
//         <Label>รายละเอียดสินค้า</Label>
//         <TextArea
//           value={productDetail} // แสดงรายละเอียดสินค้าใน TextArea
//           onChange={(e) => setProductDetail(e.target.value)}
//           rows={6}
//         />
//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// export default function TextAreaInput() {
//   const { product_id } = useParams(); // ดึง product_id จาก URL
//   const [productDetail, setProductDetail] = useState<string>(""); // เก็บรายละเอียดสินค้า

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!product_id) {
//         console.warn("⚠️ No product_id provided!");
//         return;
//       }

//       try {
//         console.log(`🔍 Fetching product data from /api/products/${product_id}`);
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);

//         console.log("🌐 Raw response:", response);

//         if (!response.ok) {
//           console.error(`❌ HTTP Error: ${response.status} - ${response.statusText}`);
//           return;
//         }

//         const data = await response.json();
//         console.log("📦 API Response:", data);

//         if (data.success) {
//           const detailText = data.product.detail ?? ""; // ใช้ `?? ""` ป้องกัน `null` หรือ `undefined`
//           console.log("✅ Product detail:", detailText);
//           setProductDetail(detailText);
//         } else {
//           console.error("❌ API returned an error:", data.message);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [product_id]); // เรียก API เมื่อ product_id เปลี่ยน

//   return (
//     <div className="space-y-6">
//       <div>
//         <Label>รายละเอียดสินค้า</Label>
//         <TextArea
//           value={productDetail} // แสดงรายละเอียดสินค้าใน TextArea
//           onChange={(e) => setProductDetail(e.target.value)}
//           rows={6}
//           placeholder="คำอธิบายสินค้า" // แสดงข้อความถ้าไม่มีข้อมูล
//         />
//       </div>
//     </div>
//   );
// }


"use client";
import React from "react";
import TextArea from "../input/TextArea";
import Label from "../Label";

interface Props {
  productDetail: string;
  setProductDetail: (value: string) => void;
}

export default function TextAreaInput({ productDetail, setProductDetail }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label>รายละเอียดสินค้า</Label>
        <TextArea
          value={productDetail}
          onChange={setProductDetail} // ✅ แก้ไขให้ `onChange` ส่งค่า `value` โดยตรง
          rows={6}
          placeholder="คำอธิบายสินค้า"
        />
      </div>
    </div>
  );
}
