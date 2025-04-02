// import ComponentCard from "../../common/ComponentCard";
// import { useDropzone } from "react-dropzone";

// const DropzoneComponent: React.FC = () => {
//   const onDrop = (acceptedFiles: File[]) => {
//     console.log("Files dropped:", acceptedFiles);
//     // Handle file uploads here
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/png": [],
//       "image/jpeg": [],
//       "image/webp": [],
//       "image/svg+xml": [],
//     },
//   });
//   return (
//     <ComponentCard title="รูปภาพหลัก">
//       <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
//         <form
//           {...getRootProps()}
//           className={`dropzone rounded-xl   border-dashed border-gray-300 p-7 lg:p-10
//         ${
//           isDragActive
//             ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
//             : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
//         }
//       `}
//           id="demo-upload"
//         >
//           {/* Hidden Input */}
//           <input {...getInputProps()} />

//           <div className="dz-message flex flex-col items-center !m-0">
//             {/* Icon Container */}
//             <div className="mb-[22px] flex justify-center">
//               <div className="flex h-[68px] w-[68px]  items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
//                 <svg
//                   className="fill-current"
//                   width="29"
//                   height="28"
//                   viewBox="0 0 29 28"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
//                   />
//                 </svg>
//               </div>
//             </div>

//             {/* Text Content */}
//             <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
//               {isDragActive ? "วางรูปที่นี่" : "ลากรูปภาพหรืออัพโหลดไฟล์ภาพที่นี่"}
//             </h4>

//             <span className=" text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
//             ลากและวางรูปภาพ PNG, JPG, WebP, SVG ที่นี่ หรืออัพโหลดไฟล์
//             </span>

//             <span className="font-medium underline text-theme-sm text-brand-500">
//               เรียกดู
//             </span>
//           </div>
//         </form>
//       </div>
//     </ComponentCard>
//   );
// };

// export default DropzoneComponent;


// import React, { useState, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import { useDropzone } from "react-dropzone";

// const DropzoneComponent: React.FC = () => {
//   const [previews, setPreviews] = useState<string[]>([]);

//   const onDrop = (acceptedFiles: File[]) => {
//     console.log("Files dropped:", acceptedFiles);
//     // สร้าง URL สำหรับ preview จากไฟล์ที่ถูก drop
//     const previewUrls = acceptedFiles.map((file) =>
//       URL.createObjectURL(file)
//     );
//     setPreviews(previewUrls);
//     // Handle file uploads here if needed
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/png": [],
//       "image/jpeg": [],
//       "image/webp": [],
//       "image/svg+xml": [],
//     },
//   });

//   // ทำการ revoke object URLs เมื่อ component unmount เพื่อลด memory leak
//   useEffect(() => {
//     return () => {
//       previews.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [previews]);

//   return (
//     <ComponentCard title="รูปภาพหลัก">
//       <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
//         <form
//           {...getRootProps()}
//           className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
//             ${
//               isDragActive
//                 ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
//                 : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
//             }
//           `}
//           id="demo-upload"
//         >
//           <input {...getInputProps()} />
//           {previews.length > 0 ? (
//             <div className="flex flex-col items-center">
//               {previews.map((src, idx) => (
//                 <img
//                   key={idx}
//                   src={src}
//                   alt={`Preview ${idx}`}
//                   className="mb-2 w-full max-h-60 object-contain rounded"
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="dz-message flex flex-col items-center !m-0">
//               <div className="mb-[22px] flex justify-center">
//                 <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
//                   <svg
//                     className="fill-current"
//                     width="29"
//                     height="28"
//                     viewBox="0 0 29 28"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       clipRule="evenodd"
//                       d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
//                 {isDragActive ? "วางรูปที่นี่" : "ลากรูปภาพหรืออัพโหลดไฟล์ภาพที่นี่"}
//               </h4>
//               <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
//                 ลากและวางรูปภาพ PNG, JPG, WebP, SVG ที่นี่ หรืออัพโหลดไฟล์
//               </span>
//               <span className="font-medium underline text-theme-sm text-brand-500">
//                 เรียกดู
//               </span>
//             </div>
//           )}
//         </form>
//       </div>
//     </ComponentCard>
//   );
// };

// export default DropzoneComponent;



// import React, { useState, useRef, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import { useDropzone } from "react-dropzone";
// import "@google/model-viewer"; // Import model-viewer

// export default function Dropzone3D() {
//   const [modelUrl, setModelUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const onDrop = (acceptedFiles: File[]) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const url = URL.createObjectURL(file);
//       setModelUrl(url);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "model/gltf-binary": [".glb"],
//       "model/gltf+json": [".gltf"],
//     },
//   });

//   // เคลียร์ object URL เมื่อ component ถูก unmount
//   useEffect(() => {
//     return () => {
//       if (modelUrl) {
//         URL.revokeObjectURL(modelUrl);
//       }
//     };
//   }, [modelUrl]);

