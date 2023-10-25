import Loading from '~/features/ui/components/Loading';
import { api } from '~/utils/api';
import LeaveItem from './LeaveItem';
import FloatingActionButton from '~/features/ui/components/FloatingActionButton';
import { useRouter } from 'next/router';
import {Card, CardHeader, CardBody, CardFooter,CircularProgress} from "@nextui-org/react";
import DataGrid, {type DataGridColumn } from '~/features/ui/components/DataGrid';
import dayjs from "dayjs";
import "dayjs/locale/th";
dayjs.locale("th");
var buddhistEra = require('dayjs/plugin/buddhistEra')
dayjs.extend(buddhistEra)


const LeaveList = () => {
  const router = useRouter();
  const { data: leaves, isLoading } = api.leave.list.useQuery(); // CSR

  const columns: DataGridColumn<LeaveItem>[] = [
    {
      field: 'typeLeave',
      headerName: 'ประเภท',

    },
    {
      field: 'startLeaveDate',
      headerName: 'ตั้งแต่วันที่',
      value: (leave) => dayjs(leave.startLeaveDate).format('D MMM BBBB'),
    },
    {
      field: 'endLeaveDate',
      headerName: 'ถึงวันที่',
      value: (leave) => dayjs(leave.endLeaveDate).format('D MMM BBBB'),
    },
    {
      field: 'totalLeaveDays',
      headerName: 'จำนวน(วัน)',
    },
    {
      field: 'managerStatus',
      headerName: 'หัวหน้างาน',
    },
    {
      field: 'departmentHeadStatus',
      headerName: 'หัวหน้าฝ่าย',
    },
    {
      field: 'hrStatus',
      headerName: 'ทรัพยากรบุคคล',
      value: (leave) => leave.hrStatus,
    },
  ];

  if (isLoading) return <Loading></Loading>;
  if (!leaves) return <div>Not found.</div>;

  return (
    <>

         <DataGrid 
         columns={columns}
          rows={leaves} 
          detailsComponent={LeaveItem}
         >
         </DataGrid>
   
    <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

   
      {leaves.map((leave) => (
        <LeaveItem key={leave.id} {...leave}></LeaveItem>
      ))}
      <FloatingActionButton onClick={() => router.push('/leaves/selectType')}>
        +
      </FloatingActionButton>
    </div>
    </>
  );
};

export default LeaveList;
