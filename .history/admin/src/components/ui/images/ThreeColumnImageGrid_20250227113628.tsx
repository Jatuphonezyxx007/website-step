// import React from "react";

// interface ResponsiveImageProps {
//   src: string;
// }

// export default function ThreeColumnImageGrid({ src }: ResponsiveImageProps) {
//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//       <div>
//         <img
//           src={src}
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



import React, { useRef, useState, useEffect } from "react";

// ประกาศ Interface สำหรับ prop images เป็น array ของ string
interface ThreeColumnImageGridProps {
  initialImages: string[]; // รูปที่มีอยู่แล้ว เช่น [mainImageUrl, ...supplementaryImages]
}

export default function ThreeColumnImageGrid({ initialImages }: ThreeColumnImageGridProps) {
  // สร้าง state สำหรับเก็บรูปภาพทั้งหมด (รวมทั้งรูปที่เพิ่งเพิ่ม)
  const [images, setImages] = useState<string[]>(initialImages);

  // ใช้ useRef สำหรับ file input ที่จะซ่อน
  const fileInputRef = useRef<HTMLInputElement>(null);

  // หาก parent มีการเปลี่ยน initialImages ให้ sync กับ state ภายใน
  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  // เมื่อคลิก card "เพิ่มรูปภาพ" ให้ trigger file input
  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  // เมื่อผู้ใช้เลือกไฟล์รูปภาพจากเครื่อง
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // สร้าง URL ชั่วคราวสำหรับแสดงรูปทันที (ไม่ได้อัปโหลดไปเซิร์ฟเวอร์)
      const newImageUrl = URL.createObjectURL(file);
      setImages((prev) => [...prev, newImageUrl]);
    }
  };

  // ฟังก์ชันลบรูปภาพ
  const handleDelete = (index: number) => {
    // ลบรูปจาก state โดย filter index ที่ต้องการออก
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ฟังก์ชันแก้ไขรูปภาพ (สามารถเปิด Modal หรือทำอย่างอื่นตามต้องการ)
  const handleEdit = (index: number) => {
    console.log("Edit image at index:", index);
    // TODO: เปิด modal เพื่อแก้ไขรูป หรืออัปโหลดใหม่
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {/* แสดงรูปภาพที่มีอยู่ */}
      {images.map((src, index) => (
        <div
          key={index}
          className="relative group flex items-center justify-center border border-gray-200 rounded-xl dark:border-gray-800 p-3"
        >
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="object-cover rounded-xl w-full h-full"
          />

          {/* Icons (ลบ / แก้ไข) ปรากฏเมื่อ hover */}
          <div className="absolute top-2 right-2 hidden group-hover:flex space-x-2">
            {/* ปุ่มแก้ไข */}
            <button
              onClick={() => handleEdit(index)}
              className="bg-black/70 hover:bg-black text-white rounded p-1"
            >
              {/* ไอคอนดินสอ (Edit) */}
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a1.207 1.207 0 00-1.706 0l-1.22 1.22 3.415 3.415 1.22-1.22a1.207 1.207 0 000-1.706l-1.709-1.71zM2 13.5V16h2.5l9.349-9.349-3.415-3.415L2 13.5z" />
              </svg>
            </button>
            {/* ปุ่มลบ */}
            <button
              onClick={() => handleDelete(index)}
              className="bg-black/70 hover:bg-black text-white rounded p-1"
            >
              {/* ไอคอนถังขยะ (Delete) */}
              <svg
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" />
                <path d="M4.118 4.5A1.5 1.5 0 015.5 3h5a1.5 1.5 0 011.382.5H14.5a.5.5 0 010 1h-.528l-.448 8.506A2 2 0 0111.53 15H4.47a2 2 0 01-1.994-1.994L2.03 4.5H1.5a.5.5 0 010-1h2.618zM3.532 5.5l.445 8.41c.01.2.177.36.375.36h7.06a.38.38 0 00.375-.36l.445-8.41H3.532z" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* Card สำหรับเพิ่มรูปภาพ */}
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl dark:border-gray-800 p-3 cursor-pointer hover:border-blue-500"
        onClick={handleAddClick}
      >
        <svg
          className="text-gray-500 mb-1"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span className="text-gray-500">เพิ่มรูปภาพ</span>
      </div>

      {/* Hidden file input สำหรับเลือกไฟล์ */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
