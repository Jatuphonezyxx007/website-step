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





// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
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

//   //   try {
//   //     // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์ใหม่
//   //     if (selected3DFile) {
//   //       const formData = new FormData();
//   //       formData.append("file", selected3DFile);
//   //       formData.append("product_id", product_id);

//   //       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//   //         method: "POST",
//   //         body: formData,
//   //       });

//   //       const uploadData = await uploadResponse.json();
//   //       if (!uploadData.success) {
//   //         console.error("❌ Error uploading 3D file:", uploadData.message);
//   //         return;
//   //       }
//   //       console.log("✅ 3D Model uploaded:", uploadData.filePath);
//   //       setExistingModelUrl(`http://localhost:3000${uploadData.filePath}`);
//   //     }

//   //     // ✅ อัปโหลดรูปภาพที่แก้ไข
//   //     if (tempImages.some((img) => img.isEdited)) {
//   //       for (const img of tempImages) {
//   //         if (img.isEdited) {
//   //           const formData = new FormData();
//   //           formData.append("image", dataURLtoBlob(img.fileBuffer));
//   //           formData.append("product_id", product_id);
//   //           formData.append("old_filename", img.filename);
//   //           formData.append("image_index", tempImages.indexOf(img)); // เพิ่ม image_index
//   //           const response = await fetch(`http://localhost:3000/api/update-image`, {
//   //             method: "POST",
//   //             body: formData,
//   //           });
//   //           const data = await response.json();
//   //           if (!data.success) {
//   //             console.error("❌ Upload failed:", data.message);
//   //             return;
//   //           }
//   //         }
//   //       }
//   //     }

//   //     // ✅ อัปเดตข้อมูลสินค้า
//   //     const updatedProduct = {
//   //       product_name: productName.trim(),
//   //       category_id: selectedCategory ? Number(selectedCategory) : null,
//   //       series_id: product.series_id || null,
//   //       detail: productDetail.trim() || null,
//   //     };

//   //     console.log("📤 Updating product:", updatedProduct);

//   //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//   //       method: "PUT",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(updatedProduct),
//   //     });

//   //     const data = await response.json();
//   //     if (data.success) {
//   //       console.log("✅ Product updated successfully!");
//   //       navigate("/dashboard");
//   //     } else {
//   //       console.error("❌ Error updating product:", data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("🚨 Error updating product:", error);
//   //   }
//   // };

//   // const dataURLtoBlob = (dataURL: string) => {
//   //   const byteString = atob(dataURL.split(',')[1]);
//   //   const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
//   //   const ab = new ArrayBuffer(byteString.length);
//   //   const ia = new Uint8Array(ab);
//   //   for (let i = 0; i < byteString.length; i++) {
//   //     ia[i] = byteString.charCodeAt(i);
//   //   }
//   //   return new Blob([ab], { type: mimeString });
//   // };
//   try {
//     // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์ใหม่
//     if (selected3DFile) {
//       const formData = new FormData();
//       formData.append("file", selected3DFile);
//       formData.append("product_id", product_id);

//       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();
//       if (!uploadData.success) {
//         console.error("❌ Error uploading 3D file:", uploadData.message);
//         return;
//       }
//       console.log("✅ 3D Model uploaded:", uploadData.filePath);
//       setExistingModelUrl(`http://localhost:3000${uploadData.filePath}`);
//     }

//     // ✅ อัปโหลดรูปภาพที่แก้ไข
//     if (tempImages.some((img) => img.isEdited)) {
//       for (const img of tempImages) {
//         if (img.isEdited) {
//           const formData = new FormData();
//           formData.append("image", dataURLtoBlob(img.fileBuffer));
//           formData.append("product_id", product_id);
//           formData.append("old_filename", img.filename);
//           formData.append("image_index", tempImages.indexOf(img)); // เพิ่ม image_index
//           const response = await fetch(`http://localhost:3000/api/update-image`, {
//             method: "POST",
//             body: formData,
//           });
//           const data = await response.json();
//           if (!data.success) {
//             console.error("❌ Upload failed:", data.message);
//             return;
//           }
//         }
//       }
//     }

//     // ✅ อัปเดตข้อมูลสินค้า
//     const updatedProduct = {
//       product_name: productName.trim(),
//       category_id: selectedCategory ? Number(selectedCategory) : null,
//       series_id: product.series_id || null,
//       detail: productDetail.trim() || null,
//     };

