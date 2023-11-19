import React from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { type NextPageWithLayout } from '~/pages/_app';
import Layout from '~/features/ui/components/layouts/Normal';
import {
  Avatar,
  Divider,
  Tabs,
  Tab,
  Card,
  CardBody,
  Input,
} from '@nextui-org/react';
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  UserGroupIcon,
  AcademicCapIcon,
  DevicePhoneMobileIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import localFont from 'next/font/local'
// const mlpFont_bold = localFont({ src: '../../public/fonts/maledpan-bold.woff2' })


type Props = {};

const PageProfile: NextPageWithLayout = () => {
  const router = useRouter();
  const queryParamProfileId = Number(router.query.id);
  const { data: profileData } = api.employee.byId.useQuery(queryParamProfileId);
  console.log('profileData', profileData);
  if (!profileData) return <div>No Data</div>;

  return (
    <>
      <div>Page Profile</div>
      <div
        id="header-employee-view"
        className="mb-10 flex items-center justify-start"
      >
        <div className="mr-32 flex max-w-xs" id="content-avatar">
          <Avatar className="mr-3" />
          <div>
            <div className="font-bold">{profileData.person_firstname}</div>
            <div className="">{profileData.person_lastname}</div>
          </div>
        </div>
        <div className="flex-grox mr-10" id="content-information">
          <div>โรงพยยาบาลสมเด็จพระเจ้าตากสินมหาราช</div>
          <div>โรงพยยาบาลสมเด็จพระเจ้าตากสินมหาราช</div>
        </div>
        <div className="flex-none" id="content-attendance">
          <div className="flex">
            <EnvelopeIcon className="mr-3 h-5 w-5 pt-1" />
            <div>โรงพยยาบาลสมเด็จพระเจ้าตากสินมหาราช</div>
          </div>
          <div className="flex">
            <PhoneIcon className="mr-3 h-5 w-5 pt-1" />
            <div>โรงพยยาบาลสมเด็จพระเจ้าตากสินมหาราช</div>
          </div>
        </div>
      </div>
      <Divider />
      <div>
        <div className="flex w-full flex-col items-center">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="light"
            radius="sm"
            size="lg"
            disableAnimation={true}
            className="my-5"
            classNames={{
              cursor: 'bg-[#0150F0] border-[#0150F0] hover:bg-[#0150F0] ',
              tabContent: 'text-[#0150F0] ',
              tab: 'bg-[#F7FAFF] hover:opacity-100 border-[#0150F0] border-2 text-[#0150F0] hover:border-[#f68b1f] hover:bg-[#f68b1f]',
            }}
          >
            <Tab
              key="personal"
              title={
                <div className="flex items-center space-x-2 text-lg ">
                  <UserIcon className="h-5 w-5" />
                  <span>ข้อมูลส่วนตัว</span>
                </div>
              }
            >
              <Card shadow="none" className="bg-[#EFF3FA] px-3">
                <CardBody>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl text-[#0050F0]">ข้อมูลทั่วไป</h2>
                    <div className="flex items-center justify-end">
                      <label className="block  w-1/3">คำนำหน้า *</label>
                      <Input
                        radius="sm"
                        size="sm"
                        type="text"
                        className="w-2/3"
                        classNames={{
                          inputWrapper: 'bg-white border',
                          input: 'text-lg',
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <label className="block  w-1/3">ชื่อ *</label>
                      <Input
                        radius="sm"
                        size="sm"
                        type="text"
                        className="w-2/3"
                        classNames={{
                          inputWrapper: 'bg-white border',
                          input: 'text-lg',
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <label className="block w-1/3">นามสกุล*</label>
                      <Input
                        radius="sm"
                        size="sm"
                        type="text"
                        className="w-2/3"
                        classNames={{
                          inputWrapper: 'bg-white border',
                          input: 'text-lg',
                        }}
                      />
                    </div>
                    {/* Repeat for other fields */}
                  </div>
                </CardBody>
              </Card>
              <Card shadow="none" className="bg-[#F7FAFF] px-3">
                <CardBody>
                  <h1 className="text-xl text-[#002d63]">ข้อมูลส่วนตัว</h1>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="family"
              title={
                <div className="flex items-center space-x-2 text-lg ">
                  <UserGroupIcon className="h-5 w-5" />
                  <span>ข้อมูลครอบครัว</span>
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
            <Tab
              key="education"
              title={
                <div className="flex items-center space-x-2 text-lg ">
                  <AcademicCapIcon className="h-5 w-5" />
                  <span>ข้อมูลการศึกษา</span>
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
            <Tab
              key="work"
              title={
                <div className="flex items-center space-x-2 text-lg">
                  <BuildingOffice2Icon className="h-5 w-5" />
                  <span>ข้อมูลการทำงาน</span>
                </div>
              }
            >
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab
              key="contact"
              title={
                <div className="flex items-center space-x-2 text-lg">
                  <DevicePhoneMobileIcon className="h-5 w-5" />
                  <span>ข้อมูลติดต่อ</span>
                </div>
              }
            >
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

PageProfile.getLayout = Layout;

export default PageProfile;
