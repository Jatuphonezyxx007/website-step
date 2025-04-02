// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import SignIn from "./pages/AuthPages/SignIn";
// // import SignUp from "./pages/AuthPages/SignUp";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// // import Videos from "./pages/UiElements/Videos";
// // import Images from "./pages/UiElements/Images";
// // import Alerts from "./pages/UiElements/Alerts";
// // import Badges from "./pages/UiElements/Badges";
// // import Avatars from "./pages/UiElements/Avatars";
// // import Buttons from "./pages/UiElements/Buttons";
// // import LineChart from "./pages/Charts/LineChart";
// // import BarChart from "./pages/Charts/BarChart";
// // import Calendar from "./pages/Calendar";
// // import BasicTables from "./pages/Tables/BasicTables";
// // import FormElements from "./pages/Forms/FormElements";
// // import Blank from "./pages/Blank";
// import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";
// import Edit from "./pages/Forms/EditForm";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Router>
//       <ScrollToTop />
//       <Routes>
//         {/* Default route redirects to SignIn */}
//         <Route path="/" element={<Navigate to="/signin" />} />

//         {/* Authentication Routes */}
//         {/* <Route path="/signin" element={<SignIn onLogin={() => setIsAuthenticated(true)} />} /> */}
//         <Route path="/signin" element={<SignIn onLogin={() => setIsAuthenticated(true)} />} />
//         {/* <Route path="/signup" element={<SignUp />} /> */}

//         {/* Protected Routes */}
//         {isAuthenticated ? (
//           <Route element={<AppLayout />}>
//             <Route path="/dashboard" element={<Home />} />
//             <Route path="/edit-product/:product_id" element={<Edit />} />
//             <Route path="/profile" element={<UserProfiles />} />
//             {/* <Route path="/calendar" element={<Calendar />} />
//             <Route path="/blank" element={<Blank />} />
//             <Route path="/form-elements" element={<FormElements />} />
//             <Route path="/basic-tables" element={<BasicTables />} />
//             <Route path="/alerts" element={<Alerts />} />
//             <Route path="/avatars" element={<Avatars />} />
//             <Route path="/badge" element={<Badges />} />
//             <Route path="/buttons" element={<Buttons />} />
//             <Route path="/images" element={<Images />} />
//             <Route path="/videos" element={<Videos />} />
//             <Route path="/line-chart" element={<LineChart />} />
//             <Route path="/bar-chart" element={<BarChart />} /> */}
//           </Route>
//         ) : (
//           <Route path="*" element={<Navigate to="/signin" />} />
//         )}

//         {/* Fallback Route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }


// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SignIn from "./pages/AuthPages/SignIn";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";
// import Edit from "./pages/Forms/EditForm";
// import AppHeader from "./layout/AppHeader";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     return localStorage.getItem("user") !== null; // ✅ ตรวจสอบ localStorage
//   });

//   // ✅ ใช้ useEffect เพื่อให้สถานะล็อกอินอยู่แม้รีเฟรชหน้า
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     setIsAuthenticated(storedUser !== null);
//   }, []);

//   return (
//     <Router>
//       <ScrollToTop />
//       <Routes>
//         {/* ถ้าเข้าหน้าหลักให้ไปหน้า SignIn ถ้ายังไม่ได้ล็อกอิน */}
//         <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />

//         {/* หน้าล็อกอิน */}
//         <Route path="/signin" element={<SignIn onLogin={() => setIsAuthenticated(true)} />} />

//         {/* ✅ Protected Routes (เข้าถึงได้เฉพาะเมื่อล็อกอินแล้ว) */}
//         {isAuthenticated ? (
//           <Route element={<AppLayout />}>
//             <Route path="/dashboard" element={<Home />} />
//             <Route path="/edit-product/:product_id" element={<Edit />} />
//             <Route path="/profile" element={<UserProfiles />} />
//           </Route>
//         ) : (
//           <Route path="*" element={<Navigate to="/signin" />} />
//         )}

//         {/* ถ้าไม่มีเส้นทางที่ตรงกันให้ไปที่ NotFound */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Edit from "./pages/Forms/EditForm";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") !== null;
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(storedUser !== null);
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* ✅ เช็คการล็อกอิน */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />

        <Route path="/signin" element={<SignIn onLogin={() => setIsAuthenticated(true)} />} />

        {/* ✅ ย้าย AppHeader ไปอยู่ใน AppLayout */}
        {isAuthenticated ? (
          <Route element={<AppLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}>
            <Route path="/dashboard" element={<Home searchQuery={searchQuery} />} />
            <Route path="/edit-product/:product_id" element={<Edit />} />
            <Route path="/profile" element={<UserProfiles />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/signin" />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
