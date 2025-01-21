
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Footer from '../components/Footer';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const Page = async () => {
  const getProducts = async () => {
    const products = await client.fetch(`
      *[_type=="product"]{
        _id,
        name,
        price,
        image,
        slug
      }
    `, {}, { cache: 'no-store' });
    return products;
  };

  const allProducts = await getProducts();
  console.log(allProducts)

  return (
    <div>
      <Navbar />

      <section className="relative w-full h-64 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/stool2.jpeg')",
          }}
        ></div>

        {/* Content Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start pl-6 md:pl-16">
          <h2 className="text-white text-lg md:text-2xl font-light tracking-wide">
            All products
          </h2>
        </div>
      </section>

      <section className="w-full px-4 md:px-12 py-4">
        {/* Filter and Sorting Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left - Filter Options */}
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <select className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Category</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Clothing</option>
              </select>
            </div>

            <div className="relative">
              <select className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Product type</option>
                <option>Vases</option>
                <option>Appliances</option>
                <option>Accessories</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                <option value="default">Price</option>
                <option value="low-to-high">Low to High</option>
                <option value="high-to-low">High to Low</option>
              </select>
            </div>
          </div>

          {/* Right - Sorting */}
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="text-gray-600">Sorting by:</span>
            <div className="relative">
              <select className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Date added</option>
                <option>Popularity</option>
                <option>Newest first</option>
                <option>Oldest first</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Product Items */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {allProducts.map((product:any) => (
          <div key={product._id} className="w-full">
            {/* Card Image */}
            {product.image && (
              <div className="relative w-full h-48 bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={urlFor(product.image).width(600).height(800).url()}
                  alt={product.name || "Product Image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Card Content */}
            <div className="mt-2 text-[#2A254B] text-center">
              <Link href={`/products/${product.slug.current}`}>
                <p className="py-1 text-sm font-medium">{product.name}</p>
              </Link>
              <p className="text-sm font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Page;