//     console.log("📤 Updating product:", updatedProduct);

//     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedProduct),
//     });

//     const data = await response.json();
//     if (data.success) {
//       console.log("✅ Product updated successfully!");
//       navigate("/dashboard");
//     } else {
//       console.error("❌ Error updating product:", data.message);
//     }
//   } catch (error) {
//     console.error("🚨 Error updating product:", error);
//   }
// };

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



// // --------------------------------------
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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
//         } else {
//           console.error("❌ No 3D model found for this product");
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching 3D model:", error);
//       }
//     };

//     Promise.all([fetchProductData(), fetch3DModel()]).finally(() => setLoading(false));
//   }, [product_id]);

//   const handleUpload3DFile = async (file: File | null, productId: string) => {
//     if (!file) return;
  
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("product_id", productId);
  
//     try {
//       const response = await fetch("http://localhost:3000/api/upload-3d", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ 3D file uploaded successfully:", data.filePath);
//       } else {
//         console.error("❌ Failed to upload 3D file:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading 3D file:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product_id) return;

//     try {
//       // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
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
//       }

//           // ✅ อัปโหลดรูปภาพที่แก้ไข
//             // ✅ ตรวจสอบและอัปเดตรูปภาพ
//     if (tempImages.some(img => img.isEdited)) {
//       const updatedImages = tempImages.filter(img => img.isEdited);
//       await uploadImages(product_id, updatedImages);
//     }

//       console.log("✅ Product data saved!");
//       navigate("/dashboard");
//     } 
//     catch (error) {
//       console.error("🚨 Error submitting form:", error);
//     }
//   };

//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn transform transition-all duration-300 ease-in-out">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//               <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   onClick={handleDeleteProduct}
//                   className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









// -------------------------------------------------------------------------------
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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


//   // กดปุ่มบันทึกข้อมูล
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!product_id) return;

//   try {
//     // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
//     if (selected3DFile) {
//       const formData = new FormData();
//       formData.append("file", selected3DFile);
//       formData.append("product_id", product_id);

//       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();
//       if (!uploadData.success) {
//         console.error("❌ Error uploading 3D file:", uploadData.message);
//         return;
//       }
//       console.log("✅ 3D Model uploaded:", uploadData.filePath);
//     }

//     // ✅ อัปเดตข้อมูลสินค้า
//     const updatedProduct = {
//       product_name: productName,
//       detail: productDetail,
//       category_id: selectedCategory,
//     };
//     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedProduct),
//     });

//     const data = await response.json();
//     if (!data.success) {
//       console.error("❌ Error updating product:", data.message);
//       return;
//     }

//     console.log("✅ Product data saved!");
//     navigate("/dashboard");
//   } catch (error) {
//     console.error("🚨 Error submitting form:", error);
//   }
// };




//   // กดปุ่มลบข้อมูล
//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn transform transition-all duration-300 ease-in-out">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//               <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   onClick={handleDeleteProduct}
//                   className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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

//   // ฟังก์ชันสำหรับจัดการการลบรูปภาพชั่วคราว
//   const handleDeleteImage = (filename: string) => {
//     setTempImages((prevImages) => prevImages.filter((img) => img.filename !== filename));
//   };

//   // ฟังก์ชันสำหรับจัดการการแก้ไขรูปภาพชั่วคราว
//   const handleEditImage = (filename: string, newFileBuffer: string) => {
//     setTempImages((prevImages) =>
//       prevImages.map((img) =>
//         img.filename === filename ? { ...img, fileBuffer: newFileBuffer, isEdited: true } : img
//       )
//     );
//   };

//   // ฟังก์ชันสำหรับจัดการการเพิ่มรูปภาพชั่วคราว
//   const handleAddImage = (newImage: { filename: string; fileBuffer: string }) => {
//     setTempImages((prevImages) => [...prevImages, newImage]);
//   };

//   // กดปุ่มบันทึกข้อมูล
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!product_id) return;

// //     try {
// //       // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
// //       if (selected3DFile) {
// //         const formData = new FormData();
// //         formData.append("file", selected3DFile);
// //         formData.append("product_id", product_id);

// //         const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
// //           method: "POST",
// //           body: formData,
// //         });

// //         const uploadData = await uploadResponse.json();
// //         if (!uploadData.success) {
// //           console.error("❌ Error uploading 3D file:", uploadData.message);
// //           return;
// //         }
// //         console.log("✅ 3D Model uploaded:", uploadData.filePath);
// //       }

// //       // ✅ อัปเดตข้อมูลสินค้า
// //       const updatedProduct = {
// //         product_name: productName,
// //         detail: productDetail,
// //         category_id: selectedCategory,
// //       };
// //       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(updatedProduct),
// //       });

// //       const data = await response.json();
// //       if (!data.success) {
// //         console.error("❌ Error updating product:", data.message);
// //         return;
// //       }

      

// //       // ✅ บันทึกรูปภาพที่เพิ่ม/แก้ไข/ลบ
// //       const formData = new FormData();

// //       formData.append("product_id", product_id); // เพิ่ม product_id เข้าไปใน FormData

// //       tempImages.forEach((img, index) => {
// //         if (img.isEdited || !img.existing) {
// //           formData.append("images", file);
// //         }
// //       });

// //       const saveImagesResponse = await fetch(`http://localhost:3000/api/save-images`, {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const saveImagesData = await saveImagesResponse.json();
// //       if (!saveImagesData.success) {
// //         console.error("❌ Error saving images:", saveImagesData.message);
// //         return;
// //       }

// //       console.log("✅ Product data and images saved!");
// //       navigate("/dashboard");
// //     } catch (error) {
// //       console.error("🚨 Error submitting form:", error);
// //     }
// //   };

// //   // ฟังก์ชันสำหรับแปลง dataURL เป็น File object
// // // const dataURLtoFile = (dataURL: string, filename: string): File => {
// // //   const arr = dataURL.split(',');
// // //   const mime = arr[0].match(/:(.*?);/)![1];
// // //   const bstr = atob(arr[1]);
// // //   let n = bstr.length;
// // //   const u8arr = new Uint8Array(n);
// // //   while (n--) {
// // //     u8arr[n] = bstr.charCodeAt(n);
// // //   }
// // //   return new File([u8arr], filename, { type: mime });
// // // };
// // const dataURLtoFile = (dataURL: string, filename: string): File => {
// //   const arr = dataURL.split(',');
// //   const mime = arr[0].match(/:(.*?);/)![1];
// //   const bstr = atob(arr[1]);
// //   let n = bstr.length;
// //   const u8arr = new Uint8Array(n);
// //   while (n--) {
// //     u8arr[n] = bstr.charCodeAt(n);
// //   }
// //   return new File([u8arr], filename, { type: mime });
// // };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!product_id) return;

//   try {
//     // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
//     if (selected3DFile) {
//       const formData = new FormData();
//       formData.append("file", selected3DFile);
//       formData.append("product_id", product_id);

//       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();
//       if (!uploadData.success) {
//         console.error("❌ Error uploading 3D file:", uploadData.message);
//         return;
//       }
//       console.log("✅ 3D Model uploaded:", uploadData.filePath);
//     }

//     // ✅ อัปเดตข้อมูลสินค้า
//     const updatedProduct = {
//       product_name: productName,
//       detail: productDetail,
//       category_id: selectedCategory,
//     };
//     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedProduct),
//     });

//     const data = await response.json();
//     if (!data.success) {
//       console.error("❌ Error updating product:", data.message);
//       return;
//     }

//     // ✅ บันทึกรูปภาพที่เพิ่ม/แก้ไข/ลบ
//     const formData = new FormData();
//     formData.append("product_id", product_id); // เพิ่ม product_id เข้าไปใน FormData

//     // เพิ่มรูปภาพที่แก้ไขหรือเพิ่มใหม่เข้าไปใน FormData
//     tempImages.forEach((img, index) => {
//       if (img.isEdited || !img.existing) {
//         // แปลง fileBuffer เป็น File object
//         const file = dataURLtoFile(img.fileBuffer, img.filename);
//         formData.append("images", file);
//       }
//     });

//     const saveImagesResponse = await fetch(`http://localhost:3000/api/save-images`, {
//       method: "POST",
//       body: formData,
//     });

//     const saveImagesData = await saveImagesResponse.json();
//     if (!saveImagesData.success) {
//       console.error("❌ Error saving images:", saveImagesData.message);
//       return;
//     }

//     console.log("✅ Product data and images saved!");
//     navigate("/dashboard");
//   } catch (error) {
//     console.error("🚨 Error submitting form:", error);
//   }
// };

