import React from 'react'
import Header from '../components/Header'
import Footer from '../../common/components/Footer'

function Contact() {
  return (

    <>
    
    <Header/>
      <div>
        <div className='flex justify-center py-5'>
          <h1 className='text-3xl font-bold'>Contact</h1>
        </div>
        <div className='grid md:grid-cols-[1fr_5fr_1fr] px-8 '>
          <div></div>
          <div><p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis rem doloribus iure, eius nihil libero quod culpa voluptatum inventore commodi, at voluptatibus id excepturi nobis quasi enim dolorum ex sapiente eveniet incidunt cumque. Optio, ut! Nemo reiciendis ab sapiente repellendus molestias. Quisquam, harum? Reiciendis optio ducimus modi sapiente odio? Quos labore non expedita obcaecati minus sed, eius dolore molestias voluptatum voluptate temporibus officiis perspiciatis, et rem, soluta aut! Vel, quae! Soluta, placeat et? Laboriosam, sint veritatis, est cumque voluptas, doloremque consequatur architecto aliquam impedit eligendi dolorem laborum delectus quo animi quos veniam vitae doloribus suscipit ipsum sapiente dolore itaque iste?</p></div>
          <div></div>
        </div>

        <div className='grid md:grid-cols-5 gap-5 py-10 px-10'>
          <div></div>
          <div><h1>Office: 3rd Floor, Trident Complex, MG Road, Bangalore</h1></div>
          <div><h1>Email: hello@Bookstore.in</h1></div>
          <div><h1>Call us: +91 98765 43210</h1></div>
          <div></div>
        </div>
        <div className='md:grid md:grid-cols-[1fr_3fr_3fr_1fr] '>
          <div></div>
          <div className='p-5'>
            <div className='bg-slate-50 w-full h-full p-5 py-5'>
                    <h1 className='text-center py-10 font-medium text-xl'>Send a messege</h1>
                    <div className='px-10 space-y-3'>
                      <div>
                        <input type="text" placeholder='Name' className='px-3 py-1 bg-white outline-0 w-full' />
                      </div>
                       <div>
                        <input type="text" placeholder='Email' className='px-3 py-1 bg-white outline-0 w-full' />
                      </div>
                       <div>
                        <textarea name="" placeholder='Messege' className='bg-white outline-0 w-full px-3 h-full' id=""></textarea>
                      </div>
                      <div>
                        <button className='bg-violet-950 text-white w-full py-2'>
                          Send
                        </button>
                      </div>
                    </div>
            </div>
          </div>
          <div>
              <div className='p-5'>
                <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15717.194619637361!2d76.5741858203003!3d9.992170356403715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e76155bfb5c5%3A0x35505932c56948c4!2sIdly%20Shop!5e0!3m2!1sen!2sin!4v1756397988543!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
          </div>
          <div></div>
        </div>
      </div>
    <Footer/>

    </>

  )
}

export default Contact