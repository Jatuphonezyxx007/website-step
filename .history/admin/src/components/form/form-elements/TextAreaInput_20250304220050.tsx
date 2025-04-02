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



// import { useState } from "react";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// interface TextAreaInputProps {
//   name: string;
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
// }

// const TextAreaInput: React.FC<TextAreaInputProps> = ({ name, label, value, onChange }) => {
  
// // export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");

//   return (
//       <div className="space-y-6">
//         <div>
//           <Label>{label}</Label>
//           <TextArea
//             name={name}
//             value={value}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>
//       </div>
//   );
// };

// export default TextAreaInput;



"use client";
import React, { useState } from "react";
import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");
  return (
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <Label>รายละเอียดสินค้า</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
      </div>
  );
}