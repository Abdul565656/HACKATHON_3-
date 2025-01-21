import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Ceramics = () => {
  return (
   <div>
        <div className="px-4 md:px-8 py-12 text-[#2A254B]">
          <h1 className="text-2xl font-semibold">Our Popular Products</h1>

          {/* Product Items */}
          <div className="flex flex-col md:flex-row md:justify-start justify-center items-center gap-20 md:gap-3 mt-8">
            <div className="md:w-[320px] md:h-[320px] w-[220px] h-[250px]">
              <Image
                src="/images/chair.jpeg"
                height={600}
                width={600}
                alt="chair"
                className="w-full h-full object-cover"
              />
              <div className="mt-4 text-[#2A254B]">
                <p className="py-2 text-sm">The Dendy Chair</p>
                <p className="text-sm">$250</p>
              </div>
            </div>

            <div className="md:w-[320px] md:h-[320px] w-[220px] h-[250px]">
              <Image
                src="/images/card2.jpeg"
                height={250}
                width={250}
                alt="vase"
                className="w-full h-full object-cover"
              />
              <div className="mt-4 text-[#2A254B]">
                <p className="py-2 text-sm">Rustic VaseSet</p>
                <p className="text-sm">$155</p>
              </div>
            </div>
            <div className="md:w-[320px] md:h-[320px] w-[220px] h-[250px]">
              <Image
                src="/images/card3.jpeg"
                height={600}
                width={600}
                alt="silky vase"
                className="w-full h-full object-cover"
              />
              <div className="mt-4 text-[#2A254B]">
                <p className="py-2 text-sm">The Silky Vase</p>
                <p className="text-sm">$125</p>
              </div>
            </div>
          </div>

          {/* View Collection Button */}
          <div className=" flex justify-center items-center mt-24">
            <Link href='/SeeAllProducts'><button className="bg-[#F9F9F9] py-3 px-5 rounded-[5px] text-[#2A254B]">
              View collection
            </button></Link>
          </div>
        </div>
    </div>
  )
}

export default Ceramics;
