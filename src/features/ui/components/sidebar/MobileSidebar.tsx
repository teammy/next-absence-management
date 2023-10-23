import React, { useContext, useRef } from 'react'
// import { Transition, Backdrop } from '@roketid/windmill-react-ui'
import SidebarContext,{ SidebarProvider } from '~/features/context/SidebarContext';
import SidebarContent from './SidebarContent'
import localFont from 'next/font/local'
import clsx from 'clsx';
const mlpFont = localFont({ src: '../../../../../public/fonts/maledpan.woff2' })
const mlpFont_bold = localFont({ src: '../../../../../public/fonts/maledpan-bold.woff2' })



function MobileSidebar() {
  const sidebarRef = useRef(null)
  const { isSidebarOpen, closeSidebar, saveScroll } = useContext(SidebarContext)

  const linkClickedHandler = () => {
    saveScroll(sidebarRef.current)
  }

  return (
    <div></div>
    // <Transition show={isSidebarOpen}>
    //   <>
    //     <Transition
    //       enter="transition ease-in-out duration-150"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="transition ease-in-out duration-150"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <Backdrop onClick={closeSidebar} />
    //     </Transition>

    //     <Transition
    //       enter="transition ease-in-out duration-150"
    //       enterFrom="opacity-0 transform -translate-x-20"
    //       enterTo="opacity-100"
    //       leave="transition ease-in-out duration-150"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0 transform -translate-x-20"
    //     >
    //       <aside
    //         id="mobileSidebar"
    //         ref={sidebarRef}
    //         className="fixed inset-y-0 z-50 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 lg:hidden"
    //       >
    //         <SidebarContent linkClicked={linkClickedHandler} />
    //       </aside>
    //     </Transition>
    //   </>
    // </Transition>
  )
}

export default MobileSidebar