import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../common/components/Footer'
import { FaLocationDot } from "react-icons/fa6";
import { MdCancel } from 'react-icons/md';
import { HiCamera } from 'react-icons/hi';
import { addApplicationAPI, getAllJobApi } from '../../service/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Careers() {
  const [token,seToken]=useState()
    const [searchKey,setSearchKey]=useState("")
  
  const navigate =useNavigate()
  const [application,setApplication]=useState({
       jobTitle: "",
      fullname: "",
      qualification: "",
      email: "",
      phone: "",
      coverletter: "",
      resume: ""
  
    })
    const [allJobs,setAllJobs]=useState()
  
   const [modelStatus, setModalStatus] = useState(false)
   const getAllJob = async ()=>{
    const result = await getAllJobApi(searchKey)
    console.log(result);
    setAllJobs(result.data)
    
  }

  const openModal = (title)=>{
    
    setModalStatus(true)
    setApplication({...application,jobTitle:title})

  }

 const addApplication = async () => {
    const { jobTitle, fullname, qualification, email, phone, coverletter, resume } = application
    if (!token) {
      toast.info("Pleasse Login First")
      navigate("/login")
    } else if (!jobTitle || !fullname || !qualification || !email || !phone || !coverletter || !resume) {
      toast.info("Fill the Form Completly")
    } else {
      // create reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      const reqBody = new FormData()

      for(let key in application){
        reqBody.append(key,application[key])
      
      }
      console.log(reqBody);
      

      const result = await addApplicationAPI(reqBody,reqHeader)
      console.log(result);
      // console.log(result.status);
      if (result.status == 200) {
        toast.success("Job Applied SuccessFully") 
        handleReset()
        setModalStatus(false)
      } else if (result.response.status == 401){
         toast.info("already applied")
         handleReset()
      }else{
        toast.error("Something Went Wrong")
        handleReset()
      }
      
    }
  }
 const handleReset = () => {
    setApplication({
      
      fullname: "",
      qualification: "",
      email: "",
      phone: "",
      coverletter: "",
      resume: ""
    })
    // modern browser wont allow to set value to file input box empty directly so
    document.getElementById("fileinput").value = ""
  }




  useEffect(()=>{
    getAllJob()
  },[searchKey])
   useEffect(() => {
    if (sessionStorage.getItem("token")) {
      seToken(sessionStorage.getItem("token"))
    }
  })

  return (
    <>
      <Header />
      <div className='grid grid-cols-[1fr_4fr_1fr] mt-10 '>
        <div></div>
        <div className='space-y-2'>
          <h1 className='text-center font-bold text-2xl'>Careers</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus quod facilis amet autem nihil tenetur similique ea tempore accusamus officia quis, totam minus eius sit, consectetur, enim reprehenderit corporis ullam?</p>
        </div>
        <div></div>
      </div>
      <h1 className='text-center md:text-start md:px-15 font-bold text-xl mt-15'>Current Openings</h1>
      <div className='px-15 py-10 grid md:grid-cols-3 '>
        <div></div>
        <div className='flex justify-between bg-white border rounded'>
          <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='py-2  ps-5 outline-0 w-full' placeholder='Search by title ' />
          <button  className='bg-green-600 px-4 rounded m-1 text-white'>Search</button>
        </div>
        <div></div>
      </div>
      <div className='md:grid grid-cols-[1fr_3fr_1fr] my-10 px-5  '>
        <div></div>
        <div className='grid grid-rows-3 gap-5'>
          {allJobs?.length>0 ? allJobs?.map((item)=>(<div className='p-5 shadow rounded'>
            <div className='grid grid-cols-[8fr_1fr] gap-5'>
              <div>
                <h1 className='text-2xl font-medium'>{item?.jobTitle}</h1> <hr />
              </div>
              <div>
                <button onClick={() => openModal(item?.jobTitle)} className='bg-blue-500 text-white px-2 py-1  rounded'>Apply</button>
              </div>
            </div>
            <div className='px-4 py-2 space-y-1'>
              <h1 className='text-blue-700 flex items-center gap-1'><FaLocationDot />{item?.jobLocation} </h1>
              <h1>Job Type : {item?.jobType} </h1>
              <h1>Salary : {item?.salary} </h1>
              <h1>Qualification : {item?.qualification} </h1>
              <h1>Experiance : {item?.experience} years</h1>
              <h1>Description: {item?.description}</h1>
            </div>
          </div>)) : <h1>no jobs yet .....</h1> }
        </div>
        <div></div>
        {modelStatus && <div>
          <div id="div" aria-labelledby="div-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
            <div className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

            <div tabindex="0" className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                <div className=" bg-slate-800  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className='flex items-center justify-between text-white '>
                    <h1>Application Form</h1>
                    <MdCancel className='cursor-pointer' onClick={() => setModalStatus(false)} />
                  </div>
                </div>
                <div className='px-4 py-1'>
                  <div className='md:grid grid-cols-2 py-4'>
                    <div className='space-y-1'>
                      <input value={application.fullname} onChange={(e) => setApplication({ ...application, fullname: e.target.value })} className='px-2 py-1 bg-slate-50 inset-shadow-2xs outline-0' type="text" placeholder='Full Name' />
                      <input  value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })}  className='px-2 py-1 bg-slate-50 inset-shadow-2xs outline-0' type="text" placeholder='Email' />
                    </div>
                    <div className='space-y-1'>
                      <input  value={application.qualification} onChange={(e) => setApplication({ ...application, qualification: e.target.value })} className='px-2 py-1 bg-slate-50 inset-shadow-2xs outline-0' type="text" placeholder='Qualification' />
                      <input  value={application.phone} onChange={(e) => setApplication({ ...application, phone: e.target.value })} className='px-2 py-1 bg-slate-50 inset-shadow-2xs outline-0' type="text" placeholder='Phone' />
                    </div>
                  </div>
                  <div className='pt-2'>
                    <textarea  value={application.coverletter} onChange={(e) => setApplication({ ...application, coverletter: e.target.value })} className='px-2 py-1 bg-slate-50 inset-shadow-2xs outline-0 w-full'  name="" placeholder='Cover Letter' id=""></textarea>
                  </div>
                  <div className=' items-center min-h-fit py-2'>
                    <label  htmlFor="">Upload Resume</label>
                   <div> <input onChange={(e) => setApplication({ ...application, resume: e.target.files[0] })} className='inset-shadow-2xs rounded text-sm file:px-5 file:bg-slate-500 file:text-white file:py-1 bg-slate-50' type="file" /></div>
                  </div>
                  <div className='flex justify-end pb-2 gap-2'>
                    <button onClick={addApplication} className='bg-green-700 text-white px-2 py-1 rounded'>Apply</button>
                    <button type='button' onClick={handleReset} className='bg-red-700   text-white px-2 py-1 rounded'>Reset</button>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
      <Footer/>
    </>
  )

}

export default Careers