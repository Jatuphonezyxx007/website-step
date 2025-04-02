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
  productId: string; // เพิ่ม prop ที่รับ productId เพื่อดึงรายละเอียดของสินค้าจาก API
}

export default function TextAreaInput({ productId }: TextAreaProps) {
  const [detail, setDetail] = useState<string>(""); // ใช้เพื่อเก็บค่า detail
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // ดึงข้อมูลรายละเอียดของสินค้าเมื่อ component โหลด
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        const data = await response.json();

        if (data.success) {
          setDetail(data.product.detail); // อัปเดต state detail เมื่อได้ข้อมูล
        } else {
          setError(data.message); // หากไม่สำเร็จให้แสดงข้อความ error
        }
      } catch (err) {
        setError("Error fetching product details");
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false); // เมื่อดึงข้อมูลเสร็จแล้ว ตั้ง loading เป็น false
      }
    };

    fetchProductDetail();
  }, [productId]); // useEffect จะทำงานทุกครั้งเมื่อ productId เปลี่ยนแปลง

  if (loading) return <div>Loading...</div>; // แสดง Loading หากกำลังดึงข้อมูล
  if (error) return <div>{error}</div>; // แสดง error หากเกิดข้อผิดพลาด

  return (
    <div className="space-y-6">
      <div>
        <TextArea
          value={detail} // ส่งค่า detail ไปยัง TextArea
          onChange={(value) => setDetail(value)} // อัปเดตค่า detail เมื่อมีการเปลี่ยนแปลง
          rows={6}
        />
      </div>
    </div>
  );
}
