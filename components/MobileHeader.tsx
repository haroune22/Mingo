import React from 'react'
import { MobileSideBar } from './MobileSideBar'

export const MobileHeader = () => {
  return (
    <nav className='lg:hidden px-4 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50'>
        <MobileSideBar />
    </nav>
  )
}
