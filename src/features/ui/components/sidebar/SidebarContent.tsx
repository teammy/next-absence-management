import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import * as Icons from '../icon/iconList'

// import * as Icons from '../../icons'
// import SidebarSubmenu from './SidebarSubmenu'
// import { Button } from '@windmill/react-ui'
import { Button } from '@nextui-org/react'

type IconProps = {
  icon: keyof typeof Icons;
  className?: any;
}

function Icon({ icon, ...props }: IconProps) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'หน้าหลัก', // name that appear in Sidebar
  },
  {
    path: '/app/forms',
    icon: 'UserIcon',
    name: 'ข้อมูลบุคคล',
  },
  {
    path: '/leaves',
    icon: 'BeachIcon',
    name: 'ข้อมูลการลา',
  },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  // {
  //   icon: 'PagesIcon',
  //   name: 'Pages',
  //   routes: [
  //     // submenu
  //     {
  //       path: '/login',
  //       name: 'Login',
  //     },
  //     {
  //       path: '/create-account',
  //       name: 'Create account',
  //     },
  //     {
  //       path: '/forgot-password',
  //       name: 'Forgot password',
  //     },
  //     {
  //       path: '/app/404',
  //       name: '404',
  //     },
  //     {
  //       path: '/app/blank',
  //       name: 'Blank',
  //     },
  //   ],
  // },
]

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#">
        Windmill
      </a>
      <ul className="mt-6">
        {routes.map((route:any) =>
          route.routes ? (
            // <SidebarSubmenu route={route} key={route.name} />
            <div>Sub Menu</div>
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <Link
                href={route.path}
                className="inline-flex items-center w-full text-lg font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                // activeClassName="text-gray-800 dark:text-gray-100"
              >
                <span className='w-6 h-6'>
                <Icon  icon={route.icon} />
                </span>
                <span className="ml-4">{route.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" >
            +
          </span>
        </Button>
      </div>
    </div>
  )
}

export default SidebarContent
