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
// import { useParams } from "react-router-dom";
// import './ProductDetail.css';

// const ProductDetail = () => {
//   // const { id } = useParams(); // ดึงค่า id จาก URL
//   // const [product, setProduct] = useState(null);
//   const { product_id } = useParams<{ product_id?: string }>();
//   const [product, setProduct] = useState<any>({});
//   const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
//   const [tempImages, setTempImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ✅ ตัวแปรเก็บค่า input ที่เปลี่ยนแปลง
//   const [productName, setProductName] = useState("");
//   const [productDetail, setProductDetail] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");


//   useEffect(() => {
//     if (!product_id) {
//       setError("Product ID is missing");
//       setLoading(false);
//       return;
//     }

//     console.log("Fetching product with ID:", product_id);

//     fetch(`http://localhost:3000/api/products/${product_id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProduct(data.product);
//           setProductName(data.product.product_name || "");
//           setProductDetail(data.product.detail || "");
//           setSelectedCategory(String(data.product.category_id || ""));
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (!product) return;
  
//     const updatedProduct = {
//       product_name: productName.trim(),
//       category_id: selectedCategory ? Number(selectedCategory) : null,
//       series_id: product.series_id || null,
//       detail: productDetail.trim() || null,
//     };
  
//     try {
//       console.log("📤 Updating product:", updatedProduct);
  
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedProduct),
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Product updated successfully!");
  
//         // ✅ บันทึกภาพใหม่เท่านั้น
//         const newImages = tempImages.filter(img => !img.existing); // คัดเฉพาะภาพที่เพิ่งอัปโหลด
//         if (newImages.length > 0) {
//           const formData = new FormData();
//           formData.append("product_id", product_id!);
  
//           for (let i = 0; i < newImages.length; i++) {
//             const img = newImages[i];
//             if (img.fileBuffer) {
//               // 🔄 แปลง Base64 เป็น Blob
//               const response = await fetch(img.fileBuffer);
//               const blob = await response.blob();
//               const file = new File([blob], `image_${i}.png`, { type: "image/png" });
  
//               formData.append("images", file);
//             }
//           }
  
//           const imageResponse = await fetch("http://localhost:3000/api/save-images", {
//             method: "POST",
//             body: formData,
//           });
  
//           const imageData = await imageResponse.json();
//           if (imageData.success) {
//             console.log("✅ Images saved successfully!");
//           } else {
//             console.error("❌ Error saving images:", imageData.message);
//           }
//         } else {
//           console.log("⏭️ No new images to upload");
//         }
  
//         // ✅ เปลี่ยนเส้นทางไปยัง Dashboard
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error updating product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error updating product:", error);
//     }
//   };
          
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6 pt-24">
//       <br></br>
//       {/* รูปภาพสินค้า */}
//       <div className="md:w-8/12 flex justify-center items-center relative">
//         <div
//           className="image-container"
//           onMouseMove={(e) => handleZoom(e)} // เรียกฟังก์ชันเมื่อเมาส์เลื่อนไปบนภาพ
//           onMouseLeave={() => hideZoom()} // เรียกฟังก์ชันเมื่อเมาส์ออกจากภาพ
//         >
//           <img
//           src={`/products${product.image_path}`}
//           alt={product.name}
//           className="main-image rounded-lg shadow-lg object-contain w-full h-[60vh] max-w-full max-h-[70vh]"
//           />
//         </div>
//         {/* ภาพซูมข้างๆ เมาส์ */}
//         <div className="zoomed-image" id="zoomed-image" />
//       </div>


      

//       {/* รายละเอียดสินค้า */}
//       <div className="md:w-6/12 space-y-6">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p className="font-thin text-gray-600">{product.description}</p>
//         {/* <p className="text-2xl font-semibold text-primary">{`฿${product.price}`}</p> */}
//         {/* <p className="text-lg text-gray-600">{product.price}</p> */}

//         <ul className="list-disc ml-6 space-y-2">
//           <li><strong>Installation Type:</strong> {product.installation_type || "N/A"}</li>
//           <li><strong>Screen Size:</strong> {product.screen_size || "N/A"}</li>
//           <li><strong>Resolution:</strong> {product.resolution || "N/A"}</li>
//           <li><strong>Brightness:</strong> {product.brightness || "N/A"}</li>
//           <li><strong>Connectivity:</strong> {product.connectivity || "N/A"}</li>
//           <li><strong>Operating System:</strong> {product.operating_system || "N/A"}</li>
//         </ul>


//         {/* <button className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition">
//           Add to Cart
//         </button> */}
//       </div>
//     </div>
//   );
// };

// // ฟังก์ชันเพื่อให้ภาพซูมข้างๆ เมาส์
// const handleZoom = (e) => {
//   const image = document.querySelector('.main-image');
//   const zoomedImage = document.getElementById('zoomed-image');
//   const { offsetX, offsetY } = e.nativeEvent;
//   const { width, height } = image.getBoundingClientRect();

//   // คำนวณการซูม
//   const x = (offsetX / width) * 100;
//   const y = (offsetY / height) * 300;

//   zoomedImage.style.backgroundImage = `url(${image.src})`;
//   zoomedImage.style.backgroundPosition = `${x}% ${y}%`;
//   zoomedImage.style.backgroundSize = `${width * 1.5}px ${height * 2}px`; // ลดขนาดซูมลงให้พอดี
//   zoomedImage.style.display = 'block'; // แสดงภาพซูม

//   // ปรับตำแหน่งของภาพซูมให้อยู่ใกล้เมาส์มากขึ้น
//   zoomedImage.style.left = `${e.pageX + 20}px`; // ตำแหน่งซ้าย
//   zoomedImage.style.top = `${e.pageY - 100}px`; // ตำแหน่งบน
// };

// // ฟังก์ชันซ่อนภาพซูมเมื่อเอาเมาส์ออก
// const hideZoom = () => {
//   const zoomedImage = document.getElementById('zoomed-image');
//   zoomedImage.style.display = 'none'; // ซ่อนภาพซูม
// };

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ProductDetail.css';

const ProductDetail = () => {
  const { product_id } = useParams<{ product_id?: string }>();
  const [product, setProduct] = useState<any>(null);
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
        {/* แสดงรูปภาพเพิ่มเติม */}
        <div className="flex gap-2 mt-4">
          {product.supplementary_images.map((img: string, index: number) => (
            <img key={index} src={img} alt={`supplementary-${index}`} className="w-20 h-20 object-cover rounded-lg border" />
          ))}
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

