import { Loader } from "@mantine/core";
import { api } from "~/utils/api";
import { useCallback, useEffect, useState } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
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

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const [selectItemDelete, setSelectItemDelete] = useState<number>();

  const handleConfirmDelete = async () => {
    // Implement your delete logic here
    console.log("selectItemDelete", selectItemDelete);
    onClose();
  }
  const handleCloseModal = () => {
    onClose();
  };

  const handleDeleteItem = (leaveId:number) => {
    setSelectItemDelete(leaveId)
    onOpen();
    // Implement your delete logic here
    console.log("leaveId from handle",leaveId);
    // onClose();
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
            
            <span
              className="cursor-pointer text-lg text-danger active:opacity-50"
              onClick={() => handleDeleteItem(user.id)}
            >
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} className="Ekachon_Light">
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1 bg-[#F44436] text-white">
                ยกเลิกใบลา
              </ModalHeader>
              <ModalBody className="p-10 Ekachon_Light">
                <p>
                คุณแน่ใจใช่หรือไม่ ที่จะยกเลิกใบลานี้
                </p>

              </ModalBody>
              <ModalFooter className="bg-[#EFF0F6]">
                <Button color="danger" variant="light" onPress={onClose}>
                  ปิด
                </Button>
          <Button onPress={onClose} className="bg-[#F44436] text-white">ตกลง</Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyLeaveList;
