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
      className={clsx(mlpFont.className, "flex-shrink-0 hidden bg-white dark:bg-gray-800 lg:block border-r-1 border-gray-20 drop-shadow-lg z-50")}
      // className={mlpFont.className}
    >
      <SidebarContent linkClicked={linkClickedHandler} />
    </aside>
  )
}

export default DesktopSidebar