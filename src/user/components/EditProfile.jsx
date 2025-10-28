import React, { useContext, useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { serverUrl } from '../../service/ServerUrl'
import { toast } from 'react-toastify'
import { editProfileApi } from '../../service/allApi'
import { userUpdateProfile } from '../../context/contextShare'

function EditProfile() {
  const [token,settoken]=useState("")
const [preview,setPreview]=useState("")
  const [offCanvasStatus,setOffCanvasStatus] = useState(false)
    const [userDetails,setUserDetails]=useState({
        username:"",
        bio:"",
        profile:"",
        password:"",
        confirmPassword:""
      })
      const [existingProfile,setExistingProfile]=useState("")

      // console.log(userDetails);
      // console.log(existingProfile);
      
const {setUserProfile}= useContext(userUpdateProfile)


const handleUpload = (e)=>{
setUserDetails({...userDetails,profile:e.target.files[0]})
if (e.target.files[0] != "") {
  const url = URL.createObjectURL(e.target.files[0])
setPreview(url)  
  
}

}



const handleSubmit = async ()=>{

const {username,password,confirmPassword,bio}=userDetails



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
      for (let key in userDetails) {
        if (key != "confirmPassword") {
        reqBody.append(key,userDetails[key])
          
        }
      }
const result = await editProfileApi(reqBody,reqHeader)
console.log(result);
if (result.status == 200) {
  toast.success("profile updated successfully")
  sessionStorage.setItem("existinguser",JSON.stringify(result.data))
  setOffCanvasStatus(false)
  setUserProfile(result)
  
}else{
  toast.error("something went wrong")
}


    }else{
      const result = await editProfileApi({username,password,profile:existingProfile,bio},reqHeader)
console.log(result);
if (result.status == 200) {
  toast.success("profile updated successfully")
  sessionStorage.setItem("existinguser",JSON.stringify(result.data))
  setOffCanvasStatus(false)
  setUserProfile(result)
  
}else{
  toast.error("something went wrong")
}


    }
  }
}


}




const handleReset = ()=>{
  if (sessionStorage.getItem("token")) {
    settoken(sessionStorage.getItem("token"))
    const user = JSON.parse(sessionStorage.getItem("existinguser"))
    setUserDetails({...userDetails,
      username:user.username,
      bio:user.bio,
      password:user.password,
      confirmPassword:user.password

    })
    setExistingProfile(user.profile)
  }
  setPreview("")

}

      


useEffect(()=>{
  if (sessionStorage.getItem("token")) {
    settoken(sessionStorage.getItem("token"))
    const user = JSON.parse(sessionStorage.getItem("existinguser"))
    setUserDetails({...userDetails,
      username:user.username,
      bio:user.bio,
      password:user.password,
      confirmPassword:user.password

    })
    setExistingProfile(user.profile)
  }
},[])



  return (
    <>
      <div>
        <button onClick={()=>setOffCanvasStatus(true)} className='px-3 py-2 border-2 flex items-center gap-1 rounded font-bold border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'><CiEdit className='text-2xl' /> Edit</button>
      </div>

     {offCanvasStatus && <div>

        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className='bg-white h-full w-100 z-50 fixed top-0 left-0'>
          <div className="flex items-center bg-gray-900 p-4 text-white justify-between">
            <h1 className='text-2xl'>Edit User Profile</h1>
           <button onClick={()=>setOffCanvasStatus(false)} className='cursor-pointer'> <IoMdClose className='text-2xl' /></button>
          </div>
          <div className="mb-8 py-5 flex justify-center items-center">
            <label htmlFor="editUserProfile">
              <input onChange={(e)=>handleUpload(e)} type="file" style={{ display: 'none' }} id='editUserProfile' />
              {existingProfile == "" ?<img src={preview? preview:"https://cdn-icons-png.flaticon.com/512/149/149071.png" }alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }}  /> :
               existingProfile.startsWith("https") ?
             <img src={preview?preview :existingProfile} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }}  />
             :
             <img src={preview?preview :`${serverUrl}/upload/${existingProfile}`} alt="no image" style={{ width: '200px', height: '200px', borderRadius: '50%' }}  />
              
              }
              <div style={{ marginLeft: '130px', marginTop: '-40px' }}></div>
            </label>
          </div>
          <div className='px-4'>

            <div className="mb-3">
              <input value={userDetails?.username} onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}  type="text" placeholder='Username' className='p-2 w-full bg-white border border-gray-200 rounded' />
            </div>
            {userDetails.password != "googlepswd"  && <div className="mb-3">
              <input value={userDetails?.password} onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}   type="text" placeholder='Password' className='p-2 w-full bg-white border border-gray-200 rounded' />
            </div>}
           {userDetails.password != "googlepswd"  && <div className="mb-3">
              <input value={userDetails?.confirmPassword} onChange={(e)=>setUserDetails({...userDetails,confirmPassword:e.target.value})}   type="text" placeholder='Confirm Password' className='p-2 w-full bg-white border border-gray-200 rounded' />
            </div>}
            <div className="mb-3">
              <textarea value={userDetails?.bio} onChange={(e)=>setUserDetails({...userDetails,bio:e.target.value})}   placeholder='Bio' className='p-2 w-full bg-white border border-gray-200 rounded' rows={6} ></textarea>
            </div>

            <div className="flex justify-end my-5">
              <button onClick={handleReset} type='button' className='bg-amber-700 text-white px-5 py-3 rounded hover:border hover:border-amber-700 hover:text-amber-700 hover:bg-white'>Reset</button>
              <button onClick={handleSubmit} type='button' className='bg-green-700 text-white px-5 py-3 rounded hover:border hover:border-green-700 hover:text-green-700 hover:bg-white ms-4' >Update</button>
            </div>
          </div>

        </div>
      </div>}

    </>
  )
}

export default EditProfile