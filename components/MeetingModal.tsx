'use client'

import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface MeetingModalProps {
    isOpen: boolean,
    onClose: () => void,
    children?: ReactNode,
    title: string,
    className?: string,
    buttonText: string,
    handleClick: () => void,
    image?:string , 
    buttonIcon?:string ,
}

const MeetingModal = ({ isOpen, onClose, children, title, className, buttonText, handleClick , image , buttonIcon }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen}  onOpenChange={onClose} >
            <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark1 px-7 py-10 text-white bg-black'>
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className='flex justify-center'>
                            <Image src={image} alt="image" width={72} height={72}/>
                        </div>
                    )} 
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                </div>
                {children}
                <Button className='bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0' onClick={handleClick}>
                    {buttonIcon && <Image src={buttonIcon} alt="button icon" width={13} height={13} />} &nbsp;
                    {buttonText || 'Schedule Meeting'}
                </Button>
            </DialogContent>
        </Dialog>

    )
}

export default MeetingModal