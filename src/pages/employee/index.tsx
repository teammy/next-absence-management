import React, { useState } from 'react';
import { api } from '~/utils/api';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,getKeyValue
} from '@nextui-org/react';
import { UserIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import Layout from '~/features/ui/components/layouts/Normal';
import { type NextPageWithLayout } from '../_app';

const EmployeePage: NextPageWithLayout = () => {
  
  const [isDetailsShow, setIsDetailsShow] = useState(false);
  const showDetails = () => setIsDetailsShow(true);
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const utils = api.useUtils();
  const { data: listEmployee } = api.employee.listEmployeeName.useQuery();
  console.log("listEmployee",listEmployee);
  // const { data: profileByid } = api.employee.byId.useQuery(selectedEmployee);
  const numofEmployee = listEmployee?.length;
  if(!listEmployee) return undefined;

  const handleEmployeeClick = (employee: number) => {
    setSelectedEmployee(employee);
  };

  const columns = [
    {
      key: "user_id",
      label: "ชื่อ-สกุล",
    },
    {
      key: "person_firstname",
      label: "ตำแหน่ง",
    },
    {
      key: "person_lastname",
      label: "ตำแหน่ง",
    },
  ];

  return (
    <>
    <h1 className="text-2xl text-[#030966] font-semibold my-5">จัดการข้อมูลบุคคล</h1>
      <div className="flex">
        
        <div className=" flex-1">
          <Table aria-label="title">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn> }
            </TableHeader>
            <TableBody items={listEmployee}>
              {(item) => (
                <TableRow key={item.user_id}>
                  {(columeKey) => <TableCell key={columeKey}>{getKeyValue(item, columeKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* {listEmployee?.map((item) => (
            <div
              key={item.user_id}
              onClick={() => handleEmployeeClick(item.user_id)}
            >
              <div>
                {item.person_firstname} {item.person_lastname}
              </div>
            </div>
          ))} */}
        </div>
        {/* <div className="flex-1">
        {profileByid && (
          <div>
            <h3>Employee Details</h3>
            <p>Name: {profileByid.person_id} {profileByid.person_email}</p>
          </div>
        )}
      </div> */}
        
      </div>
    </>
  );
};

EmployeePage.getLayout = Layout;

export default EmployeePage;
