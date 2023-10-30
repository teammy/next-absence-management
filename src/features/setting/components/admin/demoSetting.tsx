import React, { useCallback, useState } from 'react';
import { api } from '~/utils/api';
import { type HolidayDateItem } from '~/features/setting/types';
import { useRouter } from 'next/router';
import {
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  SortDescriptor,
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
  useTable,
} from '@nextui-org/react';
import {
  TrashIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const columns = [
  { header: 'วันที่', key: 'holidayDate', sortable: true },
  { header: 'Holiday Name', key: 'holidayName', sortable: true },
  { header: 'Holiday Type', key: 'holidayType', sortable: true },
  { header: 'Actions', key: 'actions', sortable: false },
];

const formatDateToThai = (value: string) => {
  // const [year, month, day] = date.split('-');
  // return `${day}/${month}/${year}`;
};

type Props = {};

function DemoSetting({}: Props) {
  const { data, isLoading } = api.admin.settingHoliday.listHoliday.useQuery();
  const router = useRouter();
  const orders = data;



  const [SortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'holidayDate',
    direction: 'ascending',
  });

  const getCellContents = useCallback(
    (columnKey: string, item: HolidayDateItem) => {
      if (columnKey === 'id') return item.id;
      if (columnKey === 'holidayDate') return item.holidayDate;
      if (columnKey === 'holidayName') return item.holidayName;
      if (columnKey === 'holidayType') return item.holidayType;
    },
    [],
  );

  return (
    <>
    <Table>
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.key}
              sortable={column.sortable}
              sortDirection={
                SortDescriptor.column === column.key
                  ? SortDescriptor.direction
                  : undefined
              }
              onSortChange={(direction) =>
                setSortDescriptor({
                  column: column.key,
                  direction,
                })
              }
            >
              {column.header}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {orders.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {getCellContents(column.key, item)}
                </TableCell>
              ))}
              <TableCell>
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                  <Tooltip content="Edit user">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <PencilIcon />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="ลบข้อมูล">
                    <span className="cursor-pointer text-lg text-danger active:opacity-50">
                      <TrashIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
      
    </>
  );
}

export default DemoSetting;
