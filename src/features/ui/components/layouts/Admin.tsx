import {
  RectangleGroupIcon,
  UsersIcon,
  QueueListIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { type ComponentType, type ReactNode } from 'react';
import ProtectedResource from '~/features/auth/guards/ProtectedResource';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';


interface SidebarLinkProps {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  title: string;
}

const SidebarLink = ({ href, Icon, title }: SidebarLinkProps) => {
  const router = useRouter();
  const getClassName = () => {
    const baseClass = 'relative flex justify-center rounded px-2 py-1.5';

    return router.pathname.startsWith(href)
      ? `${baseClass} bg-blue-50 text-blue-700`
      : baseClass;
  };

  return (
    <Link href={href} className={getClassName()}>
      <Icon className="w-5"></Icon>
      <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
        {title}
      </span>
    </Link>
  );
};

export interface LayoutProps {
  children: ReactNode;
}

const Admin = ({ children }: LayoutProps) => {
  const { status } = useSession();

  return (

//     <div class="flex">
  
//   <div class="w-1/4 bg-gray-200">
//     sidebar
//   </div>


//   <div class="w-3/4">
//     Main Content
//   </div>
// </div>


    // <div className="">
    //   <div className="flex h-screen w-16 flex-col justify-between border-r bg-white">
    //     <div>
    //       <Link href="/">
    //         <div className="inline-flex h-16 w-16 items-center justify-center">
    //           <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
    //             <Image
    //               priority
    //               src="/assets/images/logo.png"
    //               alt="Admin Panel"
    //               width={50}
    //               height={50}
    //             />
    //           </span>
    //         </div>
    //       </Link>

    //       <div className="border-t border-gray-100">
    //         <nav aria-label="Main Nav" className="flex flex-col p-2">
    //           <ProtectedResource roles={['ADMIN', 'MANAGER']}>
    //             <div className="border-b border-gray-100 py-4">
    //               <SidebarLink
    //                 title="Dashboard"
    //                 href="/admin/dashboard"
    //                 Icon={RectangleGroupIcon}
    //               ></SidebarLink>
    //             </div>
    //           </ProtectedResource>
    //           <ul className="space-y-1 pt-4">
    //             <ProtectedResource roles={['ADMIN']}>
    //               <li>
    //                 <SidebarLink
    //                   title="Users"
    //                   href="/admin/users"
    //                   Icon={UsersIcon}
    //                 ></SidebarLink>
    //               </li>
    //             </ProtectedResource>
    //             <ProtectedResource roles={['ADMIN', 'MANAGER']}>
    //               <li>
    //                 <SidebarLink
    //                   title="Leaves"
    //                   href="/admin/leaves"
    //                   Icon={QueueListIcon}
    //                 ></SidebarLink>
    //               </li>
    //             </ProtectedResource>
    //             <ProtectedResource roles={['ADMIN', 'MANAGER']}>
    //               <li>
    //                 <SidebarLink
    //                   title="Announcements"
    //                   href="/admin/announcements"
    //                   Icon={ChatBubbleOvalLeftEllipsisIcon}
    //                 ></SidebarLink>
    //               </li>
    //             </ProtectedResource>
    //             <ProtectedResource roles={['ADMIN', 'MANAGER']}>
    //               <li>
    //                 <SidebarLink
    //                   title="Blog"
    //                   href="/admin/articles"
    //                   Icon={BookOpenIcon}
    //                 ></SidebarLink>
    //               </li>
    //             </ProtectedResource>
    //           </ul>
    //         </nav>
    //       </div>
    //     </div>
    //     <ProtectedResource>
    //       <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
    //         <SidebarLink
    //           title="Profile"
    //           href="/auth/profile"
    //           Icon={Cog8ToothIcon}
    //         ></SidebarLink>
    //         {status === 'authenticated' ? (
    //           <button
    //             className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    //             onClick={() => signOut()}
    //           >
    //             <ArrowRightOnRectangleIcon className="w-5"></ArrowRightOnRectangleIcon>
    //             <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
    //               Sign Out
    //             </span>
    //           </button>
    //         ) : (
    //           <Link
    //             href="/auth/sign-in"
    //             className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    //           >
    //             <ArrowLeftOnRectangleIcon className="w-5"></ArrowLeftOnRectangleIcon>
    //             <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
    //               Sign In
    //             </span>
    //           </Link>
    //         )}
    //       </div>
    //     </ProtectedResource>
    //   </div>
    //   <main className="w-full p-4">{children}</main>
    // </div>

<div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-[#F3F3F3] text-gray-800">
  <div class="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
    <div class="flex items-center justify-center h-14 border-b">
      <div>Sidebar Navigation By iAmine</div>
    </div>
    <div class="overflow-y-auto overflow-x-hidden flex-grow">
      <ul class="flex flex-col py-4 space-y-1">
        <li class="px-5">
          <div class="flex flex-row items-center h-8">
            <div class="text-sm font-light tracking-wide text-gray-500">เมนูหลัก</div>
          </div>
        </li>
        <li>
          <Link href="/admin/dashboard" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Dashboard</span>
          </Link>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">ข้อมูลการลา</span>
            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
          </a>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Messages</span>
          </a>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">รออนุมัติ</span>
            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">1.2k</span>
          </a>
        </li>
        <li class="px-5">
          <div class="flex flex-row items-center h-8">
            <div class="text-sm font-light tracking-wide text-gray-500">ตั้งค่า</div>
          </div>
        </li>
        <li>
          <Link href="/admin/typeHoliday" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">ประเภทการลา</span>
          </Link>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">กำหนดเงื่อนไขการลา</span>
          </a>
        </li>
        <li>
          <Link href="/admin/setting/holidayDate" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">กำหนดวันหยุดนักขัตฤกษ์</span>
          </Link>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">กำหนดผู้ใช้งาน</span>
            <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">15</span>
          </a>
        </li>
        <li class="px-5">
          <div class="flex flex-row items-center h-8">
            <div class="text-sm font-light tracking-wide text-gray-500">Settings</div>
          </div>
        </li>
        <li>
          <Link href="/auth/profile" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">ข้อมูลส่วนตัว</span>
          </Link>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Settings</span>
          </a>
        </li>
        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <main className="w-full flex-1 p-4 ml-64">{children}</main>
</div>
  );
};

export default Admin;
