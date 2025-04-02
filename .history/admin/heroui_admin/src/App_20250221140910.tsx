// import { Route, Routes } from "react-router-dom";

// import IndexPage from "@/pages/index";
// import DocsPage from "@/pages/docs";
// import PricingPage from "@/pages/pricing";
// import BlogPage from "@/pages/blog";
// import AboutPage from "@/pages/about";

// function App() {
//   return (
//     <Routes>
//       <Route element={<IndexPage />} path="/" />
//       <Route element={<DocsPage />} path="/docs" />
//       <Route element={<PricingPage />} path="/pricing" />
//       <Route element={<BlogPage />} path="/blog" />
//       <Route element={<AboutPage />} path="/about" />
//     </Routes>
//   );
// }

// export default App;


import { Route, Routes } from "react-router-dom";
import { Button } from "@heroui/react"; // ✅ นำเข้า Button จาก Hero UI
import { Box } from "@heroui/react"; // ✅ ใช้แทน


import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Container className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to My Hero UI App</h1>

      {/* ✅ ปุ่มทดสอบ Hero UI */}
      <div className="flex justify-center mb-6">
        <Button variant="solid" color="primary">
          Click Me
        </Button>
      </div>

      {/* ✅ ตั้งค่าเส้นทาง (Routing) */}
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </Container>
  );
}

export default App;
