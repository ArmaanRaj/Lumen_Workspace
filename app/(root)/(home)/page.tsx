'use client'

import React, { useEffect, useState } from 'react'
import Meeting from '../meeting/[id]/page';
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';

const Home = () => {
  const {upcomingCalls} = useGetCalls(); 
  const [showTime, setShowTime] = useState('');
  useEffect(()=>{
    setShowTime(upcomingCalls[0]?.state.startsAt?.toString()!);
  } , )
  let now:Date = new Date();
  let time = now.toLocaleTimeString('en-US' ,{hour:'2-digit', minute:'2-digit'});
  let date = now.toLocaleDateString();
  return (
    <section className='flex flex-col size-full gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {/* <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base'>{`Upcoming Meeting at: ${showTime}`}</h2> */}
          <div className="flex flex-col gap-2">
            <h1 className='font-semibold text-4xl lg:7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl' >{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home