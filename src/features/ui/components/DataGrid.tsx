import { type ComponentType, type ReactElement } from 'react';
import DataGridItem from './DataGridItem';
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/react";


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
  detailsComponent: ComponentType<DataRow>;
}

export function DataGrid<T extends DataRow>({
  title,
  columns,
  rows,
  detailsComponent,
}: DataGridProps<T>) {
  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-bold text-primary-500">
        {title}
      </h2>
      <div className="relative overflow-x-auto">
        <Table  className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader columns={headerName} className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <TableRow>
              <TableColumn scope="col" className="px-6 py-3">
                ID
              </TableColumn>
              {columns.map(({ headerName }) => (
                <TableColumn key={headerName} scope="col" className="px-6 py-3">
                  {headerName}
                </TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          {rows && (
            <TableBody>
              {rows.map((r) => {
                return (
                  <DataGridItem
                    key={r.id}
                    columns={columns}
                    row={r}
                    detailsComponent={detailsComponent}
                  ></DataGridItem>
                );
              })}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}

export default DataGrid;
