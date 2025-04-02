// import React from "react";

// interface ResponsiveImageProps {
//   src: string;
// }

// export default function ThreeColumnImageGrid({ src }: ResponsiveImageProps) {
//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       <div>
//         <img
//           src="/images/grid-image/image-04.png"
//           alt=" grid"
//           className="border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>

//       <div>
//         <img
//           src="/images/grid-image/image-05.png"
//           alt=" grid"
//           className="border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>

//       <div>
//         <img
//           src="/images/grid-image/image-06.png"
//           alt=" grid"
//           className="border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>
//     </div>
//   );
// }


// import React from "react";

// interface ThreeColumnImageGridProps {
//   images: string[];
// }

// export default function ThreeColumnImageGrid({ images }: ThreeColumnImageGridProps) {
//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {images.map((src, index) => (
//         <div key={index}>
//           <img
//             src={src}
//             alt={`Image ${index + 1}`}
//             className="border border-gray-200 rounded-xl dark:border-gray-800"
//           />
//         </div>
//       ))}
//     </div>
//   );
// }



// import React from "react";

// // ประกาศ Interface สำหรับ prop images เป็น array ของ string
// interface ThreeColumnImageGridProps {
//   images: string[];
//   onAddClick?: () => void; // เผื่อกรณีต้องการ handle event เมื่อคลิก card "เพิ่มสินค้า"
// }

// export default function ThreeColumnImageGrid({
//   images,
//   onAddClick,
// }: ThreeColumnImageGridProps) {
//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {/* แสดงรูปภาพที่มีอยู่ */}
//       {images.map((src, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-center border border-gray-200 rounded-xl dark:border-gray-800 p-3"
//         >
//           <img
//             src={src}
//             alt={`Image ${index + 1}`}
//             className="object-cover rounded-xl w-full h-full"
//           />
//         </div>
//       ))}

//       {/* Card สำหรับเพิ่มสินค้า */}
//       <div
//         className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-800 p-3 cursor-pointer hover:border-blue-500"
//         onClick={onAddClick}
//       >
//         {/* ไอคอน + (Plus) ใช้ inline SVG หรือนำเข้าจาก Icon Library ก็ได้ */}
//         <svg
//           className="text-gray-500 mb-1"
//           width="24"
//           height="24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M12 5v14M5 12h14" />
//         </svg>
//         <span className="text-gray-500">เพิ่มรูปภาพ</span>
//       </div>
//     </div>
//   );
// }



// import React, { useRef, useState, useEffect } from "react";

// // ประกาศ Interface สำหรับ prop images เป็น array ของ string
// interface ThreeColumnImageGridProps {
//   initialImages: string[]; // รูปที่มีอยู่แล้ว เช่น [mainImageUrl, ...supplementaryImages]
// }

// export default function ThreeColumnImageGrid({ initialImages }: ThreeColumnImageGridProps) {
//   // สร้าง state สำหรับเก็บรูปภาพทั้งหมด (รวมทั้งรูปที่เพิ่งเพิ่ม)
//   const [images, setImages] = useState<string[]>(initialImages);

//   // ใช้ useRef สำหรับ file input ที่จะซ่อน
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // หาก parent มีการเปลี่ยน initialImages ให้ sync กับ state ภายใน
//   useEffect(() => {
//     setImages(initialImages);
//   }, [initialImages]);

//   // เมื่อคลิก card "เพิ่มรูปภาพ" ให้ trigger file input
//   const handleAddClick = () => {
//     fileInputRef.current?.click();
//   };

//   // เมื่อผู้ใช้เลือกไฟล์รูปภาพจากเครื่อง
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // สร้าง URL ชั่วคราวสำหรับแสดงรูปทันที (ไม่ได้อัปโหลดไปเซิร์ฟเวอร์)
//       const newImageUrl = URL.createObjectURL(file);
//       setImages([...images, newImageUrl]);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {/* แสดงรูปภาพที่มีอยู่ */}
//       {images.map((src, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-center border border-gray-200 rounded-xl dark:border-gray-800 p-3"
//         >
//           <img
//             src={src}
//             alt={`Image ${index + 1}`}
//             className="object-cover rounded-xl w-full h-full"
//           />
//         </div>
//       ))}

//       {/* Card สำหรับเพิ่มรูปภาพ */}
//       <div
//         className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-800 p-3 cursor-pointer hover:border-blue-500"
//         onClick={handleAddClick}
//       >
//         <svg
//           className="text-gray-500 mb-1"
//           width="24"
//           height="24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M12 5v14M5 12h14" />
//         </svg>
//         <span className="text-gray-500">เพิ่มรูปภาพ</span>
//       </div>

//       {/* Hidden file input สำหรับเลือกไฟล์ */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// }



// import React, { useRef, useState, useEffect } from "react";
// import { TrashBinIcon, Edit2Icon } from "../../../icons";

// // ประกาศ Interface สำหรับ prop images เป็น array ของ string
// interface ThreeColumnImageGridProps {
//   initialImages: string[]; // รูปที่มีอยู่แล้ว เช่น [mainImageUrl, ...supplementaryImages]
// }

// export default function ThreeColumnImageGrid({ initialImages }: ThreeColumnImageGridProps) {
//   // สร้าง state สำหรับเก็บรูปภาพทั้งหมด (รวมทั้งรูปที่เพิ่งเพิ่ม)
//   const [images, setImages] = useState<string[]>(initialImages);

//   // ใช้ useRef สำหรับ file input ที่จะซ่อน
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // หาก parent มีการเปลี่ยน initialImages ให้ sync กับ state ภายใน
//   useEffect(() => {
//     setImages(initialImages);
//   }, [initialImages]);

//   // เมื่อคลิก card "เพิ่มรูปภาพ" ให้ trigger file input
//   const handleAddClick = () => {
//     fileInputRef.current?.click();
//   };

//   // เมื่อผู้ใช้เลือกไฟล์รูปภาพจากเครื่อง
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // สร้าง URL ชั่วคราวสำหรับแสดงรูปทันที (ไม่ได้อัปโหลดไปเซิร์ฟเวอร์)
//       const newImageUrl = URL.createObjectURL(file);
//       setImages((prev) => [...prev, newImageUrl]);
//     }
//   };

//   // ฟังก์ชันลบรูปภาพ
//   const handleDelete = (index: number) => {
//     // ลบรูปจาก state โดย filter index ที่ต้องการออก
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ฟังก์ชันแก้ไขรูปภาพ (สามารถเปิด Modal หรือทำอย่างอื่นตามต้องการ)
//   const handleEdit = (index: number) => {
//     console.log("Edit image at index:", index);
//     // TODO: เปิด modal เพื่อแก้ไขรูป หรืออัปโหลดใหม่
//   };

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {/* แสดงรูปภาพที่มีอยู่ */}
//       {images.map((src, index) => (
//         <div
//           key={index}
//           className="relative group flex items-center justify-center border border-gray-200 rounded-xl dark:border-gray-800 p-3"
//         >
//           <img
//             src={src}
//             alt={`Image ${index + 1}`}
//             className="object-cover rounded-xl w-full h-full"
//           />

//           {/* Icons (ลบ / แก้ไข) ปรากฏเมื่อ hover */}
//           <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2">
//             {/* ปุ่มแก้ไข */}
//             <button
//             onClick={() => handleEdit(index)}
//             className="bg-black/70 hover:bg-black text-white rounded p-1"
//             >
//               <Edit2Icon className="w-4 h-4" />
//               </button>
//                           {/* ปุ่มลบ */}
//             <button
//             onClick={() => handleDelete(index)}
//             className="bg-black/70 hover:bg-black text-white rounded p-1"
//             >
//               <TrashBinIcon className="w-4 h-4" />
//               </button>          </div>
//         </div>
//       ))}

//       {/* Card สำหรับเพิ่มรูปภาพ */}
//       <div
//         className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-800 p-3 cursor-pointer hover:border-blue-500"
//         onClick={handleAddClick}
//       >
//         <svg
//           className="text-gray-500 mb-1"
//           width="24"
//           height="24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M12 5v14M5 12h14" />
//         </svg>
//         <span className="text-gray-500">เพิ่มรูปภาพ</span>
//       </div>

//       {/* Hidden file input สำหรับเลือกไฟล์ */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// }



// import React, { useRef, useState, useEffect } from "react";
// import { Edit2Icon, TrashBinIcon } from "../../../icons";

// interface ThreeColumnImageGridProps {
//   initialImages: string[]; // รูปที่มีอยู่แล้ว เช่น [mainImageUrl, ...supplementaryImages]
// }

// export default function ThreeColumnImageGrid({ initialImages }: ThreeColumnImageGridProps) {
//   // สร้าง state สำหรับเก็บรูปภาพทั้งหมด (รวมทั้งรูปที่เพิ่งเพิ่ม)
//   const [images, setImages] = useState<string[]>(initialImages);
//   // ใช้ ref สำหรับ file input ที่จะซ่อน
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   // state สำหรับเก็บ index ของรูปที่จะทำการแก้ไข (ถ้ามี)
//   const [editIndex, setEditIndex] = useState<number | null>(null);

//   // Sync กับ initialImages เมื่อ parent มีการเปลี่ยนแปลง
//   useEffect(() => {
//     setImages(initialImages);
//   }, [initialImages]);

//   // เมื่อคลิก Card "เพิ่มรูปภาพ" ให้ตั้ง editIndex เป็น null แล้วเปิด file input
//   const handleAddClick = () => {
//     setEditIndex(null);
//     fileInputRef.current?.click();
//   };

