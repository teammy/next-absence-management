import { useRouter } from 'next/router'
import React from 'react'
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout-context';
import { CollapseItems } from './collapse-items';
import { Avatar,Tooltip } from '@nextui-org/react';
import { Sidebar } from './sidebar.styles';
import HomeIcon from '../icon/home-icon';
import AccountsIcon from '../icon/accounts-icon';
import SettingsIcon from '../icon/settings-icon';
import DashBoardIcon from '../icon/dashboard-icon';
import { UserIcon } from '../icon/user-icon';
import { ReportIcon } from '../icon/report-icon';
import { Noto_Sans_Thai } from 'next/font/google';
const NotoSansThai = Noto_Sans_Thai({ subsets: ['thai'],variable: '--font-inter', })

export const SidebarWrapper = () => {
  const router = useRouter();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
     <aside className="h-screen z-[202] sticky top-0" >
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          {/* <CompaniesDropdown /> */}
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={router.pathname === "/"}
              href="/"
            />
              <SidebarItem
              title="Dashboard"
              icon={<DashBoardIcon />}
              isActive={router.pathname === "/"}
              href="/"
            />
            <SidebarMenu title="เมนูหลัก">
              <SidebarItem
                isActive={router.pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="accounts"
              />
              {/* <SidebarItem
                isActive={router.pathname === "/payments"}
                title="Payments"
                icon={<PaymentsIcon />}
              />
              <CollapseItems
                icon={<BalanceIcon />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
              <SidebarItem
                isActive={router.pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              />
              <SidebarItem
                isActive={router.pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="ตั้งค่าทั่วไป">
              <SidebarItem
                isActive={router.pathname === "/settings"}
                title="ผู้ใช้งาน"
                icon={<UserIcon />}
              />
              <SidebarItem
              isActive={router.pathname === "/settings"}
              title="กำหนดวันหยุด"
              icon={<UserIcon />}
            />
              <SidebarItem
                isActive={router.pathname === "/settings"}
                title="รายงาน"
                icon={<ReportIcon />}
              />
            </SidebarMenu>

          
          </div>
        </div>
      </div>
    </aside>
  );
};