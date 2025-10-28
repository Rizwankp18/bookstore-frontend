import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FaEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { FaCameraRetro } from "react-icons/fa6";
import { Link, useParams } from 'react-router-dom';
import { getABookApi } from '../../service/allApi';
import { serverUrl } from '../../service/ServerUrl';

function ViewBook() {
  const[modal,setModal]=useState(false)
  const [specificBook,setSpecificBook]=useState([])

const {id }= useParams()
console.log(id);


const getSpecificBook= async (id)=>{
   const result = await getABookApi(id)
   console.log(result);
   setSpecificBook(result.data)
   
}
console.log(specificBook);


useEffect(()=>{
  getSpecificBook(id)
},[])
  




  return (
<>
<Header/>



<div className='p-5 md:p-20'>
  <div className='shadow-lg w-full p-10'>
<div className='flex justify-end'><FaEye className='text-gray-500' onClick={()=>setModal(true)}/></div>
{specificBook?.map((item)=>(<div className="md:grid grid-cols-[1fr_3fr] w-full">


  <div><img src={item?.imgurl} alt={item?.title} className='w-full h-100' /></div>
  <div className='px-5 ' >
  <h1 className='text-center font-medium text-2xl '>{item?.title}</h1>
  <p className='text-blue-500 text-center'>-{item?.author}</p>
  
  <div className='md:flex justify-between mt-10'>
    <p className='mt-3 md:mt-0'>Publisher:{item?.publisher}</p>
    <p className='mt-3 md:mt-0'>Language : {item?.language}</p>
    <p className='mt-3 md:mt-0 '>No.of Pages : {item?.noofpages}</p>
  </div>
  <div className='md:flex justify-between  mt-4'>
    <p className='mt-3 md:mt-0'>seller Mail:{item?.userMail}</p>
    <p className='mt-3 md:mt-0 me-30'>real Price : ${item?.price}</p>
    <p className='mt-3 md:mt-0'>ISBN :{item?.isbn}</p>
  </div>
  <p className='mt-10 text-justify'>{item?.abstract}</p>
</div>




</div>))  }

<div className='mt-10 flex justify-end '>
 <Link to={"/allbook"}> <button className='px-4 py-3 flex justify-center items-center bg-blue-800 rounded text-white hover:bg-white hover:text-blue-800 hover:border  hover:border-blue-800 '><IoIosArrowRoundBack className='text-2xl' />Back</button></Link>
  <button className='px-4 py-3 ms-5 bg-green-800 rounded text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800'>Buy $</button>
</div>


  </div>

</div>
{/* modal */}{modal && <div id="dialog" aria-labelledby="dialog-title" className="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent">
    <div class="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"></div>

    <div tabindex="0" className="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all ">
        <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-white flex justify-between items-center ">
          <h1>Book Photos</h1>
          <MdOutlineCancel onClick={()=>setModal(false)} className='cursor-pointer'/>
        </div>
        <div className='p-3 bg-white ' >
          <div className='flex justify-baseline items-center'>
            <FaCameraRetro className='text-blue-400' />
            <h1 className='text-blue-400 ms-2'>Camera  click of the book in the hand of the seller</h1>
          </div>
          <div className='flex p-2'>
{specificBook?.map((book)=>book.uploadImages?.map((items,index)=>(<img key={index} src={`${serverUrl}/upload/${items.filename}`} width={200} alt=""  />)) ) }

          </div>

        </div>
        
      </div>
    </div>
  </div>}



</>





)
}

export default ViewBook