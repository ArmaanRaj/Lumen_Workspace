'use client'

import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker'


const MeetingTypeList = () => {
    const { toast } = useToast()
    const router = useRouter()
    const [meetingState, setmeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | undefined | 'isInstantMeeting'>()
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    })
    const [link , setLink] = useState('');
    const [callDetails, setcallDetails] = useState<Call>()

    const createMeeting = async () => {
        if (!user || !client) return;
        try {
            if (!values.dateTime) {
                toast({ title: "please select a date and time" });
                return;
            }
            //generate random id 
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create call');
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting';
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            });
            setcallDetails(call);
            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast({
                title: "Created meeting successfully",
            })
        } catch (error) {
            toast({
                title: "Failed to create meeting",
                variant: "destructive",
            })
        }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard img='icons/add-meeting.svg' title="Create Meeting" desc="Start a new meeting" handleClick={() => {
                setmeetingState('isInstantMeeting')
            }} className="bg-orange-600" />
            <HomeCard img='icons/schedule.svg' title="Schedule Meeting" desc="Schedule a meeting for future" handleClick={() => {
                setmeetingState('isScheduleMeeting')
            }} className="bg-green-600" />
            <HomeCard img='icons/recordings.svg' title="View Recordings" desc="See your recordings" handleClick={() => {
                router.push('/recordings')
            }} className="bg-yellow-700" />
            <HomeCard img='icons/join-meeting.svg' title="Join Meeting" desc="Join an existing meeting" handleClick={() => {
                setmeetingState('isJoiningMeeting')
            }} className="bg-purple-700" />

            {!callDetails ? (<MeetingModal isOpen={meetingState === 'isScheduleMeeting'} onClose={() => {
                setmeetingState(undefined)
            }} title="Schedule Meeting"
                className="text-center"
                buttonText="Create a future meeting"
                handleClick={createMeeting}>
                <div className="flex flex-col gap-2.5">
                    <label className='text-base text-normal leading-[22px]'>Add a description</label>
                    <Textarea className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => { setValues({ ...values, description: e.target.value }) }} />
                </div>
                <div className="flex w-full flex-col gap-2.5">
                    <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date and Time</label>
                    <ReactDatePicker
                        selected={values.dateTime}
                        onChange={(date) => setValues({ ...values, dateTime: date! })}
                        showTimeSelect
                        timeFormat='HH::mm'
                        timeIntervals={15}
                        timeCaption='time'
                        dateFormat='MMMM d,yyyy h:mm aa'
                        className='w-full rounded bg-dark-3 p-2 focus:outline-none text-black'
                    />
                </div>
            </MeetingModal>) : (<MeetingModal isOpen={meetingState === 'isScheduleMeeting'} onClose={() => {
                setmeetingState(undefined)
            }} title="Meeting Created"
                className="text-center"
                handleClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({
                        title: "Meeting Link Copied",
                    })
                }} image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                buttonText='Copy Meeting Link'
                />)}
            <MeetingModal isOpen={meetingState === 'isInstantMeeting'} onClose={() => {
                setmeetingState(undefined)
            }} title="Start Your Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting} />
            <MeetingModal isOpen={meetingState === 'isJoiningMeeting'} onClose={() => {
                setmeetingState(undefined)
            }}
                title="Paste meeting link"
                className="text-center"
                buttonText="Join meeting"
                handleClick={()=>{
                    let auxStr = link; 
                    let strTobeRemoved = process.env.NEXT_PUBLIC_BASE_URL
                    auxStr = auxStr.replace(strTobeRemoved! , "");
                    setLink(auxStr)
                    router.push(link);
                }}
            >
                <Textarea className='border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>{
                    setLink(e.target.value);
                }} />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList