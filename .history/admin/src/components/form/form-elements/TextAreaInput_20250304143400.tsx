import { useState } from "react";
import TextArea from "../input/TextArea";


export default function TextAreaInput() {
  const [message, setMessage] = useState("");
  const [messageTwo, setMessageTwo] = useState("");

  return (
      <div className="space-y-6">
        <div>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
      </div>
  );
}




