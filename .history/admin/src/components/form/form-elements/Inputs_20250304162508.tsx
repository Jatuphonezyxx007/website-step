import React from 'react'
import useProductData from '../../../hooks/useProductData'
import DefaultInputs from './DefaultInputs'
import TextArea from './TextAreaInput'
import ComponentCard from '../../common/ComponentCard'
import SelectInputs from './SelectInputs'

export default function Inputs() {
    return (
    <>
    <ComponentCard title="รายละเอียดสินค้า">
        <DefaultInputs />
        <TextArea />
        <SelectInputs />
        </ComponentCard>
        </>
        )
    }





          {/* <DefaultInputs 
            initialValues={{ 
              productName: product?.product_name || "", 
              detail: product?.detail || "", 
              categoryId: product?.category_id || "" 
            }}
            categories={categories}
          /> */}

{/* <DefaultInputs 
  initialValues={{ 
    productName: product?.product_name || "", 
    detail: product?.detail || "", 
    categoryId: product?.category_id || "" 
  }}
  productId={product?.product_id} // ✅ ส่ง productId ไปที่ DefaultInputs
  categories={categories}
/>

<TextArea /> */}
