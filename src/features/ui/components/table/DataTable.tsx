// import React from 'react'
// import {
//   Link,
//   Table,
//   TableBody,
//   TableCell,
//   TableColumn,
//   TableHeader,
//   TableRow,
// } from "@nextui-org/react";
// import { type ComponentType, type ReactElement } from 'react';

// export type DataRow = {
//   id : number | string;
// } & Record<string, unknown>;

// export interface DataTableColumn<T extends DataRow> {
//   field: keyof T;
//   headerName: string;
//   value?: (item: T) => string | ReactElement;
// }

// export interface DataGridProps<T extends DataRow> {
//   title: string;
//   columns : DataTableColumn<T>[];
//   rows?: T[];
//   detailsComponent: ComponentType<DataRow>;
// }

// export function DataTable<T extends DataRow>({
//   title,
//   columns,
//   rows,
//   detailsComponent,
// }: DataGridProps<T>) {
//   return (
//     <Table>
//       <TableHeader>
//       </TableHeader>
//       <TableRow>
        
//       </TableRow>
//     </Table>
//   );
// }

// export default DataTableimport { Table, TableHeader, TableRow, TableColumn, TableBody } from "@nextui-org/react";

import { type ComponentType, type ReactElement } from 'react';
import { useState } from 'react';
import { Table, TableHeader, TableRow, TableColumn, TableBody } from "@nextui-org/react";

export interface DataRow {
  id: number | string;
  [key: string]: unknown;
}

export interface DataGridColumn {
  field: string;
  headerName: string;
  value?: (item: DataRow) => string | ReactElement;
}

export interface DataGridProps {
  title: string;
  columns: DataGridColumn[];
  rows?: DataRow[];
  detailsComponent: React.ComponentType<{ row: DataRow }>;
}

export interface DataGridItemProps {
  row: DataRow;
  columns: DataGridColumn[];
  detailsComponent: React.ComponentType<{ row: DataRow; onClose: () => void }>;
}

export function DataGridItem({
  row,
  columns,
  detailsComponent: DetailsComponent,
}: DataGridItemProps) {
  const [isDetailsShown, setIsDetailsShown] = useState(false);

  const showDetails = () => setIsDetailsShown(true);

  const hideDetails = () => setIsDetailsShown(false);

  const generateRow = (row: DataRow) => {
    const result = [
      <TableColumn key="id" className="px-6 py-4">
        {row.id}
      </TableColumn>,
    ];

    for (const col of columns) {
      const data = row[col.field];
      let value: React.ReactNode;

      if (typeof col.value === 'function') {
        value = col.value(row);
      } else if (typeof data === 'object') {
        value = JSON.stringify(data);
      } else {
        value = data;
      }

      result.push(
        <TableColumn key={col.field} className="px-6 py-4 whitespace-nowrap">
          {value}
        </TableColumn>
      );
    }

    return result;
  };

  return (
    <>
      <TableRow onClick={showDetails}>
        {generateRow(row)}
      </TableRow>
      {isDetailsShown && (
        <TableRow>
          <TableColumn colSpan={columns.length + 1} className="px-6 py-4">
            <DetailsComponent row={row} onClose={hideDetails} />
          </TableColumn>
        </TableRow>
      )}
    </>
  );
}

export function DataGrid({
  title,
  columns,
  rows,
  detailsComponent: DetailsComponent,
}: DataGridProps) {
  return (
    <div>
      <h2 className="mb-4 text-center text-2xl font-bold text-primary-500">
        {title}
      </h2>
      <div className="relative overflow-x-auto">
        <Table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <TableHeader>
            <TableRow>
              <TableColumn className="px-6 py-3">ID</TableColumn>
              {columns.map(({ headerName }) => (
                <TableColumn key={headerName} className="px-6 py-3">
                  {headerName}
                </TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows?.map((row) => (
              <DataGridItem
                key={row.id}
                columns={columns}
                row={row}
                detailsComponent={DetailsComponent}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}