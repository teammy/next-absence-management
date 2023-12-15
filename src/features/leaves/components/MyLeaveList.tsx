import { Loader } from "@mantine/core";
import { api } from "~/utils/api";
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  ChipProps,
  Chip,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure
} from "@nextui-org/react";
import {
  XCircleIcon,
  ClockIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export type EmployeeAssings = {
  id: number;
  user_id: string;
  person_firstname: string;
  person_lastname: string;
  departmentHeadStatus: string;
  managerStatus: string;
  hrStatus: string;
  startLeaveDate: string;
  endLeaveDate: string;
  totalLeaveDays: number;
};

const MyLeaveList = () => {
  const columns = [
    { key: "id", label: "เลขที่ใบลา" },
    { key: "leaveTypeDescription", label: "ประเภท" },
    { key: "startLeaveDate", label: "วันที่เริ่มต้น" },
    { key: "endLeaveDate", label: "วันที่สิ้นสุด" },
    { key: "totalLeaveDays", label: "จำนวน(วัน)" },
    { key: "managerStatus", label: "ห้วหน้า" },
    { key: "departmentHeadStatus", label: "หัวหน้ากลุ่มงาน" },
    { key: "hrStatus", label: "งาน HR" },
    { key: "actions", label: "" },
  ];

  const statusColorMap: Record<string, ChipProps["color"]> = {
    REJECTED: "danger",
    PENDING: "warning",
    APPROVED: "success",
  };

  const statusIconMap: Record<string, ChipProps["startContent"]> = {
    REJECTED: <XCircleIcon className="h-5 w-5" />,
    PENDING: <ClockIcon className="h-5 w-5" />,
    APPROVED: <CheckCircleIcon className="h-5 w-5" />,
  };

  const { data: session } = useSession();
  const userId = session?.user.user_id ? session?.user.user_id : 0;

  const { data: myleavelist = [], isLoading } =
    api.leave.listItemsForUser.useQuery<EmployeeAssings[]>(userId);

  // if (isLoading) return <Loader color="#1A477F" type="dots" />;
  // if (!myleavelist) return <div>Not found.</div>;

  type User = (typeof myleavelist)[0];

  const { isOpen, onClose, onOpen,onOpenChange } = useDisclosure();
  const handleCloseModal = () => {
    onClose();
  };

  const handleDeleteItem = () => {
    // Implement your delete logic here
    onClose();
  };

  const renderCell = useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];


    switch (columnKey) {
      case "managerStatus":
        return (
          <Chip
            className="capitalize"
            startContent={statusIconMap[user.managerStatus]}
            color={statusColorMap[user.managerStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "departmentHeadStatus":
        return (
          <Chip
            startContent={statusIconMap[user.departmentHeadStatus]}
            className="capitalize"
            color={statusColorMap[user.departmentHeadStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "hrStatus":
        return (
          <Chip
            className="capitalize"
            startContent={statusIconMap[user.hrStatus]}
            color={statusColorMap[user.hrStatus]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Link href={`/myleave/${user.id}`}>
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <InformationCircleIcon className="h-5 w-5" />
                ดู
              </span>
            </Link>
            <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
              <PencilSquareIcon className="h-5 w-5" />
              แก้ไข
            </span>
            <Button onPress={onOpen}>Open Modal</Button>
            <span className="cursor-pointer text-lg text-danger active:opacity-50" onClick={onOpen}>
              <MinusCircleIcon className="h-5 w-5" />
              ยกเลิก
            </span>
            
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
    <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Breadcrumbs size="lg">
        <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
        <BreadcrumbItem>ใบลาของฉัน</BreadcrumbItem>
      </Breadcrumbs>

      <div className="head-title my-5">
        <h1 className="Ekachon_Bold blueDark text-2xl">ใบลาของฉัน</h1>
      </div>
      <div className=" border-maincontent rounded-md">
        <div className="filter-item m-6">Filter</div>
        <div className="filter-item">
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={myleavelist}>
              {(item) => (
                <TableRow key={item.user_id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

    </>
  );
};

export default MyLeaveList;
