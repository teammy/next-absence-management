import React,{ useState} from 'react'
import MainNavbar from '../navbar/main-navbar';
import { SidebarWrapper } from '../sidebar/sidebar';

import { type ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}



const LayoutNormal = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return <>
  <section className='flex'>
    <SidebarWrapper/>
    <MainNavbar>
    <main>
      {children}
    </main>
    </MainNavbar>
  </section>
   
    </>
}

export default LayoutNormal