// export default function ResponsiveImage() {
//   return (
//     <div className="relative">
//       <div className="overflow-hidden">
//         <img
//           src="/images/grid-image/image-01.png"
//           alt="Cover"
//           className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
//         />
//       </div>
//     </div>
//   );
// }


// src/components/ResponsiveImages.tsx
import React from "react";

interface ResponsiveImagesProps {
  // รับ array ของ URL รูปภาพ
  images: string[];
}

export default function ResponsiveImages({ images }: ResponsiveImagesProps) {
  // กำหนด fallback สำหรับรูปที่หายไป
  const fallbackImages = [
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+2",
    "https://via.placeholder.com/150/00FF00/FFFFFF?text=Image+3",
  ];

  // ถ้า images น้อยกว่า 3 ให้เติมด้วย fallback
  const displayImages =
    images.length >= 3 ? images : [...images, ...fallbackImages].slice(0, 3);

  return (
    <div className="flex justify-center items-center space-x-2">
      {displayImages.map((src, index) => (
        <div key={index} className="flex-1">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-auto border border-gray-200 rounded-xl dark:border-gray-800"
          />
        </div>
      ))}
    </div>
  );
}
