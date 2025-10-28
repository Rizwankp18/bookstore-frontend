import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { MdOutlineFileUpload, MdVerified } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import EditProfile from '../components/EditProfile'
import { toast } from 'react-toastify'
import { addBookApi, deleteUserBookApi, getUserAddedApi, getUserBookApi } from '../../service/allApi'
import { serverUrl } from '../../service/ServerUrl'
import { userUpdateProfile } from '../../context/Context'

function Profile() {
  
    const [userDetails,setUserDetails]=useState({
      username:"",
      bio:"",
      profile:""
    })
  
console.log(userDetails);
const {userProfile}=useContext(userUpdateProfile)

  const [sellbookStatus, setSellbookStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseStatus, setPurchaseStatus] = useState(false)
  const [bookDetails,setBookDetails]=useState({


    title:"",
    author:"",
    publisher:"",
    language:"",
    noofpages:"",
    isbn:"",
    imgurl:"",
    category:"",
    price:"",
    dprice:"",
    abstract:"",
    uploadImages:[]
  })
  const [preview,setPreview]=useState("")
  const [allUploadImage,setAllUploadImage]=useState([])
  const [token,setToken]=useState("")

  const [userBook,setUserBook]=useState()
  const [bookBroughtBy,setBookBroughtBy]=useState()
  const [deleteStatus, setDeleteStatus] = useState()
// console.log(bookDetails);
// console.log(token);


const handleUpload =(e)=>{
  console.log(e.target.files);

  const fileArray = bookDetails.uploadImages
  fileArray.push(e.target.files[0])
  setBookDetails({...bookDetails,uploadImages:fileArray})
  const url =URL.createObjectURL(e.target.files[0])
  setPreview(url)
  let images =allUploadImage
  images.push(url)
  setAllUploadImage(images)


}  

const handleReset =()=>{
  setBookDetails({
     title:"",
    author:"",
    publisher:"",
    language:"",
    noofpages:"",
    isbn:"",
    imgurl:"",
    category:"",
    price:"",
    dprice:"",
    abstract:"",
    uploadImages:[]

  })
  setAllUploadImage([])
  setPreview("")
}

const handleSubmit =async()=>{

  const {title,author,publisher,language,noofpages,isbn,imgurl,category,price,dprice,abstract,uploadImages}=bookDetails

  if ( !title || !author || !publisher || !language || !noofpages || !isbn || !imgurl || !category || !price || !dprice || !abstract || uploadImages.length==0) {
    toast.info("fill the form compeletely")
    
  }else{
// if there is upload content the data should be send in form data

const reqBoady = new FormData()
 for (let key in bookDetails) {
  if (key != "uploadImages") {
    reqBoady.append(key,bookDetails[key])
    
  }else{
    bookDetails.uploadImages.map((item)=>{
      reqBoady.append("uploadImages",item)
    })
  }
  
 }

 const reqHeader ={
  " Authorization" : `Bearer ${token}`
 }

 const result = await addBookApi(reqBoady,reqHeader)
 console.log(result);

 if (result.status == 200) {
         toast.success("Book Added successfully")
         setBookDetails({
            title:"",
    author:"",
    publisher:"",
    language:"",
    noofpages:"",
    isbn:"",
    imgurl:"",
    category:"",
    price:"",
    dprice:"",
    abstract:"",
    uploadImages:[]
 
         })
          setAllUploadImage([])
  setPreview("")
       
       } else if (result.status == 401) {
       
               toast.warning(result.response.data)
               setBookDetails({
            title:"",
    author:"",
    publisher:"",
    language:"",
    noofpages:"",
    isbn:"",
    imgurl:"",
    category:"",
    price:"",
    dprice:"",
    abstract:"",
    uploadImages:[]
 
         })
          setAllUploadImage([])
  setPreview("")
             }else{
              
                      toast.error("something went wrong")
                      setBookDetails({
            title:"",
    author:"",
    publisher:"",
    language:"",
    noofpages:"",
    isbn:"",
    imgurl:"",
    category:"",
    price:"",
    dprice:"",
    abstract:"",
    uploadImages:[]
 
         }) 
          setAllUploadImage([])
  setPreview("")
                    
             }
 

  }


 




}

// get user added books
const getUserAddedBook =async ()=>{

  const reqHeader ={
  " Authorization" : `Bearer ${token}`
 }
  const result = await getUserAddedApi(reqHeader)
  setUserBook(result.data)
  
}
// console.log(userBook);

const getAllUserBroughtBook = async () => {
    // create reqHeader
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getUserBookApi(reqHeader)
   
    setBookBroughtBy(result.data)


  }




const handledelete =async (id)=>{
const result = await deleteUserBookApi(id)
console.log(result);
setDeleteStatus(result.data)

}

useEffect(()=>{
  if (sessionStorage.getItem("token")) {
    setToken(sessionStorage.getItem("token"))
    if (bookStatus == true) {
      getUserAddedBook()
      
    }else if (purchaseStatus ==true) {
getAllUserBroughtBook()
      
    }else{
      console.log("something went wrong");
      
    }
  }
},[bookStatus,purchaseStatus,deleteStatus])

useEffect(()=>{
  if (sessionStorage.getItem("token")) {
    const user = JSON.parse(sessionStorage.getItem("existinguser"))
    setUserDetails({
      username:user.username,
      bio:user.bio,
      profile:user.profile
    })
  }
},[userProfile])


  return (
    <>
      <Header />
      <div className='bg-gray-950 h-50 w-full relative'>
        <div className='absolute -bottom-30 left-13 h-55 w-55 rounded-full'>
          <img className='h-50 w-50 rounded-full' src={userDetails.profile== "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zxzyummYsm9O3fTOnSIQW6W4P9anro97GQ&s": userDetails.profile?.startsWith("https")?userDetails.profile : `${serverUrl}/upload/${userDetails.profile}`} alt="" />
        </div>
      </div>

      <div className='pt-40 flex justify-between md:px-20 px-10 items-center'>
        <div className=' flex justify-center items-center gap-2 text-2xl'>
          <h1 className='text-3xl font-bold'>{userDetails?.username}</h1>
          <MdVerified className='text-cyan-600' />
        </div>
        <div>
          <EditProfile />
        </div>
      </div>
      <p className='px-10 md:px-20 my-3 text-lg'>{userDetails.bio == ""? "Hey I am a BookStore User!!!":userDetails.bio}</p>
      <div className='flex justify-center'>
        <button onClick={() => { setSellbookStatus(true); setBookStatus(false); setPurchaseStatus(false) }} className={sellbookStatus ? 'px-4 py-2 border-gray-300 border-l border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>Sell Book</button>
        <button onClick={() => { setSellbookStatus(false); setBookStatus(true); setPurchaseStatus(false) }} className={bookStatus ? 'px-4 py-2 border-gray-300 border-l border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>Book Status</button>
        <button onClick={() => { setSellbookStatus(false); setBookStatus(false); setPurchaseStatus(true) }} className={purchaseStatus ? 'px-4 py-2 border-gray-300 border-l border-t border-r text-xl' : 'px-4 py-2 border-gray-300 border-b text-xl'}>Purchase History</button>
      </div>

      {sellbookStatus && <div className='p-10'>
        <div className='m-5 bg-gray-400 min-h-fit p-5'>
          <h1 className='text-center text-3xl'>Book Details</h1>
          <div className='grid md:grid-cols-2 gap-4 '>
            <div className='p-10'>
              <input value={bookDetails.title} onChange={(e)=>setBookDetails({...bookDetails,title:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Title' />
              <input value={bookDetails.author} onChange={(e)=>setBookDetails({...bookDetails,author:e.target.value})} className='bg-white w-full p-2 rounded  mt-2' type="text" placeholder='Author' />
              <input value={bookDetails.noofpages} onChange={(e)=>setBookDetails({...bookDetails,noofpages:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='No. of Pages' />
              <input value={bookDetails.imgurl} onChange={(e)=>setBookDetails({...bookDetails,imgurl:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Image URL' />
              <input value={bookDetails.price} onChange={(e)=>setBookDetails({...bookDetails,price:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Price ' />
              <input value={bookDetails.dprice} onChange={(e)=>setBookDetails({...bookDetails,dprice:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Discount Price' />
              <textarea value={bookDetails.abstract} onChange={(e)=>setBookDetails({...bookDetails,abstract:e.target.value})} className='bg-white w-full p-2 rounded mt-2 h-30' name="" id="" placeholder='Abstract'></textarea>


            </div>
            <div className='p-10'>
              <input value={bookDetails.publisher} onChange={(e)=>setBookDetails({...bookDetails,publisher:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Publisher' />
              <input value={bookDetails.language} onChange={(e)=>setBookDetails({...bookDetails,language:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Language' />
              <input value={bookDetails.isbn} onChange={(e)=>setBookDetails({...bookDetails,isbn:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='ISBN' />
              <input value={bookDetails.category} onChange={(e)=>setBookDetails({...bookDetails,category:e.target.value})} className='bg-white w-full p-2 rounded mt-2' type="text" placeholder='Catogory' />

              <div className='flex justify-center items-center min-h-fit pt-10'>
                {!preview ?<label htmlFor="uploadbookimg">
                  <input onChange={(e)=>handleUpload(e)} type="file" className='hidden' name="" id="uploadbookimg" />
                  <img className='w-35' src="https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Image-Transparent-Free-PNG.png" alt="" />
                </label>
                :
                                <img className='w-35' src={preview} alt="" />

              }

              </div>
            { preview && <div className='flex justify-center mt-5 gap-4 items-center'>
              { allUploadImage.map((item)=>(<img className='w-10' src={item} alt="" />))    
               }
               {allUploadImage.length<3 && <label htmlFor="uploadbookimg">
                  <input type="file" onChange={(e)=>handleUpload(e)}  className='hidden' name="" id="uploadbookimg" />
                  <img className='w-10' src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-upload-file-line-vector-single-icon-png-image_5184453.jpg" alt="" />
                </label>}

              </div>
}

            </div>
          </div>
          <div className='flex justify-center gap-10'>
            <button type='button' onClick={handleReset} className='bg-red-600 hover:bg-red-500 text-white font-medium px-4 py-2 rounded'>Reset</button>
            <button type='button' onClick={handleSubmit} className='bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded'>Submit</button>
          </div>
        </div>
      </div>}
      {bookStatus &&
        <div className='p-10 space-y-5'>
          {!userBook?.lenght > 0 ?
            userBook?.map((item) => (
              <div className='bg-gray-400 min-h-fit py-10 px-15 grid md:grid-cols-[4fr_1fr] gap-4 p-5'>
                <div >
                  <h1>{item.title}</h1>
                  <p>{item.author} </p>
                  <p>{item.price}</p>
                  <p>{item.abstract}</p>
                  <div className='flex gap-5 pt-5'>
                    {item.status == "pending"?<img className='w-15' src="https://img.freepik.com/premium-vector/pending-rubber-stamp-design-art-illustration_969463-2349.jpg" alt="" />: item.status == "approve"?
                    <img className='w-15' src="https://kratombloom.com/wp-content/uploads/2023/09/1-600x600.png" alt="" />:
                    <img className='w-15' src="https://img.freepik.com/premium-vector/sold-icon-logo-vector-design-template_827767-4630.jpg" alt="" />}
                  </div>
                </div>
                <div className='items-center'>
                  <img src={item.imgurl} alt="" className='h-60 w-full items-center' />
                  <div className='flex justify-end'>
                    <button onClick={() => handledelete(item._id)} className='mt-5 text-white bg-red-600 px-3 py-2 rounded cursor-pointer hover:bg-red-500'>delete</button>
                  </div>
                </div>
              </div>
            ))

            :
                <h1 className='text-center text-black mask-b-from-20 text-2xl'>No Books Added Yet</h1>
              
            }

        </div>}
      {purchaseStatus && <div className='p-10'>
        {bookBroughtBy?.length > 0 ?
          <div className='flex flex-col gap-3' >
            {bookBroughtBy?.map((item) => (
              <div className='bg-gray-400 min-h-fit grid md:grid-cols-[4fr_1fr] gap-4 p-5'>
                <div >
                  <h1>{item.title}</h1>
                  <p>{item.author}</p>
                  <p>{item.price}</p>
                  <p>{item.abstract}</p>

                </div>
                <div className='items-center'>
                  <img src={item.imgUrl} alt="" className='h-50 w-40 items-center' />
                </div>
              </div>
            ))}




          </div>
          :
          <div className='flex justify-center pt-10'>
            <div>
              <img className='w-50' src="https://cdn.dribbble.com/userupload/19646652/file/original-b84277d6110f0722a534324ac2c977a8.gif" alt="" />
              <h1 className='text-center font-bold text-xl'>No Books Added Yet</h1>
            </div>
          </div>}
      </div>}

    </>
  )
}

export default Profile