import { type ComponentType, type ReactElement } from "react";
import DataGridItem from "./DataGridItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
  Button,
  Pagination,
  Tab,
} from "@nextui-org/react";

export type TableRows = {
  id : number | string;
} & Record<string, unknown>;

export interface TableGridColumn<T extends TableRows> {
  field: keyof T;
  headerName: string;
  value?: (item : T) => string | ReactElement;
}

export interface TableGridProps<T extends TableRows> {
  title: string;
  columns: TableGridColumn<T>[];
  rows?: T[];
  detailsComponent: ComponentType<TableRows>;
}

export function TableGrid<T extends TableRows>({
  title,
  columns,
  rows,
  detailsComponent
} : TableGridProps<T>) {
  return (
    <Table>
      <TableHeader>

        </TableHeader>
        <TableBody>
          
          </TableBody>
    </Table>
  );
}

export default TableGrid;