// // ฟังก์ชันสำหรับแปลง dataURL เป็น File object
// const dataURLtoFile = (dataURL: string, filename: string): File => {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)![1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// };




//   // กดปุ่มลบข้อมูล
//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
//   };

//   if (loading) return <div>⏳ Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid
//               onImagesUpdate={setTempImages}
//               onDeleteImage={handleDeleteImage}
//               onEditImage={handleEditImage}
//               onAddImage={handleAddImage}
//             />
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn transform transition-all duration-300 ease-in-out">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//               <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   onClick={handleDeleteProduct}
//                   className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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

//   // ฟังก์ชันสำหรับจัดการการลบรูปภาพชั่วคราว
//   const handleDeleteImage = (filename: string) => {
//     setTempImages((prevImages) => prevImages.filter((img) => img.filename !== filename));
//   };

//   // ฟังก์ชันสำหรับจัดการการแก้ไขรูปภาพชั่วคราว
//   const handleEditImage = (filename: string, newFileBuffer: string) => {
//     setTempImages((prevImages) =>
//       prevImages.map((img) =>
//         img.filename === filename ? { ...img, fileBuffer: newFileBuffer, isEdited: true } : img
//       )
//     );
//   };

//   // ฟังก์ชันสำหรับจัดการการเพิ่มรูปภาพชั่วคราว
//   const handleAddImage = (newImage: { filename: string; fileBuffer: string }) => {
//     setTempImages((prevImages) => [...prevImages, newImage]);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product_id) return;
  
//     try {
//       // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
//       if (selected3DFile) {
//         const formData3D = new FormData();
//         formData3D.append("file", selected3DFile);
//         formData3D.append("product_id", product_id);
  
//         const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//           method: "POST",
//           body: formData3D,
//         });
  
//         const uploadData = await uploadResponse.json();
//         if (!uploadData.success) {
//           console.error("❌ Error uploading 3D file:", uploadData.message);
//           return;
//         }
//         console.log("✅ 3D Model uploaded:", uploadData.filePath);
//       }
  
//       // ✅ อัปเดตข้อมูลสินค้า
//       const updatedProduct = {
//         product_name: productName,
//         detail: productDetail,
//         category_id: selectedCategory,
//       };
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedProduct),
//       });
  
//       const data = await response.json();
//       if (!data.success) {
//         console.error("❌ Error updating product:", data.message);
//         return;
//       }
  
//       // ✅ ตรวจสอบว่ามีการอัปโหลดรูปใหม่หรือไม่
//       if (tempImages.length > 0) {
//         const formData = new FormData();
//         formData.append("product_id", product_id); // เพิ่ม product_id เข้าไปใน FormData
  
//         let hasNewImage = false;
  
//         tempImages.forEach((img) => {
//           if (img.isEdited || !img.existing) {
//             // แปลง fileBuffer เป็น File object
//             const file = dataURLtoFile(img.fileBuffer, img.filename);
//             formData.append("images", file);
//             hasNewImage = true;
//           }
//         });
  
//         if (hasNewImage) {
//           const saveImagesResponse = await fetch(`http://localhost:3000/api/save-images`, {
//             method: "POST",
//             body: formData,
//           });
  
//           const saveImagesData = await saveImagesResponse.json();
//           if (!saveImagesData.success) {
//             console.error("❌ Error saving images:", saveImagesData.message);
//             return;
//           }
  
//           console.log("✅ Product images saved!");
//         }
//       }
  
//       console.log("✅ Product data saved!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("🚨 Error submitting form:", error);
//     }
//   };
  

//   // ฟังก์ชันสำหรับแปลง dataURL เป็น File object
// const dataURLtoFile = (dataURL: string, filename: string): File => {
//   const arr = dataURL.split(',');
//   const mime = arr[0].match(/:(.*?);/)![1];
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);
//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }
//   return new File([u8arr], filename, { type: mime });
// };


//   if (loading) return <div>⏳ Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid
//               onImagesUpdate={setTempImages}
//               onDeleteImage={handleDeleteImage}
//               onEditImage={handleEditImage}
//               onAddImage={handleAddImage}
//             />
//             {/* <ThreeColumnImageGrid
//             onImagesUpdate={(images) => setTempImages(images)}
//             onDeleteImage={(filename) => handleDeleteImage(filename)}
//             onEditImage={(filename, newFileBuffer) => handleEditImage(filename, newFileBuffer)}
//             onAddImage={(newImage) => handleAddImage(newImage)}
//             />  */}
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn transform transition-all duration-300 ease-in-out">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//               <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   onClick={handleDeleteProduct}
//                   className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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


