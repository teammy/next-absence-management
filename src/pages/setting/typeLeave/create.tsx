import LayoutNormal from "~/features/ui/components/layouts/LayoutNormal"
import Layout from "~/features/ui/components/layouts/Normal"
import { type NextPageWithLayout } from "~/pages/_app"
import { BreadcrumbItem,Breadcrumbs,Card,CardBody,CardHeader,Input,Button } from "@nextui-org/react"


const CreateTypeLeave:NextPageWithLayout = () => {


  return (
    <>

     <Breadcrumbs size="lg" className="mb-5">
          <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
          <BreadcrumbItem>ตั้งค่าระบบ</BreadcrumbItem>
          <BreadcrumbItem>ประเภทการลา</BreadcrumbItem>
        </Breadcrumbs>
        <Card className="w-7/12 mx-auto">
      <CardHeader className="bg-blueDark Ekachon_Bold pl-5 text-xl text-white">ตั้งค่าประเภทการลา</CardHeader>
      <CardBody>
        <h2 className="my-2">เพิ่มข้อมูล</h2>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input type="text" label="ประเภทการลา"  radius="sm" />
          <Input type="number" label="จำนวนวันลาต่อปี"  radius="sm" />
          <Button variant="shadow" size="lg">บันทึก</Button>
        </div>
      </CardBody>
    </Card>

    </>
  )
}

CreateTypeLeave.getLayout = Layout

export default CreateTypeLeave