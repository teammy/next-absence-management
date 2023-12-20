import Layout from "~/features/ui/components/layouts/Normal"
import { type NextPageWithLayout } from "~/pages/_app"
import CreateTypeLeave from "~/features/setting/components/typeLeave/CreateTypeLeave";
import TypeLeaveList from "~/features/setting/components/typeLeave/typeLeaveList";
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";


const IndexCreateTypeLeave:NextPageWithLayout = () => {
  
  return (
    <>

     <Breadcrumbs size="lg" className="mb-5">
          <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
          <BreadcrumbItem>ตั้งค่าระบบ</BreadcrumbItem>
          <BreadcrumbItem>ประเภทการลา</BreadcrumbItem>
        </Breadcrumbs>
        
       <CreateTypeLeave/>
      <TypeLeaveList/>
    </>
  )
}

IndexCreateTypeLeave.getLayout = Layout;

export default IndexCreateTypeLeave