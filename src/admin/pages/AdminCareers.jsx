import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { MdCancel } from 'react-icons/md'
import { toast } from 'react-toastify'
import { addJobApi, deleteJobApi, getAllApplicationApi, getAllJobApi } from '../../service/allApi'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../service/ServerUrl'

function AdminCareers() {
  // 
  
const [applicationDetails,setApplicationDetails]=useState([])
  const [searchKey,setSearchKey]=useState("")
  const [jobPostStatus, setJobPostStatus] = useState(true)
  const [viewApplicationStatus, setViewApplicationStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [token,setToken]=useState()
  const [allJobs,setAllJobs]=useState()
  const [jobDetails,setJobDetails]=useState({
    jobTitle:"",
    jobLocation:"",
    jobType:"",
    salary:"",
    qualification:"",
    experience:"",
    description:""
  })
  console.log(jobDetails);

  const handleAdd =async ()=>{
    const { jobTitle,
    jobLocation,
    jobType,
    salary,
    qualification,
    experience,
    description} = jobDetails

    if (!jobTitle||!jobLocation||!jobType||!salary||!qualification||!experience||!description) {
      toast.info("fill the form")
    }else{
      const reqHeader ={
  " Authorization" : `Bearer ${token}`
 }

      const result = await addJobApi(jobDetails,reqHeader)
      // console.log(result);
      if (result.status == 200) {
        getAllJob()
        toast.success("job added successfully")
        setJobDetails({
           jobTitle:"",
    jobLocation:"",
    jobType:"",
    salary:"",
    qualification:"",
    experience:"",
    description:""
        })
        
      }else if (result.status == 401) {
        toast.warning("job added already")
        setJobDetails({
           jobTitle:"",
    jobLocation:"",
    jobType:"",
    salary:"",
    qualification:"",
    experience:"",
    description:""
        })
        setModalStatus(false)
        
      }else{
        toast.error("something went wrong")
        setJobDetails({
           jobTitle:"",
    jobLocation:"",
    jobType:"",
    salary:"",
    qualification:"",
    experience:"",
    description:""
        })
      }
    }
      
  } 
 const handleReset = ()=>{
  setJobDetails({
           jobTitle:"",
    jobLocation:"",
    jobType:"",
    salary:"",
    qualification:"",
    experience:"",
    description:""
        })
 }

const getAllJob = async ()=>{
  const result = await getAllJobApi(searchKey)
  console.log(result);
  setAllJobs(result.data)
  
}


const handleDelete= async (id)=>{
  getAllJob()
  const result = await deleteJobApi(id)
  console.log(result);
  
}

// get all application

const getAllApplication = async ()=>{
  try {
    const result = await getAllApplicationApi()
  console.log(result);
  setApplicationDetails(result.data)
  
    
  } catch (error) {
    console.log("something went wrong");
    
  }
}

useEffect(()=>{
    getAllJob()
    
   if (sessionStorage.getItem("token")) {
     const tok=sessionStorage.getItem("token")
     setToken(tok)}
     if (viewApplicationStatus == true) {
      getAllApplication()
      
    }
   
},[searchKey,viewApplicationStatus])
  
  
  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_5fr] '>
        <div>
          <AdminSidebar />
        </div>
        <div>
          <div className='py-5 pb-10'>
            <h1 className='text-2xl text-center'>Careers</h1>
          </div>
          <div className='flex justify-center'>
            <button onClick={() => { setJobPostStatus(true), setViewApplicationStatus(false) }} className={jobPostStatus ? 'px-4 py-2 border-gray-300 border-l text-slate-400 border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>Job Post</button>
            <button onClick={() => { setJobPostStatus(false), setViewApplicationStatus(true) }} className={viewApplicationStatus ? 'px-4 py-2 border-gray-300 border-l text-slate-400 border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>View Applicant</button>
          </div>
          {jobPostStatus && <div className='p-10'>

            <div className='md:flex space-y-5 justify-between'>
              <div className='shadow rounded border-2 max-w-fit flex '>
                <input onChange={(e)=>setSearchKey(e.target.value)} placeholder='Search by Title' className='bg-slate-50 outline-0 inset-shadow-2xs px-2' type="text" />
                <button className='px-2 py-1 bg-blue-900 hover:bg-blue-800 text-white'>search</button>
              </div>
              <div>
                <button onClick={() => setModalStatus(true)} className='px-2 py-1 border border-green-600 bg-green-600 text-white hover:bg-white hover:text-green-600 rounded'>Add Job +</button>
              </div>
            </div>
           <div className='md:px-20 py-5 px-5'>
               {allJobs?.length>0? allJobs?.map((item)=>(<div className='shadow border border-gray-200 mt-4'>
                <div className='md:grid grid-cols-[8fr_1fr] '>
                    <div className='p-4 md:ps-4 py-3'>
                    <h1 className='text-xl pb-3'>{item?.jobTitle}</h1>
                    <hr />
                    <h1 className='pt-2'>{item?.jobLocation}</h1>
                    <h1 className='pt-2'>Job Type : {item?.jobType}</h1>
                    <h1 className='pt-2'>Salary : {item?.salary}</h1>
                    <h1 className='pt-2'>Qualification : {item?.qualification}</h1>
                    <h1 className='pt-2'>Experience : {item?.experience}</h1>
                    <p className='pt-2'>Description : {item?.description}</p>
                  </div>
                  <div className='p-4 md:px-3 md:pt-5'>
                    <button type='button' onClick={()=>handleDelete(item._id)} className='px-2 rounded py-1 bg-red-500 text-white hover:bg-white hover:text-red-500 border border-red-500'>Delete</button>
                  </div>
                </div>
              </div>)) :
              <p className='text-2xl'>No Job Added</p>}
            </div>
            <div>
              {/* modal */}
              {modalStatus && <div id="div" aria-labelledby="div-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
                <div className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

                <div tabindex="0" className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
                  <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                    <div className=" bg-slate-800  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className='flex items-center justify-between text-white '>
                        <h1>Book Store</h1>
                        <button onClick={() => setModalStatus(false)}><MdCancel className='cursor-pointer' /></button>
                      </div>
                    </div>

                    <div className='px-5 py-4'>
                      <div className=''>
                        <input onChange={(e)=>setJobDetails({...jobDetails,jobTitle:e.target.value})} value={jobDetails.jobTitle} placeholder='Job Title' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                      <div className='mt-2'>
                        <input onChange={(e)=>setJobDetails({...jobDetails,jobLocation:e.target.value})} value={jobDetails.jobLocation} placeholder='Location' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                      <div className='mt-2'>
                        <input onChange={(e)=>setJobDetails({...jobDetails,jobType:e.target.value})} value={jobDetails.jobType} placeholder='Job Type' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                      <div className='mt-2'>
                        <input onChange={(e)=>setJobDetails({...jobDetails,salary:e.target.value})} value={jobDetails.salary} placeholder='Salary' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                      <div className='mt-2'>
                        <input onChange={(e)=>setJobDetails({...jobDetails,qualification:e.target.value})} value={jobDetails.qualification} placeholder='Qualification' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                      <div className='mt-2'>
                        <input onChange={(e)=>setJobDetails({...jobDetails,experience:e.target.value})} value={jobDetails.experience} placeholder='Experience' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                      <div className='mt-2'>
                        <textarea onChange={(e)=>setJobDetails({...jobDetails,description:e.target.value})} value={jobDetails.description} placeholder='Description' type="text" className='border outline-0 px-2 py-1 rounded w-full' />
                      </div>
                    </div>
                    <div className='h-15 px-4 py-3 flex justify-end gap-3 bg-slate-100'>
                      <button onClick={handleReset} className='px-3 py-1 rounded bg-amber-500 text-white font-medium'>Reset</button>
                      <button type='button' onClick={handleAdd} className='px-3 py-1 rounded bg-green-500 text-white font-medium'>Add</button>
                    </div>

                  </div>
                </div>
              </div>}
            </div>

          </div>}
          {viewApplicationStatus && <div className=''>
            <div className='p-10 w-full overflow-x-auto'>
             {applicationDetails?.length>0 ? <table>
              <thead className='shadow w-full my-3'>
                <tr>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>SL</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Job Title</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Name</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Qualification</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Email</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Phone</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Cover letter</th>
                  <th className='p-3 text-center bg-blue-800 border border-gray-500'>Resume</th>
                </tr>
              </thead>
              {applicationDetails?.map((item,index)=>(<tbody>
                <td className='p-3 border border-gray-500'>{index+1}</td>
                <td className='p-3 border border-gray-500'>{item?.jobTitle} </td>
                <td className='p-3 border border-gray-500'>{item?.fullname} </td>
                <td className='p-3 border border-gray-500'>{item?.qualification} </td>
                <td className='p-3 border border-gray-500'>{item?.email} </td>
                <td className='p-3 border border-gray-500'>{item?.phone} </td>
                <td className='p-3 border border-gray-500'>{item?.coverletter} </td>
                <td className='p-3 border border-gray-500 text-blue-500 underline' ><Link target='_blank' to={`${serverUrl}/pdfupload/${item?.resume}`}>Resume</Link></td>
              </tbody>)) }
             </table>:
             <p className='mt-5 text-red-600'>No Application Yet......</p>}
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default AdminCareers