
import React from 'react'

const Club = () => {
  return (
    <div>
        <div className="md:w-[1349px] h-auto bg-gray-100 py-8">
        <div className="m-auto w-11/12 bg-white p-8">
          <h1 className="text-custom-purple text-2xl md:text-3xl text-center">Join the club and get the benefits</h1>
          <p className="text-custom-purple text-center mt-6 text-sm md:text-base">
            Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop-up stores, and more.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="you@gmail.com"
              className="bg-gray-100 w-80 h-12 p-6 pt-4 pb-4 rounded-sm"
            />
              <button className='pt-4 pb-4 pr-8 pl-8 bg-[#2A254B] text-white'>Sign up</button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default Club;
