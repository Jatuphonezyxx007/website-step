// src/components/form/form-elements/DefaultInputs.tsx
import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "./TextAreaInput";

export interface DefaultInputsProps {
  initialValues?: {
    productName?: string;
    email?: string;
    categoryId?: string | number; // รองรับทั้ง string และ number
  };
  // categories array จากตาราง categories, แต่ละอันมี key "value" และ "label"
  categories?: { value: string; label: string }[];
}

export default function DefaultInputs({ initialValues = {}, categories = [] }: DefaultInputsProps) {
  // controlled states สำหรับ input fields
  const [productName, setProductName] = useState(initialValues.productName || "");
  const [email, setEmail] = useState(initialValues.email || "");
  // แปลงค่า categoryId เป็น string ถ้ามี
  const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // state สำหรับ TextArea (message) ที่ใช้ในฟอร์ม
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  // เมื่อ initialValues เปลี่ยน ให้ update state
  useEffect(() => {
    setProductName(initialValues.productName || "");
    setEmail(initialValues.email || "");
    setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
  }, [initialValues]);

  const [showPassword, setShowPassword] = useState(false);

  // ใช้ prop categories โดยตรง
  const selectOptions = categories;

  const handleSelectChange = (value: string) => {
    console.log("Selected category:", value);
    setSelectedCategory(value);
  };

  return (
    <ComponentCard title="รายละเอียด">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">ชื่อสินค้า</Label>
          <Input
            type="text"
            id="input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <Label>รายละเอียดสินค้า</Label>
          <TextArea/>
        </div>

        <div>
          <Label>หมวดหมู่</Label>
          <Select
            options={selectOptions}
            placeholder={
              selectOptions && selectOptions.length > 0
                ? "กรุณาเลือกหมวดหมู่สินค้า"
                : "ไม่พบหมวดหมู่"
            }
            onChange={handleSelectChange}
            value={selectedCategory}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}