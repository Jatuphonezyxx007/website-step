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


// src/components/ResponsiveImage.tsx
import React from "react";

interface ResponsiveImageProps {
  srcs: string[];
}

export default function ResponsiveImage({ srcs }: ResponsiveImageProps) {
  return (
    <div className="flex justify-start gap-2">
      {srcs.map((src, index) => (
        <div key={index} className="relative w-40 text-center">
          <div className="overflow-hidden">
            <img
              src={src}
              alt={`Cover ${index + 1}`}
              className="w-full mx-auto border border-gray-200 rounded-xl dark:border-gray-800"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
