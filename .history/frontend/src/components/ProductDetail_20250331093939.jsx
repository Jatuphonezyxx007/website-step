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
import "@google/model-viewer"; // นำเข้า model-viewer
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [existingModelUrl, setExistingModelUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [datasheetFilename, setDatasheetFilename] = useState("");

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ฟังก์ชันดึงข้อมูล 3D model
  const fetch3DModel = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${id}/3d`
      );
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
        setDatasheetFilename(data.product.datasheet || "");
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
            // autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2 w-full max-w-2xl mx-auto"
          >
            <SwiperSlide>
              <img
                onClick={() =>
                  openModal(
                    `http://localhost:3000/products/${product.main_image}`
                  )
                }
                className="w-full rounded-lg cursor-pointer"
                src={`http://localhost:3000/products/${product.main_image}`}
                alt={product.product_name}
              />
            </SwiperSlide>

            {product.supplementary_images &&
              product.supplementary_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    onClick={() =>
                      openModal(`http://localhost:3000/products/${img}`)
                    }
                    className="w-full rounded-lg cursor-pointer"
                    src={`http://localhost:3000/products/${img}`}
                    alt={`Supplementary ${index}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper w-full max-w-2xl mx-auto mt-4"
          >
            <SwiperSlide>
              <img
                className="w-24 h-24 cursor-pointer border rounded-lg hover:border-gray-500"
                src={`http://localhost:3000/products/${product.main_image}`}
                alt="Main Thumbnail"
              />
            </SwiperSlide>
            {product.supplementary_images &&
              product.supplementary_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    className="w-24 h-24 cursor-pointer border rounded-lg hover:border-gray-500"
                    src={`http://localhost:3000/products/${img}`}
                    alt={`Thumbnail ${index}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className="flex flex-col justify-start">
          {/* 🏆 ชื่อสินค้า */}
          <h1 className="text-3xl font-bold">{product.product_name}</h1>

          <br />
          <hr />

          {/* 🔥 รายละเอียดสินค้า */}
          <p className="text-gray-600 mt-4 whitespace-pre-line">
            {product.detail}
          </p>
        </div>
        {datasheetFilename && (
          <a
            href={`http://localhost:3000/datasheet/${datasheetFilename}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center w-fit px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
            Download Datasheet
          </a>
        )}
      </div>

      <hr className="my-3 border-t border-gray-300" />

      {/* 🔹 3D Model Viewer Section */}
      <div className="mt-8 flex justify-center items-center min-h-screen">
        {existingModelUrl ? (
          <motion.div
            className="relative w-full flex justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <model-viewer
              src={existingModelUrl}
              alt="3D Model"
              auto-rotate
              camera-controls
              className="w-[80%] h-[500px] rounded-lg shadow-md"
            ></model-viewer>
          </motion.div>
        ) : (
          <p className="text-gray-500 text-center">
            🚫 No 3D model available for this product.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ปุ่มปิด */}
            <button
              className="absolute top-3 right-3 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition-all z-10"
              onClick={closeModal}
            >
              <X size={30} strokeWidth={2.5} />
            </button>

            {/* รูปภาพใหญ่ */}
            <img
              src={selectedImage}
              alt="Full View"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
