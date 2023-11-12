import React, { useState } from 'react';
import { api } from '~/utils/api';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Divider,
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
  const { data: profileByid } = api.employee.byId.useQuery(selectedEmployee);
  const numofEmployee = listEmployee?.length;

  const handleEmployeeClick = (employee: number) => {
    setSelectedEmployee(employee);
  };

  return (
    <>
      <div className="flex">
        <h1>จำนวนพนักงานทั้งหมด {numofEmployee} คน</h1>
        <div className=" flex-1">
          {listEmployee?.map((item) => (
            <div
              key={item.user_id}
              onClick={() => handleEmployeeClick(item.user_id)}
            >
              <div>
                {item.person_firstname} {item.person_lastname}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex-1">
        {profileByid && (
          <div>
            <h3>Employee Details</h3>
            <p>Name: {profileByid.person_id} {profileByid.person_email}</p>
          </div>
        )}
      </div> */}
        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" variant="underlined">
            {profileByid && (
              <Tab
                key="photos"
                title={
                  <div className="flex items-center space-x-2">
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </div>
                }
              >
                <Card radius="sm" shadow="sm">
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                      <p className="text-xl font-bold">ข้อมูลส่วนตัว</p>
                    </div>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <h3>Employee Details</h3>
                    <p>
                      Name: {profileByid.person_id} {profileByid.person_email}
                    </p>
                  </CardBody>
                </Card>
              </Tab>
            )}
            <Tab
              key="music"
              title={
                <div className="flex items-center space-x-2">
                  <BookOpenIcon className="h-4 w-4" />
                  <span>Education</span>
                </div>
              }
            >
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="videos" title="Videos">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

EmployeePage.getLayout = Layout;

export default EmployeePage;
