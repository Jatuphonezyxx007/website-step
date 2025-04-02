// import { Link } from "@heroui/link";
// import { Snippet } from "@heroui/snippet";
// import { Code } from "@heroui/code";
// import { button as buttonStyles } from "@heroui/theme";

// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
// import DefaultLayout from "@/layouts/default";

// export default function IndexPage() {
//   return (
//     <DefaultLayout>
//       <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//         <div className="inline-block max-w-lg text-center justify-center">
//           <span className={title()}>Make&nbsp;</span>
//           <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
//           <br />
//           <span className={title()}>
//             websites regardless of your design experience.
//           </span>
//           <div className={subtitle({ class: "mt-4" })}>
//             Beautiful, fast and modern React UI library.
//           </div>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             isExternal
//             className={buttonStyles({
//               color: "primary",
//               radius: "full",
//               variant: "shadow",
//             })}
//             href={siteConfig.links.docs}
//           >
//             Documentation
//           </Link>
//           <Link
//             isExternal
//             className={buttonStyles({ variant: "bordered", radius: "full" })}
//             href={siteConfig.links.github}
//           >
//             <GithubIcon size={20} />
//             GitHub
//           </Link>
//         </div>

//         <div className="mt-8">
//           <Snippet hideCopyButton hideSymbol variant="bordered">
//             <span>
//               Get started by editing{" "}
//               <Code color="primary">pages/index.tsx</Code>
//             </span>
//           </Snippet>
//         </div>
//       </section>
//     </DefaultLayout>
//   );
// }



// src/pages/Homepage.jsx
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import './Homepage.css';

export default function Homepage() {
  const sampleProducts = [
    {
      id: 1,
      name: "คอมพิวเตอร์ตั้งโต๊ะ",
      price: 45000,
      image: "https://via.placeholder.com/500x500",
      status: "พร้อมจำหน่าย ✅",
    },
    {
      id: 2,
      name: "โน้ตบุ๊ก",
      price: 30000,
      image: "https://via.placeholder.com/500x500",
      status: "สินค้าหมด ❌",
    },
    {
      id: 3,
      name: "อุปกรณ์เสริม",
      price: 1500,
      image: "https://via.placeholder.com/500x500",
      status: "พร้อมจำหน่าย ✅",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="homepage-container">
        <section className="homepage-header">
          <motion.h1
            className="homepage-title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            🌟 ยินดีต้อนรับสู่ Step Solutions 🌟
          </motion.h1>
          <p className="homepage-description">
            ศูนย์รวมคอมพิวเตอร์ โน้ตบุ๊ก และอุปกรณ์เสริม ที่ดีที่สุดเพื่อคุณ
          </p>
        </section>

        <section className="product-section">
          <h2 className="section-title">🔥 สินค้ามาแรง 🔥</h2>
          <div className="product-grid">
            {sampleProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="product-card"
              >
                <Card>
                  <CardHeader className="p-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </CardHeader>
                  <CardBody>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">ราคา: ฿{product.price}</p>
                    <p className="product-status">{product.status}</p>
                  </CardBody>
                  <CardFooter>
                    <Link to={`/products/${product.id}`} className="product-button">
                      ดูรายละเอียดสินค้า
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
