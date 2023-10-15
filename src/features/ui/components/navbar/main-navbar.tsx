import { type ReactNode } from 'react';
import { Input, Navbar, Link, NavbarContent } from '@nextui-org/react';
import { SearchIcon } from '../icon/searchicon';
import UserDropdown  from './user-dropdown';
import { Noto_Sans_Thai } from 'next/font/google';
const NotoSansThai = Noto_Sans_Thai({ subsets: ['thai'],variable: '--font-inter', })

export interface NavbarProps {
  children: ReactNode;
}

const MainNavbar = ({ children }: NavbarProps) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className={`${NotoSansThai.variable} w-full`}
        classNames={{
          wrapper: 'w-full max-w-full',
        }}
      >
        <NavbarContent className='md:hidden'></NavbarContent>
        <NavbarContent className='w-full max-md:hidden'>
        <Input
            startContent={<SearchIcon />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent className='w-fit data-[justify=end]:flex-grow-0' justify='end'>
          </NavbarContent>
          <NavbarContent className='w-fit data-[justify=end]:flex-grow-0' justify='end'>
            <UserDropdown />
          </NavbarContent>
      </Navbar>
      {children}
    </div>

  );
}

export default MainNavbar;