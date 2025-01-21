import Link from 'next/link';
import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebookSquare, FaTwitter, FaPinterest } from "react-icons/fa";
import { IoLogoSkype } from "react-icons/io";

const Footer = () => {
  return (
    <div>
      {/* Main footer section */}
      <div className="flex flex-col md:flex-row bg-[#2A254B] justify-between items-start p-10 md:p-20 text-white leading-9 font-thin space-y-10 md:space-y-0">
        {/* Menu */}
        <div>
          <ul>
            <h3 className="text-lg md:text-xl font-medium">Menu</h3>
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Recently viewed</li>
            <li>Popular this week</li>
            <li>All products</li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <ul>
            <h3 className="text-lg md:text-xl font-medium">Categories</h3>
            <li>Crockery</li>
            <li>Furniture</li>
            <li>Homeware</li>
            <li>Plant pots</li>
            <li>Chairs</li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <ul>
            <h3 className="text-lg md:text-xl font-medium">Our Company</h3>
            <li>About us</li>
            <li>Vacancies</li>
            <li>Contact us</li>
            <li>Privacy</li>
            <li>Returns policy</li>
          </ul>
        </div>

        {/* Mailing List */}
        <div>
          <ul>
            <h3 className="text-lg md:text-xl font-medium">Join our mailing list</h3>
            <br />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
              <input
                type="text"
                placeholder="your@email.com"
                className="p-2 pl-8 bg-[#FFFFFF26] text-white placeholder-white md:flex-1"
              />
              <button className="p-2 bg-white text-black md:pt-4 md:pb-4 md:pr-8 md:pl-8">Sign up</button>
            </div>
          </ul>
        </div>
      </div>

      {/* Footer bottom section */}
      <div className="bg-[#2A254B]">
        <hr className="border-t border-white mx-4 md:mx-16" />

        <div className="flex flex-col md:flex-row justify-between items-center p-6 text-center md:text-left space-y-4 md:space-y-0">
          <div className="text-white md:ml-14">Copyright 2022 Avion LTD</div>
          <div className="flex space-x-6 text-xl text-white justify-center md:justify-end md:mr-14">
            <FaLinkedin />
            <FaInstagram />
            <FaFacebookSquare />
            <FaTwitter />
            <FaPinterest />
            <IoLogoSkype />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
