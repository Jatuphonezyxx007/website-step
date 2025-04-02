import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
import Button from "../../components/ui/button/Button";
import ComponentCard from "../../components/common/ComponentCard";
import DropZone from "../../components/form/form-elements/DropZone";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";

export default function EditForm() {
  const { product_id } = useParams<{ product_id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement update logic here
    console.log("Save product", product);
    navigate("/");
  };

    // ตรวจสอบหมวดหมู่ที่เลือก
    let categoryId = selectedCategory;
    if (selectedCategory === "newCategory") {
      // หมวดหมู่ใหม่
      const newCategoryName = prompt("กรุณากรอกชื่อหมวดหมู่ใหม่:");
      if (!newCategoryName) {
        alert("กรุณากรอกชื่อหมวดหมู่ใหม่");
        return;
      }
          // ส่งคำขอเพื่อเพิ่มหมวดหมู่ใหม่
    try {
      const response = await fetch('http://localhost:3000/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_name: newCategoryName })
      });

      const data = await response.json();
      if (data.success) {
        // หากเพิ่มหมวดหมู่ใหม่สำเร็จ
        categoryId = data.newCategoryId; // รับค่า category_id ที่เพิ่มใหม่
        alert("หมวดหมู่ใหม่ถูกเพิ่มเรียบร้อย");
      } else {
        alert("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่ใหม่");
        return;
      }
    } catch (error) {
      console.error("Error adding new category:", error);
      alert("เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่ใหม่");
      return;
    }
  }

  // ส่งข้อมูลสินค้าไปยัง API
  const productData = {
    product_name: productName,
    detail: message,
    category_id: categoryId, // ใช้ category_id ที่ได้
    images_main: "some_image_url", // ระบุ URL ของรูปภาพหลัก
    supplementary_images: ["image1.jpg", "image2.jpg"], // รูปภาพรอง
  };

  try {
    const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (data.success) {
      alert("อัปเดตสินค้าสำเร็จ");
      navigate("/"); // ไปยังหน้ารายการสินค้า
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดตสินค้า");
  }
};

      
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const mainImageUrl = product.images_main 
  ? `http://localhost:3000/products/${product.images_main}`
  : "https://placehold.co/400x600";

const supplementaryImages = product.supplementary_images
  ? product.supplementary_images.map((path: string) => `http://localhost:3000/products/${path}`)
  : [];
  const allImages = [mainImageUrl, ...supplementaryImages];

  // ฟังก์ชัน handleAddImage สำหรับ Card "เพิ่มสินค้า" (หากต้องการ)
  const handleAddImage = () => {
    console.log("คลิกเพิ่มสินค้า (รูปภาพ)");
    // อาจเปิด Modal อัปโหลดรูป หรืออัปเดต state เพื่อทำอย่างอื่น
  };

  return (
    <div>
      <PageMeta title={`Edit Product: ${product.product_name}`} description="แก้ไขรายละเอียดสินค้า" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ComponentCard title="รูปภาพสินค้า">
            <ThreeColumnImageGrid
              initialImages={allImages}
            />
            <DropZone />
          </ComponentCard>
        </div>
        <form onSubmit={handleSubmit}>
          <DefaultInputs 
            initialValues={{ 
              productName: product.product_name, 
              email: product.email, 
              categoryId: product.category_id 
            }}
            categories={categories}
          />
          <br />
          <div className="flex items-center justify-end gap-5">
            <Button size="sm" variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500 text-white">
              ลบรายการ
            </Button>
            <Button size="sm" variant="primary">
              บันทึกข้อมูล
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}