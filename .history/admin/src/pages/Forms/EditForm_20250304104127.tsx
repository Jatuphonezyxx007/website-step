// // src/pages/edit_form.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import InputGroup from "../../components/form/form-elements/InputGroup";
// import InputStates from "../../components/form/form-elements/InputStates";
// import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";





// export default function EditForm() {
//   const { product_id } = useParams<{ product_id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement update logic here
//     console.log("Save product", product);
//     // หลังจากบันทึกอาจ navigate กลับไปยังหน้ารายการหรือแจ้งเตือนความสำเร็จ
//     navigate("/");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <PageMeta title="Edit Product" description="แก้ไขรายละเอียดสินค้า" />
//       <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block font-medium mb-1">ชื่อสินค้า</label>
//           <input
//             type="text"
//             defaultValue={product.product_name}
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         {/* เพิ่ม field อื่นๆ ที่ต้องการแก้ไข เช่น category, series, detail, ฯลฯ */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Detail:</label>
//           <textarea
//             defaultValue={product.detail || ""}
//             className="w-full p-2 border border-gray-300 rounded"
//           ></textarea>
//         </div>
//         <DefaultInputs />
//         <InputGroup />
//         <InputStates />
//         <TextAreaInput />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }




// // src/pages/edit_form.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import Button from "../../components/ui/button/Button";
// import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
// import ComponentCard from "../../components/common/ComponentCard";
// import FileInput from "../../components/form/form-elements/FileInput";


// // นำเข้าคอมโพเนนต์อื่นๆ ที่คุณต้องการ เช่น InputGroup, TextAreaInput ฯลฯ

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
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

  

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement update logic here
//     console.log("Save product", product);
//     navigate("/");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//     // กำหนด URL สำหรับรูปหลัก ถ้ามี ไม่มีก็ใช้ fallback
//     const imageUrl = product.images_main 
//     ? `http://localhost:3000/products/${product.images_main}` 
//     : "https://placehold.co/400x600";

//   return (
//     <div>
//         <PageMeta title={`Edit Product: ${product.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//             <div className="space-y-6">
//                 <ComponentCard title="ภาพหลัก">
//                     <ResponsiveImage src={imageUrl} />
//                     <FileInput />
//                 </ComponentCard>
//             </div>
//             {/* <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1> */}
            
//             <form onSubmit={handleSubmit}>
//                 {/* ส่งค่า initialValues ให้ DefaultInputs */}
//                 <DefaultInputs initialValues={{ productName: product.product_name, email: product.email }} />
//                 {/* เพิ่ม InputGroup, InputStates, TextAreaInput ตามที่คุณต้องการ */}
                
//                 {/* <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                     Save
//                     </button> */}
//         {/* Primary Button */}
//         {/* <ComponentCard title="Primary Button"> */}
//         <br />
        
//         <div className="flex items-center justify-end gap-5">
//             <Button size="sm" variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500 text-white">ลบรายการ</Button>
//             <Button size="sm" variant="primary">บันทึกข้อมูล</Button>
//             </div>

//                     </form>
//                     </div>
//                     </div>
//   );
// }




// // src/pages/edit_form.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import Button from "../../components/ui/button/Button";
// import ResponsiveImage from "../../components/ui/images/ResponsiveImage";
// import ComponentCard from "../../components/common/ComponentCard";
// import FileInput from "../../components/form/form-elements/FileInput";
// // ThreeColumnImageGrid
// import ImageProduct from "../../components/ui/images/ThreeColumnImageGrid";

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ดึงรายละเอียดสินค้า
//   useEffect(() => {
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

//   // ดึงข้อมูล categories สำหรับ droplist
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/categories`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setCategories(data.categories);
//         } else {
//           setError(data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching categories:", err);
//         setError("Error fetching categories");
//       });
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement update logic here
//     console.log("Save product", product);
//     navigate("/");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // กำหนด URL สำหรับรูปหลัก ถ้ามี ไม่มีก็ใช้ fallback
//   // const imageUrl = product.images_main 
//   //   ? `http://localhost:3000/products/${product.images_main}` 
//   //   : "https://placehold.co/400x600";

//   // สมมุติใน EditForm.tsx
// const mainImageUrl = product.images_main 
// ? `http://localhost:3000/products/${product.images_main}` 
// : "https://placehold.co/400x600";

// // ในคอมโพเนนต์ที่แสดงภาพรอง:
// const supplementaryImages = product.supplementary_images.map(path => `http://localhost:3000/products/${path}`);


//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        
//         <div className="space-y-6">
//         <ComponentCard title="รูปภาพสินค้า">
//             <ImageProduct src={imageUrl} />
//             {/* <FileInput /> */}
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* ส่งค่า initialValues ให้ DefaultInputs พร้อมกับ categories ที่ดึงมาจาก API */}
//           <DefaultInputs 
//             initialValues={{ 
//               productName: product.product_name, 
//               email: product.email, 
//               categoryId: product.category_id 
//             }}
//             categories={categories}
//           />
//           <br />
//           <div className="flex items-center justify-end gap-5">
//             <Button size="sm" variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500 text-white">
//               ลบรายการ
//             </Button>
//             <Button size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// // src/pages/edit_form.tsx
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import FileInput from "../../components/form/form-elements/FileInput";

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ดึงรายละเอียดสินค้า
//   useEffect(() => {
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

