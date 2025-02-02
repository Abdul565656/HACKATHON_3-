import React from "react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const Ceramics = async () => {
  const getProducts = async () => {
    const products = await client.fetch(
      `
        *[_type=="product"]{
          name,
          price,
          image,
          slug
        }
      `,
      {},
      { cache: "no-store" }
    );
    return products;
  };

  const allProducts = await getProducts();
  console.log(allProducts);

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="px-2 md:px-8 py-12 text-[#2A254B] mt-12">
        <h1 className="text-2xl font-semibold">New Ceramicsss</h1>
      </div>

      {/* Product Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {allProducts.map((product: any) => (
          <div key={product._id} className="w-full">
            {/* Card Image */}
            {product.image && (
              <div className="relative w-full h-[300px] bg-gray-200 rounded-md overflow-hidden">
                <img
                  src={urlFor(product.image).width(400).height(500).url()}
                  alt={product.name || "Product Image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {/* Card Content */}
            <div className="mt-3 text-[#2A254B] text-center">
              <Link href={`/products/${product.slug.current}`}>
                <p className="py-1 text-sm font-medium hover:text-blue-600">
                  {product.name}
                </p>
              </Link>
              <p className="text-sm font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Collection Button */}
      <div className="flex justify-center items-center mt-16">
        <Link href="/SeeAllProducts">
          <button className="bg-[#F9F9F9] py-3 px-5 rounded-[5px] text-[#2A254B] hover:bg-[#E5E5E5]">
            View collectionnnn
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Ceramics;
