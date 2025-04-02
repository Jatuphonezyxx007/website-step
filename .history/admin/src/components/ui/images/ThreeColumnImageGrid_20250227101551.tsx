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


import React from "react";

interface ThreeColumnImageGridProps {
  images: string[];
}

export default function ThreeColumnImageGrid({ images }: ThreeColumnImageGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((src, index) => (
        <div key={index}>
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="border border-gray-200 rounded-xl dark:border-gray-800"
          />
        </div>
      ))}
    </div>
  );
}