//   // เมื่อผู้ใช้เลือกไฟล์จากเครื่อง
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // สร้าง URL ชั่วคราวสำหรับแสดงรูปทันที
//       const newImageUrl = URL.createObjectURL(file);
//       if (editIndex !== null) {
//         // แก้ไขรูปภาพที่มีอยู่
//         setImages((prev) => prev.map((img, i) => (i === editIndex ? newImageUrl : img)));
//       } else {
//         // เพิ่มรูปภาพใหม่
//         setImages((prev) => [...prev, newImageUrl]);
//       }
//     }
//     // เคลียร์ค่าใน input เพื่อให้เลือกไฟล์ซ้ำได้ถ้าต้องการ
//     e.target.value = "";
//   };

//   // ฟังก์ชันลบรูปภาพออกจาก state
//   const handleDelete = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // ฟังก์ชันแก้ไขรูปภาพ: ตั้ง editIndex และเปิด file input
//   const handleEdit = (index: number) => {
//     setEditIndex(index);
//     fileInputRef.current?.click();
//   };






//   const handleFileUpload = async (file: File, index: number) => {
//     const formData = new FormData();
  
//     // สร้างชื่อไฟล์ใหม่: productid_2.jpg, productid_3.jpg, ...
//     const newFileName = `${product_id}_${index + 2}${file.name.substring(file.name.lastIndexOf('.'))}`;
  
