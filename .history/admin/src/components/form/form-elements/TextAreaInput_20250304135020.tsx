// import { useState } from "react";
// import TextArea from "../input/TextArea";


// export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");

//   return (
//       <div className="space-y-6">
//         <div>
//           <TextArea
//             value={message}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>
//       </div>
//   );
// }



import { useState, useEffect } from "react";
import TextArea from "../input/TextArea";

export interface TextAreaProps {
  initialValues?: {
    detail?: string;
  };
}

export default function TextAreaInput({ initialValues = {} }: TextAreaProps) {
  const [detail, setDetail] = useState(initialValues.detail || "");

  // เมื่อ initialValues เปลี่ยนแปลง จะอัปเดตค่าใน state
  useEffect(() => {
    setDetail(initialValues.detail || "");
  }, [initialValues]);

  return (
    <div className="space-y-6">
      <div>
        <TextArea
          value={product.detail} // ส่งค่า detail ไปยัง TextArea
          onChange={(value) => setDetail(value)} // อัปเดตค่า detail เมื่อมีการเปลี่ยนแปลง
          rows={6}
        />
      </div>
    </div>
  );
}
