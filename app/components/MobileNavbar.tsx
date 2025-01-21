import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { IoMenu } from "react-icons/io5";
import { FaHome, FaBox, FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { FaListUl } from "react-icons/fa";
import { GiPodiumSecond } from "react-icons/gi";


const MobileNavbar = () => {
  return (
    <div>
           <Sheet>
  <SheetTrigger>
  <IoMenu />
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle></SheetTitle>
      <SheetDescription>
      <div className="fixed top-0 h-screen w-64 bg-white shadow-lg z-40 flex flex-col p-6 space-y-6 text-gray-700 mt-10">
      {/* Sidebar Links */}

      <Link href="/Homepage2" className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
      <GiPodiumSecond className="w-6 h-6" />
        <span>Second Homepage</span>
      </Link>

      <Link href="/" className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
        <FaHome className="w-6 h-6" />
        <span>Home</span>
      </Link>

      <Link href="/Aboutus" className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
        <FaInfoCircle className="w-6 h-6" />
        <span>About</span>
      </Link>

      <Link href="/ProductListing" className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
        <FaBox className="w-6 h-6" />
        <span>Products</span>
      </Link>

      <Link href="/carts" className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
        <FaShoppingCart className="w-6 h-6" />
        <span>Cart</span>
      </Link>

      <Link href="/SeeAllProducts" className="flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300">
        <FaListUl className="w-6 h-6" />
        <span>See All Products</span>
      </Link>
    </div>

      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default MobileNavbar