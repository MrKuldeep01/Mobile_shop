import React from "react";
import { Link } from "react-router-dom";
import  Logo from "../Logo.jsx"


function Footer() {
  return (
    <footer className="relative overflow-hidden px-2 py-30 w-full bg-gray-400/10 border border-t-2 border-t-black flex items-center justify-center ">
      <div className="relative w-full z-10 mx-auto px-4">
        <div className=" flex flex-wrap">
          
          <div className="w-full p-6 md:w-1/2 ">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
                Not a Company, but M enough!  
              </h3>
              <h2 className="my-2 text-4xl font-serif font-semibold capitalize text-zinc-600/80 w-full py-2 ">Mobile Shop <i className="ri-shopping-bag-fill"></i></h2>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="https://github.com/MrKuldeep01/Mobile_shop.git"
                  >
                    GitHub <i className="ri-github-fill"></i>
                  </Link>
                </li>
                
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="https://www.linkedin.com/in/kuldeep-kumar-a4b71a258/"
                  >
                    LinkedIn <i className="ri-linkedin-box-fill"></i>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="mailto:kkharoliya20@gmail.com"
                  >
                    Gmail <i className="ri-mail-send-line"></i>
                  </Link>
                </li>
                <li className="mb-4">
                  <address
                    className=" text-base sm:text-base  font-semibold text-gray-900 hover:text-gray-700">
                    <i className="ri-crosshair-2-line"></i> Rohtak, HARYANA (INDIA)
                    
                  </address>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 ">
            <div className="flex h-full flex-col justify-around items-center sm:items-end">
              <div className="mb-4 inline-flex items-center">
                <Logo className="lg:size-40 sm:size-28 size-26 p-1 sm:p-2" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. mr - kumar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;