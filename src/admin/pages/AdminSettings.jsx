import React, { useContext, useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { MdOutlineModeEdit } from 'react-icons/md'
import { serverUrl } from '../../service/ServerUrl'
import { toast } from 'react-toastify'
import { editProfileApi } from '../../service/allApi'
import { adminUpdateProfile } from '../../context/contextShare'

function AdminSettings() {
  const [preview,setPreview]=useState("")
  const [adminDetails,setAdminDetails]=useState({
    username:"",
    password:"",
    confirmPassword:"",
    profile:""
  })
  // console.log(adminDetails);
  
const [token,setToken]=useState("")
const [existingProfile,setExistingProfile]=useState("")
const {setAdminProfile}= useContext(adminUpdateProfile)


const handleUpload = (e)=>{
setAdminDetails({...adminDetails,profile:e.target.files[0]})
if (e.target.files[0] != "") {
  const url = URL.createObjectURL(e.target.files[0])
setPreview(url)  
  
}

}



const handleSubmit = async ()=>{

const {username,password,confirmPassword}=adminDetails



if (!username || !password || !confirmPassword) {
  toast.info("fill the form completely")
}else{
  if (password != confirmPassword) {
    toast.warning("password must match")
  }else{
    const reqHeader ={
  " Authorization" : `Bearer ${token}`
 }
    if (preview) {

      const reqBody = new FormData()
      for (let key in adminDetails) {
        if (key != "confirmPassword") {
        reqBody.append(key,adminDetails[key])
          
        }
      }
const result = await editProfileApi(reqBody,reqHeader)
console.log(result);
if (result.status == 200) {
  toast.success("profile updated successfully")
  sessionStorage.setItem("existinguser",JSON.stringify(result.data))
  setAdminProfile(result)
  
}else{
  toast.error("something went wrong")
}


    }else{
      const result = await editProfileApi({username,password,profile:existingProfile,bio:""},reqHeader)
console.log(result);
if (result.status == 200) {
  toast.success("profile updated successfully")
  sessionStorage.setItem("existinguser",JSON.stringify(result.data))
  setAdminProfile(result)
  
}else{
  toast.error("something went wrong")
}


    }
  }
}


}



const handleReset = ()=>{
  let user = JSON.parse(sessionStorage.getItem("existinguser"))
    setAdminDetails({...adminDetails,username:user.username,password:user.password,confirmPassword:user.password})
    setExistingProfile(user.profile)
    setPreview("")
}


useEffect(()=>{
if (sessionStorage.getItem("token")) {
  const tok = sessionStorage.getItem("token")
    setToken(tok)
    let user = JSON.parse(sessionStorage.getItem("existinguser"))
    setAdminDetails({...adminDetails,username:user.username,password:user.password,confirmPassword:user.password})
    setExistingProfile(user.profile)
  
}
},[])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_5fr] '>
        <div>
          <AdminSidebar />
        </div>
        <div className='p-5'>
          <h1 className='text-3xl font-semibold text-center'>Settings</h1>
          <div className='md:grid grid-cols-2 gap-10 px-10 mt-4 '>
            <div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium porro dignissimos atque iure harum, est placeat cum cumque dicta nisi delectus, iusto hic culpa inventore. Temporibus suscipit saepe unde eligendi illo soluta cumque nostrum exercitationem cupiditate! Tenetur, unde deserunt rem error obcaecati, architecto asperiores quas in neque ut saepe sapiente possimus. Voluptatem dicta amet eum dolore nisi! Non nisi atque debitis veritatis error, asperiores itaque mollitia quaerat quis, nihil dolore maxime libero laudantium ratione recusandae dolores hic iste at suscipit. Accusantium sit voluptatibus animi necessitatibus amet perspiciatis dolore porro, consequatur non quis excepturi saepe velit cum, eligendi cumque recusandae explicabo.</p>
            </div>
            <div>
              <div className='bg-slate-500 rounded w-full min-h-fit py-15'>
                <div className='flex justify-center pb-10'>
                  <label htmlFor="upload">
                    <div className='relative'>
                      <input className='hidden' type="file" name="avatar" id="upload"onChange={(e)=>handleUpload(e)}
                       
                      />
                      {existingProfile == "" ? <img

                        className='w-24 h-24 rounded-full'
                        src={preview?preview:"https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-upload-cloud-vector-icon-png-image_1027251.jpg"}
                        alt="Upload Avatar"
                      /> :
                    <img

                        className='w-24 h-24 rounded-full'
                        src={preview?preview:`${serverUrl}/upload/${existingProfile}`}
                        alt="Upload Avatar"
                      />
                    
                    
                    }
                      <button type="button" className='px-2 py-2 bg-amber-300 text-white rounded absolute bottom-0 right-0' onClick={() => document.getElementById('upload').click()}><MdOutlineModeEdit /></button>
                    </div>
                  </label>
                </div>
                <div className='flex flex-col gap-2 justify-center px-10'>
                  <input value={adminDetails?.username} onChange={(e)=>setAdminDetails({...adminDetails,username:e.target.value})} placeholder='Username' type="text" className='bg-white w-full py-1 outline-0 px-2 rounded' />
                  <input value={adminDetails?.password} onChange={(e)=>setAdminDetails({...adminDetails,password:e.target.value})} placeholder='password' type="text" className='bg-white w-full py-1 outline-0 px-2 rounded' />
                  <input value={adminDetails?.confirmPassword} onChange={(e)=>setAdminDetails({...adminDetails,confirmPassword:e.target.value})} placeholder='confirm password' type="text" className='bg-white w-full py-1 outline-0 px-2 rounded' />
                </div>
                <div className='flex justify-between px-10 gap-5 pt-10'>
                  <button type='button' onClick={handleReset} className='px-4 py-2 text-white bg-amber-600 rounded w-full cursor-pointer hover:bg-amber-500'>Reset</button>
                  <button type='button' onClick={handleSubmit} className='px-4 py-2 text-white bg-green-600 rounded w-full cursor-pointer hover:bg-green-500'>Submit</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSettings