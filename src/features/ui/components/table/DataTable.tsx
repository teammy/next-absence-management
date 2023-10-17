import React from 'react'
import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { type ComponentType, type ReactElement } from 'react';

export type DataRow = {
  id : number | string;
} & Record<string, unknown>;

export interface DataTableColumn<T extends DataRow> {
  field: keyof T;
  headerName: string;
  value?: (item: T) => string | ReactElement;
}

export interface DataGridProps<T extends DataRow> {
  title: string;
  columns : DataTableColumn<T>[];
  rows?: T[];
  detailsComponent: ComponentType<DataRow>;
}

export function DataTable<T extends DataRow>({
  title,
  columns,
  rows,
  detailsComponent,
}: DataGridProps<T>) {
  return (
    <Table>
      <TableHeader>
      </TableHeader>
      <TableRow>
        
      </TableRow>
    </Table>
  );
}

export default DataTable