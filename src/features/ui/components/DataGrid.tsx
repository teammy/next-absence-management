import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  useState,
  useMemo,
  useEffect,
  use,
} from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableColumn,
  TableCell,
  getKeyValue,
  Tab,
  Input,
  Pagination,
  PaginationItem,
  PaginationCursor,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
// import DataGridItem from './DataGridItem';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { SearchIcon } from './icon/searchicon';
import { PlusIcon,ChevronDownIcon } from '@heroicons/react/24/outline';

export type DataRow = {
  id: number | string;
  holidayDate: string;  
} & Record<string, unknown>;

export interface DataGridColumn<T extends DataRow> {
  field: keyof T;
  headerName: string;
  value?: (item: T) => string | ReactElement;
}

export interface DataGridProps<T extends DataRow> {
  title: string;
  columns: DataGridColumn<T>[];
  rows?: T[];
}


export interface DataGridItemProps<T extends DataRow>
  extends Pick<DataGridProps<T>, 'columns'> {
  row: T;
}



export function DataGrid<T extends DataRow>({
  columns,
  rows,
}: DataGridProps<T>) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);
  type Selection = "all" | Set<React.Key>;
  const [yearlyFilter, setYearlyFilter] = useState<Selection>();
  const router = useRouter();

  const getUniqueYears = (data:DataRow[]) => {
    console.log("data",data)
    const years = new Set(data?.map(item => {
      if (item.holidayDate) {
        const date = new Date(item.holidayDate);
        return date.getFullYear();
      }
    }).filter(year => year !== undefined));
    return Array.from(years);
  };
  
  const yearOptions = rows ? getUniqueYears(rows) : [];
  console.log("yearOptions",yearOptions)
  
  

  const filteredItems = React.useMemo(() => {
    let filteredData = rows;

    if (hasSearchFilter) {
      filteredData = rows?.filter((row) => {
        return Object.values(row).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(filterValue.toLowerCase());
          }
          return false;
        });
      });
    }



    if (yearlyFilter) {
      filteredData = filteredData?.filter((item) => {
        const itemYear = new Date(item.holidayDate).getFullYear().toString();

        return yearlyFilter.has(itemYear);
      });
      console.log("filteredData selection",filteredData)
    }

    return filteredData;
  }, [rows, filterValue,yearlyFilter]);

  console.log("filteredItems",filteredItems)


  const totalDatas = filteredItems?.length ?? 0;
  // const totalDatas = filteredItems.length ?? 0;
  const pages = Math.ceil(totalDatas / rowsPerPage);

  const items_pagination = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
    // return rows?.slice(start, end);
  }, [page, rowsPerPage,rows,filteredItems]);



  const onRowsPerPageChange = React.useCallback((e:any) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between items-center">
        <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="ค้นหาข้อมูล..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />

      <Button
            onPress={() => router.push('/admin/setting/holidayDate/create')}
          >
            เพิ่มข้อมูล
          </Button>
          <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="h-4 w-4" />} variant="flat">
                  ประจำปี
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={yearlyFilter}
                selectionMode="multiple"
                onSelectionChange={setYearlyFilter}
              >
                {yearOptions.map((year) => (
                  <DropdownItem textValue={year?.toString()} key={year} className="capitalize">
                    {year}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
    </div>
    );
  },[onRowsPerPageChange,filterValue,onSearchChange,hasSearchFilter,yearlyFilter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
          <span className="w-[30%] text-small text-default-400">
          <label className="flex items-center text-default-400 text-small">
      แสดงข้อมูลต่อหน้า:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={onRowsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
        </span>

        <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />


          
        </div>
    );
  },[onRowsPerPageChange,page,pages]);

 
  const generateRow = (row: T) => {
    const result = [];

    for (const col of columns) {
      const data = row[col.field];
      let value: ReactNode;

      if (typeof col.value === 'function') {
        value = col.value(row);
      } else if (typeof data === 'object') {
        value = JSON.stringify(data);
      } else {
        value = String(data);
      }

      result.push(
        <TableCell
          key={col.field as string}
          className="pl-2 text-left text-base"
        >
          {value}
         
        </TableCell>,
      );
    }

     // Add edit and delete buttons


    return result;
  };


  return (
    <Table
      aria-label="DataGrid Component"
      className="w-full text-left text-sm text-gray-500 dark:text-gray-400"
      classNames={{
        th: 'bg-[#FCDCBB] font-medium text-base text-[#002d63] dark:bg-gray-700 dark:text-gray-400',
        // tbody: 'bg-white divide-y dark:divide-gray-700 dark:bg-gray-800',
      }}
      bottomContent={bottomContent}
      topContent={topContent}
    >
      <TableHeader
        columns={columns}
        className="bg-[#0050f0] text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
        {(column) => (
          <TableColumn key={column.headerName}>{column.headerName}</TableColumn>
        )}
        {/* {columns.map(({ headerName }) => (
          <TableColumn key={headerName} scope="col" className="px-6 py-3">
            {headerName}
          </TableColumn>
        ))} */}
      </TableHeader>
      <TableBody items={items_pagination}>
        {(row) => (
          <TableRow
            key={row.id}
            className="cursor-pointer border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            // onClick={showDetails}
          >
            {generateRow(row)}
          </TableRow>
        )}
      </TableBody>
      {/* {rows && (
          {rows.map((r) => {
            return (
              <DataGridItem key={r.id} columns={columns} row={r}></DataGridItem>
            );
          })}
          )} */}
    </Table>
  );
}

export default DataGrid;
