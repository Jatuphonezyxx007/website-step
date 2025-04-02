import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
// import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables() {
  return (
    <>
      {/* <PageMeta
        title="ผู้ใช้งานทั้งหมด | Step Solution"
        description="ผู้ใช้งานทั้งหมด"
      /> */}
      <PageBreadcrumb pageTitle="ผู้ใช้ทั้งหมด" />
      <div className="space-y-6">
        <ComponentCard title="รายชื่อพนักงาน">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
