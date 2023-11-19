import { useContext, useState } from 'react'
import SidebarContext from '~/features/context/SidebarContext'
import HomeIcon from '../icon/home-icon'
import { FiSearch } from 'react-icons/fi'
import { useSession, signOut } from 'next-auth/react';

// import { Avatar, Badge, Input, Dropdown, DropdownItem, WindmillContext } from '@roketid/windmill-react-ui'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User,Input} from "@nextui-org/react";

function Header() {
  // const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className="border-b-1 border-gray-200 z-40 py-4 bg-[#0050F0] shadow-bottom dark:bg-gray-800">
      <div className=" flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >

          {/* <HomeIcon className="w-6 h-6"  /> */}
        </button>
        {/* <!-- Search input --> */}

        <ul className="flex justify-end w-full">
          {/* <!-- Profile menu --> */}
          <li className="pr-5 text-white text-right">
            <p>วิทวัส หมายมั่น</p>
            <p>นักวิชาการคอมพิวเตอร์</p>
          </li>
          <li>
          <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">
            My Settings
          </DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">
            Analytics
          </DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header