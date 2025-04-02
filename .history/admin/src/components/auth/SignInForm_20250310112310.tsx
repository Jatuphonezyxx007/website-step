// import { useState } from "react";
// import { Link } from "react-router";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import Button from "../ui/button/Button";

// export default function SignInForm({ onLogin }) {
//   // const [showPassword, setShowPassword] = useState(false);
//   // const [isChecked, setIsChecked] = useState(false);

//   // export default function SignInForm({ onLogin }) {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError(""); // ล้าง error ก่อนส่งข้อมูล
  
//       try {
//         const res = await fetch("http://localhost:3000/api/admin/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ username, password }),
//         });
//         const data = await res.json();
//         if (data.success) {
//           onLogin(); // อัพเดทสถานะการเข้าสู่ระบบใน App.tsx
//           navigate("/dashboard");
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
//       }
//     };


//   return (
//     <div className="flex flex-col flex-1">
//       <div className="w-full max-w-md pt-10 mx-auto">
//         {/* <Link
//           to="/"
//           className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//         >
//           <ChevronLeftIcon className="size-5" />
//           Back to dashboard
//         </Link> */}
//       </div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               เข้าสู่ระบบ
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               กรุณากรอกชื่อผู้ใช้ และรหัสผ่านของคุณ
//             </p>
//           </div>
//           <div>
//             {/* <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
//               <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
//                     fill="#4285F4"
//                   />
//                   <path
//                     d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
//                     fill="#34A853"
//                   />
//                   <path
//                     d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
//                     fill="#FBBC05"
//                   />
//                   <path
//                     d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
//                     fill="#EB4335"
//                   />
//                 </svg>
//                 Sign in with Google
//               </button>
//               <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
//                 <svg
//                   width="21"
//                   className="fill-current"
//                   height="20"
//                   viewBox="0 0 21 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
//                 </svg>
//                 Sign in with X
//               </button>
//             </div> */}


//             {/* <div className="relative py-3 sm:py-5">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
//                   Or
//                 </span>
//               </div>
//             </div> */}
//             <form>
//               <div className="space-y-6">
//                 <div>
//                   <Label>
//                     Username <span className="text-error-500">*</span>{" "}
//                   </Label>
//                   <Input placeholder="username" />
//                 </div>
//                 <div>
//                   <Label>
//                     Password <span className="text-error-500">*</span>{" "}
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 {/* <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Checkbox checked={isChecked} onChange={setIsChecked} />
//                     <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
//                       Keep me logged in
//                     </span>
//                   </div>
//                   <Link
//                     to="/reset-password"
//                     className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div> */}
//                 <div>
//                   <Button className="w-full" size="sm">
//                     Sign in
//                   </Button>
//                 </div>
//               </div>
//             </form>

//             {/* <div className="mt-5">
//               <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
//                 Don&apos;t have an account? {""}
//                 <Link
//                   to="/signup"
//                   className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
//                 >
//                   Sign Up
//                 </Link>
//               </p>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// // Can Use
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Checkbox from "../form/input/Checkbox";
// import Button from "../ui/button/Button";

// export default function SignInForm({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

