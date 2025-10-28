import React, { useState } from 'react'
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { googleloginApi, loginApi, registerApi } from '../../service/allApi';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
function Auth({ register }) {


  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({


    username: "",
    email: "",
    password: "",
    pro:""
  })
  console.log(userDetails);


  const handleRegister = async () => {
    const { username, email, password } = userDetails


    if (!username || !email || !password) {
      toast.info("fill the form completely")

    } else {

      const result = await registerApi(userDetails)
      console.log(result);

      if (result.status == 200) {
        toast.success("Registered successfully")
        setUserDetails({
          username: "",
          email: "",
          password: ""

        })
        navigate("/login")

      } else if (result.status == 406) {
        toast.warning(result.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""

        })

      } else {
        toast.error("something went wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })

      }


    }


  }


  const hanldeLogin = async () => {
    const { email, password } = userDetails


    if (!email || !password) {
      toast.info("fill the form completely")

    } else {
      const result = await loginApi(userDetails)
      console.log(result);

     

      if (result.status == 200) {
        toast.success("login successfully")
         sessionStorage.setItem("existinguser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)
        setUserDetails({

          email: "",
          password: ""
        })
        if (result.data.existingUser.email == "mhdrizwan456@gmail.com") {
          setTimeout(() => {
            navigate("/admin-books")
          }, 3000)

        } else {
          setTimeout(() => {
            navigate("/")
          }, 3000)
        }
      } else if (result.status == 406) {

        toast.warning(result.response.data)
        setUserDetails({

          email: "",
          password: ""

        })
      } else {

        toast.warning(result.response.data)


      }

    }
  }

  const handleGoogleLogin = async(credentialResponse)=>{
    // console.log(credentialResponse);
    const details =   jwtDecode(credentialResponse.credential)
    // console.log(details);
    const result = await googleloginApi({username:details.name,email:details.email,password:"googlepswd",profile:details.picture})
   console.log(result);

if (result.status == 200) {
        toast.success("login successfully")
         sessionStorage.setItem("existinguser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)
      setTimeout(() => {
            navigate("/")
          }, 3000)
        
      }
  }

  return (
    <>
      <div className='w-ful h-full bg-[url("https://png.pngtree.com/background/20230614/original/pngtree-an-old-book-with-flowers-next-to-it-picture-image_3523730.jpg")] flex justify-center items-center flex-col bg-cover bg-center '>

        <h1 className='text-4xl font-bold mt-5 text-white' >BOOK STORE</h1>
        <div className='md:grid grid-cols-3 w-full mt-10'>
          <div></div>
          <div>
            <form action="" className='bg-gray-900 p-10 rounded flex justify-center items-center flex-col w-full'>
              <div><HiOutlineUserCircle className='text-white text-8xl' /></div>
              {register ? <h1 className='text-white text-2xl'>Register</h1> :
                <h1 className='text-white text-2xl'>Login</h1>
              }

              {register && <div className='w-full my-4'>
                <label htmlFor="" className='text-white'>Username</label>
                <input type="text" placeholder='username' className='w-full bg-white rounded p-2' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} value={userDetails.username} />
              </div>}

              <div className='w-full my-4'>
                <label htmlFor="" className='text-white'>Email id</label>
                <input type="email" placeholder='Email Id' className='w-full bg-white rounded p-2' onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} value={userDetails.email} />
              </div>

              <div className='w-full my-4'>
                <label htmlFor="" className='text-white'>Password</label>
                <input type="text" placeholder='Password' className='w-full bg-white rounded p-2' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} value={userDetails.password} />
              </div>

              <div className='my-3 w-full'>
                {register ? <button type='button' className='w-full bg-green-700 p-2 rounded text-white hover:bg-green-800 mb-2 ' onClick={handleRegister}>Register</button> :
                  <button className='w-full bg-green-700 p-2 rounded text-white hover:bg-green-800 ' type='button' onClick={hanldeLogin}>Login</button>}
              </div>

              {!register && <div >
                <p className='text-white text-2xl'>................or.....................</p>
                <div className='my-3'>
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      // console.log(credentialResponse);
                      handleGoogleLogin(credentialResponse)
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                  />;


                </div>
              </div>}
              <div className='text-white'>
                {register ? <p>Are you a Already User? <Link to={"/login"} className='text-blue-400 underline'>LogIn</Link></p> :
                  <p>Are you a New User? <Link to={"/register"} className='text-blue-400 underline'>Register</Link></p>}
              </div>


            </form>
          </div>
          <div></div>
        </div>

      </div>









    </>

  )
}

export default Auth