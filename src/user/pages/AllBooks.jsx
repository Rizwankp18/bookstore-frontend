import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../common/components/Footer'
import { data, Link } from 'react-router-dom'
import { getUserBookApi } from '../../service/allApi'

function AllBook() {
    const [token,setToken]=useState("")
    const [allBook,setAllBook]=useState([])
    const [searchKey, setSearchKey] = useState("")
    const[tempoArray, setTempoArray] = useState([])
    // console.log(searchKey);
    
  

const getAllBook = async (token,searchKey)=>{
const reqHeader ={
  " Authorization" : `Bearer ${token}`
 }

  const result = await getUserBookApi(reqHeader,searchKey)
  console.log(result);
  setAllBook(result.data)
  setTempoArray(result.data)
  
}
const Filter =(data)=>{
  if (data == "nofilter") {
    setAllBook(tempoArray)
    
  }else{
    setAllBook(tempoArray.filter((item)=>item.category.toLowerCase()==data.toLowerCase()))
  }
}


 useEffect(()=>{
   if (sessionStorage.getItem("token")) {
     const tok=sessionStorage.getItem("token")
     setToken(tok)
     getAllBook(tok,searchKey)
   }
 },[searchKey])
 

  return (
   <>
   <Header/>
<h1 className='mt-10 text-center text-3xl'>Collections</h1>
<div className='md:grid grid-cols-3 mb-10 px-5'>
  <div></div>
<div className='flex'>
  <input type="text" onChange={(e)=>setSearchKey(e.target.value)}  placeholder='search by tittle...' className='border border-gray-200 w-full p-2'/>
  <button className='bg-blue-900 px-4  py-3 text-white '>Search</button>
  
</div>
<div></div>
</div>

{token ?<div className='md:grid grid-cols-[1fr_4fr] md:px-10 px-5 mb-10'>

<div><h1 className='text-2xl font-medium '>Filter</h1>
<div onClick={()=>Filter('fiction') }  className='md:flex my-3 flex-row'>
<input type="radio" name='filter' id='fiction'/>
<label htmlFor="Literary fiction" className='ps-2'>fiction</label>

</div>
<div onClick={()=>Filter('Finance') } className='flex my-3'>
<input type="radio" name='filter' id='Finance'/>
<label htmlFor="Philosophy" className='ps-2'>Finance</label>

</div>
<div onClick={()=>Filter('Motivation') } className='flex my-3'>
<input type="radio" name='filter' id='Motivation'/>
<label htmlFor="Romance" className='ps-2'>Motivation</label>

</div>
<div onClick={()=>Filter('Mystery/Thriller') } className='flex my-3'>
<input type="radio" name='filter' id='Mystery/Thriller'/>
<label htmlFor="Mystery/Thriller" className='ps-2'>Mystery/Thriller</label>

</div>
<div onClick={()=>Filter('Horror') } className='flex my-3'>
<input type="radio" name='filter' id='Horror'/>
<label htmlFor="Horror" className='ps-2'>Horror</label>

</div>
<div onClick={()=>Filter('Auto/biography') } className='flex my-3'>
<input type="radio" name='filter' id='Auto/biography'/>
<label htmlFor="Auto/biography" className='ps-2'>Auto/biography</label>

</div>
<div onClick={()=>Filter('Self-Help') } className='flex my-3'>
<input type="radio" name='filter' id='Self-Help'/>
<label htmlFor="Self-Help" className='ps-2'>Self-Help</label>

</div>
<div onClick={()=>Filter('Politics') } className='flex my-3'>
<input type="radio" name='filter' id='Politics'/>
<label htmlFor="Politics" className='ps-2'>Politics</label>

</div>
<div onClick={()=>Filter('Fantasy') } className='flex my-3'>
<input type="radio" name='filter' id='Fantasy'/>
<label htmlFor="Fantasy" className='ps-2'>Fantasy</label>

</div>
<div onClick={()=>Filter('nofilter') } className='flex my-3'>
<input type="radio" name='filter' id='nofilter'/>
<label htmlFor="nofilter" className='ps-2'>no filter</label>

</div>



</div>
<div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
         {allBook?.map((item)=>(<div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative overflow-hidden rounded-t-2xl bg-gray-100">
              <img
                src={item?.imgurl}
                alt={item?.title}
                className="w-full h-80"
              />
            </div>
            <div className="px-5 py-4 text-center">
              <h3 className="text-sm text-gray-800">
                { item?.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">₹{item?.price}</p>
             <Link to={`/viewbook/${item?._id} `}> <button className='bg-blue-800 w-full p-2 text-white my-3 hover:bg-blue-900'>View Book</button></Link>
            </div>
          </div>)) 
}
       
         

       
         

          
        </div>
        </div>


</div>
:
<div ><h1 className='text-center text-2xl'>Please <Link to={"/login"}><span className='text-blue-600'>login </span></Link>to see the books</h1></div>}

<br /><br /><br /><br /><br /><br />
   <Footer/>
   
   </>
  
  )
}

export default AllBook