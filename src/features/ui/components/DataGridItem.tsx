import { type ReactNode, useState } from 'react';
import { TableRow,TableCell } from '@nextui-org/react';
import type { ComponentType, ReactElement } from 'react';
import type { DataGridProps, DataRow } from './DataGrid';


export interface DataGridItemProps<T extends DataRow>
  extends Pick<DataGridProps<T>, 'columns'> {
  row: T;
}

export function DataGridItem<T extends DataRow>({
  row,
  columns,
}: DataGridItemProps<T>) {
  const [isDetailsShown, setIsDetailsShown] = useState(false);

  const showDetails = () => setIsDetailsShown(true);

  const hideDetails = () => setIsDetailsShown(false);

  const generateRow = (row: T) => {
    const result = [
      <TableCell key="id" className="px-6 py-4">
        {row.id}
      </TableCell>,
    ];

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

  // if (isDetailsShown)
  //   return (
  //     <tr onClick={hideDetails} className="cursor-pointer">
  //       <td colSpan={100} className="border-b-[1px] p-4">
  //         {/* <DetailsComponent id={row.id}></DetailsComponent> */}
  //       </td>
  //     </tr>
  //   );

  return (
    <TableRow
      key={row.id}
      className="cursor-pointer border-b bg-white dark:border-gray-700 dark:bg-gray-800"
      // onClick={showDetails}
    >
      {generateRow(row)}
    </TableRow>
  );
}

export default DataGridItem;