//   // กดปุ่มบันทึกข้อมูล
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!product_id) return;

//   try {
//     // ✅ อัปโหลดไฟล์ 3D ถ้ามีการเลือกไฟล์
//     if (selected3DFile) {
//       const formData = new FormData();
//       formData.append("file", selected3DFile);
//       formData.append("product_id", product_id);

//       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await uploadResponse.json();
//       if (!uploadData.success) {
//         console.error("❌ Error uploading 3D file:", uploadData.message);
//         return;
//       }
//       console.log("✅ 3D Model uploaded:", uploadData.filePath);
//     }

//     // ✅ อัปเดตข้อมูลสินค้า
//     const updatedProduct = {
//       product_name: productName,
//       detail: productDetail,
//       category_id: selectedCategory,
//     };
//     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedProduct),
//     });

//     const data = await response.json();
//     if (!data.success) {
//       console.error("❌ Error updating product:", data.message);
//       return;
//     }

//     console.log("✅ Product data saved!");
//     navigate("/dashboard");
//   } catch (error) {
//     console.error("🚨 Error submitting form:", error);
//   }
// };




//   // กดปุ่มลบข้อมูล
//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn transform transition-all duration-300 ease-in-out">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//               <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   onClick={handleDeleteProduct}
//                   className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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
//       }

//       const updatedProduct = {
//         product_name: productName,
//         detail: productDetail,
//         category_id: selectedCategory,
//       };
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedProduct),
//       });

//       const data = await response.json();
//       if (!data.success) {
//         console.error("❌ Error updating product:", data.message);
//         return;
//       }

//       console.log("✅ Product data saved!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("🚨 Error submitting form:", error);
//     }
//   };

//   // const handleDeleteProduct = async () => {
//   //   if (!product_id) return;
//   //   try {
//   //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//   //       method: "DELETE",
//   //     });
//   //     const data = await response.json();
//   //     if (data.success) {
//   //       navigate("/dashboard");
//   //     } else {
//   //       console.error("❌ Error deleting product:", data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("🚨 Error deleting product:", error);
//   //   }
//   //   setIsOpen(false);
//   // };
//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     console.log("Deleting product with ID:", product_id); // เพิ่มบรรทัดนี้เพื่อตรวจสอบ
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
// };


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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn transform transition-all duration-300 ease-in-out">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//       <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
//         >
//           ยกเลิก
//         </button>
//         <button
//           onClick={handleDeleteProduct}
//           className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
//         >
//           ลบ
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       </div>
//     </div>
//   );
// }
// ... (ส่วน import เหมือนเดิม)

// ... (ส่วน import เหมือนเดิม)






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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!product_id) return;

//   //   // (handle submit เดิม)
//   // };
//   //   const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!product_id) return;

//   //   try {
//   //     if (selected3DFile) {
//   //       const formData = new FormData();
//   //       formData.append("file", selected3DFile);
//   //       formData.append("product_id", product_id);

//   //       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
//   //         method: "POST",
//   //         body: formData,
//   //       });

//   //       const uploadData = await uploadResponse.json();
//   //       if (!uploadData.success) {
//   //         console.error("❌ Error uploading 3D file:", uploadData.message);
//   //         return;
//   //       }
//   //       console.log("✅ 3D Model uploaded:", uploadData.filePath);
//   //     }

//   //     const updatedProduct = {
//   //       product_name: productName,
//   //       detail: productDetail,
//   //       category_id: selectedCategory,
//   //     };
//   //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(updatedProduct),
//   //     });

//   //     const data = await response.json();
//   //     if (!data.success) {
//   //       console.error("❌ Error updating product:", data.message);
//   //       return;
//   //     }

//   //     console.log("✅ Product data saved!");
//   //     navigate("/dashboard");
//   //   } catch (error) {
//   //     console.error("🚨 Error submitting form:", error);
//   //   }
//   // };
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product_id) return;
  
//     try {
//       // อัปโหลดไฟล์ 3D ถ้ามี
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
//       }
  
//       // อัปโหลดรูปภาพถ้ามี
//       if (tempImages.length > 0) {
//         const formData = new FormData();
//         formData.append("product_id", product_id);
  
