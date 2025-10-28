import React from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { FaBook, FaUsers, FaUserTie } from 'react-icons/fa'

function AdminHome() {
  return (
    <>
     <AdminHeader/>   
     <div className='md:grid grid-cols-[1fr_5fr] '>
        <div>
            <AdminSidebar/>
        </div>
        <div className='p-5'>
            <div className='md:grid grid-cols-3 gap-3 p-5'>
                <div className='bg-blue-500 rounded text-white items-center
                 p-5 grid grid-cols-[1fr_3fr]'>
                  <FaBook className='text-4xl' />
                 <div>
                    <h1>Total number of books</h1>
                    <h1 className='font-medium'>10+</h1>
                 </div>
                </div>
                <div className='bg-orange-500 rounded text-white items-center
                 p-5 grid grid-cols-[1fr_3fr]'>
                  <FaUsers className='text-4xl' />
                  <div><h1>Total number of users</h1>
                    <h1 className='font-medium'>10+</h1>
                  </div>
                </div>
                <div className='bg-green-500 rounded text-white items-center
                 p-5 grid grid-cols-[1fr_3fr]'>
                  <FaUserTie className='text-4xl'/>
                 <div>
                    <h1>Total number of requests</h1>
                    <h1 className='font-medium'>10+</h1>
                 </div>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default AdminHome