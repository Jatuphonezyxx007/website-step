// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
// import PageMeta from "../../components/common/PageMeta";
// import PageMeta from "../../components/common/Card";

// export default function Home() {
//   return (
//     <>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         <div className="col-span-12">

//         </div>
//       </div>
//     </>
//   );
// }


// // src/pages/Home.tsx
// import PageMeta from "../../components/common/PageMeta";
// import Card from "../../components/common/Card";

// export default function Home() {
//   return (
//     <>
//       <PageMeta title="Step Solution" description="" />
//       <div className="grid grid-cols-12 gap-4 md:gap-6">
//         {/* ตัวอย่างการใช้ Card ใน grid */}
//         <div className="col-span-12 md:col-span-4">
//           <Card
//             title="Product 1"
//             image="https://via.placeholder.com/300"
//             description="รายละเอียดสินค้า 1"
//             price={10.99}
//           />
//         </div>
//         <div className="col-span-12 md:col-span-4">
//           <Card
//             title="Product 2"
//             image="https://via.placeholder.com/300"
//             description="รายละเอียดสินค้า 2"
//             price={12.99}
//           />
//         </div>
//         <div className="col-span-12 md:col-span-4">
//           <Card
//             title="Product 3"
//             image="https://via.placeholder.com/300"
//             description="รายละเอียดสินค้า 3"
//             price={8.99}
//           />
//         </div>
//       </div>
//     </>
//   );
// }




// // src/pages/Home.tsx
// import { useEffect, useState } from "react";
// import PageMeta from "../../components/common/PageMeta";
// import Card from "../../components/common/Card";

// export default function Home() {
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     // ดึงข้อมูลสินค้าจาก API
//     fetch("http://localhost:3000/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProducts(data.products);
//         } else {
//           console.error("Error fetching products:", data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//       });
//   }, []);

//   return (
//     <>
//       <PageMeta title="Step Solution" description="" />
//       <div className="grid grid-cols-12 gap-3 md:gap-6 items-stretch">
//         {products.map((products) => (
//           <div key={products.product_id} className="col-span-12 md:col-span-3">
//             <Card
//               title={products.product_name}
//               // กำหนด URL สำหรับรูปภาพ หากมี
//               image={products.images_main ? `http://localhost:3000/products/${products.images_main}` : undefined}
//             />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }



// // src/pages/Home.tsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Card from "../../components/common/Card";

// export default function Home() {
//   const [products, setProducts] = useState<any[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:3000/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setProducts(data.products);
//         } else {
//           console.error("Error fetching products:", data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//       });
//   }, []);

//   return (
//     <>
//       <PageMeta title="Step Solution" description="" />
//       <div className="grid grid-cols-12 gap-3 md:gap-6 items-stretch">
//         {products.map((product) => (
//           <div
//             key={product.product_id}
//             className="col-span-12 md:col-span-3 cursor-pointer"
//             onClick={() => navigate(`/edit-product/${product.product_id}`)}
//             >
//             <Card
//               title={product.product_name}
//               image={
//                 product.images_main
//                   ? `http://localhost:3000/products/${product.images_main}`
//                   : undefined
//               }
//             />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PageMeta from "../../components/common/PageMeta";
// import Card from "../../components/common/Card";
// // import AppHeader from "../../components/layout/AppHeader"; // ✅ นำเข้า AppHeader เพื่อใช้ส่งค่าการค้นหา


// export default function Home() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ เก็บค่าการค้นหา
//   const navigate = useNavigate();

//   // ✅ ค้นหาสินค้าแบบ Live Search
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/api/products/search?query=${searchQuery}`);
//         const data = await response.json();

//         if (data.success) {
//           setProducts(data.products);
//         } else {
//           setProducts([]);
//         }
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProducts();
//   }, [searchQuery]); // ✅ ค้นหาทุกครั้งที่พิมพ์

//   return (
//     <>
//       <PageMeta title="Step Solution" description="" />
      
//       {/* ✅ ใช้ AppHeader และส่งฟังก์ชัน onSearch */}
//       {/* <AppHeader onSearch={setSearchQuery} /> */}

//       <div className="grid grid-cols-12 gap-3 md:gap-6 items-stretch mt-4">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product.product_id} className="col-span-12 md:col-span-3 cursor-pointer" onClick={() => navigate(`/edit-product/${product.product_id}`)}>
//               <Card
//                 title={product.product_name}
//                 image={product.images_main ? `http://localhost:3000/products/${product.images_main}` : undefined}
//               />
//             </div>
//           ))
//         ) : (
//           <p className="col-span-12 text-center text-gray-500">ไม่พบสินค้าตามคำค้นหา</p>
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Card from "../../components/common/Card";

interface HomeProps {
  searchQuery: string; // ✅ รับค่าค้นหาจาก AppHeader
}

export default function Home({ searchQuery }: HomeProps) {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  // ✅ ค้นหาสินค้าแบบ Live Search หรือแสดงสินค้าทั้งหมด
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = searchQuery.trim()
          ? `http://localhost:3000/api/products/search?query=${searchQuery}`
          : `http://localhost:3000/api/products`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [searchQuery]); // ✅ อัปเดตทุกครั้งที่พิมพ์

  return (
    <>
      <PageMeta title="Step Solution" description="" />

      <div className="grid grid-cols-12 gap-3 md:gap-6 items-stretch mt-4 rounded-2xl">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.product_id}
              className="col-span-12 md:col-span-3 cursor-pointer"
              onClick={() => navigate(`/edit-product/${product.product_id}`)}
            >
              <Card
                title={product.product_name}
                image={
                  product.images_main
                    ? `http://localhost:3000/products/${product.images_main}`
                    : undefined
                }
              />
            </div>
          ))
        ) : (
          <p className="col-span-12 text-center text-gray-500">ไม่พบสินค้าตามคำค้นหา</p>
        )}
      </div>
    </>
  );
}
