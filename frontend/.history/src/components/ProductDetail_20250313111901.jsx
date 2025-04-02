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




import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // ดึงค่า id จาก URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`) // API สำหรับดึงข้อมูลสินค้าตาม id
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <div className="text-center text-xl font-bold mt-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 pt-24">
      <br></br>
      {/* รูปภาพสินค้า */}
      <div className="md:w-8/12 flex justify-center items-center relative">
        <div
          className="image-container"
          onMouseMove={(e) => handleZoom(e)} // เรียกฟังก์ชันเมื่อเมาส์เลื่อนไปบนภาพ
          onMouseLeave={() => hideZoom()} // เรียกฟังก์ชันเมื่อเมาส์ออกจากภาพ
        >
          <img
          src={`/products${product.image_path}`}
          alt={product.name}
          className="main-image rounded-lg shadow-lg object-contain w-full h-[60vh] max-w-full max-h-[70vh]"
          />
        </div>
        {/* ภาพซูมข้างๆ เมาส์ */}
        <div className="zoomed-image" id="zoomed-image" />
      </div>


      

      {/* รายละเอียดสินค้า */}
      <div className="md:w-6/12 space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="font-thin text-gray-600">{product.description}</p>
        {/* <p className="text-2xl font-semibold text-primary">{`฿${product.price}`}</p> */}
        {/* <p className="text-lg text-gray-600">{product.price}</p> */}

        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Installation Type:</strong> {product.installation_type || "N/A"}</li>
          <li><strong>Screen Size:</strong> {product.screen_size || "N/A"}</li>
          <li><strong>Resolution:</strong> {product.resolution || "N/A"}</li>
          <li><strong>Brightness:</strong> {product.brightness || "N/A"}</li>
          <li><strong>Connectivity:</strong> {product.connectivity || "N/A"}</li>
          <li><strong>Operating System:</strong> {product.operating_system || "N/A"}</li>
        </ul>


        {/* <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition">
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

// ฟังก์ชันเพื่อให้ภาพซูมข้างๆ เมาส์
const handleZoom = (e) => {
  const image = document.querySelector('.main-image');
  const zoomedImage = document.getElementById('zoomed-image');
  const { offsetX, offsetY } = e.nativeEvent;
  const { width, height } = image.getBoundingClientRect();

  // คำนวณการซูม
  const x = (offsetX / width) * 100;
  const y = (offsetY / height) * 300;

  zoomedImage.style.backgroundImage = `url(${image.src})`;
  zoomedImage.style.backgroundPosition = `${x}% ${y}%`;
  zoomedImage.style.backgroundSize = `${width * 1.5}px ${height * 2}px`; // ลดขนาดซูมลงให้พอดี
  zoomedImage.style.display = 'block'; // แสดงภาพซูม

  // ปรับตำแหน่งของภาพซูมให้อยู่ใกล้เมาส์มากขึ้น
  zoomedImage.style.left = `${e.pageX + 20}px`; // ตำแหน่งซ้าย
  zoomedImage.style.top = `${e.pageY - 100}px`; // ตำแหน่งบน
};

// ฟังก์ชันซ่อนภาพซูมเมื่อเอาเมาส์ออก
const hideZoom = () => {
  const zoomedImage = document.getElementById('zoomed-image');
  zoomedImage.style.display = 'none'; // ซ่อนภาพซูม
};

export default ProductDetail;





