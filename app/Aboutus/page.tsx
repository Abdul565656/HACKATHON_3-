import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import MobileNavbar from '../components/MobileNavbar';
import Image from 'next/image';
import Hero2 from '../components/Hero2';
import Club from '../components/Club';
import Footer from '../components/Footer';
import Link from 'next/link';
const page = () => {
  return (
    <div>
         {/* Top Header */}
            <nav className="flex justify-center items-center bg-[#2A254B] text-white p-2">
                     <TbTruckDelivery />
                     <h4 className="text-sm md:text-base">
                        Free delivery on all orders over £50 with code easter checkout
                     </h4>
            </nav>


         {/* Navbar */}
         <nav className='flex justify-between items-center p-4'>
            
            <div className='ml-12'>
                <h3 className='text-2xl'>Avion</h3>
            </div>
            <div className='hidden md:block space-x-3 mr-12'>
            <ul className='flex space-x-8 text-gray-600 cursor-pointer'>
                <li className="hover:text-gray-800 cursor-pointer">About us</li>
                <li className="hover:text-gray-800 cursor-pointer">Contact</li>
                <li className="hover:text-gray-800 cursor-pointer">Blog</li>
                <li><FiSearch className="w-5 h-5 cursor-pointer" /></li>
                <li><FiShoppingCart className="w-5 h-5 cursor-pointer" /></li>
                <li><IoMdContact className="w-5 h-5 cursor-pointer" /></li>
                <li><MobileNavbar /></li>
            </ul> 
            </div>
            <div className='md:hidden sm:block mr-8'>
            <MobileNavbar />
            </div>
        </nav>
             {/* Only Mobile Navbar */}
             <div className='md:hidden'>
            <ul className='flex justify-center items-center space-x-6 text-gray-600'>
                <li>All Products</li>
                <li>Plants Pots</li>
                <li>Ceramics</li>
                <li>Tables</li>
            </ul>
            </div>
                      
                      {/* Only Large Screen Navbar  */}
        <div className='hidden md:block'>
                 <ul className="flex  justify-center items-center space-x-11 p-6 text-gray-600 text-sm ">
                    <li className="hover:text-gray-800 cursor-pointer">All Products</li>
                    <li className="hover:text-gray-800 cursor-pointer">Crockery</li>
                    <li className="hover:text-gray-800 cursor-pointer">Plant pots</li>
                    <li className="hover:text-gray-800 cursor-pointer">Ceramics</li>
                    <li className="hover:text-gray-800 cursor-pointer">Tables</li>
                    <li className="hover:text-gray-800 cursor-pointer">Chairs</li>
                    <li className="hover:text-gray-800 cursor-pointer">Tableware</li>
                    <li className="hover:text-gray-800 cursor-pointer">Cutlery</li>
                 </ul>
             </div>



             {/* Hero Section 1 */}
             <div className='flex items-center justify-between md:p-16 md:flex-row flex-col p-8'>
                <div>
                    <h1 className='md:text-4xl text-3xl font-thin'>A brand built on the love of craftmanship, <br />
                    quality and outstanding customer service</h1>
                </div>
                <div>
                   <Link href='/SeeAllProducts'><button className='pt-4 pb-4 pr-8 pl-8 bg-[#F9F9F9]'>View our produts</button></Link> 
                </div>
             </div>


             {/* Hero Section 2 */}
              <div className='flex justify-center items-center space-x-4 md:p-10 p-6 md:flex-row flex-col'>
                           <div className='md:w-[650px] md:h-[500px] h-[281px] w-[342px] md:p-16 p-10 font-light bg-[#2A254B]'>
                             <h4 className='md:text-4xl text-2xl text-white font-thin'>It started with a small idea</h4>
                             <br />
                             <p className='md:text-xl text-sm text-white font-light'>A global brand with local beginnings, our story begain in a small studio in South London in early 2014</p>
                        <br />
                             <button className='md:mt-40 bg-[#F9F9F926;] px-5 py-5 md:pl-8 md:pr-8 pl-16 pr-20 font-extralight text-white'>View Collection</button>
                             </div>
            <br />
                           <div className='flex md:w-[650px] md:h-[500px] w-[330px] h-[259px]'>
                             <Image
                              src="/images/room2.jpeg"
                              alt="room2"
                              width={500}
                              height={100}
                              className='w-full h-full object-cover'
                             />
                           </div>
                        </div>


                        {/* Get In Touch */}
                        <div className='flex justify-between md:flex-row flex-col '>

                        <div className='flex md:w-[720px] md:h-[603px] w-[425px] h-[358px]'>
                                        <Image
                                         src="/images/room3.jpeg"
                                         alt="room3"
                                         width={400}
                                         height={100}
                                         className='w-full h-full object-cover'
                                        />
                                      </div>


        <div className='md:w-[720px] md:h-[603px] w-[420px] h-[264px] md:p-16 p-10 font-light'>
        <h4 className='md:text-2xl text-xl'>Our service isn&apos;t just personal, it&apos;s actually
         hyper personally exquisite</h4>
           <br />
           <p className='md:text-xl text-sm'>When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. 
                                          <br />
                                          <br />
            Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique become the hotbed for the London interior design community.</p>
                                          <br />
              <button className='mt-16 bg-[#F9F9F9] pt-4 pb-4 pr-8 pl-8'>Get In Touch</button>
              </div>
              </div>
                                  <br />
                                   <br />
                                   <br />
                <div className='mt-10'>
                <Hero2 />
                   </div>
                   <Club />
                   <Footer />
             
    </div>
  )
}

export default page