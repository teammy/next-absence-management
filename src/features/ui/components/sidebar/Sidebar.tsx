import { useRouter } from 'next/router'
import React from 'react'
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout-context';
import { CollapseItems } from './collapse-items';
import { Avatar,Tooltip } from '@nextui-org/react';
import HomeIcon from '../icon/home-icon';
import AccountsIcon from '../icon/accounts-icon';
import SettingsIcon from '../icon/settings-icon';
import DashBoardIcon from '../icon/dashboard-icon';
import { UserIcon } from '../icon/user-icon';
import { ReportIcon } from '../icon/report-icon';
import { Noto_Sans_Thai } from 'next/font/google';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

const NotoSansThai = Noto_Sans_Thai({ subsets: ['thai'],variable: '--font-inter', })

export const Sidebar = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
     <>
      <DesktopSidebar />
      <MobileSidebar />
     </>
  );
};