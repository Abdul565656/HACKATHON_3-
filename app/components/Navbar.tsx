"use client";
import React, { useState, useEffect } from "react";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { IoMdContact } from "react-icons/io";
import MobileNavbar from "../components/MobileNavbar";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Fetch products from Sanity CMS
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await client.fetch(`
        *[_type == "product"] {
          _id,
          name,
          slug
        }
      `);
      setAllProducts(products);
    };

    fetchProducts();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, allProducts]);

  return (
    <div>
      {/* Main Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        {/* Search Icon */}
        <div className="flex items-center space-x-2">
          <FiSearch
            className="text-gray-600 w-5 h-5 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>

        {/* Top Header Name */}
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-light font-mono">Avion</h1>
        </div>

        {/* Cart and Contact */}
        <div className="flex space-x-4">
          <Link href="/carts">
            <FiShoppingCart className="text-gray-600 w-5 h-5 cursor-pointer" />
          </Link>
          <IoMdContact className="text-gray-600 w-5 h-5 cursor-pointer" />
          <MobileNavbar />
        </div>
      </nav>

      {/* Divider */}
      <hr className="border-t border-gray-200 ml-10 mr-10" />



           {/* Secondary Navbar */}
      <div className="hidden sm:flex justify-center">
        <ul className="flex items-center justify-between space-x-11 p-6 text-gray-600 text-sm">
          <li className="hover:text-gray-800 cursor-pointer">Plant pots</li>
          <li className="hover:text-gray-800 cursor-pointer">Ceramics</li>
          <li className="hover:text-gray-800 cursor-pointer">Tables</li>
          <li className="hover:text-gray-800 cursor-pointer">Chairs</li>
          <li className="hover:text-gray-800 cursor-pointer">Tableware</li>
          <li className="hover:text-gray-800 cursor-pointer">Cutlery</li>
        </ul>
      </div>
      
      {/* Search Field with Animation and Two Sections */}
      {showSearch && (
        <div
          className={`transition-all duration-500 ease-in-out ${
            showSearch ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } bg-white shadow-md p-6 mt-4 max-w-screen-lg mx-auto rounded-lg`}
          style={{ transformOrigin: "top center" }}
        >
          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-full text-sm"
            />
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Section 1: Search Results */}
            <div className="w-full md:w-1/2 pr-4">
              <h3 className="text-lg font-semibold mb-4">Search Results</h3>
              {searchTerm ? (
                filteredProducts.length > 0 ? (
                  <ul className="space-y-2">
                    {filteredProducts.map((product: any) => (
                      <li
                        key={product._id}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        <Link href={`/products/${product.slug.current}`}>
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No products found.</p>
                )
              ) : (
                <p className="text-gray-400 italic">
                  Type something to search for products.
                </p>
              )}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-gray-300"></div>

            {/* Section 2: Suggestions */}
            <div className="w-full md:w-1/2 pl-4">
              <h3 className="text-lg font-semibold mb-4">Popular Suggestions</h3>
              <ul className="space-y-2">
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Plant Pots
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Ceramic Mugs
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Wooden Tables
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Modern Chairs
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Elegant Tableware
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
