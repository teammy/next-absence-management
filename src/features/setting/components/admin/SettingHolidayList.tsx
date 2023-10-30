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
import { Button,Tooltip } from '@nextui-org/react';
import { useRouter } from 'next/router';
import EditIcon from '~/features/ui/components/icon/edit-icon';
import TrashIcon from '~/features/ui/components/icon/trash-icon';
import Link from 'next/link';


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
      headerName: 'รายละเอียด',
      value: (holiday) => holiday.holidayName,
     
    },
    {
      field: 'holidayType',
      headerName: 'ประเภทวันหยุด',
      value: (holiday) => holiday.holidayType,
     
    },
    {
      field: 'id',
      headerName: '',
      value: (holiday) => (
        <div className="relative flex items-center gap-3">
            <Tooltip content="แก้ไข" showArrow={true}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link href={`/admin/setting/holidayDate/${holiday.id}/edit`}>
                <EditIcon />
                  </Link>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="ลบ" showArrow={true}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <TrashIcon />
              </span>
            </Tooltip>
          </div>
      ),
    }

  ];

  if(!data) return <div>Not Content...</div>
  if (isLoading) return <div>Loading...</div>;
  

  return (
    <>
    <div>
      <h1>Setting Holiday List</h1>
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
