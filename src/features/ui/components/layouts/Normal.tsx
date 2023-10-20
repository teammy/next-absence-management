import { useContext, type ReactNode } from 'react';
import Navbar from '../Navbar';
import Toast from '../Toast';
import AuthMenu from '~/features/auth/components/AuthMenu';
import ProtectedResource from '~/features/auth/guards/ProtectedResource';
import { Sidebar } from '../sidebar/sidebar.styles';
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
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
      >
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          {children}
        </Main>
      </div>
    </div>
      {/* <Navbar>
        <Navbar.Navbrand></Navbar.Navbrand>
        <ProtectedResource roles={['ADMIN', 'MANAGER']}>
          <Navbar.NavItem to="/admin">Admin</Navbar.NavItem>
        </ProtectedResource>
        <Navbar.NavItem to="/leaves">Leaves</Navbar.NavItem>
        <Navbar.NavItem to="/announcements">Announcements</Navbar.NavItem>
        <Navbar.NavItem to="/articles">Blog</Navbar.NavItem>
        <AuthMenu></AuthMenu>
      </Navbar>
      <main>{children}</main>
      <Toast></Toast> */}
    </SidebarProvider>
  );
};

export default Layout;
