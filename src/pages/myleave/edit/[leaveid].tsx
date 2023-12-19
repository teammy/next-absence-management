import Layout from "~/features/ui/components/layouts/Normal"
import EditLeave from "~/features/leaves/components/EditLeave"
import { Breadcrumbs, BreadcrumbItem,Card,CardBody } from "@nextui-org/react";
import { useRouter } from "next/router";


const EditMyLeavePage = () => {
  
  const router = useRouter();
  const leaveId = +(router.query.leaveid as string);

  return (
    <>

<Breadcrumbs size="lg">
      <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
      <BreadcrumbItem>ใบลาของฉัน</BreadcrumbItem>
      <BreadcrumbItem>แก้ไขใบลา</BreadcrumbItem>
    </Breadcrumbs>

    <div className="head-title my-5">
      <h2 className="text-2xl Ekachon_Bold blueDark">แก้ไขใบลาเลขที่ {leaveId}</h2>
    </div>

    <Card classNames={{ header: 'justify-center' }}>
      <CardBody>
    <EditLeave />
      </CardBody>
    </Card>
    </>
  )
}

EditMyLeavePage.getLayout = Layout;

export default EditMyLeavePage;