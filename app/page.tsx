import React from 'react'
import Hero1 from './components/Hero1'
import Hero2 from './components/Hero2'
import PopularProduct from './components/PopularProduct'
import Club from './components/Club'
import Studio from './components/Studio'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Link from 'next/link'
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const page = async () => {
  const getProducts = async () => {
    const products = await client.fetch(`
      *[_type=="product"]{
        name,
        price,
        image,
        slug
      }
    `,
    {},
    {cache : 'no-store'}
  );
    return products;
  };

const allProducts = await getProducts();
console.log(allProducts);

  return (
    <div>
      <Navbar />
      <Hero1 />
      <Hero2 />
         {/* cards display */}
         <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="px-2 md:px-8 py-12 text-[#2A254B] mt-12">
        <h1 className="text-2xl font-semibold">New Ceramics</h1>
      </div>

      {/* Product Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {allProducts.map((product: any) => (
          <div key={product._id} className="w-full">
            {/* Card Image */}
            {product.image && (
              <div className="relative w-full h-[400px] bg-gray-200">
                <img
                  src={urlFor(product.image).width(600).height(800).url()}
                  alt={product.name || "Product Image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Card Content */}
            <div className="mt-4 text-[#2A254B]">
              <Link href={`/products/${product.slug.current}`}>
                <p className="py-2 text-sm font-medium">{product.name}</p>
              </Link>
              <p className="text-sm font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Collection Button */}
      <div className="flex justify-center items-center mt-20">
        <Link href="/SeeAllProducts">
          <button className="bg-[#F9F9F9] py-3 px-5 rounded-[5px] text-[#2A254B]">
            View collection
          </button>
        </Link>
      </div>
    </div>

      <PopularProduct />
      <Club />
      <Studio />
      <Footer />
    </div>
  )
}

export default page