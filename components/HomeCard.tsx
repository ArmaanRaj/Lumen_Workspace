import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'


interface HomeCardProps{
    img:string,
    title:string,
    desc:string,
    handleClick :()=>void,
    className:string
}

const HomeCard = ({img , title , desc , handleClick , className} : HomeCardProps) => {
    return (
        <div className={cn(' px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[270px] rounded-[14px] cursor-pointer' , className)} onClick={handleClick}>
            <div className='flex-center glassmorphism size-12 rounded-[10px]'>
                <Image src={img} alt={title} width={27} height={27} />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className='font-semibold text-3xl'>{title}</h1>
                <p className='text-lg font-medium'>{desc}</p>
            </div>
        </div>
    )
}

export default HomeCard