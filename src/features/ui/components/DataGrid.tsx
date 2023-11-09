import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  useState,
  useMemo,
  useEffect,
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
} from '@nextui-org/react';
// import DataGridItem from './DataGridItem';
import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SearchIcon } from './icon/searchicon';

export type DataRow = {
  id: number | string;
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

  const filteredItems = React.useMemo(() => {
    let filteredData = [rows];
    if (hasSearchFilter) {
      filteredData = rows.filter((row) => {
        return Object.values(row).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(filterValue.toLowerCase());
          }
          return false;
        });
      });
    }
    console.log("filteredData",filteredData)

    return filteredData;
  }, [rows, filterValue]);


  const totalData = rows ?? [];
  const pages = Math.ceil(totalData.length / rowsPerPage);

  const items_pagination = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return totalData.slice(start, end);
  }, [page, rowsPerPage]);


  const onRowsPerPageChange = React.useCallback((e:any) => {
    // console.log("PerPageChange",e.target.value)
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
      {/* <span className="text-default-400 text-small">Total {rows.length} users</span> */}
      <label className="flex items-center text-default-400 text-small">
        จำนวนข้อมูล:
        <select
          className="bg-transparent outline-none text-default-400 text-small"
          onChange={onRowsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </label>
    </div>
    );
  },[onRowsPerPageChange,filterValue,onSearchChange,hasSearchFilter]);

 
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
      bottomContent={
        <div className="flex w-full justify-center">
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
      }
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
