import Image from 'next/image'
import React from 'react'

const Touch = () => {
  return (
    <div>

           <div className='flex justify-between md:flex-row flex-col'>
              <div className='md:w-[650px] md:h-[485px] md:p-16 p-10 w-[400px] font-light'>
                <h4 className='md:text-2xl text-xl'>From a studio in London to a global brand with over 400 outlets</h4>
                <br />
                <p className='md:text-xl text-sm'>When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. 
                  <br />
                  <br />
                  Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>

                  <button className='mt-16 bg-[#F9F9F9] pt-4 pb-4 pr-8 pl-8'>Get In Touch</button>

              </div>


              <div className='flex md:w-[650px] md:h-[500px] w-[350px]'>
                <Image
                 src="/images/room.jpeg"
                 alt="room"
                 width={400}
                 height={100}
                 className='w-full h-full object-cover'
                />
              </div>
           </div>


    </div>
  )
}

export default Touch;
