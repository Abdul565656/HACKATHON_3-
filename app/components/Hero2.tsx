import React from 'react'
import { FaShippingFast } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { RiPlantLine } from "react-icons/ri";

const Hero2 = () => {
  return (
    <div className='mt-8'>
        <h5 className='md:text-3xl font-thin text-center text-3xl md:w-[1400px] w-[350px] '>What makes our brand diferent</h5>
        <div className='md:p-14 p-3'>
        <div className='flex space-x-8 md:w-[1200px] w-[300px] justify-center items-center mt-3 md:flex-row flex-col'>
          <br />
          <div className='font-light'>
            <FaShippingFast className='w-6 h-6' />
                <h5 className='leading-10 text-2xl'>Next day as standard</h5>
                <p className='text-xl' >Order before 3pm and get your order
                the next day as standard</p>
            </div>
            <br />
            <div className='font-light'>
            <FaRegCheckCircle className='w-6 h-6' />
                <h5 className='leading-10 text-2xl'>Made by true artisans</h5>
                <p className='text-xl'>Handmade crafted goods made with
                real passion and craftmanship</p>
            </div>
            <br />
            <div className='font-light'>
            <IoWalletOutline className='w-6 h-6 leading-10' />
                <h5 className='leading-10 text-2xl '>Unbeatable prices</h5>
                <p className='text-xl'>For our materials and quality you won&apos;t find better 
                    prices anywhere</p>
            </div>
            <br />
                <div className='font-light'>
                <RiPlantLine className='w-6 h-6' />
                <h5 className='leading-10 text-2xl '>Recycled packaging</h5>
                <p className='text-xl'>We use 100% recycled packaging to 
                    ensure our footprint is manageable </p>
            </div>

        </div>
        </div>

    </div>
  )
}

export default Hero2