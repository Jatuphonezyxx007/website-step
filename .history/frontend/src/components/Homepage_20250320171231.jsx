import { useEffect, useState } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories)); // แก้ให้ตรงกับ key 'categories'
  }, []);

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold text-center mb-8">หมวดหมู่สินค้า</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.value}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <FolderIcon className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-center">{category.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
