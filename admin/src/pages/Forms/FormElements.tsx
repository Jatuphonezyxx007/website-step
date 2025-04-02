import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import Images from "../../components/ui/images/Images";
import Inputs from "../../components/form/form-elements/Inputs";
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
  const [existing3DModelUrl, setExisting3DModelUrl] = useState<string | null>(
    null
  );
  const [tempImages, setTempImages] = useState<
    { filename: string; fileBuffer: string }[]
  >([]);
  const [datasheetFile, setDatasheetFile] = useState<File | null>(null);

  // ✅ โหลดไฟล์ 3D ที่มีอยู่แล้ว (ถ้ามี)
  useEffect(() => {
    if (!productId) return;

    const fetch3DModel = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${productId}/3d`
        );
        const data = await response.json();
        if (data.success && data.path) {
          setExisting3DModelUrl(`http://localhost:3000${data.path}`);
        }
      } catch (error) {
        console.error("🚨 Error fetching 3D model:", error);
      }
    };

    fetch3DModel();
  }, [productId]);

  // ฟังก์ชันสำหรับแปลง dataURL เป็น Blob
  const dataURLtoBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // ฟังก์ชันสำหรับอัปโหลดรูปภาพ
  const uploadImages = async (
    productId: string,
    images: { filename: string; fileBuffer: string }[]
  ) => {
    const formData = new FormData();
    formData.append("product_id", productId);

    images.forEach((img, index) => {
      const blob = dataURLtoBlob(img.fileBuffer);
      const fileExt = img.filename.split(".").pop(); // ดึงนามสกุลไฟล์
      const newFilename = `${productId}_${index + 1}.${fileExt}`; // ตั้งชื่อไฟล์ใหม่
      formData.append("images", blob, newFilename);
    });

    try {
      const response = await fetch("http://localhost:3000/api/save-images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ Images uploaded successfully:", data.files);
      } else {
        console.error("❌ Image upload failed:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error uploading images:", error);
    }
  };

  // ฟังก์ชันสำหรับอัปโหลดไฟล์ datasheet
  const uploadDatasheet = async (file: File | null, productId: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      const response = await fetch("http://localhost:3000/api/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ Datasheet uploaded successfully:", data.filePath);
      } else {
        console.error("❌ Failed to upload datasheet:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error uploading datasheet:", error);
    }
  };

  // ฟังก์ชันสำหรับอัปโหลดไฟล์ 3D
  const handleUpload3DFile = async (file: File | null, productId: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);

    try {
      const response = await fetch("http://localhost:3000/api/upload-3d", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ 3D file uploaded successfully:", data.filePath);
        setExisting3DModelUrl(`http://localhost:3000${data.filePath}`);
      } else {
        console.error("❌ Failed to upload 3D file:", data.message);
      }
    } catch (error) {
      console.error("🚨 Error uploading 3D file:", error);
    }
  };

  // ฟังก์ชันสำหรับส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName.trim() || (!categoryName.trim() && !selectedCategory)) {
      alert("กรุณากรอกชื่อสินค้าและเลือกหมวดหมู่");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName.trim());

    if (isAddingCategory) {
      formData.append("category_name", categoryName.trim());
    } else {
      formData.append("category_id", selectedCategory);
    }

    const details = JSON.stringify({
      detail: productDetail.trim() || "",
    });
    formData.append("details", details);

    const response = await fetch("http://localhost:3000/api/add-product", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      setProductId(data.product_id);
      await new Promise((resolve) => setTimeout(resolve, 500)); // เพิ่ม delay เล็กน้อย
      alert("เพิ่มสินค้าสำเร็จ!");

      // ✅ อัปโหลดรูปภาพหลังจากสร้างสินค้า
      if (tempImages.length > 0) {
        await uploadImages(data.product_id, tempImages);
      }

      // ✅ อัปโหลดไฟล์ 3D ถ้ามีไฟล์ใหม่
      if (selected3DFile) {
        await handleUpload3DFile(selected3DFile, data.product_id);
      }

      if (datasheetFile) {
        await uploadDatasheet(datasheetFile, data.product_id);
      }

      // ✅ อัปโหลดรูปภาพหลังจากสร้างสินค้า
      if (data.success && data.product_id) {
        setProductId(data.product_id); // ตั้งค่า product_id
        if (tempImages.length > 0) {
          await uploadImages(data.product_id, tempImages); // อัปโหลดภาพหลังจากสร้างสินค้า
        }
      }

      // ✅ ไปที่หน้า Dashboard และรีเฟรช
      navigate("/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 100); // หน่วงนิดนึงเพื่อให้ navigate ทำงานก่อน
    }
  };

  return (
    <div>
      <PageMeta title="เพิ่มสินค้าใหม่" description="ฟอร์มเพิ่มสินค้า" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพสินค้า">
            <Images onImagesUpdate={setTempImages} />
          </ComponentCard>
          <ComponentCard title="Data Sheet">
            <FileInput
              onFileSelect={setDatasheetFile} // ใช้ฟังก์ชันนี้เมื่อเลือกไฟล์
              productName={productName}
            />
          </ComponentCard>
          <ComponentCard title="3D">
            <DropZone
              onFileSelect={setSelected3DFile}
              existingModelUrl={existing3DModelUrl}
            />
          </ComponentCard>
        </div>
        <form onSubmit={handleSubmit}>
          <Inputs
            productName={productName}
            setProductName={setProductName}
            productDetail={productDetail}
            setProductDetail={setProductDetail}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isAddingCategory={isAddingCategory}
            setIsAddingCategory={setIsAddingCategory}
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