// // ภายใน handleSubmit
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   try {
//     const res = await fetch("http://localhost:3000/api/admin/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await res.json();
//     console.log("Response from server:", data); // ตรวจสอบข้อมูลใน Console
//     if (data.success) {
//       onLogin();         // เปลี่ยนสถานะการเข้าสู่ระบบ
//       navigate("/dashboard");  // นำทางไปยังหน้า dashboard
//     } else {
//       setError(data.message);
//     }
//   } catch (err) {
//     console.error("Error during login:", err);
//     setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
//   }
// };

//   return (
//     <div className="flex flex-col flex-1">
//       <div className="w-full max-w-md pt-10 mx-auto"></div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               เข้าสู่ระบบ
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               กรุณากรอกชื่อผู้ใช้ และรหัสผ่านของคุณ
//             </p>
//           </div>
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 <div>
//                   <Label>
//                     Username <span className="text-error-500">*</span>
//                   </Label>
//                   <Input
//                     placeholder="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>
//                     Password <span className="text-error-500">*</span>
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 {error && <p className="text-error-500">{error}</p>}
//                 <div>
//                   <Button type="submit" className="w-full" size="sm">
//                     Sign in
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "@heroui/alert"; // ตรวจสอบให้แน่ใจว่าติดตั้ง heroUI แล้ว
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Button from "../ui/button/Button";

// export default function SignInForm({ onLogin = () => {} }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch("http://localhost:3000/api/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await res.json();

//       if (data.success) {
//         onLogin(); // อัพเดทสถานะการเข้าสู่ระบบใน component แม่
//         navigate("/dashboard"); // นำทางไปยังหน้า dashboard เมื่อเข้าสู่ระบบสำเร็จ
//       } else {
//         // กรณีชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง ให้ตั้งค่า error เพื่อแสดง Alert
//         setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
//       }
//     } catch (err) {
//       console.error("Error during login:", err);
//       setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
//     }
//   };

//   return (
//     <div className="relative flex flex-col flex-1">
//       {/* แสดง Alert แบบ popup ที่มุมขวา หากมี error */}
//       {error && (
//         <div className="fixed top-4 right-4 z-50">
//           <Alert color="danger" title={error} />
//         </div>
//       )}
//       <div className="w-full max-w-md pt-10 mx-auto"></div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               เข้าสู่ระบบ
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               กรุณากรอกชื่อผู้ใช้ และรหัสผ่านของคุณ
//             </p>
//           </div>
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 <div>
//                   <Label>
//                     Username <span className="text-error-500">*</span>
//                   </Label>
//                   <Input
//                     placeholder="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <Label>
//                     Password <span className="text-error-500">*</span>
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <Button type="submit" className="w-full" size="sm">
//                     Sign in
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Alert } from "@heroui/alert"; // ตรวจสอบให้แน่ใจว่าติดตั้ง heroUI แล้ว
// import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
// import Label from "../form/Label";
// import Input from "../form/input/InputField";
// import Button from "../ui/button/Button";

// export default function SignInForm({ onLogin = () => {} }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false); // ✅ เพิ่ม state เพื่อป้องกันการกดซ้ำ
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(""); // เคลียร์ error ก่อนส่ง request
//     setLoading(true); // ✅ ป้องกันการกดซ้ำ

//     try {
//       const res = await fetch("http://localhost:3000/api/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!res.ok) {
//         throw new Error("ไม่สามารถเข้าสู่ระบบได้");
//       }

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem("user", JSON.stringify(data.user)); // ✅ บันทึกข้อมูลผู้ใช้
//         onLogin(data.user); // ✅ อัปเดต state ของ component แม่
//         navigate("/dashboard"); // ✅ นำทางไปยังหน้า Dashboard
//       } else {
//         setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"); // ✅ แสดง error
//       }
//     } catch (err) {
//       console.error("Error during login:", err);
//       setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
//     } finally {
//       setLoading(false); // ✅ ปลดล็อกปุ่มกดหลังจากส่ง request เสร็จ
//     }
//   };

//   return (
//     <div className="relative flex flex-col flex-1">
//       {/* แสดง Alert หากมี error */}
//       {error && (
//         <div className="fixed top-4 right-4 z-50">
//           <Alert color="danger" title={error} />
//         </div>
//       )}

//       <div className="w-full max-w-md pt-10 mx-auto"></div>
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
//               เข้าสู่ระบบ
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               กรุณากรอกชื่อผู้ใช้ และรหัสผ่านของคุณ
//             </p>
//           </div>
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-6">
//                 <div>
//                   <Label>
//                     Username <span className="text-error-500">*</span>
//                   </Label>
//                   <Input
//                     type="text"
//                     placeholder="username"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label>
//                     Password <span className="text-error-500">*</span>
//                   </Label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <span
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                     >
//                       {showPassword ? (
//                         <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       ) : (
//                         <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                       )}
//                     </span>
//                   </div>
//                 </div>
//                 <div>
//                   <Button type="submit" className="w-full" size="sm" disabled={loading}>
//                     {loading ? "กำลังเข้าสู่ระบบ..." : "Sign in"}
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }








import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@heroui/alert";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

export default function SignInForm({ onLogin = () => {} }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ ตรวจสอบว่าผู้ใช้ล็อกอินแล้วหรือยัง และป้องกัน loop
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && window.location.pathname === "/login") {
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("ไม่สามารถเข้าสู่ระบบได้");
      }

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ บันทึกข้อมูลผู้ใช้
        onLogin(data.user);
        navigate("/dashboard"); // ✅ เปลี่ยนเส้นทางไป Dashboard
      } else {
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col flex-1">
      {error && (
        <div className="fixed top-4 right-4 z-50">
          <Alert color="danger" title={error} />
        </div>
      )}
      <div className="w-full max-w-md pt-10 mx-auto">
        <h1 className="mb-4 text-xl font-bold">เข้าสู่ระบบ</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label>Username</Label>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? "🔓" : "🔒"}
                </span>
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "กำลังเข้าสู่ระบบ..." : "Sign in"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
