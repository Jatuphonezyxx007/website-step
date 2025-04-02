// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // นำเข้า useParams
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams(); // ดึงค่า id จาก URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/products/${product_id}`) // API สำหรับดึงข้อมูลสินค้าตาม id
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Product not found");
//         }
//         return response.json();
//       })
//       .then((data) => setProduct(data))
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);
  
//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="">
//       <h1>{product.name}</h1>
//       <p>{product.description}</p>
//       <p>{product.price}</p>
//       <img src={`/products${product.image_path}`} alt={product.name} />
//     </div>
//   );
// };

// export default ProductDetail;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // นำเข้า useParams
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams(); // ดึงค่า id จาก URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/products/${id}`) // เปลี่ยนจาก product_id เป็น id
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Product not found");
//         }
//         return response.json();
//       })
//       .then((data) => setProduct(data.product)) // ต้องเข้าถึง data.product เพราะ API ส่งข้อมูลเป็น { success: true, product }
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]); // dependency ควรเป็น id

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="container">
//       <h1>{product.product_name}</h1> {/* เปลี่ยนเป็น product_name ตาม database */}
//       <p>{product.detail}</p> {/* เปลี่ยนจาก description เป็น detail */}
//       <p>{product.category_name}</p>
//       <p>{product.series_name}</p>
//       <img src={`/products${product.images_main}`} alt={product.product_name} />
//       <h3>Additional Images</h3>
//       {product.supplementary_images && product.supplementary_images.map((img, index) => (
//         <img key={index} src={`/products${img}`} alt={`Supplementary ${index}`} />
//       ))}
//     </div>
//   );
// };

// export default ProductDetail;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "swiper/css/autoplay";
// import "./ProductDetail.css";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/products/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Product not found");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setProduct(data.product);
//       })
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);

//   if (!product) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-4 py-8 pt-[200px]">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
//         {/* Column: Product Images */}
//         <div className="flex flex-col items-center">
//           {/* Swiper หลัก */}
//           <Swiper
//             style={{
//               "--swiper-navigation-color": "#000",
//               "--swiper-pagination-color": "#000",
//             }}
//             loop={true}
//             spaceBetween={10}
//             navigation={true}
//             thumbs={{ swiper: thumbsSwiper }}
//             autoplay={{ delay: 3000, disableOnInteraction: false }} // ✅ ทำให้ Swiper เลื่อนอัตโนมัต
//             modules={[FreeMode, Navigation, Thumbs, Autoplay]}
//             className="mySwiper2 w-full max-w-md"
//           >
//             <SwiperSlide>
//               <img
//                 className="w-full rounded-lg"
//                 src={`http://localhost:3000/products/${product.images_main}`}
//                 alt={product.product_name}
//               />
//             </SwiperSlide>
//             {product.supplementary_images &&
//               product.supplementary_images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     className="w-full rounded-lg"
//                     src={`http://localhost:3000/products/${img}`}
//                     alt={`Supplementary ${index}`}
//                   />
//                 </SwiperSlide>
//               ))}
//           </Swiper>

//           {/* Swiper Thumbnail */}
//           <Swiper
//             onSwiper={setThumbsSwiper}
//             loop={true}
//             spaceBetween={10}
//             slidesPerView={4}
//             freeMode={true}
//             watchSlidesProgress={true}
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="mySwiper w-full max-w-md mt-4"
//           >
//             <SwiperSlide>
//               <img
//                 className="w-20 h-20 cursor-pointer border rounded-lg hover:border-gray-500"
//                 src={`http://localhost:3000/products/${product.images_main}`}
//                 alt="Main Thumbnail"
//               />
//             </SwiperSlide>
//             {product.supplementary_images &&
//               product.supplementary_images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     className="w-20 h-20 cursor-pointer border rounded-lg hover:border-gray-500"
//                     src={`http://localhost:3000/products/${img}`}
//                     alt={`Thumbnail ${index}`}
//                   />
//                 </SwiperSlide>
//               ))}
//           </Swiper>
//         </div>

//         {/* Column: Product Details */}
//         <div className="flex flex-col justify-center">
//           <h1 className="text-2xl font-bold">{product.product_name}</h1>
//           <p className="text-gray-600 mt-2">{product.detail}</p>
//           <p className="text-sm text-gray-500 mt-2">หมวดหมู่: {product.category_name}</p>
//           <p className="text-sm text-gray-500">ซีรีส์: {product.series_name}</p>
//         </div>

//       </div>
//       <hr className="my-3 border-t border-gray-300" />

//       3D Viewer

//     </div>
//   );
// };

// export default ProductDetail;
import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [model, setModel] = useState(null); // เก็บโมเดล 3D

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.product);
        if (data.product.model_3d) {
          loadModel(`http://localhost:3000/models/${data.product.model_3d}`);
        }
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  // โหลดโมเดล 3D จาก API
  const loadModel = (url) => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => setModel(gltf.scene),
      undefined,
      (error) => console.error("Error loading 3D model:", error)
    );
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pt-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Column: Product Images */}
        <div className="flex flex-col items-center">
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2 w-full max-w-md"
          >
            <SwiperSlide>
              <img
                className="w-full rounded-lg"
                src={`http://localhost:3000/products/${product.images_main}`}
                alt={product.product_name}
              />
            </SwiperSlide>
            {product.supplementary_images &&
              product.supplementary_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="w-full rounded-lg"
                    src={`http://localhost:3000/products/${img}`}
                    alt={`Supplementary ${index}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper w-full max-w-md mt-4"
          >
            <SwiperSlide>
              <img
                className="w-20 h-20 cursor-pointer border rounded-lg hover:border-gray-500"
                src={`http://localhost:3000/products/${product.images_main}`}
                alt="Main Thumbnail"
              />
            </SwiperSlide>
            {product.supplementary_images &&
              product.supplementary_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="w-20 h-20 cursor-pointer border rounded-lg hover:border-gray-500"
                    src={`http://localhost:3000/products/${img}`}
                    alt={`Thumbnail ${index}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Column: Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{product.product_name}</h1>
          <p className="text-gray-600 mt-2">{product.detail}</p>
          <p className="text-sm text-gray-500 mt-2">หมวดหมู่: {product.category_name}</p>
          <p className="text-sm text-gray-500">ซีรีส์: {product.series_name}</p>
        </div>
      </div>

      <hr className="my-3 border-t border-gray-300" />

      {/* 3D Viewer */}
      <h2 className="text-2xl font-bold text-center mt-6">3D Viewer</h2>
      <div className="w-full flex justify-center mt-4">
        {model ? (
          <Canvas className="w-full max-w-3xl h-[400px]">
            <Suspense fallback={null}>
              <primitive object={model} scale={1} />
              <OrbitControls />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        ) : (
          <p className="text-center text-gray-500">ไม่มีโมเดล 3D สำหรับสินค้านี้</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
