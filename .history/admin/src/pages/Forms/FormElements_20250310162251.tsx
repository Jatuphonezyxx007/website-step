// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// // import InputGroup from "../../components/form/form-elements/InputGroup";
// // import DropzoneComponent from "../../components/form/form-elements/DropZone";
// // import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents";
// // import RadioButtons from "../../components/form/form-elements/RadioButtons";
// // import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch";
// // import FileInputExample from "../../components/form/form-elements/FileInputExample";
// // import SelectInputs from "../../components/form/form-elements/SelectInputs";
// // import TextAreaInput from "../../components/form/form-elements/TextAreaInput";
// // import InputStates from "../../components/form/form-elements/InputStates";
// import PageMeta from "../../components/common/PageMeta";

// export default function FormElements() {
//   return (
//     <div>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       <PageBreadcrumb pageTitle="From Elements" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//           <DefaultInputs />
//           {/* <SelectInputs />
//           <TextAreaInput />
//           <InputStates /> */}
//         </div>
//         <div className="space-y-6">
//           {/* <InputGroup />
//           <FileInputExample />
//           <CheckboxComponents />
//           <RadioButtons />
//           <ToggleSwitch />
//           <DropzoneComponent /> */}
//         </div>
//       </div>
//     </div>
//   );
// }



// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import DefaultInputs from "../../components/form/form-elements/DefaultInputs";
// import DropzoneComponent from "../../components/form/form-elements/DropZone";
// import PageMeta from "../../components/common/PageMeta";
// import FileInputExample from "../../components/form/form-elements/FileInputExample";




// export default function FormElements() {
//   return (
//     <div>
//       <PageMeta
//         title="Step Solution"
//         description=""
//       />
//       <PageBreadcrumb pageTitle="รายละเอียดสินค้า" />
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//         <div className="space-y-6">
//         <DropzoneComponent />
//         <FileInputExample />
//         </div>
//         <div className="space-y-6">
//         <DefaultInputs />
//         </div>
//       </div>
//     </div>
//   );
// }



import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import PageMeta from "../../components/common/PageMeta";
import ThreeColumnImageGrid from "../../components/ui/images/ThreeColumnImageGrid";
import Inputs from "../../components/form/form-elements/Inputs";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="Step Solutions"
        description=""
      />
      {/* <PageBreadcrumb pageTitle="เพิ่มรายการสินค้าใหม่" /> */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ThreeColumnImageGrid />
          <DropzoneComponent />
        </div>
        <div className="space-y-6">
          <Inputs />
        </div>
      </div>
    </div>
  );
}