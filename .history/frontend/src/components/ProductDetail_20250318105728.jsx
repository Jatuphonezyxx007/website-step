// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom"; // นำเข้า useParams
// // import './ProductDetail.css';

// // const ProductDetail = () => {
// //   const { id } = useParams(); // ดึงค่า id จาก URL
// //   const [product, setProduct] = useState(null);

// //   useEffect(() => {
// //     fetch(`http://localhost:3000/api/products/${product_id}`) // API สำหรับดึงข้อมูลสินค้าตาม id
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error("Product not found");
// //         }
// //         return response.json();
// //       })
// //       .then((data) => setProduct(data))
// //       .catch((error) => console.error("Error fetching product:", error));
// //   }, [id]);
  
// //   if (!product) return <div>Loading...</div>;

// //   return (
// //     <div className="">
// //       <h1>{product.name}</h1>
// //       <p>{product.description}</p>
// //       <p>{product.price}</p>
// //       <img src={`/products${product.image_path}`} alt={product.name} />
// //     </div>
// //   );
// // };

// // export default ProductDetail;
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom"; // นำเข้า useParams
// // import './ProductDetail.css';

// // const ProductDetail = () => {
// //   const { id } = useParams(); // ดึงค่า id จาก URL
// //   const [product, setProduct] = useState(null);

// //   useEffect(() => {
// //     fetch(`http://localhost:3000/api/products/${id}`) // เปลี่ยนจาก product_id เป็น id
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error("Product not found");
// //         }
// //         return response.json();
// //       })
// //       .then((data) => setProduct(data.product)) // ต้องเข้าถึง data.product เพราะ API ส่งข้อมูลเป็น { success: true, product }
// //       .catch((error) => console.error("Error fetching product:", error));
// //   }, [id]); // dependency ควรเป็น id

// //   if (!product) return <div>Loading...</div>;

// //   return (
// //     <div className="container">
// //       <h1>{product.product_name}</h1> {/* เปลี่ยนเป็น product_name ตาม database */}
// //       <p>{product.detail}</p> {/* เปลี่ยนจาก description เป็น detail */}
// //       <p>{product.category_name}</p>
// //       <p>{product.series_name}</p>
// //       <img src={`/products${product.images_main}`} alt={product.product_name} />
// //       <h3>Additional Images</h3>
// //       {product.supplementary_images && product.supplementary_images.map((img, index) => (
// //         <img key={index} src={`/products${img}`} alt={`Supplementary ${index}`} />
// //       ))}
// //     </div>
// //   );
// // };

// // export default ProductDetail;



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
//                 src={`http://localhost:3000/products/${product.main_image}`}
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
//                 src={`http://localhost:3000/products/${product.main_image}`}
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
//         <div className="flex flex-col justify-start">
//           {/* 🏆 ชื่อสินค้า */}
//           <h1 className="text-3xl font-bold">{product.product_name}</h1>
          
//           <br />
//           <hr />
//           {/* 🔥 รายละเอียดสินค้า */}
//           <p className="text-gray-600 mt-4 whitespace-pre-line">{product.detail}</p>
          
//           {/* 📝 รายละเอียดสเปคสินค้าแบบ Bullet Points พร้อมจัดฟอนต์ให้ตรงกัน */}
//   {/* <ul className="list-none ml-6 space-y-2 text-gray-700 mt-3">
//   {product.detail?.split("\n").map((spec, index) => (
//     spec.trim() && (
//       <li key={index} className="flex items-center gap-2">
//         <span className="text-blue-500 font-bold">•</span>
//         <span className="flex-1">{spec}</span>
//       </li>
//     )
//   ))}
// </ul> */}
// </div>
// </div>


//       <hr className="my-3 border-t border-gray-300" />

//       <div className="mt-4">
//         <h1>Hello World!</h1>
//       </div>

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
//   const [existingModelUrl, setExistingModelUrl] = useState(null);

//   // ฟังก์ชันดึงข้อมูล 3D model
//   const fetch3DModel = async (productId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${productId}/3d`);
//       const data = await response.json();
//       if (data.success && data.path) {
//         setExistingModelUrl(`http://localhost:3000${data.path}`);
//       }
//     } catch (error) {
//       console.error("🚨 Error fetching 3D model:", error);
//     }
//   };

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
//         // ดึงข้อมูล 3D model หลังจากได้ product id
//         fetch3DModel(data.product.id);
//       })
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);

//   if (!product) return <div>Loading...</div>;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import "./ProductDetail.css";
import '@google/model-viewer'; // นำเข้า model-viewer

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [existingModelUrl, setExistingModelUrl] = useState(null);

  // ฟังก์ชันดึงข้อมูล 3D model
  const fetch3DModel = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}/3d`);
      const data = await response.json();
      if (data.success && data.path) {
        // รวม base URL กับ path ที่ได้จาก API
        setExistingModelUrl(`http://localhost:3000${data.path}`);
        console.log("3D Model URL:", `http://localhost:3000${data.path}`);
      }
    } catch (error) {
      console.error("🚨 Error fetching 3D model:", error);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data.product); // ตั้งค่า product
        fetch3DModel(data.product.id); // เรียกใช้ fetch3DModel หลังจากได้ product.id
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <div>Loading...</div>;


  return (
    <div className="container mx-auto px-4 py-8 pt-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Column: Product Images */}
        <div className="flex flex-col items-center">
          {/* Swiper หลัก */}
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
                src={`http://localhost:3000/products/${product.main_image}`}
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

          {/* Swiper Thumbnail */}
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
                src={`http://localhost:3000/products/${product.main_image}`}
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
        <div className="flex flex-col justify-start">
          {/* 🏆 ชื่อสินค้า */}
          <h1 className="text-3xl font-bold">{product.product_name}</h1>
          
          <br />
          <hr />
          {/* 🔥 รายละเอียดสินค้า */}
          <p className="text-gray-600 mt-4 whitespace-pre-line">{product.detail}</p>
        </div>
      </div>

      <hr className="my-3 border-t border-gray-300" />

      <div className="mt-4">
        <h1>3D Model Viewer</h1>
        {existingModelUrl ? (
          <div className="mt-4">
            <model-viewer
              src={existingModelUrl}
              alt="3D Model"
              auto-rotate
              camera-controls
              style={{ width: "100%", height: "500px" }}
            ></model-viewer>
          </div>
        ) : (
          <p>No 3D model available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;