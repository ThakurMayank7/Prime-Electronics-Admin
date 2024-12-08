'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

function Header() {

    const pathname=usePathname();

    if(pathname=="/")
    {
        return null;
    }

  return (
    <div className='flex justify-center my-2'>
<Link className='bg-gray-900 text-white rounded p-2' href="/">Go to Home</Link>
    </div>
  )
}

export default Header