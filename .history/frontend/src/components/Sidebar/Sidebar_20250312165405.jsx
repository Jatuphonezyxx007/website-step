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
    <div className="sidebar-filter">
      <div className="filter-content">
        <h2 className="filter-title">Filters</h2>
        {filters.map((filter) => (
          <div key={filter.category} className="filter-group">
            <h3 className="filter-category">{filter.category}</h3>
            {filter.options.map((option) => (
              <div key={option} className="filter-option">
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedFilters[filter.category]?.includes(option) || false}
                  onChange={() => handleCheckboxChange(filter.category, option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button className="apply-button" onClick={() => onApply(selectedFilters)}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SidebarFilter;
