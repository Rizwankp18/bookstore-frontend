import React, { useContext, useEffect, useState } from 'react'
import { IoIosSettings, IoMdHome } from 'react-icons/io'
import { IoBookSharp } from 'react-icons/io5'
import { RiGraduationCapFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../service/ServerUrl'
import { adminUpdateProfile } from '../../context/Context'

function AdminSidebar() {

    const [homestatus, setHomestatus] = useState(false)
    const [bookstatus, setBookstatus] = useState(false)
    const [careerstatus, setCareerstatus] = useState(false)
    const [settingstatus, setSettingstatus] = useState(false)
    const [userDetails,setUserDetails]=useState({
        profile:"",
        username:""
    })

console.log(userDetails);
const {adminProfile}=useContext(adminUpdateProfile)
    const navigate = useNavigate()

    const filter = (data) => {
        if (data == "Home") {
            navigate("/admin-home")
        } else if (data == "Books") {
            navigate("/admin-books")
        } else if (data == "Careers") {
            navigate("/admin-career")
        } else if (data == "Settings") {
            navigate("/admin-setting")
        }
    }




    useEffect(() => {
        if (location.pathname == "/admin-home") {
            setHomestatus(true)
        } else if (location.pathname == "/admin-books") {
            setBookstatus(true)
        } else if (location.pathname == "/admin-career") {
            setCareerstatus(true)
        } else if (location.pathname == "/admin-setting") {
            setSettingstatus(true)
        }
    }, [])

    useEffect(()=>{
        if (sessionStorage.getItem("existinguser")) {
            let user = JSON.parse(sessionStorage.getItem("existinguser"))
            setUserDetails({profile:user.profile,username:user.username})
            
        }
    },[adminProfile])

    return (
        <>
            <div className='bg-gray-200 w-full md:min-h-screen flex flex-col items-center'>
                <div className='pt-20'>
                    <img className='w-40 h-40 rounded-full' src={userDetails?.profile ==""?  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4T7YnB82RY0QT67bgUvocJPW6Ndb2EfCyBQ&s": `${serverUrl}/upload/${userDetails.profile}`} alt="" />
                </div>
                <h1 className='text-3xl mt-10 font-medium'>{userDetails?.username}</h1>
                <div className='mt-5 flex flex-col gap-2'>
                    <div className='flex gap-1 items-center' onClick={() => filter("Home")} >
                        <input id='Home' type="radio" checked={homestatus} readOnly />
                        <label className='flex gap-1 items-center' htmlFor="Home"><span className='text-m'><IoMdHome /></span> Home</label>
                    </div>
                    <div className='flex gap-1 items-center' onClick={() => filter("Books")}>
                        <input id='Books' type="radio" checked={bookstatus} readOnly />
                        <label className='flex gap-1 items-center' htmlFor="Books"><span className='text-m'><IoBookSharp /></span> Books</label>
                    </div>
                    <div className='flex gap-1 items-center' onClick={() => filter("Careers")}>
                        <input id='Careers' type="radio" checked={careerstatus} readOnly />
                        <label className='flex gap-1 items-center' htmlFor="Careers"><span className='text-m'><RiGraduationCapFill /></span> Careers</label>
                    </div>
                    <div className='flex gap-1 items-center' onClick={() => filter("Settings")}>
                        <input id='Settings' type="radio" checked={settingstatus} readOnly />
                        <label className='flex gap-1 items-center' htmlFor="Settings"><span className='text-m'><IoIosSettings /></span> Settings</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSidebar