// import React from "react";

// interface TextareaProps {
//   placeholder?: string; // Placeholder text
//   rows?: number; // Number of rows
//   value?: string; // Current value
//   onChange?: (value: string) => void; // Change handler
//   className?: string; // Additional CSS classes
//   disabled?: boolean; // Disabled state
//   error?: boolean; // Error state
//   hint?: string; // Hint text to display
// }

// const TextArea: React.FC<TextareaProps> = ({
//   placeholder = "คำอธิบายสินค้า", // Default placeholder
//   rows = 3, // Default number of rows
//   value = "", // Default value
//   onChange, // Callback for changes
//   className = "", // Additional custom styles
//   disabled = false, // Disabled state
//   error = false, // Error state
//   hint = "", // Default hint text
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     if (onChange) {
//       onChange(e.target.value);
//     }
//   };

//   let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className} `;

//   if (disabled) {
//     textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
//   } else if (error) {
//     textareaClasses += ` bg-transparent  border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
//   } else {
//     textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
//   }

//   return (
//     <div className="relative">
//       <textarea
//         placeholder={placeholder}
//         rows={rows}
//         value={value}
//         onChange={handleChange}
//         disabled={disabled}
//         className={textareaClasses}
//       />
//       {hint && (
//         <p
//           className={`mt-2 text-sm ${
//             error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
//           }`}
//         >
//           {hint}
//         </p>
//       )}
//     </div>
//   );
// };

// export default TextArea;


// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import TextArea from "../input/TextArea";

// export interface TextAreaProps {
//   initialValues?: {
//     detail?: string;
//   };
// }

// export default function TextAreaInput({ initialValues = {} }: TextAreaProps) {
//   const { productId } = useParams(); // ดึง productId จาก URL
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${productId}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setProduct(data.product);
//         } else {
//           setError("Product not found");
//         }
//       } catch (err) {
//         setError("Error fetching product details");
//         console.error("Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProductDetail();
//     }
//   }, [productId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="space-y-6">
//       <div>
//         <TextArea
//           value={product?.detail || ""}
//           onChange={(value) => setProduct({ ...product, detail: value })}
//           rows={6}
//         />
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import TextArea from "../input/TextArea";

// export interface TextAreaProps {
//   productId: string; // เพิ่ม prop ที่รับ productId เพื่อดึงรายละเอียดของสินค้าจาก API
// }

// export default function TextAreaInput({ productId }: TextAreaProps) {
//   const [detail, setDetail] = useState<string>(""); // ใช้เพื่อเก็บค่า detail
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     const fetchProductDetail = async () => {
//       if (!productId) return; // 🛑 ถ้า productId เป็น undefined ให้ return ออกไปก่อน
  
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${productId}`);
//         const data = await response.json();
  
//         if (data.success) {
//           setDetail(data.product.detail);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError("Error fetching product details");
//         console.error("Error fetching product details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchProductDetail();
//   }, [productId]); // ✅ useEffect ทำงานเมื่อ productId เปลี่ยนค่า
  
//   if (loading) return <div>Loading...</div>; // แสดง Loading หากกำลังดึงข้อมูล
//   if (error) return <div>{error}</div>; // แสดง error หากเกิดข้อผิดพลาด

//   return (
//     <div className="space-y-6">
//       <div>
//         <TextArea
//           value={detail} // ส่งค่า detail ไปยัง TextArea
//           onChange={(value) => setDetail(value)} // อัปเดตค่า detail เมื่อมีการเปลี่ยนแปลง
//           rows={6}
//         />
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import TextArea from "../input/TextArea";

// export interface TextAreaProps {
//   productId?: string; // เปลี่ยนเป็น optional
// }

// export default function TextAreaInput({ productId }: TextAreaProps) {
//   const [detail, setDetail] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!productId) {
//       setError("Product ID is missing");
//       setLoading(false);
//       return;
//     }

//     console.log("Fetching product detail for ID:", productId);

//     const fetchProductDetail = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${productId}`);
//         const data = await response.json();

//         if (data.success) {
//           setDetail(data.product.detail);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError("Error fetching product details");
//         console.error("Error fetching product details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetail();
//   }, [productId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="space-y-6">
//       <div>
//         <TextArea
//           value={detail}
//           onChange={(value) => setDetail(value)}
//           rows={6}
//         />
//       </div>
//     </div>
//   );
// }




// import { useState, useEffect } from "react";
// import TextArea from "../input/TextArea";

// export interface TextAreaProps {
//   productId?: string; // ✅ เปลี่ยนเป็น optional
// }

// export default function TextAreaInput({ productId }: TextAreaProps) {
//   const [detail, setDetail] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     console.log("Received productId in TextAreaInput:", productId); // ✅ ตรวจสอบค่าที่รับมา

//     if (!productId) {
//       setError("Product ID is missing");
//       setLoading(false);
//       return;
//     }

//     const fetchProductDetail = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${productId}`);
//         const data = await response.json();

//         if (data.success) {
//           setDetail(data.product.detail);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError("Error fetching product details");
//         console.error("Error fetching product details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductDetail();
//   }, [productId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="space-y-6">
//       <div>
//         <TextArea
//           value={detail}
//           onChange={(value) => setDetail(value)}
//           rows={6}
//         />
//       </div>
//     </div>
//   );
// }



// import React from "react";

// interface TextareaProps {
//   placeholder?: string; // Placeholder text
//   rows?: number; // Number of rows
//   value?: string; // Current value
//   onChange?: (value: string) => void; // Change handler
//   className?: string; // Additional CSS classes
//   disabled?: boolean; // Disabled state
//   error?: boolean; // Error state
//   hint?: string; // Hint text to display
// }

// const TextArea: React.FC<TextareaProps> = ({
//   placeholder = "คำอธิบายสินค้า", // Default placeholder
//   rows = 3, // Default number of rows
//   value = "", // Default value
//   onChange, // Callback for changes
//   className = "", // Additional custom styles
//   disabled = false, // Disabled state
//   error = false, // Error state
//   hint = "", // Default hint text
// }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     if (onChange) {
//       onChange(e.target.value);
//     }
//   };

//   let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className} `;

//   if (disabled) {
//     textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
//   } else if (error) {
//     textareaClasses += ` bg-transparent  border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
//   } else {
//     textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
//   }

//   return (
//     <div className="relative">
//       <textarea
//         placeholder={placeholder}
//         rows={rows}
//         value={value}
//         onChange={handleChange}
//         disabled={disabled}
//         className={textareaClasses}
//       />
//       {hint && (
//         <p
//           className={`mt-2 text-sm ${
//             error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
//           }`}
//         >
//           {hint}
//         </p>
//       )}
//     </div>
//   );
// };

// export default TextArea;




import React from "react";

interface TextareaProps {
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "คำอธิบายสินค้า", // Default placeholder
  rows = 3, // Default number of rows
  value = "", // Default value
  onChange, // Callback for changes
  className = "", // Additional custom styles
  disabled = false, // Disabled state
  error = false, // Error state
  hint = "", // Default hint text
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden ${className}`;

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    textareaClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
  } else {
    textareaClasses += ` bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;