//   return (
//     <ComponentCard title="3D Model Viewer">
//       <div
//         {...getRootProps()}
//         className={`transition border border-dashed rounded-xl p-7 lg:p-10 cursor-pointer hover:border-blue-500 ${
//           isDragActive
//             ? "border-blue-500 bg-gray-100 dark:bg-gray-800"
//             : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {modelUrl ? (
//           <model-viewer
//             src={modelUrl}
//             alt="3D Model"
//             auto-rotate
//             camera-controls
//             style={{ width: "100%", height: "400px" }}
//           ></model-viewer>
//         ) : (
//           <div className="flex flex-col items-center">
//             <p className="text-gray-500">
//               {isDragActive
//                 ? "วางไฟล์ 3D model ที่นี่"
//                 : "ลากไฟล์ 3D model (.glb, .gltf) หรือคลิกเพื่อเลือกไฟล์"}
//             </p>
//           </div>
//         )}
//       </div>
//     </ComponentCard>
//   );
// }



// // src/components/form/form-elements/Dropzone.tsx
// import React, { useState, useRef, useEffect, Suspense } from "react";
// import { useDropzone } from "react-dropzone";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useGLTF } from "@react-three/drei";
// import ComponentCard from "../../common/ComponentCard";

// // Component สำหรับโหลดโมเดล 3D ด้วย useGLTF
// function Model({ url }: { url: string }) {
//   // useGLTF โหลดโมเดลจาก URL ที่ให้มา
//   const { scene } = useGLTF(url);
//   return <primitive object={scene} />;
// }

// export default function Dropzone3D() {
//   const [modelUrl, setModelUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // เมื่อผู้ใช้ลากหรือเลือกไฟล์
//   const onDrop = (acceptedFiles: File[]) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const url = URL.createObjectURL(file);
//       setModelUrl(url);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "model/gltf-binary": [".glb"],
//       "model/gltf+json": [".gltf"],
//     },
//   });

//   // เคลียร์ object URL เมื่อ component ถูก unmount
//   useEffect(() => {
//     return () => {
//       if (modelUrl) {
//         URL.revokeObjectURL(modelUrl);
//       }
//     };
//   }, [modelUrl]);

//   return (
//     <ComponentCard title="3D Model Viewer">
//       <div
//         {...getRootProps()}
//         className={`transition border border-dashed rounded-xl p-7 lg:p-10 cursor-pointer hover:border-blue-500 ${
//           isDragActive
//             ? "border-blue-500 bg-gray-100 dark:bg-gray-800"
//             : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {modelUrl ? (
//           <div style={{ width: "100%", height: "400px" }}>
//             <Canvas>
//               <ambientLight intensity={0.5} />
//               <pointLight position={[10, 10, 10]} />
//               <Suspense fallback={<span>Loading 3D model...</span>}>
//                 <Model url={modelUrl} />
//               </Suspense>
//               <OrbitControls autoRotate autoRotateSpeed={2} />
//             </Canvas>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center">
//             <p className="text-gray-500">
//               {isDragActive
//                 ? "วางไฟล์ 3D model ที่นี่"
//                 : "ลากไฟล์ 3D model (.glb, .gltf) หรือคลิกเพื่อเลือกไฟล์"}
//             </p>
//           </div>
//         )}
//       </div>
//     </ComponentCard>
//   );
// }



// import React, { useState, useRef, useEffect, Suspense } from "react";
// import { useDropzone } from "react-dropzone";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
// import ComponentCard from "../../common/ComponentCard";

// // Component Model สำหรับโหลดโมเดล glTF
// function Model({ url }: { url: string }) {
//   const { scene } = useGLTF(url);
//   return <primitive object={scene} />;
// }

// export default function Dropzone3D() {
//   const [modelUrl, setModelUrl] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const onDrop = (acceptedFiles: File[]) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       const url = URL.createObjectURL(file);
//       setModelUrl(url);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "model/gltf-binary": [".glb"],
//       "model/gltf+json": [".gltf"],
//     },
//   });

//   useEffect(() => {
//     return () => {
//       if (modelUrl) {
//         URL.revokeObjectURL(modelUrl);
//       }
//     };
//   }, [modelUrl]);

//   return (
//     <ComponentCard title="3D Model Viewer">
//       <div
//         {...getRootProps()}
//         className={`transition border border-dashed rounded-xl p-7 lg:p-10 cursor-pointer hover:border-blue-500 ${
//           isDragActive
//             ? "border-blue-500 bg-gray-100 dark:bg-gray-800"
//             : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
//         }`}
//       >
//         <input {...getInputProps()} />
//         {modelUrl ? (
//           <div style={{ width: "100%", height: "400px" }}>
//             <Canvas>
//               {/* ตั้ง background ให้กับ Canvas */}
//               <color attach="background" args={["#ffffff"]} />
//               {/* เพิ่มแสง */}
//               <ambientLight intensity={0.5} />
//               <pointLight position={[10, 10, 10]} />
//               {/* ตั้งกล้องเริ่มต้น */}
//               <PerspectiveCamera makeDefault position={[0, 0, 5]} />
//               <Suspense fallback={<span>Loading 3D model...</span>}>
//                 <Model url={modelUrl} />
//               </Suspense>
//               {/* OrbitControls สำหรับหมุนและซูม */}
//               <OrbitControls autoRotate autoRotateSpeed={2} />
//             </Canvas>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center">
//             <p className="text-gray-500">
//               {isDragActive
//                 ? "วางไฟล์ 3D model ที่นี่"
//                 : "ลากไฟล์ 3D model (.glb, .gltf) หรือคลิกเพื่อเลือกไฟล์"}
//             </p>
//           </div>
//         )}
//       </div>
//     </ComponentCard>
//   );
// }
