// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// // import InputGroup from "../../components/form/form-elements/InputGroup";
// // import DropzoneComponent from "../../components/form/form-elements/DropZone";
// // import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
// // import RadioButtons from "../../components/form/form-elements/RadioButtons";
// // import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
// // import FileInputExample from "../../components/form/form-elements/FileInputExample";
// // import SelectInputs from "../../components/form/form-elements/SelectInputs";
// // import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
// // import InputStates from "../../components/form/form-elements/InputStates";
// import PageMeta from "../../components/common/PageMeta";

// export default function FormElements() {
//   return (
//     <div>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       <PageBreadcrumb pageTitle="From Elements" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <DefaultInputs />
//           {/* <SelectInputs />
//           <TextAreaInput />
//           <InputStates /> */}
//         </div>
//         <div className="space-y-6">
//           {/* <InputGroup />
//           <FileInputExample />
//           <CheckboxComponents />
//           <RadioButtons />
//           <ToggleSwitch />
//           <DropzoneComponent /> */}
//         </div>
//       </div>
//     </div>
//   );
// }



// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import PageMeta from "../../components/common/PageMeta";
// import FileInputExample from "../../components/form/form-elements/FileInputExample";




// export default function FormElements() {
//   return (
//     <div>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       <PageBreadcrumb pageTitle="รายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//         <DropzoneComponent />
//         <FileInputExample />
//         </div>
//         <div className="space-y-6">
//         <DefaultInputs />
//         </div>
//       </div>
//     </div>
//   );
// }



// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import Button from "../../components/ui/button/Button";
// import PageMeta from "../../components/common/PageMeta";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";

// export default function FormElements() {
//   return (
//     <div>
//       <PageMeta
//         title="Step Solutions"
//         description=""
//       />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ThreeColumnImageGrid />
//           <DropzoneComponent />
//         </div>
//         <div className="space-y-6">
//           <Inputs />
//         </div>
//       </div>
//       <br />

//       <form>
//       <div className="flex items-center justify-end gap-5">
//         <Button type="submit" size="sm" variant="primary">
//           บันทึกข้อมูล
//           </Button>
//           </div>
//           </form>

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
//     <div>
//       <PageMeta title={`Edit Product: ${product?.product_name || "Unknown"}`} description="แก้ไขรายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
//             <DropZone />
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
//             <Button type="submit" size="sm" variant="primary">
//               บันทึกข้อมูล
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// ---------------------------------------------------------------
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";

// export default function ProductForm() {
//   const navigate = useNavigate();

//   // ✅ ตั้งค่า state สำหรับฟอร์ม
//   // const { product_id } = useParams<{ product_id?: string }>();
//   const [productId, setProductId] = useState<string | null>(null);
//   const [productName, setProductName] = useState("");
//   const [productDetail, setProductDetail] = useState("");
//   const [categoryName, setCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(""); // ✅ ใช้ category_id
//   const [isAddingCategory, setIsAddingCategory] = useState(false); // ✅ เพิ่มตัวแปรนี้
//   const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
//   const [tempImages, setTempImages] = useState<File[]>([]);

//   const uploadImages = async (productId: string, images: { filename: string; fileBuffer: string }[]) => {
//     const formData = new FormData();
//     formData.append("product_id", productId);
  
//     images.forEach((img, index) => {
//       const blob = dataURLtoBlob(img.fileBuffer);
//       formData.append("images", blob, img.filename);
//     });
  
//     try {
//       const response = await fetch("http://localhost:3000/api/save-images", {
//         method: "POST",
//         body: formData,
//       });
  
//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Images uploaded successfully:", data.files);
//       } else {
//         console.error("❌ Image upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading images:", error);
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
//   };

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
//   e.preventDefault();

//   if (!productName.trim() || (!categoryName.trim() && !selectedCategory)) {
//     alert("กรุณากรอกชื่อสินค้าและเลือกหมวดหมู่");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("product_name", productName.trim());

//   if (isAddingCategory) {
//     formData.append("category_name", categoryName.trim());
//   } else {
//     formData.append("category_id", selectedCategory);
//   }

//   const details = JSON.stringify({
//     detail: productDetail.trim() || "",
//   });
//   formData.append("details", details);

//   const response = await fetch("http://localhost:3000/api/add-product", {
//     method: "POST",
//     body: formData,
//   });

//   const data = await response.json();
//   if (data.success) {
//     setProductId(data.product_id);
//     alert("เพิ่มสินค้าสำเร็จ!");

