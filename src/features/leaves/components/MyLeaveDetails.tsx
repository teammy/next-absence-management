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

export interface MyLeaveDetailsProps {
  leaveid: LeaveDetails["id"];
}

const MyLeaveDetails = () => {
  const router = useRouter();

  const { data: leave, isLoading } = api.leave.byId.useQuery(
    Number(router.query.leaveid),
  );

  if (isLoading) return <Loader color="#1A477F" type="dots" />;
  if (!leave) return <div>No data found</div>;

  return (
    <>
      <Breadcrumbs size="lg" className="mb-5">
        <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
        <BreadcrumbItem>ใบลาของฉัน</BreadcrumbItem>
        <BreadcrumbItem>ใบลาเลขที่ {leave.id}</BreadcrumbItem>
      </Breadcrumbs>

      <Card className="" radius="sm">
        <CardHeader className="bg-blueDark Ekachon_Bold pl-5 text-xl text-white">
          <h1>ใบลาเลขที่ {leave.id}</h1>
        </CardHeader>
        <div className="bg-grayWhite Ekachon_Light py-2 pl-5 text-sm">
          เขียนเมื่อ{" "}
          {leave.createdAt.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
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
                <li>ลาป่วย</li>
                <li>วันที่เริ่มต้นลา</li>
                <li>วันที่สิ้นสุดลา</li>
                <li>ระยะเวลา</li>
                <li>ผู้ปฏิบัติงานแทน</li>
                <li>เหตุผลการลา</li>
                <li>สถานที่ติดต่อระหว่างการลา</li>
                <li>เบอร์ติดต่อ</li>
              </ul>
            </div>
          </div>
          <Divider className="my-5" />
          <h2 className="Ekachon_Bold blueDark my-2 mb-8 text-xl">
                ไทม์ไลน์อนุมัติการลา
              </h2>

          <Timeline active={1} bulletSize={24} lineWidth={2}>
            <Timeline.Item bullet={<CheckCircleIcon />} title="ยื่นใบลา">
              <Text c="dimmed" size="sm">
                วิทวัส หมายมั่น
              </Text>
              <Text size="xs" mt={4}>
                2 hours ago
              </Text>
            </Timeline.Item>
            <Timeline.Item bullet={<CheckCircleIcon />} title="หัวหน้างาน">
              <Text c="dimmed" size="sm">
                กิตติพงษ์ ชัยศรี
              </Text>
              <Text size="xs" mt={4}>
                2 hours ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<CheckCircleIcon />}
              title="หัวหน้ากลุ่มงาน"
              lineVariant="dashed"
            >
              <Text c="dimmed" size="sm">
                สมิทธ์ เกิดผล
              </Text>
              <Text size="xs" mt={4}>
                52 minutes ago
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="งานทรัพยากรบุคคล (HR)"
              bullet={<CheckCircleIcon />}
              lineVariant="dashed"
            >
              <Text c="dimmed" size="sm">
                You&apos;ve submitted a pull request
                <Text variant="link" component="span" inherit>
                  Fix incorrect notification message (#187)
                </Text>
              </Text>
              <Text size="xs" mt={4}>
                34 minutes ago
              </Text>
            </Timeline.Item>
          </Timeline>
          <div className="icon-timeline">
            <ul className="flex gap-2 justify-end items-center text-xs">
              <li>สัญลักษณ์:</li>
              <li className="list-none flex items-center">
                <CheckCircleIcon className="text-green-500 w-6 h-6" />
                <span className="">อนุมัติ</span>
              </li>
              <li className="list-none flex items-center">
                <XCircleIcon className="text-red-500 w-6 h-6" />
                <span className="">ไม่อนุมัติ</span>
              </li>
              <li className="list-none flex items-center">
                <ExclamationCircleIcon className="text-yellow-500 w-6 h-6" />
                <span className="">รออนุมัติ</span>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default MyLeaveDetails;
