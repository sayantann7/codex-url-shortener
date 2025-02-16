"use client"
import React from 'react'
import Link from 'next/link'
import { UserButton, useUser } from '@clerk/nextjs'

function Navbar() {
  const { isSignedIn } = useUser();
  return (
    <div className='flex justify-between items-center p-4 bg-blue-500 text-white'>
        <Link href="/"><h1 className='text-2xl'>URL Shortener</h1></Link>
        <div className='flex space-x-4'>
            {!isSignedIn && (
              <>
                <Link href='/signup'><button className='bg-white text-black rounded-lg p-2'>Signup</button></Link>
                <Link href='/login'><button className='bg-white text-black rounded-lg p-2'>Login</button></Link>
              </>
            )}
            {isSignedIn && <UserButton />}
        </div>
    </div>
  )
}

export default Navbar