//     // อัปโหลดรูปภาพหลังจากสร้างสินค้า
//     if (tempImages.length > 0) {
//       await uploadImages(data.product_id, tempImages);
//     }

//       // เรียกใช้ฟังก์ชันอัพโหลดไฟล์ 3D
//   if (selected3DFile && productId) {
//     await handleUpload3DFile(selected3DFile, productId);
//   }
    
//     // เด้งไปที่หน้า Dashboard หลังจากเพิ่มสินค้าสำเร็จ
//     navigate("/dashboard");
//   }
// };


//   return (
//     <div>
//       <PageMeta title="เพิ่มสินค้าใหม่" description="ฟอร์มเพิ่มสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
//             <DropZone onDrop={setTempImages} />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <Inputs
//             productName={productName}
//             setProductName={setProductName}
//             productDetail={productDetail}
//             setProductDetail={setProductDetail}
//             categoryName={categoryName}
//             setCategoryName={setCategoryName}
//             selectedCategory={selectedCategory} // ✅ ส่งค่า category_id
//             setSelectedCategory={setSelectedCategory} // ✅ เพิ่มฟังก์ชัน setSelectedCategory
//             isAddingCategory={isAddingCategory} // ✅ ส่ง isAddingCategory ไป
//             setIsAddingCategory={setIsAddingCategory} // ✅ ส่ง setIsAddingCategory ไป
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





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";

// export default function ProductForm() {
//   const navigate = useNavigate();

//   // ✅ ตั้งค่า state สำหรับฟอร์ม
//   const [productId, setProductId] = useState<string | null>(null);
//   const [productName, setProductName] = useState("");
//   const [productDetail, setProductDetail] = useState("");
//   const [categoryName, setCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(""); 
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
//   const [existing3DModelUrl, setExisting3DModelUrl] = useState<string | null>(null);
//   const [tempImages, setTempImages] = useState<File[]>([]);

//   // ✅ โหลดไฟล์ 3D ที่มีอยู่แล้ว (ถ้ามี)
//   useEffect(() => {
//     if (!productId) return;

//     const fetch3DModel = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${productId}/3d`);
//         const data = await response.json();
//         if (data.success && data.path) {
//           setExisting3DModelUrl(`http://localhost:3000${data.path}`);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching 3D model:", error);
//       }
//     };

//     fetch3DModel();
//   }, [productId]);

//   const uploadImages = async (productId: string, images: { filename: string; fileBuffer: string }[]) => {
//     const formData = new FormData();
//     formData.append("product_id", productId);

//     images.forEach((img, index) => {
//       const blob = dataURLtoBlob(img.fileBuffer);
//       formData.append("images", blob, img.filename);
//     });

//     try {
//       const response = await fetch("http://localhost:3000/api/save-images", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Images uploaded successfully:", data.files);
//       } else {
//         console.error("❌ Image upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading images:", error);
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
//   };

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
//         setExisting3DModelUrl(`http://localhost:3000${data.filePath}`);
//       } else {
//         console.error("❌ Failed to upload 3D file:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading 3D file:", error);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!productName.trim() || (!categoryName.trim() && !selectedCategory)) {
//       alert("กรุณากรอกชื่อสินค้าและเลือกหมวดหมู่");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("product_name", productName.trim());

//     if (isAddingCategory) {
//       formData.append("category_name", categoryName.trim());
//     } else {
//       formData.append("category_id", selectedCategory);
//     }

//     const details = JSON.stringify({
//       detail: productDetail.trim() || "",
//     });
//     formData.append("details", details);

//     const response = await fetch("http://localhost:3000/api/add-product", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     if (data.success) {
//       setProductId(data.product_id);
//       alert("เพิ่มสินค้าสำเร็จ!");

//       // ✅ อัปโหลดรูปภาพหลังจากสร้างสินค้า
//       if (tempImages.length > 0) {
//         await uploadImages(data.product_id, tempImages);
//       }

//       // ✅ อัปโหลดไฟล์ 3D ถ้ามีไฟล์ใหม่
//       if (selected3DFile) {
//         await handleUpload3DFile(selected3DFile, data.product_id);
//       }

