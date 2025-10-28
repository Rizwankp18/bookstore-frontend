import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminHeader from '../components/AdminHeader'
import { ApproveAdminBookApi, getAdminBookApi, getAllUsersApi } from '../../service/allApi'

function AdminBooks() {

  const [bookliststatus, setBooklistStatus] = useState(true)
  const [userliststatus, setUserlistStatus] = useState(false)
  const [allBooks, setAllBooks] = useState()
  const [isBookApproved,setIsBookApproved]=useState(false)
  const [token,setToken]=useState()
  const [userData,setUserData] =useState()



const getAllBooks = async ()=>{
  const result = await getAdminBookApi ()
  setAllBooks(result.data)
  
}

const approveBook = async (id)=>{
 
  const result = await ApproveAdminBookApi(id)
  console.log(result);
  if (result.status == 200) {
    setIsBookApproved(!isBookApproved)
  }
  
}
 const getAllUsers = async (token)=>{
  const reqHeader ={
  " Authorization" : `Bearer ${token}`
 }
  const result = await getAllUsersApi(reqHeader)
  console.log(result);
  setUserData(result.data)
  
 }


useEffect(()=>{
  if (sessionStorage.getItem("token")) {
     const tok=sessionStorage.getItem("token")
     setToken(tok)
    if (bookliststatus == true) {
      getAllBooks()
      
    }else if (userliststatus == true) {
      getAllUsers(token)
      
    }else{
      console.log("something went wrong");
      
    }
}},[isBookApproved,userliststatus])


  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_5fr] '>
        <div>
          <AdminSidebar />
        </div>
        <div>
          <div className='py-5 pb-10'>
            <h1 className='text-2xl text-center'>All Books</h1>
          </div>
          <div className='flex justify-center'>
            <button onClick={() => { setBooklistStatus(true), setUserlistStatus(false) }} className={bookliststatus ? 'px-4 py-2 border-gray-300 border-l text-slate-400 border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>Book list</button>
            <button onClick={() => { setBooklistStatus(false), setUserlistStatus(true) }} className={userliststatus ? 'px-4 py-2 border-gray-300 border-l text-slate-400 border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>User</button>
          </div>

          {bookliststatus && <div className='p-10'>

            <div className='md:grid grid-cols-4 gap-3'>
              {allBooks?.length>0 ? allBooks?.map((item)=>( <div className='shadow-xl p-5'>
                <img className='min-h-90 w-full ' src={item?.imgurl} alt={item?.title} />
                <div className='py-3'>
                  <h1 className='text-center'>{item?.title}</h1>
                  <h1 className='text-center'>{item?.author}r</h1>
                  {item?.status == "pending" && <button type='button' onClick={()=>approveBook(item?._id)} className='w-full bg-green-600 text-white py-2'>Approved</button>}
                  {item?.status == "approve" &&<div className='flex justify-end'>
                    <img className='w-15' src="https://www.citypng.com/public/uploads/preview/red-round-approved-stamp-icon-701751694694779stinnvmcd3.png" alt="" />
                  </div>}
                </div>
              </div>)) : <p>loading......</p> }
            </div>
          </div>}
          {userliststatus && <div className='p-10'>
            <div class="container mx-auto p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {userData?.length>0?userData?.map((item)=>(<div class="bg-gray-100 p-4 rounded-l shadow-md flex items-center space-x-4">
                  <div class="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/9307/9307950.png" alt="" />
                  </div>
                  <div>
                    <p class="text-sm text-red-600">Id: {item?._id}</p>
                    <h2 class="text-lg font-semibold text-blue-600">{item?.username}</h2>
                    <p class="text-gray-700">{item?.email}</p>
                  </div>
                  </div>)) : <p> loading .....</p>  }
                  </div>
                </div>
                
              </div>}
           </div>
           </div>
    </>
  )
}

export default AdminBooks