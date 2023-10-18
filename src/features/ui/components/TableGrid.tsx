import { Table as NextUITable, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { ReactNode } from "react";

export interface Column {
  key: string;
  label: string;
}

export interface Row {
  key: string;
  [key: string]: unknown;
}

export interface TableProps {
  columns: Column[];
  rows: Row[];
  
  renderCell?: (row: Row, columnKey: string) => ReactNode;
}

export function Table({ columns, rows, renderCell }: TableProps) {
  return (
    <NextUITable aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                {renderCell ? renderCell(item, columnKey) : item[columnKey]}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
}