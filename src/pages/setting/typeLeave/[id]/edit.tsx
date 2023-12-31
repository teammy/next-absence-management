import EditTypeLeave from "~/features/setting/components/typeLeave/EditTypeLeave"
import Layout from "~/features/ui/components/layouts/Normal"
import { type NextPageWithLayout } from "~/pages/_app"
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

const EditTypeLeavePage:NextPageWithLayout = () => {
  return <>
       <Breadcrumbs size="lg" className="mb-5">
          <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
          <BreadcrumbItem>ตั้งค่าระบบ</BreadcrumbItem>
          <BreadcrumbItem>แก้ไขข้อมูลประเภทการลา</BreadcrumbItem>
        </Breadcrumbs>
  <EditTypeLeave />
  </>
}

EditTypeLeavePage.getLayout = Layout;

export default EditTypeLeavePage