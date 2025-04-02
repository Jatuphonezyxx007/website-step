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




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import TextArea from "../../components/form/form-elements/TextAreaInput";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";

// import Inputs from "../../components/form/form-elements/Inputs";

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
//           {/* <Inputs /> */}
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
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";

// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id?: string }>();
//   const [product, setProduct] = useState<any>(null);
//   const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
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

//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();

//   //   if (!product) return;

//   //   fetch(`http://localhost:3000/api/products/${product_id}`, {
//   //     method: "PUT",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(product),
//   //   })
//   //     .then((res) => res.json())
//   //     .then((data) => {
//   //       if (data.success) {
//   //         navigate("/");
//   //       } else {
//   //         setError("Failed to update product");
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.error("Error updating product:", err);
//   //       setError("Error updating product");
//   //     });
//   // };

//   // if (loading) return <div>Loading...</div>;
//   // if (error) return <div>{error}</div>;


// //   const [tempImages, setTempImages] = useState([]);

// // const handleSubmit = async (e: React.FormEvent) => {
// //   e.preventDefault();

// //   if (!product) return;

// //   // 📤 บันทึกภาพลง `/public/products` เมื่อกดบันทึกข้อมูล
// //   try {
// //     const response = await fetch(`http://localhost:3000/api/save-images`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ product_id, images: tempImages }),
// //     });

// //     const data = await response.json();
// //     if (data.success) {
// //       console.log("✅ Images saved successfully!");
// //     } else {
// //       console.error("❌ Error saving images:", data.message);
// //     }
// //   } catch (error) {
// //     console.error("🚨 Error saving images:", error);
// //   }

// //   // 📤 บันทึกข้อมูลสินค้า
// //   fetch(`http://localhost:3000/api/products/${product_id}`, {
// //     method: "PUT",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(product),
// //   })
// //     .then((res) => res.json())
// //     .then((data) => {
// //       if (data.success) navigate("/");
// //     })
// //     .catch((err) => {
// //       console.error("Error updating product:", err);
// //     });
// // };







// const [tempImages, setTempImages] = useState([]);

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!product) return;

//   // 📤 บันทึกภาพลง `/public/products` เมื่อกดบันทึกข้อมูล
//   try {
//     const response = await fetch(`http://localhost:3000/api/save-images`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ product_id, images: tempImages }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       console.log("✅ Images saved successfully!");
//     } else {
//       console.error("❌ Error saving images:", data.message);
//     }
//   } catch (error) {
//     console.error("🚨 Error saving images:", error);
//   }

//   // 📤 บันทึกข้อมูลสินค้า
//   fetch(`http://localhost:3000/api/products/${product_id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(product),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.success) navigate("/");
//     })
//     .catch((err) => {
//       console.error("Error updating product:", err);
//     });
// };



//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid />
//             <DropZone />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* ✅ ใช้ Inputs และส่งค่าที่จำเป็นไป */}
          
//           <Inputs />
//           <br />
//           <div className="flex items-center justify-end gap-5">
//             <Button
//               size="sm"
//               variant="primary"
//               className="bg-red-500 hover:bg-red-600 border-red-500 text-white"
//             >
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






// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";


// export default function EditForm() {
//   const { product_id } = useParams<{ product_id?: string }>();
//   const [product, setProduct] = useState<any>({});
//   const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);

//   const [existingModelUrl, setExistingModelUrl] = useState<string | null>(null);
//   const [selected3DFile, setSelected3DFile] = useState<File | null>(null);

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
//   // }, 

//   async function fetch3DModel() {
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}/3d`);
//       const data = await response.json();
//       if (data.success && data.path) {
//         setExistingModelUrl(`http://localhost:3000${data.path}`);
//       }
//     } catch (error) {
//       console.error("🚨 Error fetching 3D model:", error);
//     }
//   }

//   fetch3DModel();},
  
  
//   [product_id]);

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
//         const newImages = tempImages.filter(img => !img.existing); // ✅ คัดเฉพาะภาพที่เพิ่งอัปโหลด
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

//               // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
//               if (selected3DFile) {
//                 const formData = new FormData();
//                 formData.append("file", selected3DFile);
//                 formData.append("product_id", product_id);
        
//                 const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//                   method: "POST",
//                   body: formData,
//                 });
        