//     formData.append("image", file, newFileName); // ส่งไฟล์ที่มีชื่อใหม่
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/upload/image/${product_id}`, {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         const newImagePath = data.path;
//         setImages((prev) => prev.map((img, i) => (i === index ? newImagePath : img)));
//       } else {
//         alert("❌ อัปโหลดรูปไม่สำเร็จ: " + data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error uploading image:", error);
//       alert("❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
//     }
//   };
    

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {/* แสดงรูปภาพที่มีอยู่ */}
//       {images.map((src, index) => (
//         <div
//           key={index}
//           className="relative group flex items-center justify-center border border-gray-200 rounded-xl dark:border-gray-800 p-3"
//         >
//           <img
//             src={src}
//             alt={`Image ${index + 1}`}
//             className="object-cover rounded-xl w-full h-full"
//           />
//           {/* Icons (แก้ไข / ลบ) ปรากฏเมื่อ hover */}
//           <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2">
//             <button
//               onClick={() => handleEdit(index)}
//               className="bg-black/70 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800 text-white rounded p-1"
//             >
//               <Edit2Icon className="w-4 h-4" />
//             </button>
//             <button
//               onClick={() => handleDelete(index)}
//               className="bg-black/70 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800 text-white rounded p-1"
//             >
//               <TrashBinIcon className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Card สำหรับเพิ่มรูปภาพ */}
//       <div
//         className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-800 p-3 cursor-pointer hover:border-blue-500"
//         onClick={handleAddClick}
//       >
//         <svg
//           className="text-gray-500 mb-1"
//           width="24"
//           height="24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <path d="M12 5v14M5 12h14" />
//         </svg>
//         <span className="text-gray-500">เพิ่มรูปภาพ</span>
//       </div>

//       {/* Hidden file input สำหรับเลือกไฟล์ */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         className="hidden"
//         accept="image/*"
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// }



// import React, { useRef, useState, useEffect } from "react";
// import { Edit2Icon, TrashBinIcon } from "../../../icons";

// interface ThreeColumnImageGridProps {
//   productId: string;
//   initialImages: string[]; // รูปที่มีอยู่แล้ว เช่น [mainImageUrl, ...supplementaryImages]
// }

// export default function ThreeColumnImageGrid({ productId, initialImages }: ThreeColumnImageGridProps) {
//   const [images, setImages] = useState<string[]>(initialImages);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [editIndex, setEditIndex] = useState<number | null>(null);

//   useEffect(() => {
//     setImages(initialImages);
//   }, [initialImages]);

//   const handleAddClick = () => {
//     setEditIndex(null);
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       if (editIndex !== null) {
//         await handleFileUpload(file, editIndex);
//       } else {
//         await handleFileUpload(file, images.length);
//       }
//     }
//     e.target.value = "";
//   };

//   const handleDelete = async (index: number) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/delete/image/${productId}/${index}`, {
//         method: "DELETE",
//       });

//       const data = await response.json();
//       if (data.success) {
//         setImages((prev) => prev.filter((_, i) => i !== index));
//       } else {
//         alert("❌ ลบรูปไม่สำเร็จ: " + data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error deleting image:", error);
//       alert("❌ เกิดข้อผิดพลาดในการลบรูปภาพ");
//     }
//   };

//   const handleEdit = (index: number) => {
//     setEditIndex(index);
//     fileInputRef.current?.click();
//   };

//   // const handleFileUpload = async (file: File, index: number) => {
//   //   const formData = new FormData();
//   //   const fileExt = file.name.substring(file.name.lastIndexOf("."));
//   //   const newFileName = `${productId}_${index + 1}${fileExt}`;

//   //   formData.append("image", file, newFileName);

//   //   try {
//   //     const response = await fetch(`http://localhost:3000/api/upload/image/${productId}/${index}`, {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     const data = await response.json();
//   //     if (data.success) {
//   //       setImages((prev) =>
//   //         prev.map((img, i) => (i === index ? data.path : img)).concat(index >= prev.length ? [data.path] : [])
//   //       );
//   //     } else {
//   //       alert("❌ อัปโหลดรูปไม่สำเร็จ: " + data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("❌ Error uploading image:", error);
//   //     alert("❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
//   //   }
//   // };

//   const handleFileUpload = async (file: File, index: number) => {
//     const formData = new FormData();
//     formData.append("image", file);
  
//     console.log("📌 Uploading Image:", { productId, index });
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/upload/image/${productId}/${index}`, {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         setImages((prev) =>
//           prev.map((img, i) => (i === index ? data.path : img)).concat(index >= prev.length ? [data.path] : [])
//         );
//       } else {
//         alert("❌ อัปโหลดรูปไม่สำเร็จ: " + data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error uploading image:", error);
//       alert("❌ เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
//     }
//   };
      

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       {images.map((src, index) => (
//         <div key={index} className="relative group flex items-center justify-center border border-gray-200 rounded-xl dark:border-gray-800 p-3">
//           <img src={src} alt={`Image ${index + 1}`} className="object-cover rounded-xl w-full h-full" />
//           <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2">
//             <button onClick={() => handleEdit(index)} className="bg-black/70 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800 text-white rounded p-1">
//               <Edit2Icon className="w-4 h-4" />
//             </button>
//             <button onClick={() => handleDelete(index)} className="bg-black/70 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800 text-white rounded p-1">
//               <TrashBinIcon className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       ))}
//       <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-800 p-3 cursor-pointer hover:border-blue-500" onClick={handleAddClick}>
//         <svg className="text-gray-500 mb-1" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <path d="M12 5v14M5 12h14" />
//         </svg>
//         <span className="text-gray-500">เพิ่มรูปภาพ</span>
//       </div>
//       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
//     </div>
//   );
// }





// export default function ThreeColumnImageGrid() {
//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       <div>
//         <img
//           src="/images/grid-image/image-04.png"
//           alt=" grid"
//           className="border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>

//       <div>
//         <img
//           src="/images/grid-image/image-05.png"
//           alt=" grid"
//           className="border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>

//       <div>
//         <img
//           src="/images/grid-image/image-06.png"
//           alt=" grid"
//           className="border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>
//     </div>
//   );
// }




// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ImageUpload() {
//   const { product_id } = useParams(); // ดึง product_id จาก URL
//   const [images, setImages] = useState<string[]>([]); // เก็บภาพทั้งหมด
//   const [loading, setLoading] = useState(false);

//   // 🔍 ดึงข้อมูลรูปภาพจาก API
//   useEffect(() => {
//     const fetchImages = async () => {
//       if (!product_id) return;
//       try {
//         console.log(`🔍 Fetching images for product_id: ${product_id}`);
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();
//         console.log("📦 Product API Response:", data);

//         if (data.success) {
//           const mainImage = `/products/${data.product.images_main}`; // ภาพหลัก
//           const additionalImages = data.product.supplementary_images.map(
//             (img: string) => `/products/${img}`
//           ); // ภาพรอง

//           setImages([mainImage, ...additionalImages]); // ตั้งค่าภาพทั้งหมด
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, [product_id]);

//   // 📤 อัปโหลดรูปภาพใหม่
//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("product_id", product_id!);

//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:3000/api/upload-image`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         const newImage = `/products/${data.filename}`; // Path รูปภาพใหม่
//         setImages((prevImages) => [...prevImages, newImage]); // เพิ่มรูปภาพใหม่ต่อท้าย
//       } else {
//         console.error("❌ Upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       <label className="text-gray-700 font-medium">รูปภาพสินค้า</label>
//       <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
//         {/* แสดงรูปภาพที่มีอยู่ */}
//         {images.map((imgSrc, index) => (
//           <div key={index} className="relative w-20 h-20 border border-gray-300 rounded-lg overflow-hidden">
//             <img src={imgSrc} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
//           </div>
//         ))}

//         {/* ปุ่มเพิ่มรูปภาพ */}
//         <label className="w-20 h-20 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
//           {loading ? (
//             <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
//           ) : (
//             <span className="material-icons text-gray-400 text-3xl">add</span>
//           )}
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>
//     </div>
//   );
// }







// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ThreeColumnImageGrid({ onImagesUpdate = () => {} }) {
//   const { product_id } = useParams(); // ดึง product_id จาก URL
//   const [images, setImages] = useState<{ filename: string; fileBuffer?: string }[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ 🔍 ดึงข้อมูลรูปภาพที่มีอยู่ในฐานข้อมูล
//   useEffect(() => {
//     const fetchExistingImages = async () => {
//       if (!product_id) return;
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();
  
//         if (data.success) {
//           const existingImages = [];
  
//           if (data.product.images_main) {
//             existingImages.push({
//               filename: data.product.images_main,
//               fileBuffer: `/products/${data.product.images_main}`,
//               existing: true, // ✅ กำหนดให้รู้ว่าเป็นภาพเก่า
//             });
//           }
          
//           if (data.product.supplementary_images) {
//             data.product.supplementary_images.forEach((img) => {
//               existingImages.push({
//                 filename: img,
//                 fileBuffer: `/products/${img}`,
//                 existing: true, // ✅ กำหนดให้รู้ว่าเป็นภาพเก่า
//               });
//             });
//           }
            
//           setImages(existingImages);
//           onImagesUpdate(existingImages);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching images:", error);
//       }
//     };
  
//     fetchExistingImages();
//   }, [product_id]);
  
//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append("image", file);
  
//     // ถ้าไม่มี product_id (สินค้าใหม่) ให้เก็บรูปภาพชั่วคราวใน state
//     if (!product_id) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const newImage = { filename: file.name, fileBuffer: reader.result as string };
//         const updatedImages = [...images, newImage];
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages); // ส่งข้อมูลไปให้ `FormElements.tsx`
//       };
//       reader.readAsDataURL(file);
//       return;
//     }
  
