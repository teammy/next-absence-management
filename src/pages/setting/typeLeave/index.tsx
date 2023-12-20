import Layout from "~/features/ui/components/layouts/Normal"
import { type NextPageWithLayout } from "~/pages/_app"
import {
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";

import CreateTypeLeave from "~/features/setting/components/typeLeave/CreateTypeLeave";

  const IndexCreateTypeLeave:NextPageWithLayout = () => {

  return (
    <>

     <Breadcrumbs size="lg" className="mb-5">
          <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
          <BreadcrumbItem>ตั้งค่าระบบ</BreadcrumbItem>
          <BreadcrumbItem>ประเภทการลา</BreadcrumbItem>
        </Breadcrumbs>
        
       <CreateTypeLeave/>

    </>
  )
}

IndexCreateTypeLeave.getLayout = Layout;

export default IndexCreateTypeLeave