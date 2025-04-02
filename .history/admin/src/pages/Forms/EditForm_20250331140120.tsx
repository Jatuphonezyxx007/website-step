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
  const [categories, setCategories] = useState<
    { value: number; label: string }[]
  >([]);
  const [existingModelUrl, setExistingModelUrl] = useState<string | null>(null);
  const [selected3DFile, setSelected3DFile] = useState<File | null>(null);
  const [tempImages, setTempImages] = useState<
    { filename: string; fileBuffer: string; isEdited?: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [datasheetFilename, setDatasheetFilename] = useState("");

  useEffect(() => {
    if (!product_id) {
      setError("❌ Product ID is missing");
      setLoading(false);
      return;
    }

    const fetchProductData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${product_id}`
        );
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
          setProductName(data.product.product_name || "");
          setProductDetail(data.product.detail || "");
          setSelectedCategory(String(data.product.category_id || ""));
          setDatasheetFilename(data.product.datasheet);
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
        const response = await fetch(
          `http://localhost:3000/api/products/${product_id}/3d`
        );
        const data = await response.json();
        if (data.success && data.path) {
          setExistingModelUrl(`http://localhost:3000${data.path}`);
        }
      } catch (error) {
        console.error("🚨 Error fetching 3D model:", error);
      }
    };

    Promise.all([fetchProductData(), fetch3DModel()]).finally(() =>
      setLoading(false)
    );
  }, [product_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product_id) return;

    try {
      if (selected3DFile) {
        const formData = new FormData();
        formData.append("file", selected3DFile);
        formData.append("product_id", product_id);

        const uploadResponse = await fetch(
          "http://localhost:3000/api/upload-3d",
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          console.error("❌ Error uploading 3D file:", uploadData.message);
          return;
        }
        console.log("✅ 3D Model uploaded:", uploadData.filePath);
      }

      // Handle File Input if a file is selected
      // ในส่วนของ handleSubmit
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("product_id", product_id);

        try {
          const uploadResponse = await fetch(
            "http://localhost:3000/api/upload-file",
            {
              method: "POST",
              body: formData,
            }
          );

          const uploadData = await uploadResponse.json();
          if (!uploadData.success) {
            console.error("❌ Error uploading file:", uploadData.message);
            throw new Error(uploadData.message);
          }
          console.log("✅ File uploaded:", uploadData.filePath);
        } catch (error) {
          console.error("🚨 Error uploading file:", error);
          throw error;
        }
      }

      // ✅ อัปเดตข้อมูลสินค้า
      const updatedProduct = {
        product_name: productName,
        detail: productDetail,
        category_id: selectedCategory,
      };

      const response = await fetch(
        `http://localhost:3000/api/products/${product_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

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
      navigate("/dashboard");

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
            blob = await fetch(`http://localhost:3000${img.fileBuffer}`).then(
              (res) => res.blob()
            );
          }

          if (blob) {
            formData.append("images", blob, img.filename);
          } else {
            console.error("❌ Invalid fileBuffer format:", img.fileBuffer);
          }
        }

        const imageUploadResponse = await fetch(
          "http://localhost:3000/api/save-images",
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await imageUploadResponse.json();
        if (imageData.success) {
          console.log("✅ Images saved successfully!");
        } else {
          console.error("❌ Error saving images:", imageData.message);
        }
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("🚨 Error submitting form:", error);
    }
  };

  // 🔹 ฟังก์ชันแปลง Base64 -> Blob
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

  const handleDeleteProduct = async () => {
    if (!product_id) return;

    // ใช้ window.confirm เพื่อยืนยันการลบ
    const isConfirmed = window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?");
    if (!isConfirmed) return; // ถ้าผู้ใช้กดยกเลิก ให้หยุดการทำงาน

    try {
      const response = await fetch(
        `http://localhost:3000/api/products/${product_id}`,
        {
          method: "DELETE",
        }
      );
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
      <PageMeta
        title={`Edit Product: ${product?.product_name || "Unknown"}`}
        description="แก้ไขรายละเอียดสินค้า"
      />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพสินค้า">
            <ThreeColumnImageGrid onImagesUpdate={setTempImages} />
          </ComponentCard>
          <ComponentCard title="Data Sheet">
            <FileInput onFileSelect={setFile} productName={productName} />
          </ComponentCard>
          <DropZone
            onFileSelect={setSelected3DFile}
            existingModelUrl={existingModelUrl}
          />
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
