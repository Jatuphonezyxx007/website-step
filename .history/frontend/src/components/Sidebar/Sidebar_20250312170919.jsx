// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";

// const SidebarFilter = ({ filters, onApply }) => {
//   const [selectedFilters, setSelectedFilters] = useState({});

//   const handleCheckboxChange = (category, value) => {
//     setSelectedFilters((prev) => ({
//       ...prev,
//       [category]: prev[category]?.includes(value)
//         ? prev[category].filter((v) => v !== value)
//         : [...(prev[category] || []), value],
//     }));
//   };

//   return (
//     <Card className="w-64 p-4 shadow-lg rounded-2xl bg-white">
//       <CardContent>
//         <h2 className="text-xl font-semibold mb-4">Filters</h2>
//         {filters.map((filter) => (
//           <div key={filter.category} className="mb-4">
//             <h3 className="text-lg font-medium mb-2">{filter.category}</h3>
//             {filter.options.map((option) => (
//               <div key={option} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={option}
//                   checked={selectedFilters[filter.category]?.includes(option) || false}
//                   onCheckedChange={() => handleCheckboxChange(filter.category, option)}
//                 />
//                 <label htmlFor={option} className="text-sm">
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         ))}
//         <Button className="w-full mt-4" onClick={() => onApply(selectedFilters)}>
//           Apply Filters
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default SidebarFilter;

import { useState } from "react";
import "./Sidebar.css";

const SidebarFilter = ({ filters, onApply }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...(prev[category] || []), value],
    }));
  };

  return (
    <div className="filter-sidebar sticky top-0 h-screen overflow-auto">
    <h3 className="text-xl font-bold mb-4">Filter Products</h3>
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">หมวดหมู่สินค้า</label>
        {/* <CheckboxGroup 
          value={selectedCategories} 
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <Checkbox key={category.id} value={category.name}>
              {category.name}
            </Checkbox>
          ))}
        </CheckboxGroup> */}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-1/2 border rounded px-3 py-2"
            placeholder="Min"
          />
          <input
            type="number"
            className="w-1/2 border rounded px-3 py-2"
            placeholder="Max"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Status</label>
        <select className="w-full border rounded px-3 py-2">
          <option value="">All Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>
      <button
        type="button"
        className="apply-filters-btn"
      >
        Apply Filters
      </button>
    </form>
  </div>
);
};

export default SidebarFilter;
