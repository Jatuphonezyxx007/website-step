// import { useState } from "react";
// import ComponentCard from "../../common/ComponentCard";
// import TextArea from "../input/TextArea";
// import Label from "../Label";

// export default function TextAreaInput() {
//   const [message, setMessage] = useState("");
//   const [messageTwo, setMessageTwo] = useState("");
//   return (
//     <ComponentCard title="Textarea input field">
//       <div className="space-y-6">
//         {/* Default TextArea */}
//         <div>
//           <Label>Description</Label>
//           <TextArea
//             value={message}
//             onChange={(value) => setMessage(value)}
//             rows={6}
//           />
//         </div>

//         {/* Disabled TextArea */}
//         <div>
//           <Label>Description</Label>
//           <TextArea rows={6} disabled />
//         </div>

//         {/* Error TextArea */}
//         <div>
//           <Label>Description</Label>
//           <TextArea
//             rows={6}
//             value={messageTwo}
//             error
//             onChange={(value) => setMessageTwo(value)}
//             hint="Please enter a valid message."
//           />
//         </div>
//       </div>
//     </ComponentCard>
//   );
// }



import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows: number;
  disabled?: boolean;
  error?: boolean;
  hint?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ value, onChange, rows, disabled, error, hint }) => {
  return (
    <div>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        className={`textarea ${error ? 'error' : ''}`}
      />
      {hint && <small>{hint}</small>}
    </div>
  );
};

export default TextArea;
