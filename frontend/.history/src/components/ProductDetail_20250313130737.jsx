// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // นำเข้า useParams
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams(); // ดึงค่า id จาก URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/api/products/${id}`) // API สำหรับดึงข้อมูลสินค้าตาม id
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
// import { useParams, useNavigate } from "react-router-dom";
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { product_id } = useParams();
//   const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!product_id) {
//       setError("Product ID is missing");
//       setLoading(false);
//       return;
//     }

//     fetch(`http://localhost:3000/api/products/${product_id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProduct(data.product);
//         } else {
//           setError(data.message);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching product details:", err);
//         setError("Error fetching product details");
//         setLoading(false);
//       });
//   }, [product_id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 pt-24">
//       {/* รูปภาพสินค้า */}
//       <div className="md:w-6/12 flex flex-col items-center">
//         <img
//           src={product.images_main}
//           alt={product.product_name}
//           className="rounded-lg shadow-lg object-contain w-full h-[60vh] max-w-full"
//         />
//         {/* แสดงรูปภาพเพิ่มเติม */}
//         <div className="flex gap-2 mt-4">
//           {product.supplementary_images.map((img: string, index: number) => (
//             <img key={index} src={img} alt={`supplementary-${index}`} className="w-20 h-20 object-cover rounded-lg border" />
//           ))}
//         </div>
//       </div>

//       {/* รายละเอียดสินค้า */}
//       <div className="md:w-6/12 space-y-6">
//         <h1 className="text-3xl font-bold">{product.product_name}</h1>
//         <p className="font-thin text-gray-600">{product.detail || "No description available"}</p>
//         <p className="text-2xl font-semibold text-primary">{`฿${product.product_price || "N/A"}`}</p>

//         <ul className="list-disc ml-6 space-y-2">
//           <li><strong>หมวดหมู่:</strong> {product.category_name || "N/A"}</li>
//           <li><strong>ซีรีส์:</strong> {product.series_name || "N/A"}</li>
//           <li><strong>สร้างเมื่อ:</strong> {new Date(product.created_at).toLocaleDateString()}</li>
//         </ul>

//         {/* ปุ่มย้อนกลับ */}
//         <button 
//           className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition"
//           onClick={() => navigate(-1)}
//         >
//           🔙 กลับไปหน้าก่อนหน้า
//         </button>
//       </div>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetail.css';

// ✅ เพิ่ม Swiper สำหรับเลื่อนรูป
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!product_id) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/api/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setError("Error fetching product details");
        setLoading(false);
      });
  }, [product_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 pt-24">
      {/* รูปภาพสินค้า */}
      <div className="md:w-6/12 flex flex-col items-center">
        <img
          src={product.images_main}
          alt={product.product_name}
          className="rounded-lg shadow-lg object-contain w-full h-[60vh] max-w-full"
        />

        {/* ✅ Swiper - เลื่อนรูปภาพเพิ่มเติม */}
        <div className="w-full mt-4">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            slidesPerView={3}
            spaceBetween={10}
            className="mySwiper"
          >
            {product.supplementary_images &&
              product.supplementary_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`supplementary-${index}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* รายละเอียดสินค้า */}
      <div className="md:w-6/12 space-y-6">
        <h1 className="text-3xl font-bold">{product.product_name}</h1>
        <p className="font-thin text-gray-600">{product.detail || "No description available"}</p>
        <p className="text-2xl font-semibold text-primary">{`฿${product.product_price || "N/A"}`}</p>

        <ul className="list-disc ml-6 space-y-2">
          <li><strong>หมวดหมู่:</strong> {product.category_name || "N/A"}</li>
          <li><strong>ซีรีส์:</strong> {product.series_name || "N/A"}</li>
          <li><strong>สร้างเมื่อ:</strong> {new Date(product.created_at).toLocaleDateString()}</li>
        </ul>

        {/* ปุ่มย้อนกลับ */}
        <button 
          className="bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition"
          onClick={() => navigate(-1)}
        >
          🔙 กลับไปหน้าก่อนหน้า
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
