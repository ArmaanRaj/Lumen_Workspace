import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React , {ReactNode} from 'react'


const HomeLayout = ({children} : {children: ReactNode}) => {
  return (
    <main className='relative'> 
    <Navbar/>
      <div className="flex flex-row">
        <Sidebar/>
        <section className='flex min-h-screen flex-1 flex-col px-7 pb-7 pt-27 mt-28 max-md:pb-15 sm:px-14'>
            <div className="w-full">
                {children}
            </div>
        </section>
      </div>
    </main>
  )
}

export default HomeLayout