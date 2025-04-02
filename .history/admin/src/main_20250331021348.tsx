// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import "swiper/swiper-bundle.css";
// import "simplebar-react/dist/simplebar.min.css";
// import App from "./App.tsx";
// import { AppWrapper } from "./components/common/PageMeta.tsx";
// import { ThemeProvider } from "./context/ThemeContext.tsx";
// import { AuthProvider } from "./hooks/useAuth";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ThemeProvider>
//       <AppWrapper>
//         <AuthProvider>
//           <App />
//         </AuthProvider>
//       </AppWrapper>
//     </ThemeProvider>
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom"; // ✅ ควรอยู่ที่นี่
// import "./index.css";
// import "swiper/swiper-bundle.css";
// import "simplebar-react/dist/simplebar.min.css";
// import App from "./App.tsx";
// import { AppWrapper } from "./components/common/PageMeta.tsx";
// import { ThemeProvider } from "./context/ThemeContext.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter> {/* ✅ ครอบ App ด้วย BrowserRouter */}
//       <ThemeProvider>
//         <AppWrapper>
//           <App />
//         </AppWrapper>
//       </ThemeProvider>
//     </BrowserRouter>
//   </StrictMode>
// );