//                 const uploadData = await uploadResponse.json();
//                 if (!uploadData.success) {
//                   console.error("❌ Error uploading 3D file:", uploadData.message);
//                   return;
//                 }
//                 console.log("✅ 3D Model uploaded:", uploadData.filePath);
//               }
        
//               console.log("✅ Product data saved!");
  
//         // ✅ เปลี่ยนเส้นทางไปยัง Dashboard
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error updating product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error updating product:", error);
//     }
//   };
          



//   const handleDelete = async () => {
//     if (!product_id) return;
  
//     if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
//       return;
//     }
  
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Product deleted successfully!");
//         navigate("/dashboard"); // กลับไปหน้า dashboard หลังลบ
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//   };
  
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
//             <DropZone onFileSelect={setSelected3DFile} existingModelUrl={existingModelUrl} />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           {/* ✅ ส่ง props ไปให้ input */}
//           <Inputs 
//             productName={productName}
//             setProductName={setProductName}
//             productDetail={productDetail}
//             setProductDetail={setProductDetail}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />
//           <br />
//           <div className="flex items-center justify-end gap-5">
//             <Button
//             type="button"
//             size="sm"
//             variant="primary"
//             className="bg-red-500 hover:bg-red-600 border-red-500 text-white"
//             onClick={handleDelete}
//             >ลบ</Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";

// export default function EditForm() {
//   const { product_id } = useParams<{ product_id?: string }>();
//   const [product, setProduct] = useState<any>({});
//   const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
//   const [existingModelUrl, setExistingModelUrl] = useState<string | null>(null);
//   const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
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
//       setError("❌ Product ID is missing");
//       setLoading(false);
//       return;
//     }

//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
//         const data = await response.json();
//         if (data.success) {
//           setProduct(data.product);
//           setProductName(data.product.product_name || "");
//           setProductDetail(data.product.detail || "");
//           setSelectedCategory(String(data.product.category_id || ""));
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         console.error("🚨 Error fetching product details:", err);
//         setError("❌ Error fetching product details");
//       }
//     };

//     const fetch3DModel = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${product_id}/3d`);
//         const data = await response.json();
//         if (data.success && data.path) {
//           setExistingModelUrl(`http://localhost:3000${data.path}`);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching 3D model:", error);
//       }
//     };

//     Promise.all([fetchProductData(), fetch3DModel()]).finally(() => setLoading(false));
//   }, [product_id]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product_id) return;
  
//     try {
//       // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์ใหม่
//       if (selected3DFile) {
//         const formData = new FormData();
//         formData.append("file", selected3DFile);
//         formData.append("product_id", product_id);
  
//         const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//           method: "POST",
//           body: formData,
//         });
  
//         const uploadData = await uploadResponse.json();
//         if (!uploadData.success) {
//           console.error("❌ Error uploading 3D file:", uploadData.message);
//           return;
//         }
//         console.log("✅ 3D Model uploaded:", uploadData.filePath);
//         setExistingModelUrl(`http://localhost:3000${uploadData.filePath}`);
//       }
  
//       // ✅ อัปเดตข้อมูลสินค้า
//       const updatedProduct = {
//         product_name: productName.trim(),
//         category_id: selectedCategory ? Number(selectedCategory) : null,
//         series_id: product.series_id || null,
//         detail: productDetail.trim() || null,
//       };
  
//       console.log("📤 Updating product:", updatedProduct);
  
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedProduct),
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Product updated successfully!");
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error updating product:", data.message);
//       }
//     }
    
//     try {
//       // ✅ อัปโหลดรูปภาพที่แก้ไข
//       if (tempImages.some((img) => img.isEdited)) {
//         for (const img of tempImages) {
//           if (img.isEdited) {
//             const formData = new FormData();
//             formData.append("image", dataURLtoBlob(img.fileBuffer));
//             formData.append("product_id", product_id);
//             formData.append("old_filename", img.filename);
  
//             const response = await fetch(`http://localhost:3000/api/update-image`, {
//               method: "POST",
//               body: formData,
//             });
  
//             const data = await response.json();
//             if (!data.success) {
//               console.error("❌ Upload failed:", data.message);
//               return;
//             }
//           }
//         }
//       }
  
