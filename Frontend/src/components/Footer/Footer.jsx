import React from "react";
import { Link } from "react-router-dom";
import  Logo from "../Logo.jsx"
function Footer() {
  return (
    <footer className="relative overflow-hidden px-2 py-30 w-full bg-gray-400/10 border border-t-2 border-t-black flex items-center justify-center text-amber-950/80 ">
      <div className="relative w-full z-10 mx-auto px-4">
        <div className=" flex flex-wrap">
          
          <div className="w-full p-6 md:w-1/2 ">
            <div className="h-full">
              <h3 className="tracking-px mb-9 hover:cursor-none hover:text-amber-950 text-xs font-semibold uppercase">
                Not a Company, but M enough!  
              </h3>
              <h2 className="my-2 text-4xl font-serif font-semibold capitalize text-amber-950 w-full py-2 ">Mobile Shop <i className="ri-shopping-bag-fill"></i></h2>
              <ul className="" >
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-inherit hover:text-amber-950"
                    to="https://github.com/MrKuldeep01/Mobile_shop.git"
                  >
                    GitHub <i className="ri-github-fill"></i>
                  </Link>
                </li>
                
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium hover:text-amber-950"
                    to="https://www.linkedin.com/in/kuldeep-kumar-a4b71a258/"
                  >
                    LinkedIn <i className="ri-linkedin-box-fill"></i>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium hover:text-amber-950"
                    to="mailto:kkharoliya20@gmail.com"
                  >
                    Gmail <i className="ri-mail-send-line"></i>
                  </Link>
                </li>
                <li className="mb-4">
                  <address
                    className=" text-base sm:text-sm font-semibold hover:text-amber-950 ">
                    <i className="ri-crosshair-2-line"></i> Rohtak, HARYANA (INDIA)            
                  </address>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 ">
            <div className="flex h-full flex-col justify-around items-center sm:items-end">
              <div className="mb-0 inline-flex w-full items-center justify-end">
                <img src="security.png" className="lg:size-20 sm:size-18 size-14 p-1 " />
              </div>
              <div className="mb-4 inline-flex items-center ">
                <Logo className="lg:size-40 sm:size-32 size-28 p-1 sm:p-2" />
              </div>
              <div>
                <p className="text-sm text-amber-950">
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