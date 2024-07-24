'use client'

import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    let pathname = usePathname();
    return (
        <section className='w-full max-w-[264px] text-white'>
            <Sheet>
                <SheetTrigger asChild className='lg:hidden'>
                    <Image src="/icons/hamburger.svg" width={40} height={40} alt="open" />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-dark-1'>
                    <Link href='/' className='flex items-center gap-1'>
                        <Image src='/icons/logo.svg' width={32} height={32} alt="Lumen Logo" className='max-sm:size-10' />
                        <p className='text-[26px] font-extrabold text-white px-5'>Lumen!</p>
                    </Link>
                    <div className='flex flex-col justify-between  overflow-y-auto h-[calc(100vh-72px)]'>
                            <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((link) => {
                                    let isActive: boolean = pathname === link.route;
                                    return (
                                        <SheetClose asChild key={link.route}>
                                        <Link href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                                            'bg-green-500': isActive,
                                        })}>
                                            <Image src={link.imgUrl} alt={link.label} width={21} height={21} />
                                            <p className='font-semibold'>
                                                {link.label}
                                            </p>
                                        </Link></SheetClose>
                                    )
                                })}
                            </section>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav