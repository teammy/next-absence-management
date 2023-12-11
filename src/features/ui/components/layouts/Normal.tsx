import { useContext, type ReactNode } from 'react';
import Navbar from '../Navbar';
import Toast from '../Toast';
import AuthMenu from '~/features/auth/components/AuthMenu';
import ProtectedResource from '~/features/auth/guards/ProtectedResource';
// import { Sidebar } from '../sidebar/sidebar.styles';
import {Sidebar} from '../sidebar/Sidebar';
import SidebarContext,{ SidebarProvider } from '~/features/context/SidebarContext';
import Main from './Main';
import Header from './Header';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  const { isSidebarOpen } = useContext(SidebarContext)

  return (
    <SidebarProvider>
        <div
      className={`flex h-screen  dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
      >
      <div className="w-full flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
        <Main>
          {children}
        </Main>
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default Layout;
