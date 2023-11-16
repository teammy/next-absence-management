import React, { useContext, useRef } from 'react'
// import SidebarContext from 'context/SidebarContext'
import SidebarContent from './SidebarContent'
import SidebarContext,{ SidebarProvider } from '~/features/context/SidebarContext';
import localFont from 'next/font/local'
import clsx from 'clsx';
const mlpFont = localFont({ src: '../../../../../public/fonts/maledpan.woff2' })
const mlpFont_bold = localFont({ src: '../../../../../public/fonts/maledpan-bold.woff2' })


function DesktopSidebar() {
  const sidebarRef = useRef(null)
  const { saveScroll } = useContext(SidebarContext)

  const linkClickedHandler = () => {
    saveScroll(sidebarRef.current)
  }

  return (
    <aside
      id="desktopSidebar"
      ref={sidebarRef}
      className={clsx(mlpFont.className, "z-30 flex-shrink-0 hidden overflow-y-auto bg-[#373F45] dark:bg-gray-800 lg:block border-grey-200 border-r-1")}
      // className={mlpFont.className}
    >
      <SidebarContent linkClicked={linkClickedHandler} />
    </aside>
  )
}

export default DesktopSidebar