//       // ✅ อัปเดตข้อมูลสินค้า
//       const updatedProduct = {
//         product_name: productName.trim(),
//         category_id: selectedCategory ? Number(selectedCategory) : null,
//         series_id: product.series_id || null,
//         detail: productDetail.trim() || null,
//       };
  
//       console.log("📤 Updating product:", updatedProduct);
  
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedProduct),
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Product updated successfully!");
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error updating product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error updating product:", error);
//     }
//   };
  
//   const dataURLtoBlob = (dataURL: string) => {
//     const byteString = atob(dataURL.split(',')[1]);
//     const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   }

//     catch (error) {
//       console.error("🚨 Error updating product:", error);
//     }
//   };


//   if (loading) return <div>⏳ Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
//             <DropZone onFileSelect={setSelected3DFile} existingModelUrl={existingModelUrl} />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <Inputs 
//             productName={productName}
//             setProductName={setProductName}
//             productDetail={productDetail}
//             setProductDetail={setProductDetail}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />
//           <br />
//           <div className="flex items-center justify-end gap-5">
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
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
import Inputs from "../../components/form/form-elements/Inputs";

export default function EditForm() {
  const { product_id } = useParams<{ product_id?: string }>();
  const [product, setProduct] = useState<any>({});
  const [categories, setCategories] = useState<{ value: number; label: string }[]>([]);
  const [existingModelUrl, setExistingModelUrl] = useState<string | null>(null);
  const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
  const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ ตัวแปรเก็บค่า input ที่เปลี่ยนแปลง
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!product_id) {
      setError("❌ Product ID is missing");
      setLoading(false);
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${product_id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
          setProductName(data.product.product_name || "");
          setProductDetail(data.product.detail || "");
          setSelectedCategory(String(data.product.category_id || ""));
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("🚨 Error fetching product details:", err);
        setError("❌ Error fetching product details");
      }
    };

    const fetch3DModel = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${product_id}/3d`);
        const data = await response.json();
        if (data.success && data.path) {
          setExistingModelUrl(`http://localhost:3000${data.path}`);
        }
      } catch (error) {
        console.error("🚨 Error fetching 3D model:", error);
      }
    };

    Promise.all([fetchProductData(), fetch3DModel()]).finally(() => setLoading(false));
  }, [product_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product_id) return;

    try {
      // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์ใหม่
      if (selected3DFile) {
        const formData = new FormData();
        formData.append("file", selected3DFile);
        formData.append("product_id", product_id);

        const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          console.error("❌ Error uploading 3D file:", uploadData.message);
          return;
        }
        console.log("✅ 3D Model uploaded:", uploadData.filePath);
        setExistingModelUrl(`http://localhost:3000${uploadData.filePath}`);
      }

      // ✅ อัปโหลดรูปภาพที่แก้ไข
      if (tempImages.some((img) => img.isEdited)) {
        for (const img of tempImages) {
          if (img.isEdited) {
            const formData = new FormData();
            formData.append("image", dataURLtoBlob(img.fileBuffer));
            formData.append("product_id", product_id);
            formData.append("old_filename", img.filename);
            formData.append("image_index", tempImages.indexOf(img)); // เพิ่ม image_index
            const response = await fetch(`http://localhost:3000/api/update-image`, {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            if (!data.success) {
              console.error("❌ Upload failed:", data.message);
              return;
            }
          }
        }
      }

      // ✅ อัปเดตข้อมูลสินค้า
      const updatedProduct = {
        product_name: productName.trim(),
        category_id: selectedCategory ? Number(selectedCategory) : null,
        series_id: product.series_id || null,
        detail: productDetail.trim() || null,
      };

      console.log("📤 Updating product:", updatedProduct);

      const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ Product updated successfully!");
        navigate("/dashboard");
      } else {
        console.error("❌ Error updating product:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error updating product:", error);
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  if (loading) return <div>⏳ Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพสินค้า">
            <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
            <DropZone onFileSelect={setSelected3DFile} existingModelUrl={existingModelUrl} />
          </ComponentCard>
        </div>
        <form onSubmit={handleSubmit}>
          <Inputs 
            productName={productName}
            setProductName={setProductName}
            productDetail={productDetail}
            setProductDetail={setProductDetail}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <br />
          <div className="flex items-center justify-end gap-5">
            <Button type="submit" size="sm" variant="primary">
              บันทึกข้อมูล
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}