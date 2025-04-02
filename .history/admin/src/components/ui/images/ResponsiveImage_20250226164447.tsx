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
  src: string;
}

export default function ResponsiveImage({ src }: ResponsiveImageProps) {
  return (
    <div className="relative w-40 mx-auto text-center">
      <div className="overflow-hidden">
        <img
          src={src}
          alt="Cover"
          className="w-full mx-auto border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
