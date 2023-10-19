import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../../../_app';
import LeaveList from '~/features/leaves/components/admin/LeaveList';
import SettingHolidayList from '~/features/setting/components/admin/SettingHolidayList';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell ,getKeyValue} from "@nextui-org/react";


const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "key",
    label: "Key",
  },
  
];

const IndexPage: NextPageWithLayout = () => {
  return (
  <>
  <SettingHolidayList></SettingHolidayList>
  {/* <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table> */}
    {/* <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {rows.map((row) =>
          <TableRow key={row.key}>
            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table> */}
  </>
  );
};

IndexPage.getLayout = Layout;

export default IndexPage;
