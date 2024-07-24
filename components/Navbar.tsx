import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


const Navbar = () => {
  return (
    <nav className='flex flex-row justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
      <Image src='/icons/Lumen_logo.svg' width={50} height={50} alt="Lumen Logo" className='max-sm:size-10'/>
      <p className='text-[26px] font-extrabold max-sm:hidden text-white px-5'>Lumen!</p>
      </Link>      
      <div className='flex flex-between gap-5'>
        <SignedIn>
          <UserButton appearance={{
            variables:{
              colorBackground:"white",
              colorText:"black",
            }
          }}/>
        </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar