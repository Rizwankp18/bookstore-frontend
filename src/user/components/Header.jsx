import React, { useContext, useEffect, useState } from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { serverUrl } from '../../service/ServerUrl';
import { userUpdateProfile } from '../../context/Context';

function Header() {
  const [clickStatus, setClickStatus] = useState(false)

  const [dropDownStatus, setDrpDownStatus] = useState(false)

  const [token, setToken] = useState("")
  const [userDetails, setUserDetails] = useState("")

  console.log(userDetails);
  const {userProfile}=useContext(userUpdateProfile)
  

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      setUserDetails(JSON.parse(sessionStorage.getItem("existinguser")).profile)

    }
  }, [userProfile])
  console.log(token);


  return (
    <>
      <div className='px-5 py-2 flex justify-between'>
        <div className='flex items-center gap-1'>
          <img className='w-[60px] h-[60px] ' src="https://openclipart.org/image/800px/275692" alt="" />
          <h1 className='md:hidden text-sm font-bold'>BOOK STORE</h1>
        </div>
        <div className='items-center ps-38'>
          <h1 className='pt-3 hidden md:flex text-2xl font-bold'>BOOK STORE</h1>
        </div>
        <div className='flex gap-6 items-center '>
          <div className='hidden md:flex gap-2 items-center '>
            <FaInstagram className='text-xl' />
            <FaSquareXTwitter className='text-xl' />
            <FaFacebookSquare className='text-xl' />
          </div>
          {!token ? <div className='hidden md:flex'>
            <Link to={"/login"}>
              <button className='border cursor-pointer flex items-center rounded px-3 py-1 gap-1'><FaRegUserCircle className='text-xl' />Login</button> </Link>
          </div>
            :
            <div className="hidden md:inline-block relative">
              <button onClick={() => setDrpDownStatus(!dropDownStatus)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                <img
                  className="w-8"
                  src={
                    userDetails == ""
                      ? "https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png"
                      : userDetails.startsWith("https")
                        ? userDetails
                        : `${serverUrl}/upload/${userDetails}`
                  } referrerPolicy='no-reference'
                  alt=""
                />
              </button>

              {dropDownStatus && <div anchor="bottom end" popover className="absolute z-50 w-56 origin-top-right right-0 rounded-md bg-gray-500 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">

                  <Link to={"/profile"}>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 focus:bg-white/5 focus:text-white focus:outline-hidden">Profile</a>

                  </Link>
                  <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-200 focus:bg-white/5 focus:text-white focus:outline-hidden">Sign out</button>

                </div>
              </div>}
            </div>}

        </div>
      </div>

      <nav className='bg-gray-900 py-4'>
        <div className='text-white  md:hidden flex justify-between items-center px-5'>
          <span onClick={() => setClickStatus(!clickStatus)}>
            <IoMenu className='text-2xl' />
          </span>

          {!token ? <Link to={"/login"}>
            <button className='border flex items-center rounded px-3 py-1 gap-1'><FaRegUserCircle className='text-xl' />Login</button> </Link>
            :
            <div className="inline-block relative">
              <button onClick={() => setDrpDownStatus(!dropDownStatus)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10  text-sm font-semibold text-white  hover:bg-white/20">
                <img className='w-8' src="https://www.tenforums.com/attachments/user-accounts-family-safety/322690d1615743307-user-account-image-log-user.png" alt="" />
              </button>

              {dropDownStatus && <div anchor="bottom end" popover className="absolute z-50 w-56 origin-top-right right-0 rounded-md bg-gray-500 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div className="py-1">

                  <Link to={"/profile"}>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-200 focus:bg-white/5 focus:text-white focus:outline-hidden">Profile</a>


                  </Link>
                  <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-200 focus:bg-white/5 focus:text-white focus:outline-hidden">Sign out</button>

                </div>
              </div>}
            </div>}
        </div>
        <ul className={clickStatus ? 'md:flex px-5 text-white' : ' hidden md:flex justify-center text-white gap-5 px-5'}>
          <Link to={"/"}><li>Home</li></Link>
          <Link to={"/allbook"}><li>Books</li></Link>
          <Link to={"/careers"}><li>Careers</li></Link>
          <Link to={"/contact"}><li>Contact</li></Link>
        </ul>
      </nav>
    </>
  )
}

export default Header