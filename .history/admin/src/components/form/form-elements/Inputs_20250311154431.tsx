// import React from 'react'
// import useProductData from '../../../hooks/useProductData'
// import DefaultInputs from './DefaultInputs'
// import TextArea from './TextAreaInput'
// import SelectInputs from './SelectInputs'


// // interface InputsProps {
// //     productId: number;
// //   }
  
// //   const Inputs: React.FC<InputsProps> = ({ productId }) => {
// //     const { product, categories, loading } = useProductData(productId);
    
// //     // State สำหรับเก็บค่า Input
// //     const [formData, setFormData] = useState({
// //       product_name: "",
// //       detail: "",
// //       category_id: 0,
// //     });
  
// //     // อัพเดตค่าเมื่อดึงข้อมูลสำเร็จ
// //     React.useEffect(() => {
// //       if (product) {
// //         setFormData({
// //           product_name: product.product_name,
// //           detail: product.detail,
// //           category_id: product.category_id,
// //         });
// //       }
// //     }, [product]);
  
// //     // Handle Change
// //     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //       setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };
  
// //     if (loading) return <p>Loading...</p>;


// //     return (
// //     <div>
// //     <ComponentCard title="รายละเอียดสินค้า">
// //         <DefaultInputs name="product_name" label="ชื่อสินค้า" value={formData.product_name} onChange={handleChange} />
// //         <TextArea name="detail" label="รายละเอียดสินค้า" value={formData.detail} onChange={handleChange} />
// //         <SelectInputs
// //             name="category_id"
// //             label="หมวดหมู่สินค้า"
// //             value={formData.category_id}
// //             options={categories}
// //             onChange={handleChange}
// //             />
// //         </ComponentCard>
// //         </div>
// //         );
// //     };

// //     export default Inputs;



// //           {/* <DefaultInputs 
// //             initialValues={{ 
// //               productName: product?.product_name || "", 
// //               detail: product?.detail || "", 
// //               categoryId: product?.category_id || "" 
// //             }}
// //             categories={categories}
// //           /> */}

// // {/* <DefaultInputs 
// //   initialValues={{ 
// //     productName: product?.product_name || "", 
// //     detail: product?.detail || "", 
// //     categoryId: product?.category_id || "" 
// //   }}
// //   productId={product?.product_id} // ✅ ส่ง productId ไปที่ DefaultInputs
// //   categories={categories}
// // />

// // <TextArea /> */}



// interface InputsProps {
//     productId: number;
//   }
  
//   const Inputs: React.FC<InputsProps> = ({ productId }) => {
//     const { product, categories, loading } = useProductData(productId);
    
//     // State สำหรับเก็บค่า Input
//     const [formData, setFormData] = useState({
//       product_name: "",
//       detail: "",
//       category_id: 0,
//     });
  
//     // อัพเดตค่าเมื่อดึงข้อมูลสำเร็จ
//     React.useEffect(() => {
//       if (product) {
//         setFormData({
//           product_name: product.product_name,
//           detail: product.detail,
//           category_id: product.category_id,
//         });
//       }
//     }, [product]);
  
//     // Handle Change
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
  
//     if (loading) return <p>Loading...</p>;
  
//     return (
//       <div>
//         <DefaultInputs name="product_name" label="ชื่อสินค้า" value={formData.product_name} onChange={handleChange} />
//         <TextArea name="detail" label="รายละเอียดสินค้า" value={formData.detail} onChange={handleChange} />
//         <SelectInputs 
//           name="category_id"
//           label="หมวดหมู่สินค้า"
//           value={formData.category_id}
//           options={categories}
//           onChange={handleChange}
//         />
//       </div>
//     );
//   };
  
//   export default Inputs;





import React from "react";
import DefaultInputs from "./DefaultInputs";
import TextAreaInput from "./TextAreaInput";
import SelectInputs from "./SelectInputs";
import ComponentCard from "../../common/ComponentCard";

// export default function Inputs() {
//   return (
//     <div>
//       <ComponentCard title="รายละเอียดสินค้า">
//         <DefaultInputs />
//         <TextAreaInput />
//         <SelectInputs />
//       </ComponentCard>
//     </div>
//   )
// }


export default function Inputs({ 
  productName, setProductName, 
  productDetail, setProductDetail, 
  // installationType, setInstallationType, 
  // screenSize, setScreenSize,
  categoryName, setCategoryName
}) {
  return (
    <div>
      <ComponentCard title="รายละเอียดสินค้า">
        <DefaultInputs productName={productName} setProductName={setProductName} />
        <TextAreaInput productDetail={productDetail} setProductDetail={setProductDetail} />
        {/* <TextAreaInput productDetail={installationType} setProductDetail={setInstallationType} placeholder="ประเภทการติดตั้ง" />
        <TextAreaInput productDetail={screenSize} setProductDetail={setScreenSize} placeholder="ขนาดหน้าจอ" /> */}
        <SelectInputs categoryName={categoryName} setCategoryName={setCategoryName} />
      </ComponentCard>
    </div>
  );
}
