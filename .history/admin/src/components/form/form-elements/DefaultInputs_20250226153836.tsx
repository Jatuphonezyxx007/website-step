// //DefaultForm

// import { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Input from "../input/InputField";
// import Select from "../Select";
// import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

// export default function DefaultInputs() {
//   const [showPassword, setShowPassword] = useState(false);
//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];
//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };
//   const [dateOfBirth, setDateOfBirth] = useState("");

//   const handleDateChange = (date: Date[]) => {
//     setDateOfBirth(date[0].toLocaleDateString()); // Handle selected date and format it
//   };
//   return (
//     <ComponentCard title="รายละเอียด">
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">ชื่อสินค้า</Label>
//           <Input type="text" id="input" />
//         </div>
//         <div>
//           <Label htmlFor="inputTwo">Input with Placeholder</Label>
//           <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
//         </div>
//         <div>
//           <Label>Select Input</Label>
//           <Select
//             options={options}
//             placeholder="Select an option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
//         <div>
//           <Label>Password Input</Label>
//           <div className="relative">
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//             />
//             <button
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//             >
//               {showPassword ? (
//                 <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//               ) : (
//                 <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="datePicker">Date Picker Input</Label>
//         </div>
//         <div>
//           <Label htmlFor="tm">Date Picker Input</Label>
//           <div className="relative">
//             <Input
//               type="time"
//               id="tm"
//               name="tm"
//               onChange={(e) => console.log(e.target.value)}
//             />
//             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//               <TimeIcon className="size-6" />
//             </span>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="tm">Input with Payment</Label>
//           <div className="relative">
//             <Input
//               type="text"
//               placeholder="Card number"
//               className="pl-[62px]"
//             />
//             <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
//                 <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
//                 <path
//                   d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
//                   fill="#FC6020"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }



// // src/components/form/form-elements/DefaultInputs.tsx
// import { useState, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Input from "../input/InputField";
// import Select from "../Select";
// import { CalenderIcon, EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

// export interface DefaultInputsProps {
//   initialValues?: {
//     productName?: string;
//     email?: string;
//     // เพิ่ม field อื่นๆ ตามที่ต้องการ
//   };
// }

// export default function DefaultInputs({ initialValues = {} }: DefaultInputsProps) {
//   // ใช้ useState แบบ controlled สำหรับชื่อสินค้าและ email
//   const [productName, setProductName] = useState(initialValues.productName || "");
//   const [email, setEmail] = useState(initialValues.email || "");
//   const [showPassword, setShowPassword] = useState(false);

//   // ถ้า initialValues เปลี่ยนแปลง ให้ update state
//   useEffect(() => {
//     setProductName(initialValues.productName || "");
//     setEmail(initialValues.email || "");
//   }, [initialValues]);

//   const options = [
//     { value: "marketing", label: "Marketing" },
//     { value: "template", label: "Template" },
//     { value: "development", label: "Development" },
//   ];
//   const handleSelectChange = (value: string) => {
//     console.log("Selected value:", value);
//   };

//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const handleDateChange = (date: Date[]) => {
//     setDateOfBirth(date[0].toLocaleDateString());
//   };

//   return (
//     <ComponentCard title="รายละเอียด">
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">ชื่อสินค้า</Label>
//           <Input
//             type="text"
//             id="input"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>
//         <div>
//           <Label htmlFor="inputTwo">Input with Placeholder</Label>
//           <Input
//             type="text"
//             id="inputTwo"
//             placeholder="info@gmail.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <Label>Select Input</Label>
//           <Select
//             options={options}
//             placeholder="Select an option"
//             onChange={handleSelectChange}
//             className="dark:bg-dark-900"
//           />
//         </div>
//         <div>
//           <Label>Password Input</Label>
//           <div className="relative">
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//             />
//             <button
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//             >
//               {showPassword ? (
//                 <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//               ) : (
//                 <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="datePicker">Date Picker Input</Label>
//           {/* เพิ่ม Date Picker component ตามที่คุณใช้งาน */}
//         </div>
//         <div>
//           <Label htmlFor="tm">Time Picker Input</Label>
//           <div className="relative">
//             <Input
//               type="time"
//               id="tm"
//               name="tm"
//               onChange={(e) => console.log(e.target.value)}
//             />
//             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//               <TimeIcon className="size-6" />
//             </span>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="tm">Input with Payment</Label>
//           <div className="relative">
//             <Input type="text" placeholder="Card number" className="pl-[62px]" />
//             <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
//                 <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
//                 <path
//                   d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
//                   fill="#FC6020"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }




// // src/components/form/form-elements/DefaultInputs.tsx
// import { useState, useEffect } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import Label from "../Label";
// import Input from "../input/InputField";
// import Select from "../Select";
// import TextArea from "../input/TextArea";
// import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

// export interface DefaultInputsProps {
//   initialValues?: {
//     productName?: string;
//     email?: string;
//     categoryId?: string | number; // รองรับทั้ง string และ number
//   };
//   // categories array จากตาราง categories, แต่ละอันมี key "value" และ "label"
//   categories?: { value: string; label: string }[];
// }

