// import { useState } from "react";
// import Label from "../Label";
// import Select from "../Select";

// export default function SelectInputs() {
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];
//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };
//   const [selectedValues, setSelectedValues] = useState<string[]>([]);

//   const multiOptions = [
//     { value: "1", text: "Option 1", selected: false },
//     { value: "2", text: "Option 2", selected: false },
//     { value: "3", text: "Option 3", selected: false },
//     { value: "4", text: "Option 4", selected: false },
//     { value: "5", text: "Option 5", selected: false },
//   ];
//   return (
//       <div className="space-y-6">
//         <div>
//           <Label>หมวดหมู่</Label>
//           <Select
//             options={options}
//             placeholder="Select Option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
//       </div>
//   );
// }

// interface SelectInputsProps {
//   name: string;
//   label: string;
//   value: number;
//   options: { value: number; label: string }[];
//   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
// }

// const SelectInputs: React.FC<SelectInputsProps> = ({ name, label, value, options, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="block">{label}</label>
//       <select name={name} value={value} onChange={onChange} className="border p-2 w-full">
//         <option value="">เลือกหมวดหมู่</option>
//         {options.map(option => (
//           <option key={option.value} value={option.value}>{option.label}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default SelectInputs;




"use client";
import React, { useState } from "react";
import Label from "../Label";
import Select from "../Select";
// import { ChevronDownIcon } from "@/icons";

export default function SelectInputs() {
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];


  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };


  return (
      <div className="space-y-6">
        <div>
          <Label>Select Input</Label>
         <div className="relative">
           <Select
            options={options}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
         </div>
        </div>
      </div>
  );
}