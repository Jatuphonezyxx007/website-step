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
          // src={src}
          src="https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3001x4000+0+0/resize/1100/quality/50/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F08%2Ffe%2Fc10ab5cf4a719f0fa0f902afc885%2Fag-katiatemkin-85070.jpg"
          alt="Cover"
          className="w-full mx-auto border border-gray-200 rounded-xl dark:border-gray-800"
        />
      </div>
    </div>
  );
}
