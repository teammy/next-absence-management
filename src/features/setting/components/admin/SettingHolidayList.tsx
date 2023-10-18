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

export function SettingHolidayList() {
  const { data, isLoading } = api.admin.settingHoliday.listHoliday.useQuery();
  const columns: DataGridColumn<HolidayDateItem>[] = [
    {
      field: 'holidayDate',
      headerName: 'Date Holiday',
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
    <DataGrid
      title="All Leave Requests"
      columns={columns}
      rows={data}
    ></DataGrid>
    
  );
}

export default SettingHolidayList;