// export default function DefaultInputs({ initialValues = {}, categories = [] }: DefaultInputsProps) {
//   // controlled states สำหรับ input fields
//   const [productName, setProductName] = useState(initialValues.productName || "");
//   const [email, setEmail] = useState(initialValues.email || "");
//   // แปลงค่า categoryId เป็น string ถ้ามี
//   const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);

//   // เมื่อ initialValues เปลี่ยน ให้ update state
//   useEffect(() => {
//     setProductName(initialValues.productName || "");
//     setEmail(initialValues.email || "");
//     setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
//   }, [initialValues]);

//   const [showPassword, setShowPassword] = useState(false);

//   // ใช้ categories prop โดยตรง (ไม่ใช้ fallback defaultOptions)
//   const selectOptions = categories;

//   const handleSelectChange = (value: string) => {
//     console.log("Selected category:", value);
//     setSelectedCategory(value);
//   };

//   return (
//     <ComponentCard title="รายละเอียด">
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="input">ชื่อสินค้า</Label>
//           <Input
//             type="text"
//             id="input"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>
//         <div>
//           <Label htmlFor="inputTwo">Input with Placeholder</Label>
//           <TextArea
//             value={message}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>
//         <div>
//           <Label>หมวดหมู่</Label>
//           <Select
//             options={selectOptions}
//             placeholder={
//               selectOptions && selectOptions.length > 0
//                 ? "กรุณาเลือกหมวดหมู่สินค้า"
//                 : "ไม่พบหมวดหมู่"
//             }
//             onChange={handleSelectChange}
//             value={selectedCategory}
//             className="dark:bg-dark-900"
//           />
//         </div>
//         <div>
//           <Label>Password Input</Label>
//           <div className="relative">
//             <Input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//             />
//             <button
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//             >
//               {showPassword ? (
//                 <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//               ) : (
//                 <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//               )}
//             </button>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="datePicker">Date Picker Input</Label>
//           {/* เพิ่ม Date Picker component ตามที่คุณใช้งาน */}
//         </div>
//         <div>
//           <Label htmlFor="tm">Time Picker Input</Label>
//           <div className="relative">
//             <Input
//               type="time"
//               id="tm"
//               name="tm"
//               onChange={(e) => console.log(e.target.value)}
//             />
//             <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
//               <TimeIcon className="size-6" />
//             </span>
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="tm">Input with Payment</Label>
//           <div className="relative">
//             <Input type="text" placeholder="Card number" className="pl-[62px]" />
//             <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
//                 <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
//                 <path
//                   d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
//                   fill="#FC6020"
//                 />
//               </svg>
//             </span>
//           </div>
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }



// src/components/form/form-elements/DefaultInputs.tsx
import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import TextArea from "../input/TextArea";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";

export interface DefaultInputsProps {
  initialValues?: {
    productName?: string;
    email?: string;
    categoryId?: string | number; // รองรับทั้ง string และ number
  };
  // categories array จากตาราง categories, แต่ละอันมี key "value" และ "label"
  categories?: { value: string; label: string }[];
}

export default function DefaultInputs({ initialValues = {}, categories = [] }: DefaultInputsProps) {
  // controlled states สำหรับ input fields
  const [productName, setProductName] = useState(initialValues.productName || "");
  const [email, setEmail] = useState(initialValues.email || "");
  // แปลงค่า categoryId เป็น string ถ้ามี
  const initialCategory = initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // state สำหรับ TextArea (message) ที่ใช้ในฟอร์ม
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  // เมื่อ initialValues เปลี่ยน ให้ update state
  useEffect(() => {
    setProductName(initialValues.productName || "");
    setEmail(initialValues.email || "");
    setSelectedCategory(initialValues.categoryId !== undefined ? String(initialValues.categoryId) : "");
  }, [initialValues]);

  const [showPassword, setShowPassword] = useState(false);

  // ใช้ prop categories โดยตรง
  const selectOptions = categories;

  const handleSelectChange = (value: string) => {
    console.log("Selected category:", value);
    setSelectedCategory(value);
  };

  return (
    <ComponentCard title="รายละเอียด">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">ชื่อสินค้า</Label>
          <Input
            type="text"
            id="input"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="inputTwo">Input with Placeholder</Label>
          <Input
            type="text"
            id="inputTwo"
            placeholder="info@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>หมวดหมู่</Label>
          <Select
            options={selectOptions}
            placeholder={
              selectOptions && selectOptions.length > 0
                ? "กรุณาเลือกหมวดหมู่สินค้า"
                : "ไม่พบหมวดหมู่"
            }
            onChange={handleSelectChange}
            value={selectedCategory}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>ข้อความเพิ่มเติม</Label>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
          />
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="datePicker">Date Picker Input</Label>
          {/* เพิ่ม Date Picker component ตามที่คุณใช้งาน */}
        </div>
        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input type="text" placeholder="Card number" className="pl-[62px]" />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
