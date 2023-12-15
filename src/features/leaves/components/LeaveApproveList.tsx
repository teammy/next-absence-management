
import Layout from '~/features/ui/components/layouts/Normal'
import { type NextPageWithLayout } from "~/pages/_app";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue
} from "@nextui-org/react";

const LeaveApproveList:NextPageWithLayout = () => {
 
  const { data: session } = useSession();
  const wardId = session?.user.ward_id ? session?.user.ward_id : 0;
  const userId = session?.user.user_id ? session?.user.user_id : 0;
  const dutyId = session?.user.duty_id ? session?.user.duty_id : 0;

  type EmployeeAssings = {
    user_id: string;
    person_firstname: string;
    person_lastname: string;
  };

  const { data: rows } = api.leave.listItemsForManager.useQuery<
    EmployeeAssings[]
  >({wardId,dutyId});
  if(!rows) return null;
  console.log("listPerAssigns", rows );

  const columns = [ 
    { key: 'leaveTypeDescription', label: 'ประเภท' },
    { key: 'fullname', label: 'ชื่อ-สกุล' },
    { key: 'startLeaveDate', label: 'วันที่เริ่มต้น' },
    { key: 'endLeaveDate', label: 'วันที่สิ้นสุด' },
    { key: 'totalLeaveDays', label: 'จำนวน(วัน)' },
    { key: 'managerStatus', label: 'สถานะ' },
  ];

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem>หน้าแรก</BreadcrumbItem>
        <BreadcrumbItem>รายการอนุมัติ</BreadcrumbItem>
      </Breadcrumbs>

      <div className="my-4">
        <h1 id="head-title" className="Ekachon_Bold text-xl">
        รายการเพื่ออนุมัติ
        </h1>
      </div>
      <div className=" border-maincontent rounded-md">
        <div className="filter-item m-6">Filter</div>
        <div className="filter-item">

        <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.user_id}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
        </div>
      </div>
    </>
  );
};

LeaveApproveList.getLayout = Layout

export default LeaveApproveList