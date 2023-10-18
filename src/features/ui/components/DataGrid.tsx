import { type ComponentType, type ReactElement } from 'react';
import { Table ,TableBody,TableRow,TableHeader,TableColumn  }  from "@nextui-org/react";
import DataGridItem from './DataGridItem';
import React from "react";

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

export function DataGrid<T extends DataRow>({
  title,
  columns,
  rows,
}: DataGridProps<T>) {

  return (

        <Table  className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          {columns.map(({ headerName }) => (
              <TableColumn key={headerName} scope="col" className="px-6 py-3">
                  {headerName}
                </TableColumn>
              ))}
              <TableColumn  className="px-6 py-3">
                ID
              </TableColumn>
          </TableHeader>
          {rows && (
          <TableBody>
              {rows.map((r) => {
                return (
                  <DataGridItem
                    key={r.id}
                    columns={columns}
                    row={r}
                  ></DataGridItem>
                );
              })}
              </TableBody>
              )}
        </Table>
  );
}

export default DataGrid;