//   // ดึงข้อมูล categories สำหรับ droplist
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/categories`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setCategories(data.categories);
//         } else {
//           setError(data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching categories:", err);
//         setError("Error fetching categories");
//       });
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement update logic here
//     console.log("Save product", product);
//     navigate("/");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // กำหนด URL สำหรับรูปหลัก ถ้ามี ไม่มีก็ใช้ fallback
//   const mainImageUrl = product.images_main 
//     ? `http://localhost:3000/products/${product.images_main}` 
//     : "https://placehold.co/400x600";

//   // ดึงภาพรอง (supplementary_images) อย่างปลอดภัย ถ้าไม่มี ให้เป็น array ว่าง
//   const supplementaryImages = product.supplementary_images
//     ? product.supplementary_images.map((path: string) => `http://localhost:3000/products/${path}`)
//     : [];

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             {/* แสดงภาพหลักและภาพรองใน grid */}
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//               <div>
//                 <img
//                   src={mainImageUrl}
//                   alt="Main"
//                   className="border border-gray-200 rounded-xl dark:border-gray-800"
//                 />
//               </div>
//               {supplementaryImages.map((src: string, index: number) => (
//                 <div key={index}>
//                   <img
//                     src={src}
//                     alt={`Supplementary ${index + 1}`}
//                     className="border border-gray-200 rounded-xl dark:border-gray-800"
//                   />
//                 </div>
//               ))}
//             </div>
//             {/* <FileInput /> */}
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* ส่งค่า initialValues ให้ DefaultInputs พร้อมกับ categories */}
//           <DefaultInputs 
//             initialValues={{ 
//               productName: product.product_name, 
//               email: product.email, 
//               categoryId: product.category_id 
//             }}
//             categories={categories}
//           />
//           <br />
//           <div className="flex items-center justify-end gap-5">
//             <Button size="sm" variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500 text-white">
//               ลบรายการ
//             </Button>
//             <Button size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ดึงรายละเอียดสินค้า
//   useEffect(() => {
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

//   // ดึงข้อมูล categories สำหรับ droplist
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/categories`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setCategories(data.categories);
//         } else {
//           setError(data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching categories:", err);
//         setError("Error fetching categories");
//       });
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implement update logic here
//     console.log("Save product", product);
//     navigate("/");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const mainImageUrl = product.images_main 
//   ? `http://localhost:3000/products/${product.images_main}`
//   : "https://placehold.co/400x600";

// const supplementaryImages = product.supplementary_images
//   ? product.supplementary_images.map((path: string) => `http://localhost:3000/products/${path}`)
//   : [];
//   const allImages = [mainImageUrl, ...supplementaryImages];

//   // ฟังก์ชัน handleAddImage สำหรับ Card "เพิ่มสินค้า" (หากต้องการ)
//   const handleAddImage = () => {
//     console.log("คลิกเพิ่มสินค้า (รูปภาพ)");
//     // อาจเปิด Modal อัปโหลดรูป หรืออัปเดต state เพื่อทำอย่างอื่น
//   };








//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       const updatedProduct = {
//         product_name: product.product_name,
//         category_id: product.category_id,
//         detail: product.detail,
//         images_main: product.images_main,
//         supplementary_images: product.supplementary_images || [],
//         model_path: product.model_path,
//       };
  
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedProduct),
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         alert("✅ บันทึกข้อมูลสินค้าสำเร็จ");
//         navigate("/admin/products");
//       } else {
//         alert("❌ อัปเดตสินค้าไม่สำเร็จ: " + data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error updating product:", error);
//       alert("❌ เกิดข้อผิดพลาดในการอัปเดตสินค้า");
//     }
//   };
  
  
//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid
//               initialImages={allImages}
//             />
//             <DropZone />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <DefaultInputs 
//             initialValues={{ 
//               productName: product.product_name, 
//               email: product.email, 
//               categoryId: product.category_id 
//             }}
//             categories={categories}
//           />
//           <br />
//           <div className="flex items-center justify-end gap-5">
//             <Button size="sm" variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500 text-white">
//               ลบรายการ
//             </Button>
//             <Button size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }











// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";

// export default function EditForm() {
//   const { product_id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // ดึงรายละเอียดสินค้า
//   useEffect(() => {
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

//   // ดึงข้อมูล categories สำหรับ droplist
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/categories`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setCategories(data.categories);
//         } else {
//           setError(data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching categories:", err);
//         setError("Error fetching categories");
//       });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!product) {
//       alert("❌ ไม่มีข้อมูลสินค้า กรุณาลองใหม่");
//       return;
//     }

//     console.log("📌 ข้อมูลที่ส่ง:", product);
    
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("✅ บันทึกข้อมูลสินค้าสำเร็จ");
//         navigate("/dashboard");
//       } else {
//         alert("❌ อัปเดตสินค้าไม่สำเร็จ: " + data.message);
//       }
//     } catch (error) {
//       console.error("❌ Error updating product:", error);
//       alert("❌ เกิดข้อผิดพลาดในการอัปเดตสินค้า");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const mainImageUrl = product?.images_main 
//     ? `http://localhost:3000/products/${product.images_main}`
//     : "https://placehold.co/400x600";

//   const supplementaryImages = product?.supplementary_images
//     ? product.supplementary_images.map((path) => `http://localhost:3000/products/${path}`)
//     : [];

//   const allImages = [mainImageUrl, ...supplementaryImages];

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid productId={product.product_id} initialImages={product.images_main} />
//           <DropZone />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <DefaultInputs 
//             initialValues={{ 
//               productName: product?.product_name || "", 
//               email: product?.email || "", 
//               categoryId: product?.category_id || "" 
//             }}
//             categories={categories}
//           />
//           <br />
//           <div className="flex items-center justify-end gap-5">
//             <Button size="sm" variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500 text-white">
//               ลบรายการ
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";

export default function EditForm() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ดึงรายละเอียดสินค้า
  useEffect(() => {
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

  // ดึงข้อมูล categories สำหรับ droplist
  useEffect(() => {
    fetch(`http://localhost:3000/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories);
        } else {
          setError(data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Error fetching categories");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product) {
      alert("❌ ไม่มีข้อมูลสินค้า กรุณาลองใหม่");
      return;
    }

    console.log("📌 ข้อมูลที่ส่ง:", product);

    try {
      const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      if (data.success) {
        alert("✅ บันทึกข้อมูลสินค้าสำเร็จ");
        navigate("/dashboard");
      } else {
        alert("❌ อัปเดตสินค้าไม่สำเร็จ: " + data.message);
      }
    } catch (error) {
      console.error("❌ Error updating product:", error);
      alert("❌ เกิดข้อผิดพลาดในการอัปเดตสินค้า");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>❌ ไม่พบข้อมูลสินค้า</div>;

  // ✅ จัดการ URL ของรูปภาพให้ถูกต้อง
  const mainImageUrl = product?.images_main 
    ? `http://localhost:3000/products/${product.images_main}`
    : "https://placehold.co/400x600";

  const supplementaryImages = product?.supplementary_images
    ? product.supplementary_images.map((path) => `http://localhost:3000/products/${path}`)
    : [];

  const allImages = [mainImageUrl, ...supplementaryImages];

  const handleInputChange = (field: string, value: string) => {
    setProduct((prev) => {
      if (!prev) return { [field]: value }; // ป้องกัน prev เป็น null
      return { ...prev, [field]: value };
    });
  };
  
  return (
    <div>
      <PageMeta title={`Edit Product: ${product?.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพสินค้า">
            {/* ✅ ส่งค่า `initialImages` ถูกต้อง */}
            <ThreeColumnImageGrid productId={product_id} initialImages={allImages} />
          </ComponentCard>
        </div>
        <form onSubmit={handleSubmit}>
        <DefaultInputs 
  initialValues={{ 
    productName: product?.product_name || "", 
    categoryId: product?.category_id || "" 
  }}
  categories={categories}
  onChange={handleInputChange} 
/>
          <br />
          <div className="flex items-center justify-end gap-5">
            <Button 
              size="sm" 
              variant="primary" 
              className="bg-red-500 hover:bg-red-600 border-red-500 text-white"
              onClick={() => {
                if (window.confirm("❌ คุณต้องการลบสินค้านี้หรือไม่?")) {
                  // TODO: เพิ่ม API สำหรับการลบสินค้า
                  alert("🚧 ฟีเจอร์ลบสินค้ายังไม่ได้ใช้งาน");
                }
              }}
            >
              ลบรายการ
            </Button>
            <Button type="submit" size="sm" variant="primary">
              บันทึกข้อมูล
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
