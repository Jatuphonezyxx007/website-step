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
  value: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // Trigger parent handler
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className={`border p-2 ${className}`}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const CategoryForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const categories: Option[] = [
    { value: "category1", label: "หมวดหมู่ 1" },
    { value: "category2", label: "หมวดหมู่ 2" },
    // Add more categories as needed
  ];

  const handleSelectChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <div>
      <Select
        options={[...categories, { value: "newCategory", label: "หมวดหมู่ใหม่" }]}
        placeholder="กรุณาเลือกหมวดหมู่สินค้า"
        onChange={handleSelectChange}
        value={selectedCategory}
        className="dark:bg-dark-900"
      />

      {selectedCategory === "newCategory" && (
        <div>
          <label>กรุณากรอกชื่อหมวดหมู่ใหม่</label>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border p-2"
          />
        </div>
      )}
    </div>
  );
};

export default CategoryForm;
