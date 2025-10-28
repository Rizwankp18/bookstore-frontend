import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


function Footer() {
  return (
    <>
       {/* footer */}
      <footer className="  bg-gray-900  grid md:grid-cols-3 gap-10 md:gap-5 px-10 md:px-15 py-10 ">
        <div className='flex justify-center'>
          <div className='text-white space-y-2 '>
            <h1 className='uppercase text-center md:text-start font-bold'>About Us</h1>
            <p className='font-light text-center md:text-start'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni voluptatem doloribus laborum alias ipsum? Consectetur iure e in sit perspiciatis. Molestias atque facere commodi quaerat illum quod optio adipisci deleniti alias!</p>
          </div>
        </div>

       <div className='flex justify-center'>
          <div className='space-y-3'>
            <h1 className='uppercase text-white font-bold'>newsletter</h1>
            <p className='font-light text-white'>Stay updated with our latest trends</p>
            <div className='bg-white rounded flex justify-end'>
              <input className='rounded bg-white py-1 outline-0 uppercase' placeholder='email id' type="text" />
              <button className='bg-red-500 px-2 rounded-e text-white'>Submit</button>
              </div>
          </div>
       </div>

        <div className='flex justify-center'>
          <div className='space-y-2 text-white'>
            <h1 className='uppercase font-bold'>follow us</h1>
            <p className='font-light'>Let us be social</p>
            <div className='flex gap-2 text-2xl'>
              <FaInstagram />
              <FaFacebookSquare />
              <FaLinkedin />
              <FaSquareXTwitter />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer