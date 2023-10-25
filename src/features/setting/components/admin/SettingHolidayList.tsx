import DataGrid, {
  type DataGridColumn,
} from '~/features/ui/components/DataGrid';

// import { DataGrid, 
//   type DataGridColumn,
// } from '~/features/ui/components/table/DataTable';

// import  DataGrid, {type DataGridColumn}  from '~/features/ui/components/table/DataTable';
import { api } from '~/utils/api';
import { type HolidayDateItem } from '~/features/setting/types';
// import LeaveDetails from './LeaveItem';
import { Button,Link } from '@nextui-org/react';
import { useRouter } from 'next/router';


export function SettingHolidayList() {
  const { data, isLoading } = api.admin.settingHoliday.listHoliday.useQuery();
  const router = useRouter();
  const columns: DataGridColumn<HolidayDateItem>[] = [
    {
      field: 'holidayDate',
      headerName: 'วันที่',
      value: (holiday) => holiday.holidayDate,
    },
    {
      field: 'holidayName',
      headerName: 'Holiday Name',
      value: (holiday) => holiday.holidayName,
    },
    {
      field: 'holidayType',
      headerName: 'Holiday Type',
      value: (holiday) => holiday.holidayType,
    },

    
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
    <div>
      <h1>Setting Holiday List</h1>
      <p><Link href="/admin/setting/holidayDate/create">
      สร้างวันหยุด</Link></p>
      <p><Button
      onPress={() => router.push("/admin/setting/holidayDate/create")}
    >
      Button Link
    </Button></p>
    </div>
    <DataGrid
      title="All Leave Requests"
      columns={columns}
      rows={data}
    ></DataGrid>
    </>
  );
}

export default SettingHolidayList;
