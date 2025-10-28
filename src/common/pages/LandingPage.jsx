import React, { useEffect, useState } from 'react'
import Header from '../../user/components/Header'
import Footer from '../components/Footer'
import { getHomeBookApi } from '../../service/allApi'
import { Link } from 'react-router-dom'

function LandingPage() {
  const [allHomeBook,setAllHomeBook]=useState([])

const getBooks = async()=>{
const result = await getHomeBookApi()
setAllHomeBook(result.data)


}
console.log(allHomeBook);


useEffect (()=>{
  getBooks()
},[])


  return (

   <><Header/>

  <div
      className="h-[400px] bg-cover bg-center flex flex-col items-center justify-center "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000')",backgroundAttachment:"fixed"
      }}
    >
      <h1 className="text-4xl font-bold mb-2 text-black">Wonderful Gifts</h1>
      <p className="mb-6 text-black">Give your family and friends a book</p>

      <div className="flex items-center bg-white rounded-full px-4 py-2 w-80">
        <input
          type="text"
          placeholder="Search Books"
          className="flex px-2 py-1 rounded-full  text-black"
        />
        <button className="ms-5 text-blue-600 font-semibold">Search</button>
      </div>
    </div>





 <section className="py-16">
      <div className="flex flex-col items-center justify-center p-4 ">
       
        <div className="text-center mb-10">
          <p className="text-sm  text-gray-500">NEW ARRIVALS</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">
            Explore Our Latest Collection
          </h2>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {allHomeBook?.map((item)=>(<div className="rounded-2xl border border-gray-200 bg-white shadow-sm  hover:shadow-md transition-shadow w-80">
            <div className="relative  rounded-t-2xl bg-gray-100 ">
              <img
                src={item?.imgurl}
                alt={item?.title}
                className="w-full h-80"
              />
            </div>
            <div className="px-5 py-4 text-center">
              <h3 className="text-sm text-gray-800">
                { item?.title }
              </h3>
              <p className="mt-1 text-sm text-gray-500">₹{item?.price}</p>
            </div>
          </div>))  }

       
        
        </div>

       
        <div className="mt-10 flex justify-center">
          <Link to={"/allbook"}>
            <button
              type="button"
              className="inline-flex items-center rounded-xl border border-indigo-600 px-5 py-2.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Explore More
            </button>
          </Link>
        </div>
      </div>
    </section>




<section className="py-16">
  <div className="flex flex-col md:flex-row  justify-center items-center gap-20 p-6">
    
    <div className="max-w-xl">
      <p className="text-sm tracking-widest text-gray-500">
        FEATURED AUTHORS
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-gray-900">
        Captivates with every word
      </h2>
      <p className="mt-4 text-black text-justify">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga nostrum illum distinctio eum quidem recusandae soluta aliquam laboriosam odit quas, nam molestias fugiat culpa rem nulla iste? Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt earum possimus accusantium necessitatibus id neque soluta quibusdam explicabo laborum? Deserunt vel quia voluptates dicta incidunt illo fuga pariatur sequi error.
      </p>
      <p className="mt-4 text-black text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt fuga nostrum illum distinctio eum quidem recusandae soluta aliquam laboriosam odit quas, nam molestias fugiat culpa rem nulla iste? Modi, molestias. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt earum possimus accusantium necessitatibus id neque soluta quibusdam explicabo laborum? Deserunt vel quia voluptates dicta incidunt illo fuga pariatur sequi error.
      </p>
    </div>

    <div className="w-[400px] h-[350px] ms-20">
      <img
        src="https://img.freepik.com/free-photo/successful-businessman_1098-18155.jpg"
        alt="Author"
        className="rounded-lg shadow-md w-full h-full "
      />
    </div>

  </div>
</section>

<section className="py-12">
  <div className="flex flex-col items-center text-center px-6">
    
 
    <p className="text-sm  text-black-500">TESTIMONIALS</p>
    <h2 className="text-2xl font-semibold text-gray-900 mt-2">
      See What Others Are Saying
    </h2>

    <div className="mt-6 w-24 h-24">
      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Testimonial"
        className="rounded-full w-full h-full object-cover shadow-md"
      />
    </div>

    <p className="mt-3 text-lg font-medium text-gray-800">Treesa Joseph</p>

    <p className="mt-4 text-black md:w-250 w-150 text-left">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore perspiciatis porro eveniet. Optio necessitatibus provident autem, quam qui, dicta molestiae quis quia deleniti aliquam magnam temporibus mollitia ex repellendus! Dicta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, deserunt optio eum dolorum iure consectetur quia facilis porro modi placeat ea quis explicabo maxime voluptatum unde animi nemo aperiam quos!
    </p>
  </div>
</section>


<Footer/>


    

   
</>

   
  )
}

export default LandingPage