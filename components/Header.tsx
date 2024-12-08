'use client';

import Link from 'next/link';
import React from 'react'

function Header() {
  return (
    <div className='flex justify-center my-2'>
<Link className='bg-gray-900 text-white rounded p-2' href="/">Go to Home</Link>
    </div>
  )
}

export default Header