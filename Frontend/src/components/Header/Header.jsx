import React from "react";
import  Logo from "../Logo.jsx"

function Header() {
  return (
    <>
      <header className="header w-full backdrop-blur-sm h-[100px] py-4 sm:py-6 px-8 sm:px-12  bg-gray-400/40 text-semibold text-[var(--fontPrimaryColor)/50] flex items-center justify-between sticky top-0 left-0">
        {/* <div className="logo left w-16 h-16 rounded-2xl flex items-center justify-center p-0.5 mx-2 mr-2 ">
          <img src="mobileShop.png" alt="Mobile Shop logo" className="overflow-hidden w-auto h-auto"/>
        </div> */}
        <Logo iconPath={"mobileShop.png"}/>
        <div className="right w-[60%] sm:w-[80%] flex items-center justify-end md:justify-between mx-1 sm:mx-4">
          <div className="navLeft w-[65%] hidden md:flex items-center justify-start gap-4 px-4">
            <li title="Products 🎁" className="list-none text-base font-semibold px-2 flex items-center justify-center gap-2"><i className="ri-layout-masonry-fill"></i> <span className="hidden md:inline-block">All</span> </li>
            <li title="category 👩‍⚖️" className="list-none text-base font-semibold px-2 flex items-center justify-center gap-2"><i className="ri-equalizer-line"></i> <span className="hidden md:inline-block">category</span> </li>
            <li title="services 🛠" className="list-none text-base font-semibold px-2 flex items-center justify-center gap-2"><i className="ri-tools-fill"></i> <span className="hidden md:inline-block">services</span>  </li>
            <li title="contact 🤝" className="list-none text-base font-semibold px-2 flex items-center justify-center gap-2"><i className="ri-shake-hands-fill"></i> <span className="hidden md:inline-block">contact</span> </li>
          </div>
          <div className="navRight w-auto flex items-center justify-end sm:gap-4 gap-1 px-4 ml-2">
            <li title="search 🔍" className="list-none text-base font-semibold hidden sm:inline-block px-2 "><i className="ri-search-2-line"></i></li>
            <li title="you ❤" className="list-none text-base font-semibold hidden sm:inline-block px-2 "> <i className="ri-user-6-line"></i> </li>
            <li title="cart 🛒" className="list-none text-base font-semibold self-end sm:inline-block px-0 sm:px-2 "> <i className="ri-shopping-cart-line"></i></li>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
