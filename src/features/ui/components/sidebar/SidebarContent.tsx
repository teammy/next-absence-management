import React from 'react';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { HomeIcon,Settings2Icon,FilePlus2Icon,FolderIcon,InboxIcon,FileLineChartIcon,UserIcon } from 'lucide-react';


function SidebarContent() {

  const { data: session } = useSession();


  return (
    <div className="flex bg-white text-gray-900">
      <aside className="flex h-screen w-20 flex-col items-center">
        <nav className="flex flex-1 flex-col gap-y-4 pt-6 text-center">
          <Link
            href="/home"
            className="group relative rounded-xl bg-[#F2F2F2] p-2 text-[#F68B1F] hover:bg-gray-50"
          >
            <HomeIcon />
            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex ">
              <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                หน้าหลัก
              </div>
            </div>
          </Link>
          <hr/>
           <Link
            // href={`/profile/${session?.user.user_id}`}
            href="/leaves/create"
            className="text-[#1A477F]  group relative rounded-xl p-2 hover:text-[#f68b1f]"
          >
            <FilePlus2Icon />


            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex ">
              <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                เขียนใบลา
              </div>
            </div>
          </Link>
          <hr/>
            <Link
            href="/myleave"
            className="text-[#1A477F] group relative rounded-xl p-2 hover:text-[#f68b1f]"
          >
            <FolderIcon />

            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex ">
              <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                ใบลาของฉัน
              </div>
            </div>
          </Link>
          <hr/>
           <Link
            href="/leaveapprove"
            className="text-[#1A477F] group relative rounded-xl p-2 hover:text-[#f68b1f]"
          >
            <InboxIcon/>


            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex ">
              <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                รายการรออนุมัติ
              </div>
            </div>
          </Link>
          
          <hr/>
          
          <Link
            href="/payroll"
            className="text-[#1A477F] group relative rounded-xl p-2 hover:text-[#f68b1f]"
          >
           <FileLineChartIcon />


            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                รายงาน
              </div>
            </div>
          </Link>
          <hr />
          <Link
            href="/setting"
            className="text-[#1A477F] group relative rounded-xl p-2 hover:text-[#f68b1f]"
          >
           <Settings2Icon />


            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex z-20">
            <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                ตั้งค่า
              </div>
            </div>
          </Link>
          <hr />
          <Link
            href="/payroll"
            className="text-[#1A477F] group relative rounded-xl p-2 hover:text-[#f68b1f]"
          >
           <UserIcon />


            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex hover:z-50">
            <div className=" relative whitespace-nowrap  rounded  bg-[#1A477F] px-3 py-1 text-lg text-white drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-[#1A477F]"></div>
                </div>
                ข้อมูลส่วนตัว
              </div>
            </div>
          </Link>
          <hr />
          <Link
            href="/employee"
            className="text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>
          </Link>

        </nav>

      </aside>
    </div>
  );
}

export default SidebarContent;