//     // ถ้ามี product_id (สินค้าที่มีอยู่แล้ว) ให้อัปโหลดรูปภาพไปยังเซิร์ฟเวอร์
//     formData.append("product_id", product_id);
  
//     setLoading(true);
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/upload-image-temp`, {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         const newImage = { filename: data.filename, fileBuffer: `data:image/png;base64,${data.fileBuffer}` };
//         const updatedImages = [...images, newImage];
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages); // ส่งข้อมูลไปให้ `FormElements.tsx`
//       } else {
//         console.error("❌ Upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-2">
//       {/* <label className="text-gray-700 font-medium">รูปภาพสินค้า</label> */}
//       <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 p-3 dark:bg-white/[0.03]">
//         {/* ✅ แสดงรูปภาพที่มีอยู่ */}
//         {images.map((img, index) => (
//           <div key={index} className="relative w-full h-28 border border-gray-300 rounded-lg overflow-hidden">
//             <img src={img.fileBuffer} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
//           </div>
//         ))}
  
//         {/* ✅ ปุ่มเพิ่มรูปภาพ */}
//         <label className="w-full h-28 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
//           {loading ? (
//             <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
//           ) : (
//             <span className="material-icons text-gray-400 text-3xl">add</span>
//           )}
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>
//     </div>
//   );
//   }





//Code DeepSeek
// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ThreeColumnImageGrid({ onImagesUpdate = () => {} }) {
//   const { product_id } = useParams(); // ดึง product_id จาก URL
//   const [images, setImages] = useState<{ filename: string; fileBuffer?: string; existing?: boolean }[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ดึงข้อมูลรูปภาพที่มีอยู่ในฐานข้อมูล
//   useEffect(() => {
//     const fetchExistingImages = async () => {
//       if (!product_id) return;
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();

//         if (data.success) {
//           const existingImages = [];

//           if (data.product.main_image) {
//             existingImages.push({
//               filename: data.product.main_image,
//               fileBuffer: `/products/${data.product.main_image}`,
//               existing: true,
//             });
//           }

//           if (data.product.supplementary_images) {
//             data.product.supplementary_images.forEach((img) => {
//               existingImages.push({
//                 filename: img,
//                 fileBuffer: `/products/${img}`,
//                 existing: true,
//               });
//             });
//           }

//           setImages(existingImages);
//           onImagesUpdate(existingImages);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching images:", error);
//       }
//     };

//     fetchExistingImages();
//   }, [product_id]);


//   const handleEditImage = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("product_id", product_id);
//     formData.append("old_filename", images[index].filename);
//     formData.append("image_index", index.toString());
  
//     setLoading(true);
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/update-image`, {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         const updatedImages = [...images];
//         updatedImages[index] = { filename: data.filename, fileBuffer: `data:image/png;base64,${data.fileBuffer}`, existing: true };
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       } else {
//         console.error("❌ Update failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error updating image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleDeleteImage = async (index: number) => {
//     const imageToDelete = images[index];
  
//     if (!product_id) {
//       // ถ้าเป็นสินค้าใหม่ ให้ลบจาก state โดยตรง
//       const updatedImages = images.filter((_, i) => i !== index);
//       setImages(updatedImages);
//       onImagesUpdate(updatedImages);
//       return;
//     }
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/delete-image`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ filename: imageToDelete.filename, product_id }),
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         // 🔄 อัปเดตรายการรูปภาพใหม่
//         const updatedImages = images.filter((_, i) => i !== index);
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       } else {
//         console.error("❌ Delete failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting image:", error);
//     }
//   };
    
//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append("image", file);
  
//     // ถ้าไม่มี product_id (สินค้าใหม่) ให้เก็บรูปภาพชั่วคราวใน state
//     if (!product_id) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const newImage = { filename: file.name, fileBuffer: reader.result as string };
//         const updatedImages = [...images, newImage];
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       };
//       reader.readAsDataURL(file);
//       return;
//     }
  
//     // ถ้ามี product_id (สินค้าที่มีอยู่แล้ว) ให้อัปโหลดรูปภาพไปยังเซิร์ฟเวอร์
//     formData.append("product_id", product_id);
  
//     setLoading(true);
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/upload-image-temp`, {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         const newImage = { filename: data.filename, fileBuffer: `data:image/png;base64,${data.fileBuffer}` };
//         const updatedImages = [...images, newImage];
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       } else {
//         console.error("❌ Upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

    
  
//   return (
//     <div className="space-y-2">
//       <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 p-3 dark:bg-white/[0.03]">
//         {images.map((img, index) => (
//           <div key={index} className="relative w-full h-28 border border-gray-300 rounded-lg overflow-hidden">
//             <img src={img.fileBuffer} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
//             <div className="absolute top-1 right-1 flex gap-1">
//               <label className="bg-white p-1 rounded-full cursor-pointer">
//                 <span className="material-icons text-gray-600 text-sm">edit</span>
//                 <input type="file" accept="image/*" className="hidden" onChange={(e) => handleEditImage(index, e)} />
//               </label>
//               <button
//                 className="bg-white p-1 rounded-full cursor-pointer"
//                 onClick={() => handleDeleteImage(index)}
//               >
//                 <span className="material-icons text-gray-600 text-sm">delete</span>
//               </button>
//             </div>
//           </div>
//         ))}

//         <label className="w-full h-28 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
//           {loading ? (
//             <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
//           ) : (
//             <span className="material-icons text-gray-400 text-3xl">add</span>
//           )}
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>
//     </div>
//   );
// }










// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ThreeColumnImageGrid({ onImagesUpdate = () => {} }) {
//   const { product_id } = useParams();
//   const [images, setImages] = useState<{ filename: string; fileBuffer?: string; existing?: boolean }[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchExistingImages = async () => {
//       if (!product_id) return;
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();

//         if (data.success) {
//           const existingImages = [];

//           if (data.product.main_image) {
//             existingImages.push({
//               filename: data.product.main_image,
//               fileBuffer: `/products/${data.product.main_image}`,
//               existing: true,
//             });
//           }

//           if (data.product.supplementary_images) {
//             data.product.supplementary_images.forEach((img) => {
//               existingImages.push({
//                 filename: img,
//                 fileBuffer: `/products/${img}`,
//                 existing: true,
//               });
//             });
//           }

//           setImages(existingImages);
//           onImagesUpdate(existingImages);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching images:", error);
//       }
//     };

//     fetchExistingImages();
//   }, [product_id]);

//   const handleEditImage = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);
//     formData.append("product_id", product_id);
//     formData.append("old_filename", images[index].filename);
//     formData.append("image_index", index.toString());

//     setLoading(true);

//     try {
//       const response = await fetch(`http://localhost:3000/api/update-image`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         const updatedImages = [...images];
//         updatedImages[index] = { filename: data.filename, fileBuffer: `data:image/png;base64,${data.fileBuffer}`, existing: true };
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       } else {
//         console.error("❌ Update failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error updating image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteImage = async (index: number) => {
//     const imageToDelete = images[index];
  
//     if (!product_id) {
//       const updatedImages = images.filter((_, i) => i !== index);
//       setImages(updatedImages);
//       onImagesUpdate(updatedImages);
//       return;
//     }
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/delete-image`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ filename: imageToDelete.filename, product_id }),
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         // ดึงข้อมูลรูปภาพใหม่หลังจากลบ
//         const fetchResponse = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const fetchData = await fetchResponse.json();
  
//         if (fetchData.success) {
//           const existingImages = [];
  
//           if (fetchData.product.main_image) {
//             existingImages.push({
//               filename: fetchData.product.main_image,
//               fileBuffer: `/products/${fetchData.product.main_image}`,
//               existing: true,
//             });
//           }
  
//           if (fetchData.product.supplementary_images) {
//             fetchData.product.supplementary_images.forEach((img) => {
//               existingImages.push({
//                 filename: img,
//                 fileBuffer: `/products/${img}`,
//                 existing: true,
//               });
//             });
//           }
  
//           setImages(existingImages);
//           onImagesUpdate(existingImages);
//         }
//       } else {
//         console.error("❌ Delete failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting image:", error);
//     }
//   };


//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append("image", file);
  
//     if (!product_id) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const newImage = { filename: file.name, fileBuffer: reader.result as string };
//         const updatedImages = [...images, newImage];
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       };
//       reader.readAsDataURL(file);
//       return;
//     }
  
//     formData.append("product_id", product_id);
  
//     setLoading(true);
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/upload-image-temp`, {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         const newImage = { filename: data.filename, fileBuffer: `data:image/png;base64,${data.fileBuffer}` };
//         const updatedImages = [...images, newImage];
//         setImages(updatedImages);
//         onImagesUpdate(updatedImages);
//       } else {
//         console.error("❌ Upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading image:", error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="space-y-2">
//       <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 p-3 dark:bg-white/[0.03]">
//         {images.map((img, index) => (
//           <div key={index} className="relative w-full h-28 border border-gray-300 rounded-lg overflow-hidden">
//             <img src={img.fileBuffer} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
//             <div className="absolute top-1 right-1 flex gap-1">
//               <label className="bg-white p-1 rounded-full cursor-pointer">
//                 <span className="material-icons text-gray-600 text-sm">edit</span>
//                 <input type="file" accept="image/*" className="hidden" onChange={(e) => handleEditImage(index, e)} />
//               </label>
//               <button
//                 className="bg-white p-1 rounded-full cursor-pointer"
//                 onClick={() => handleDeleteImage(index)}
//               >
//                 <span className="material-icons text-gray-600 text-sm">delete</span>
//               </button>
//             </div>
//           </div>
//         ))}

//         <label className="w-full h-28 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
//           {loading ? (
//             <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
//           ) : (
//             <span className="material-icons text-gray-400 text-3xl">add</span>
//           )}
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ThreeColumnImageGrid({
//   onImagesUpdate = () => {},
//   onDeleteImage = () => {},
//   onEditImage = () => {},
//   onAddImage = () => {},
// }) {
//   const { product_id } = useParams();
//   const [images, setImages] = useState<{ filename: string; fileBuffer?: string; existing?: boolean }[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchExistingImages = async () => {
//       if (!product_id) return;
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();

//         if (data.success) {
//           const existingImages = [];

//           if (data.product.main_image) {
//             existingImages.push({
//               filename: data.product.main_image,
//               fileBuffer: `/products/${data.product.main_image}`,
//               existing: true,
//             });
//           }

//           if (data.product.supplementary_images) {
//             data.product.supplementary_images.forEach((img) => {
//               existingImages.push({
//                 filename: img,
//                 fileBuffer: `/products/${img}`,
//                 existing: true,
//               });
//             });
//           }

//           setImages(existingImages);
//           onImagesUpdate(existingImages);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching images:", error);
//       }
//     };

//     fetchExistingImages();
//   }, [product_id]);

//   const handleEditImage = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const newFileBuffer = reader.result as string;
//       const updatedImages = [...images];
//       updatedImages[index] = { ...updatedImages[index], fileBuffer: newFileBuffer, isEdited: true };
//       setImages(updatedImages);
//       onEditImage(updatedImages[index].filename, newFileBuffer);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDeleteImage = async (index: number) => {
//     const imageToDelete = images[index];
//     const updatedImages = images.filter((_, i) => i !== index);
//     setImages(updatedImages);
//     onDeleteImage(imageToDelete.filename);
//   };

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const newImage = { filename: file.name, fileBuffer: reader.result as string };
//       const updatedImages = [...images, newImage];
//       setImages(updatedImages);
//       onAddImage(newImage);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="space-y-2">
//       <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 p-3 dark:bg-white/[0.03]">
//         {images.map((img, index) => (
//           <div key={index} className="relative w-full h-28 border border-gray-300 rounded-lg overflow-hidden">
//             <img src={img.fileBuffer} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
//             <div className="absolute top-1 right-1 flex gap-1">
//               <label className="bg-white p-1 rounded-full cursor-pointer">
//                 <span className="material-icons text-gray-600 text-sm">edit</span>
//                 <input type="file" accept="image/*" className="hidden" onChange={(e) => handleEditImage(index, e)} />
//               </label>
//               <button
//                 className="bg-white p-1 rounded-full cursor-pointer"
//                 onClick={() => handleDeleteImage(index)}
//               >
//                 <span className="material-icons text-gray-600 text-sm">delete</span>
//               </button>
//             </div>
//           </div>
//         ))}

//         <label className="w-full h-28 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
//           {loading ? (
//             <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
//           ) : (
//             <span className="material-icons text-gray-400 text-3xl">add</span>
//           )}
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function ThreeColumnImageGrid({
//   onImagesUpdate = () => {},
//   onDeleteImage = () => {},
//   onEditImage = () => {},
//   onAddImage = () => {},
// }) {
//   const { product_id } = useParams();
//   const [images, setImages] = useState<{ filename: string; fileBuffer?: string; existing?: boolean }[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchExistingImages = async () => {
//       if (!product_id) return;
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();

//         if (data.success) {
//           const existingImages = [];

//           if (data.product.main_image) {
//             existingImages.push({
//               filename: data.product.main_image,
//               fileBuffer: `/products/${data.product.main_image}`,
//               existing: true,
//             });
//           }

//           if (data.product.supplementary_images) {
//             data.product.supplementary_images.forEach((img) => {
//               existingImages.push({
//                 filename: img,
//                 fileBuffer: `/products/${img}`,
//                 existing: true,
//               });
//             });
//           }

//           setImages(existingImages);
//           onImagesUpdate(existingImages);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching images:", error);
//       }
//     };

//     fetchExistingImages();
//   }, [product_id]);

//   const handleEditImage = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const newFileBuffer = reader.result as string;
//       const updatedImages = [...images];
//       updatedImages[index] = { ...updatedImages[index], fileBuffer: newFileBuffer, isEdited: true };
//       setImages(updatedImages);
//       onEditImage(updatedImages[index].filename, newFileBuffer);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDeleteImage = async (index: number) => {
//     const imageToDelete = images[index];
//     const updatedImages = images.filter((_, i) => i !== index);
//     setImages(updatedImages);
//     onDeleteImage(imageToDelete.filename);
//   };

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const newImage = { filename: file.name, fileBuffer: reader.result as string };
//       const updatedImages = [...images, newImage];
//       setImages(updatedImages);
//       onAddImage(newImage);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div className="space-y-2">
//       <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 p-3 dark:bg-white/[0.03]">
//         {images.map((img, index) => (
//           <div key={index} className="relative w-full h-28 border border-gray-300 rounded-lg overflow-hidden">
//             <img src={img.fileBuffer} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
//             <div className="absolute top-1 right-1 flex gap-1">
//               <label className="bg-white p-1 rounded-full cursor-pointer">
//                 <span className="material-icons text-gray-600 text-sm">edit</span>
//                 <input type="file" accept="image/*" className="hidden" onChange={(e) => handleEditImage(index, e)} />
//               </label>
//               <button
//                 className="bg-white p-1 rounded-full cursor-pointer"
//                 onClick={() => handleDeleteImage(index)}
//               >
//                 <span className="material-icons text-gray-600 text-sm">delete</span>
//               </button>
//             </div>
//           </div>
//         ))}

//         <label className="w-full h-28 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
//           {loading ? (
//             <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
//           ) : (
//             <span className="material-icons text-gray-400 text-3xl">add</span>
//           )}
//           <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//         </label>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ThreeColumnImageGrid({ 
  onImagesUpdate = () => {},
  onDeleteImage = () => {},
  onEditImage = () => {},
  onAddImage = () => {},
}) {
  const { product_id } = useParams();
  const [images, setImages] = useState<{ filename: string; fileBuffer?: string; existing?: boolean }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExistingImages = async () => {
      if (!product_id) return;
      try {
        const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
        const data = await response.json();

        if (data.success) {
          const existingImages = [];

          if (data.product.main_image) {
            existingImages.push({
              filename: data.product.main_image,
              fileBuffer: `/products/${data.product.main_image}`,
              existing: true,
            });
          }

          if (data.product.supplementary_images) {
            data.product.supplementary_images.forEach((img) => {
              existingImages.push({
                filename: img,
                fileBuffer: `/products/${img}`,
                existing: true,
              });
            });
          }

          setImages(existingImages);
          onImagesUpdate(existingImages);
        }
      } catch (error) {
        console.error("🚨 Error fetching images:", error);
      }
    };

    fetchExistingImages();
  }, [product_id]);

  const handleEditImage = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newFileBuffer = reader.result as string;
      const updatedImages = [...images];
      updatedImages[index] = { ...updatedImages[index], fileBuffer: newFileBuffer, isEdited: true };
      setImages(updatedImages);
      onEditImage(updatedImages[index].filename, newFileBuffer);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = async (index: number) => {
    const imageToDelete = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onDeleteImage(imageToDelete.filename);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newImage = { filename: file.name, fileBuffer: reader.result as string };
      const updatedImages = [...images, newImage];
      setImages(updatedImages);
      onAddImage(newImage);
      onImagesUpdate(updatedImages);
    };
    reader.readAsDataURL(file);
  };

};


  // onImagesUpdate = () => {} }) {
  // const { product_id } = useParams();
  // const [images, setImages] = useState<{ filename: string; fileBuffer: string }[]>([]);
  // const [loading, setLoading] = useState(false);

  // const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const newImage = { filename: file.name, fileBuffer: reader.result as string };
  //     const updatedImages = [...images, newImage];
  //     setImages(updatedImages);
  //     onImagesUpdate(updatedImages);
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 p-3 dark:bg-white/[0.03]">
        {images.map((img, index) => (
          <div key={index} className="relative w-full h-28 border border-gray-300 rounded-lg overflow-hidden">
            <img src={img.fileBuffer} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <label className="w-full h-28 border border-dashed border-gray-400 flex items-center justify-center rounded-lg cursor-pointer">
          {loading ? (
            <span className="material-icons text-gray-400 text-3xl animate-spin">sync</span>
          ) : (
            <span className="material-icons text-gray-400 text-3xl">add</span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  );
}
