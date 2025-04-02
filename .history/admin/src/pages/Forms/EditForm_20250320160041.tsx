import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
import Inputs from "../../components/form/form-elements/Inputs";
import FileInput from "../../components/form/input/FileInput";

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!product_id) return;

  //   try {
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



  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!product_id) return;
  
  //   try {
  //     if (selected3DFile) {
  //       const formData = new FormData();
  //       formData.append("file", selected3DFile);
  //       formData.append("product_id", product_id);
  
  //       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
  //         method: "POST",
  //         body: formData,
  //       });
  
  //       // ✅ ตรวจสอบว่า response เป็น JSON หรือไม่
  //       if (!uploadResponse.ok) {
  //         const errorText = await uploadResponse.text();
  //         throw new Error(`❌ 3D Upload Failed: ${errorText}`);
  //       }
  
  //       const uploadData = await uploadResponse.json();
  //       if (!uploadData.success) {
  //         console.error("❌ Error uploading 3D file:", uploadData.message);
  //         return;
  //       }
  //       console.log("✅ 3D Model uploaded:", uploadData.filePath);
  //     }

  //         // บันทึกรูปภาพใหม่ที่ถูกเพิ่มเข้ามาใน tempImages
  //   if (tempImages.length > 0) {
  //     const formData = new FormData();
  //     tempImages.forEach((img) => {
  //       formData.append("images", img.fileBuffer);
  //     });
  //     formData.append("product_id", product_id);

  //     const response = await fetch("http://localhost:3000/api/save-images", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to save images");
  //     }
  //   }
  
  //     const updatedProduct = {
  //       product_name: productName,
  //       detail: productDetail,
  //       category_id: selectedCategory,
  //     };
  
  //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedProduct),
  //     });
  
  //     // ✅ ตรวจสอบ Response ก่อนแปลงเป็น JSON
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`❌ Update Failed: ${errorText}`);
  //     }
  
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
  // ---------------------------------------------
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!product_id) return;
  
  //   try {
  //     if (selected3DFile) {
  //       const formData = new FormData();
  //       formData.append("file", selected3DFile);
  //       formData.append("product_id", product_id);
  
  //       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
  //         method: "POST",
  //         body: formData,
  //       });
  
  //       if (!uploadResponse.ok) {
  //         const errorText = await uploadResponse.text();
  //         throw new Error(`❌ 3D Upload Failed: ${errorText}`);
  //       }
  
  //       const uploadData = await uploadResponse.json();
  //       if (!uploadData.success) {
  //         console.error("❌ Error uploading 3D file:", uploadData.message);
  //         return;
  //       }
  //       console.log("✅ 3D Model uploaded:", uploadData.filePath);
  //     }
  
  //     // บันทึกรูปภาพใหม่ที่ถูกเพิ่มเข้ามาใน tempImages
  //     if (tempImages.length > 0) {
  //       const formData = new FormData();
  //       tempImages.forEach((img) => {
  //         // แปลง base64 string เป็น Blob
  //         const byteCharacters = atob(img.fileBuffer.split(",")[1]);
  //         const byteNumbers = new Array(byteCharacters.length);
  //         for (let i = 0; i < byteCharacters.length; i++) {
  //           byteNumbers[i] = byteCharacters.charCodeAt(i);
  //         }
  //         const byteArray = new Uint8Array(byteNumbers);
  //         const blob = new Blob([byteArray], { type: "image/png" }); // เปลี่ยน type ตามประเภทไฟล์
  
  //         // ส่ง Blob ไปยังเซิร์ฟเวอร์
  //         formData.append("images", blob, img.filename);
  //       });
  //       formData.append("product_id", product_id);
  
  //       const response = await fetch("http://localhost:3000/api/save-images", {
  //         method: "POST",
  //         body: formData,
  //       });
  
  //       if (!response.ok) {
  //         throw new Error("Failed to save images");
  //       }
  //     }
  
  //     const updatedProduct = {
  //       product_name: productName,
  //       detail: productDetail,
  //       category_id: selectedCategory,
  //     };
  
  //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedProduct),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`❌ Update Failed: ${errorText}`);
  //     }
  
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



  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!product_id) return;
  
  //   try {
  //     if (selected3DFile) {
  //       const formData = new FormData();
  //       formData.append("file", selected3DFile);
  //       formData.append("product_id", product_id);
  
  //       const uploadResponse = await fetch("http://localhost:3000/api/upload-3d", {
  //         method: "POST",
  //         body: formData,
  //       });
  
  //       if (!uploadResponse.ok) {
  //         const errorText = await uploadResponse.text();
  //         throw new Error(`❌ 3D Upload Failed: ${errorText}`);
  //       }
  
  //       const uploadData = await uploadResponse.json();
  //       if (!uploadData.success) {
  //         console.error("❌ Error uploading 3D file:", uploadData.message);
  //         return;
  //       }
  //       console.log("✅ 3D Model uploaded:", uploadData.filePath);
  //     }
  
  //     // บันทึกรูปภาพใหม่ที่ถูกเพิ่มเข้ามาใน tempImages
  //     if (tempImages.length > 0) {
  //       const formData = new FormData();
  //       tempImages.forEach((img) => {
  //         // ตรวจสอบว่า fileBuffer เป็น base64 string ที่ถูกต้อง
  //         if (img.fileBuffer.startsWith("data:image")) {
  //           const base64Data = img.fileBuffer.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
  //           const byteCharacters = atob(base64Data); // ถอดรหัส base64
  //           const byteNumbers = new Array(byteCharacters.length);
  //           for (let i = 0; i < byteCharacters.length; i++) {
  //             byteNumbers[i] = byteCharacters.charCodeAt(i);
  //           }
  //           const byteArray = new Uint8Array(byteNumbers);
  //           const blob = new Blob([byteArray], { type: "image/png" }); // สร้าง Blob จาก byteArray
  //           formData.append("images", blob, img.filename); // เพิ่ม Blob ลงใน FormData
  //         } else {
  //           console.error("❌ Invalid fileBuffer format:", img.fileBuffer);
  //         }
  //       });
  //       formData.append("product_id", product_id);
  
  //       const response = await fetch("http://localhost:3000/api/save-images", {
  //         method: "POST",
  //         body: formData,
  //       });
  
  //       if (!response.ok) {
  //         throw new Error("Failed to save images");
  //       }
  //     }
  
  //     const updatedProduct = {
  //       product_name: productName,
  //       detail: productDetail,
  //       category_id: selectedCategory,
  //     };
  
  //     const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updatedProduct),
  //     });
  
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`❌ Update Failed: ${errorText}`);
  //     }
  
  //     const data = await response.json();
  //     if (!data.success) {
  //       console.error("❌ Error updating product:", data.message);
  //       return;
  //     }
  
  //     console.log("✅ Product data saved!");
  //     navigate("/dashboard"); // เด้งไปที่ /dashboard หลังจากบันทึกข้อมูลสำเร็จ
  //   } catch (error) {
  //     console.error("🚨 Error submitting form:", error);
  //   }
  // };


  const handleFileUpload = async (file: File, product_id: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", product_id);
  
    try {
      const response = await fetch("http://localhost:3000/api/upload-detail-image", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (data.success) {
        console.log("✅ Detail image uploaded successfully:", data.filePath);
      } else {
        console.error("❌ Failed to upload detail image:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error uploading detail image:", error);
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product_id) return;
  
    try {
      // ✅ อัปเดตข้อมูลสินค้า
      const updatedProduct = {
        product_name: productName,
        detail: productDetail,
        category_id: selectedCategory,
      };
  
      const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`❌ Update Failed: ${errorText}`);
      }
  
      const data = await response.json();
      if (!data.success) {
        console.error("❌ Error updating product:", data.message);
        return;
      }
  
      console.log("✅ Product data updated!");
  
      // ✅ อัปโหลดรูปภาพใหม่
      if (tempImages.length > 0) {
        const formData = new FormData();
        formData.append("product_id", product_id);
  
        for (const img of tempImages) {
          let blob;
          if (img.fileBuffer.startsWith("data:image")) {
            // ถ้าเป็น base64 ให้แปลงเป็น Blob
            blob = dataURLtoBlob(img.fileBuffer);
          } else if (img.fileBuffer.startsWith("/products/")) {
            // ✅ ถ้าเป็น URL ให้ดาวน์โหลดเป็น Blob
            blob = await fetch(`http://localhost:3000${img.fileBuffer}`).then((res) => res.blob());
          }
  
          if (blob) {
            formData.append("images", blob, img.filename);
          } else {
            console.error("❌ Invalid fileBuffer format:", img.fileBuffer);
          }
        }
  
        const imageUploadResponse = await fetch("http://localhost:3000/api/save-images", {
          method: "POST",
          body: formData,
        });
  
        const imageData = await imageUploadResponse.json();
        if (imageData.success) {
          console.log("✅ Images saved successfully!");
        } else {
          console.error("❌ Error saving images:", imageData.message);
        }
      }

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("product_id", product_id);

        const uploadResponse = await fetch("http://localhost:3000/api/upload-detail-image", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          console.log("✅ Detail image uploaded successfully:", uploadData.filePath);
        } else {
          console.error("❌ Failed to upload detail image:", uploadData.message);
        }
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("🚨 Error submitting form:", error);
    }
  };
  
  // 🔹 ฟังก์ชันแปลง Base64 -> Blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
            <FileInput onChange={handleFileUpload} />
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