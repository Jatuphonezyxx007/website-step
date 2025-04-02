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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
import Inputs from "../../components/form/form-elements/Inputs";

export default function AddProductForm() {
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [installationType, setInstallationType] = useState("");
  const [screenSize, setScreenSize] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState(""); // 🎯 เก็บค่าหมวดหมู่ใหม่
  const [categories, setCategories] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.categories.map((cat) => ({ value: cat.category_id, label: cat.category_name })));
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("product_name", productName.trim());
  //   formData.append("detail", productDetail.trim());
  //   formData.append("installation_type", installationType.trim());
  //   formData.append("screen_size", screenSize.trim());
    
  //   // ✅ หากผู้ใช้พิมพ์หมวดหมู่ใหม่ ให้ใช้ newCategory
  //   formData.append("category_name", newCategory.trim() || selectedCategory);

  //   // 🖼️ อัปโหลดรูปภาพ
  //   tempImages.forEach((img, index) => {
  //     if (img.fileBuffer) {
  //       formData.append("images", img.fileBuffer, `image_${index}.png`);
  //     }
  //   });

  //   try {
  //     const response = await fetch("http://localhost:3000/api/products", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       console.log("✅ Product added successfully!");
  //       navigate("/dashboard");
  //     } else {
  //       console.error("❌ Error adding product:", data.message);
  //     }
  //   } catch (error) {
  //     console.error("🚨 Error adding product:", error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // 📝 สร้าง FormData สำหรับสินค้า (ยังไม่รวมรูป)
    const formData = new FormData();
    formData.append("product_name", productName.trim());
    formData.append("detail", productDetail.trim());
    formData.append("installation_type", installationType.trim());
    formData.append("screen_size", screenSize.trim());
  
    // ✅ หากผู้ใช้พิมพ์หมวดหมู่ใหม่ ให้ใช้ newCategory
    formData.append("category_name", newCategory.trim() || selectedCategory);
  
    try {
      // 🆕 1️⃣ เพิ่มสินค้าใหม่ก่อน
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (!data.success) {
        console.error("❌ Error adding product:", data.message);
        return;
      }
  
      const product_id = data.product_id;
      console.log("✅ Product added successfully! ID:", product_id);
  
      // 🖼️ 2️⃣ เริ่มอัปโหลดรูปภาพ (เฉพาะหลังจากที่ได้ `product_id`)
      if (tempImages.length > 0) {
        const uploadPromises = tempImages.map(async (img, index) => {
          if (!img.fileBuffer) return;
  
          const imageData = new FormData();
          imageData.append("product_id", product_id);
          imageData.append("image", img.fileBuffer, `image_${index}.png`);
  
          await fetch("http://localhost:3000/api/upload-image-temp", {
            method: "POST",
            body: imageData,
          });
        });
  
        await Promise.all(uploadPromises);
        console.log("✅ All images uploaded successfully!");
      }
  
      // 🔄 3️⃣ บันทึกรูปภาพจริง
      const saveImagesResponse = await fetch("http://localhost:3000/api/save-images", {
        method: "POST",
        body: JSON.stringify({ product_id }),
        headers: { "Content-Type": "application/json" },
      });
  
      const saveImagesData = await saveImagesResponse.json();
      if (saveImagesData.success) {
        console.log("✅ Images saved successfully!");
      } else {
        console.error("❌ Error saving images:", saveImagesData.message);
      }
  
      // ✅ เปลี่ยนเส้นทางไปยัง Dashboard
      navigate("/dashboard");
  
    } catch (error) {
      console.error("🚨 Error adding product:", error);
    }
  };
  


  return (
    <div>
      <PageMeta title="เพิ่มสินค้าใหม่" description="เพิ่มรายการสินค้าใหม่ลงในระบบ" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพสินค้า">
            <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
            <DropZone />
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
            newCategory={newCategory}
            setNewCategory={setNewCategory}
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
