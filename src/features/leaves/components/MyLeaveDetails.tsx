import { Loader } from "@mantine/core";
import { api } from "~/utils/api";
import { type LeaveDetails } from "../types";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardHeader,
  BreadcrumbItem,
  Breadcrumbs,
  Divider,
} from "@nextui-org/react";
import { Timeline, Text } from "@mantine/core";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

// export interface MyLeaveDetailsProps {
//   // leaveid: LeaveDetails["id"]
// }

export interface MyLeaveDetailsProps {
  id: number;
  user_id: string;
  person_firstname: string;
  person_lastname: string;
  departmentHeadStatus: string;
  managerStatus: string;
  fName: string;
  assignFname: string;
  managerFname: string;
  departmentFname: string;
  hrFname: string;
  hrStatus: string;
  reason: string;
  startLeaveDate: string;
  endLeaveDate: string;
  totalLeaveDays: number;
  leaveContactNumber: string;
  leaveLocation: string;
  createdAt: Date;
  managerUserApproveUpdatedAt: Date;
  departmentHeadUserApproveUpdatedAt: Date;
  hrUserApproveUpdatedAt: Date;
  leaveTypeDescription: string;
}

const MyLeaveDetails = () => {
  const router = useRouter();
  const leaveIdString = router.query.leaveid;
  const leaveId = Number(leaveIdString);


  const { data: myLeaveDetail = [], isLoading } =
    api.leave.byId.useQuery<MyLeaveDetailsProps[]>(leaveId);

  console.log(myLeaveDetail);

  if (isLoading) return <Loader color="#1A477F" type="dots" />;
  if (!myLeaveDetail) return <div>No data found</div>;

  return (
    <>
      <div>
        <Breadcrumbs size="lg" className="mb-5">
          <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
          <BreadcrumbItem>ใบลาของฉัน</BreadcrumbItem>
          <BreadcrumbItem>ใบลาเลขที่ {leaveIdString}</BreadcrumbItem>
        </Breadcrumbs>

        {myLeaveDetail.map((item) => (
          <Card className="" radius="sm">
            <CardHeader className="bg-blueDark Ekachon_Bold pl-5 text-xl text-white">
              <h1>ใบลาเลขที่ {item.id}</h1>
            </CardHeader>
            <div className="bg-grayWhite Ekachon_Light py-2 pl-5 text-sm">
              เขียนเมื่อ{" "}
              {item.createdAt.toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Bangkok",
              })}
            </div>

            <CardBody className="px-5">
              <h2 className="Ekachon_Bold blueDark mb-2 text-xl">รายละเอียด</h2>
              <div className="flex flex-row">
                <div className="w-1/3">
                  <ul className="Ekachon_Light item-leaveDetail text-base">
                    <li>ประเภทการลา</li>
                    <li>วันที่เริ่มต้นลา</li>
                    <li>วันที่สิ้นสุดลา</li>
                    <li>ระยะเวลา</li>
                    <li>ผู้ปฏิบัติงานแทน</li>
                    <li>เหตุผลการลา</li>
                    <li>สถานที่ติดต่อระหว่างการลา</li>
                    <li>เบอร์ติดต่อ</li>
                  </ul>
                </div>
                <div className="w-2/3">
                  <ul className="Ekachon_Bold item-leaveDetail text-base">
                    <li>{item.leaveTypeDescription}</li>
                    <li>{item.startLeaveDate}</li>
                    <li>{item.endLeaveDate}</li>
                    <li>{item.totalLeaveDays} วัน</li>
                    <li>{item.totalLeaveDays}</li>
                    <li>{item.reason}</li>
                    <li>{item.leaveLocation}</li>
                    <li>{item.leaveContactNumber}</li>
                  </ul>
                </div>
              </div>
              <Divider className="my-5" />
              <h2 className="Ekachon_Bold blueDark my-2 mb-8 text-xl">
                ไทม์ไลน์อนุมัติการลา
              </h2>

              <Timeline active={1} bulletSize={27} lineWidth={2}>
                <Timeline.Item
                  bullet={
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  }
                  title="ยื่นใบลา"
                >
                  <Text c="dimmed" size="sm">
                    {item.fName}
                  </Text>
                  <Text size="xs" mt={4}>
                     {item.createdAt.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Bangkok",
                    })}
                  </Text>
                </Timeline.Item>
                <Timeline.Item bullet={<CheckCircleIcon />} title="หัวหน้างาน">
                  <Text c="dimmed" size="sm">
                    {item.managerFname}
                  </Text>
                  <Text size="xs" mt={4}>
                  {item.managerUserApproveUpdatedAt.toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "Asia/Bangkok",
              })}
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  bullet={<CheckCircleIcon />}
                  title="หัวหน้ากลุ่มงาน"
                  lineVariant="dashed"
                >
                  <Text c="dimmed" size="sm">
                    {item.departmentFname}
                  </Text>
                  <Text size="xs" mt={4}>
                   {item.departmentHeadUserApproveUpdatedAt.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Bangkok",
                    })}
                  </Text>
                </Timeline.Item>

                <Timeline.Item
                  title="งานทรัพยากรบุคคล (HR)"
                  bullet={<CheckCircleIcon />}
                  lineVariant="dashed"
                >
                  <Text c="dimmed" size="sm">
                    {item.hrFname}
                    <Text variant="link" component="span" inherit>
                      Fix incorrect notification message (#187)
                    </Text>
                  </Text>
                  <Text size="xs" mt={4}>
                   {item.hrUserApproveUpdatedAt.toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Bangkok",
                    })}
                  </Text>
                </Timeline.Item>
              </Timeline>
              <div className="icon-timeline my-3">
                <ul className="flex items-center justify-end gap-2 text-xs">
                  <li>สัญลักษณ์:</li>
                  <li className="flex list-none items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="">อนุมัติ</span>
                  </li>
                  <li className="flex list-none items-center">
                    <XCircleIcon className="h-6 w-6 text-red-500" />
                    <span className="">ไม่อนุมัติ</span>
                  </li>
                  <li className="flex list-none items-center">
                    <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
                    <span className="">รออนุมัติ</span>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MyLeaveDetails;
