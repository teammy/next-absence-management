import {
  type ComponentType,
  type ReactElement,
  type ReactNode,
  useState,
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
} from '@nextui-org/react';
import DataGridItem from './DataGridItem';
import React from 'react';

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
  title,
  columns,
  rows,
}: DataGridProps<T>) {

  const [page,setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


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
        <TableCell key={col.field as string} className="px-6 py-4">
          {value}
        </TableCell>,
      );
    }

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
      <TableBody items={rows}>
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