//       // ✅ ไปที่หน้า Dashboard
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div>
//       <PageMeta title="เพิ่มสินค้าใหม่" description="ฟอร์มเพิ่มสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
//             <DropZone onFileSelect={setSelected3DFile} existingModelUrl={existing3DModelUrl} />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <Inputs
//             productName={productName}
//             setProductName={setProductName}
//             productDetail={productDetail}
//             setProductDetail={setProductDetail}
//             categoryName={categoryName}
//             setCategoryName={setCategoryName}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//             isAddingCategory={isAddingCategory}
//             setIsAddingCategory={setIsAddingCategory}
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








// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Button from "../../components/ui/button/Button";
// import ComponentCard from "../../components/common/ComponentCard";
// import DropZone from "../../components/form/form-elements/DropZone";
// import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
// import Inputs from "../../components/form/form-elements/Inputs";

// export default function ProductForm() {
//   const navigate = useNavigate();

//   // ✅ ตั้งค่า state สำหรับฟอร์ม
//   const [productId, setProductId] = useState<string | null>(null);
//   const [productName, setProductName] = useState("");
//   const [productDetail, setProductDetail] = useState("");
//   const [categoryName, setCategoryName] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
//   const [existing3DModelUrl, setExisting3DModelUrl] = useState<string | null>(null);
//   const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string }[]>([]);

//   // ✅ โหลดไฟล์ 3D ที่มีอยู่แล้ว (ถ้ามี)
//   useEffect(() => {
//     if (!productId) return;

//     const fetch3DModel = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/${productId}/3d`);
//         const data = await response.json();
//         if (data.success && data.path) {
//           setExisting3DModelUrl(`http://localhost:3000${data.path}`);
//         }
//       } catch (error) {
//         console.error("🚨 Error fetching 3D model:", error);
//       }
//     };

//     fetch3DModel();
//   }, [productId]);

//   // ฟังก์ชันสำหรับแปลง dataURL เป็น Blob
//   const dataURLtoBlob = (dataURL: string): Blob => {
//     const byteString = atob(dataURL.split(',')[1]);
//     const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: mimeString });
//   };

//   // ฟังก์ชันสำหรับอัปโหลดรูปภาพ
//   const uploadImages = async (productId: string, images: { filename: string; fileBuffer: string }[]) => {
//     const formData = new FormData();
//     formData.append("product_id", productId);

//     images.forEach((img, index) => {
//       const blob = dataURLtoBlob(img.fileBuffer);
//       const fileExt = img.filename.split('.').pop(); // ดึงนามสกุลไฟล์
//       const newFilename = `${productId}_${index + 1}.${fileExt}`; // ตั้งชื่อไฟล์ใหม่
//       formData.append("images", blob, newFilename);
//     });

//     try {
//       const response = await fetch("http://localhost:3000/api/save-images", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
//       if (data.success) {
//         console.log("✅ Images uploaded successfully:", data.files);
//       } else {
//         console.error("❌ Image upload failed:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading images:", error);
//     }
//   };

//   // ฟังก์ชันสำหรับอัปโหลดไฟล์ 3D
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
//         setExisting3DModelUrl(`http://localhost:3000${data.filePath}`);
//       } else {
//         console.error("❌ Failed to upload 3D file:", data.message);
//       }
//     } catch (error) {
//       console.error("🚨 Error uploading 3D file:", error);
//     }
//   };

