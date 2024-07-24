'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from '@/components/ui/use-toast'
import { useGetCallById } from '@/hooks/useGetCallById'
import { Call, descending, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useRouter } from 'next/navigation'


const Table = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className='flex flex-col items-start gap-2 cl:flex-row'>
      <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}:</h1>
      <h1 className='truncate text-medium font-bold max-sm:max-w-[320px] lg:text-xl'>{description}</h1>
    </div>
  )
}



const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`;
  const { toast } = useToast()
  const {call} = useGetCallById(meetingId!);
  const client = useStreamVideoClient();
  const router = useRouter();


  const startRoom = async () => {
    if(!client || !user) return ; 
    if(!call){
      const newCall = client.call('default' , meetingId!);
      await newCall.getOrCreate({
        data:{
          starts_at : new Date().toISOString(),
        }
      })
      try{
        router.push(`/meeting/${newCall.id}`);
      }
      catch(error){
        toast({
          title: "Cannot start meeting",
        })
      }
    }
    else{
      try{
        router.push(`/meeting/${call.id}`);
      }
      catch(error){
        toast({
          title: "Cannot start meeting",
        })
      }
    }
  }

  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        Personal Room
      </h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.fullName}'s Meeting Room`} />
        <Table title="Meeting ID" description={`${meetingId}`} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className='bg-blue-600' onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className='bg-green-400' onClick={() => {
          navigator.clipboard.writeText(meetingLink);
          toast({
            title: "Link Copied",
          })
        }}>
          Copy Meeting Link
        </Button>
      </div>
    </section>
  )
}

export default PersonalRoom