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
//               detail: product.detail, 
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




import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import TextArea from "../../components/form/form-elements/TextAreaInput";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";

import Inputs from "../../components/form/form-elements/Inputs";

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id?: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

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
//     console.log("Save product", product);
//     navigate("/");
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const mainImageUrl = product?.images_main 
//     ? `http://localhost:3000/products/${product.images_main}`
//     : "https://placehold.co/400x600";

//   const supplementaryImages = product?.supplementary_images
//     ? product.supplementary_images.map((path: string) => `http://localhost:3000/products/${path}`)
//     : [];

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             {/* <ThreeColumnImageGrid initialImages={[mainImageUrl, ...supplementaryImages]} /> */}
//             <DropZone />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <Inputs />
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


const EditProductPage = () => {
  const productId = 1; // กำหนด productId ที่ต้องการแสดง

  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold">แก้ไขสินค้า</h1>
      <Inputs productId={productId} />
    </div>
  );
};

export default EditProductPage;