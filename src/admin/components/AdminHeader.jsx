import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {
    const navigate =useNavigate()
    const handleLogout = ()=>{
        sessionStorage.removeItem("existinguser")
        sessionStorage.removeItem("token")
        navigate("/")
    }
    return (
        <>
            <div className='flex items-center justify-between px-15 py-3'>
                <div className='flex items-center gap-1'>
                    <img className='w-[60px] h-[60px] ' src="https://openclipart.org/image/800px/275692" alt="" />
                    <h1 className='md:hidden text-sm font-bold'>BOOK STORE</h1>
                </div>
                <div className="py-1">
                    <button onClick={handleLogout}  type="button" className="block w-full px-4 py-2 text-left text-sm border-2 focus:bg-white/5 focus:text-white focus:outline-hidden">Sign out</button>
                </div>
            </div>
            <div className='bg-gray-600 text-white py-2 w-full text-center'>
                <p>Welcome, Admin! You're all set to manage and monitor the system. Let's go to work</p>
            </div>
        </>
    )
}

export default AdminHeader