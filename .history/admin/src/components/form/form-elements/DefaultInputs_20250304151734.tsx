// // src/components/form/form-elements/DefaultInputs.tsx
// import { useState, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Input from "../input/InputField";
// import Select from "../Select";
// import TextArea from "./TextAreaInput";

// export interface DefaultInputsProps {
//   initialValues?: {
//     productName?: string;
//     detail?: string;
//     categoryId?: string | number; // รองรับทั้ง string และ number
//   };
//   // categories array จากตาราง categories, แต่ละอันมี key "value" และ "label"
//   categories?: { value: string; label: string }[];
// }

// export default function DefaultInputs({ initialValues = {}, categories = [] }: DefaultInputsProps) {
//   const [productName, setProductName] = useState(initialValues.productName || "");
//   const [detail, setDetail] = useState(initialValues.detail || "");
//   const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   useEffect(() => {
//     setProductName(initialValues.productName || "");
//     setDetail(initialValues.detail || "");
//     setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
//   }, [initialValues]);

//   const handleSelectChange = (value: string) => {
//     setSelectedCategory(value);
//   };

//   return (
//     <ComponentCard title="รายละเอียด">
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">ชื่อสินค้า</Label>
//           <Input
//             type="text"
//             id="input"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>

//         <div>
//           <Label>รายละเอียดสินค้า</Label>
//           <TextArea initialValues={{ detail: product?.detail || "" }} />
//           </div>

//         <div>
//           <Label>หมวดหมู่</Label>
//           <Select
//             options={categories}
//             placeholder="กรุณาเลือกหมวดหมู่สินค้า"
//             onChange={handleSelectChange}
//             value={selectedCategory} // ใช้ value แทน defaultValue
//             className="dark:bg-dark-900"
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }


import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";

export interface DefaultInputsProps {
  initialValues?: {
    productName?: string;
    detail?: string;
    categoryId?: string | number;
  };
  productId?: string;
  categories?: { value: string; label: string }[];
}

export default function DefaultInputs({ initialValues = {}, productId, categories = [] }: DefaultInputsProps) {
  const [productName, setProductName] = useState(initialValues.productName || "");
  // const [detail, setDetail] = useState(initialValues.detail || "");
  const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    setProductName(initialValues.productName || "");
    // setDetail(initialValues.detail || "");
    setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
  }, [initialValues]);

  const handleSelectChange = (value: string) => {
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
          {/* <TextArea productId={productId} />         */}
          </div>

        <div>
          <Label>หมวดหมู่</Label>
          <Select
            options={categories}
            placeholder="กรุณาเลือกหมวดหมู่สินค้า"
            onChange={handleSelectChange}
            value={selectedCategory}
            className="dark:bg-dark-900"
          />
        </div>
      </div>
    </ComponentCard>
  );
}
