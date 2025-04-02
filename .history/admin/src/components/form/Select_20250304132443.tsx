import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value); // Trigger parent handler
  };

  return (
<Select
  options={[...categories, { value: 'newCategory', label: 'หมวดหมู่ใหม่' }]} 
  placeholder="กรุณาเลือกหมวดหมู่สินค้า"
  onChange={handleSelectChange}
  value={selectedCategory}
  className="dark:bg-dark-900"
/>

{selectedCategory === "newCategory" && (
  <div>
    <Label>กรุณากรอกชื่อหมวดหมู่ใหม่</Label>
    <Input
      type="text"
      value={newCategoryName}
      onChange={(e) => setNewCategoryName(e.target.value)}
    />
  </div>
)}

);
};

export default Select;