//   // ฟังก์ชันสำหรับส่งฟอร์ม
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!productName.trim() || (!categoryName.trim() && !selectedCategory)) {
//       alert("กรุณากรอกชื่อสินค้าและเลือกหมวดหมู่");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("product_name", productName.trim());

//     if (isAddingCategory) {
//       formData.append("category_name", categoryName.trim());
//     } else {
//       formData.append("category_id", selectedCategory);
//     }

//     const details = JSON.stringify({
//       detail: productDetail.trim() || "",
//     });
//     formData.append("details", details);

//     const response = await fetch("http://localhost:3000/api/add-product", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();
//     if (data.success) {
//       setProductId(data.product_id);
//       alert("เพิ่มสินค้าสำเร็จ!");

//       // ✅ อัปโหลดรูปภาพหลังจากสร้างสินค้า
//       if (tempImages.length > 0) {
//         await uploadImages(data.product_id, tempImages);
//       }

//       // ✅ อัปโหลดไฟล์ 3D ถ้ามีไฟล์ใหม่
//       if (selected3DFile) {
//         await handleUpload3DFile(selected3DFile, data.product_id);
//       }

//       // ✅ ไปที่หน้า Dashboard
//       navigate("/dashboard");
//     }
//   };

//   return (
//     <div>
//       <PageMeta title="เพิ่มสินค้าใหม่" description="ฟอร์มเพิ่มสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <ComponentCard title="รูปภาพสินค้า">
//             <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
//             <DropZone onFileSelect={setSelected3DFile} existingModelUrl={existing3DModelUrl} />
//           </ComponentCard>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <Inputs
//             productName={productName}
//             setProductName={setProductName}
//             productDetail={productDetail}
//             setProductDetail={setProductDetail}
//             categoryName={categoryName}
//             setCategoryName={setCategoryName}
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//             isAddingCategory={isAddingCategory}
//             setIsAddingCategory={setIsAddingCategory}
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
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import Images from "../../components/ui/images/Images";
import Inputs from "../../components/form/form-elements/Inputs";
import Image from "../../components/ui/images/ResponsiveImage";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import PhoneInput from "../../components/form/group-input/PhoneInput";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import FileInput from "../../components/form/input/FileInput";



export default function ProductForm() {
  const navigate = useNavigate();

  // ✅ ตั้งค่า state สำหรับฟอร์ม
  const [productId, setProductId] = useState<string | null>(null);
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
  const [existing3DModelUrl, setExisting3DModelUrl] = useState<string | null>(null);
  const [tempImages, setTempImages] = useState<{ filename: string; fileBuffer: string }[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [position, setPosition] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);



const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedImageFile(file); // ⭐ เพิ่มบรรทัดนี้
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
  

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // เอาเฉพาะตัวเลข
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  

  // ✅ โหลดไฟล์ 3D ที่มีอยู่แล้ว (ถ้ามี)
  useEffect(() => {
    const formData = new FormData();
    formData.append("admin_name", firstName);          // ← ต้องมี state `firstName`, `lastName` เพิ่ม
    formData.append("admin_lastname", lastName);
    formData.append("admin_phone", phoneNumber);
    formData.append("admin_email", email);
    formData.append("admin_user", username);
    formData.append("admin_pwd", password);            // ยังไม่ hash ที่นี่ ให้ hash ที่ backend
    formData.append("admin_position", position);

if (selectedImageFile) {
  formData.append("admin_img", selectedImageFile); // ชื่อ field คือ admin_img
}

}, []);

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  };



  return (
    <div>
      <PageMeta title="การจัดการผู้ใช้ | Step Solutions" description="ฟอร์มเพิ่มสินค้า" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพพนักงาน">
            {previewImage && <Image src={previewImage} />}
            <FileInput onChange={handleImageFileChange} />
            </ComponentCard>
        </div>
        <form onSubmit={handleSubmit}>


<ComponentCard title="ข้อมูลพนักงาน">
  <div className="space-y-6">
    <div>
      <Label>ชื่อ - นามสกุล</Label>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="ชื่อ" />
        <Input placeholder="นามสกุล" />
      </div>
    </div>

    <div>
      <Label>หมายเลขโทรศัพท์</Label>
      <Input
        placeholder="หมายเลขโทรศัพท์"
        value={phoneNumber}
        onChange={handlePhoneChange}
        inputMode="numeric"
        maxLength={10}
      />
    </div>

    <div>
      <Label>อีเมล</Label>
      <Input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={handleEmailChange}
        inputMode="email"
      />
    </div>

    {/* ✅ ตำแหน่ง */}
    <div>
      <Label>ตำแหน่ง</Label>
      <Input
        placeholder="ตำแหน่ง (เช่น: ผู้ดูแลระบบ, ฝ่ายขาย)"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
    </div>
  </div>
</ComponentCard>

<br />

<ComponentCard title="บัญชีผู้ใช้งานระบบ">
  <div className="space-y-6">
    <div>
      <Label>ชื่อผู้ใช้งาน (Username)</Label>
      <Input
        placeholder="ชื่อผู้ใช้งาน"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>

    <div>
  <Label>รหัสผ่านและยืนยันรหัสผ่าน</Label>
  <div className="grid grid-cols-2 gap-4">
    {/* ช่องรหัสผ่าน */}
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="pr-10"
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        {showPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </span>
    </div>

    {/* ช่องยืนยันรหัสผ่าน */}
    <div className="relative">
      <Input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="ยืนยันรหัสผ่าน"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="pr-10"
      />
      <span
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        {showConfirmPassword ? (
          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-5 w-5 text-gray-500" />
        )}
      </span>
    </div>
  </div>
</div>
  </div>
</ComponentCard>

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