//         tempImages.forEach((img, index) => {
//           const blob = dataURLtoBlob(img.fileBuffer);
//           const fileExt = img.filename.split('.').pop();
//           const newFilename = `${product_id}_${index + 1}.${fileExt}`;
//           formData.append("images", blob, newFilename);
//         });
  
//         const uploadResponse = await fetch("http://localhost:3000/api/save-images", {
//           method: "POST",
//           body: formData,
//         });
  
//         const uploadData = await uploadResponse.json();
//         if (!uploadData.success) {
//           console.error("❌ Error uploading images:", uploadData.message);
//           return;
//         }
//         console.log("✅ Images uploaded successfully:", uploadData.files);
//       }
  
//       // อัปเดตข้อมูลสินค้า
//       const updatedProduct = {
//         product_name: productName,
//         detail: productDetail,
//         category_id: selectedCategory,
//       };
  
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedProduct),
//       });
  
//       const data = await response.json();
//       if (!data.success) {
//         console.error("❌ Error updating product:", data.message);
//         return;
//       }
  
//       console.log("✅ Product data saved!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("🚨 Error submitting form:", error);
//     }
//   };



//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => setIsOpen(true)}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn">
//               <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//               <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
//                 >
//                   ยกเลิก
//                 </button>
//                 <button
//                   onClick={handleDeleteProduct}
//                   className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
//                 >
//                   ลบ
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
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
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string; isEdited?: boolean }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

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

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   if (!product_id) return;

//   //   // (handle submit เดิม)
//   // };
//     const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!product_id) return;

//     try {
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
//       }

//       const updatedProduct = {
//         product_name: productName,
//         detail: productDetail,
//         category_id: selectedCategory,
//       };
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedProduct),
//       });

//       const data = await response.json();
//       if (!data.success) {
//         console.error("❌ Error updating product:", data.message);
//         return;
//       }

//       console.log("✅ Product data saved!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("🚨 Error submitting form:", error);
//     }
//   };


//   // const handleDeleteProduct = async () => {
//   //   if (!product_id) return;
//   //   try {
//   //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//   //       method: "DELETE",
//   //     });
//   //     const data = await response.json();
//   //     if (data.success) {
//   //       navigate("/dashboard");
//   //     } else {
//   //       console.error("❌ Error deleting product:", data.message);
//   //     }
//   //   } catch (error) {
//   //     console.error("🚨 Error deleting product:", error);
//   //   }
//   //   setIsOpen(false);
//   // };
//   const handleDeleteProduct = async () => {
//     if (!product_id) return;
//     try {
//       const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();
//       if (data.success) {
//         navigate("/dashboard");
//       } else {
//         console.error("❌ Error deleting product:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error deleting product:", error);
//     }
//     setIsOpen(false);
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
//             <Button
//               type="button"
//               className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
//               onClick={() => {
//                 console.log("Delete button clicked");
//                 setIsOpen(true)}}
//             >
//               ลบสินค้า
//             </Button>
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>

//         {/* Modal */}
//         {isOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fadeIn">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ ยืนยันการลบสินค้า</h2>
//       <p className="text-sm text-gray-600 mb-6">คุณแน่ใจหรือไม่ว่าต้องการ <span className="text-red-600 font-semibold">ลบสินค้านี้</span> ?</p>
//       <div className="flex justify-end space-x-3">
//         <button
//           onClick={() => setIsOpen(false)}
//           className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
//         >
//           ยกเลิก
//         </button>
//         <button
//           onClick={handleDeleteProduct}
//           className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
//         >
//           ลบ
//         </button>
//       </div>
//     </div>
//   </div>
// )}
// </div>
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
      }

      const updatedProduct = {
        product_name: productName,
        detail: productDetail,
        category_id: selectedCategory,
      };
      const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("❌ Error updating product:", data.message);
        return;
      }

      console.log("✅ Product data saved!");
      navigate("/dashboard");
    } catch (error) {
      console.error("🚨 Error submitting form:", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product_id) return;

    // ใช้ window.confirm เพื่อยืนยันการลบ
    const isConfirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?");
    if (!isConfirmed) return; // ถ้าผู้ใช้กดยกเลิก ให้หยุดการทำงาน

    try {
      const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        navigate("/dashboard");
      } else {
        console.error("❌ Error deleting product:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error deleting product:", error);
    }
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
            <Button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
              onClick={handleDeleteProduct} // เรียก handleDeleteProduct โดยตรง
            >
              ลบสินค้า
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