"use client";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  return (
    <div>
      <Navbar />

      <h1 className="md:p-12 md:ml-32 md:text-4xl p-8 text-2xl font-light">Your shopping cart</h1>
      <div>
        {/* Header Section */}
        <ul className="flex justify-between mx-4 md:mx-[182px] text-sm md:text-base">
          <li>Products</li>
          <li>Quantity</li>
          <li>Total</li>
        </ul>
        <hr className="border-t border-gray-200 mt-3 mx-4 md:mx-[182px]" />

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between mx-4 md:mx-[182px] mt-3 space-y-4 md:space-y-0"
            >
              <div className="w-full md:w-[109px] h-[134px]">
                <img
                  src={item.image ? urlFor(item.image).url() : "/placeholder.jpg"}
                  alt={item.name || "Product Image"}
                  width={300}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-56 text-center md:text-left">
                <h4 className="font-semibold">{item.name || "Unknown Product"}</h4>
                <p className="font-medium mt-1">£{item.price?.toFixed(2) || "0.00"}</p>
              </div>
              <p className="text-center md:text-left">{item.quantity || 1}</p>
              <p className="text-center md:text-left">
                £{(item.price * (item.quantity || 1))?.toFixed(2) || "0.00"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 mx-4 md:mx-[182px]">Your cart is empty.</p>
        )}

        <hr className="border-t border-gray-200 mt-3 mx-4 md:mx-[182px]" />

        {/* Subtotal Section */}
        {cartItems.length > 0 && (
          <div className="flex justify-end mt-6 mx-4 md:mx-[182px]">
            <div className="text-right">
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 justify-end">
                <h4 className="text-lg md:text-xl font-thin">Subtotal</h4>
                <h4 className="text-xl md:text-2xl font-semibold">
                  £{cartItems
                    .reduce(
                      (total, item) =>
                        total + (item.price || 0) * (item.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </h4>
              </div>
              <h5 className="mt-2 text-gray-500 text-sm md:text-base">
                Taxes and shipping are calculated at checkout
              </h5>
            </div>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="flex justify-end mr-[160px] p-4 space-x-4">
          <button
            className="bg-[#2A254B] pt-4 pb-4 pr-8 pl-8 text-white"
            onClick={clearCart}
          >
            Remove All Items
          </button>
          <button className="bg-[#2A254B] pt-4 pb-4 pr-8 pl-8 text-white">
            Go to checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
