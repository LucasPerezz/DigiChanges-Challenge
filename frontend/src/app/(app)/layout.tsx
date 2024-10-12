import Navbar from '@/components/ui/Navbar'
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
  }

export default function layout({children} : LayoutProps) {
  return (
    <div className='flex flex-col gap-3'>
        <Navbar />
        {children}
    </div>
  )
}
