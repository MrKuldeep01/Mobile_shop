import React from "react";
import Logo from "../Logo.jsx";
import Li from "../Li.jsx";
import { useSelector } from "react-redux";
function Header() {
  const login = useSelector((state) => state.authStatus);
  return (
    <>
      <header className="header w-full backdrop-blur-sm h-[100px] py-4 sm:py-6 px-8 sm:px-12  bg-gray-400/40 text-semibold text-[var(--fontPrimaryColor)/50] flex items-center justify-between sticky top-0 left-0 z-50">
        {/* <div className="logo left w-16 h-16 rounded-2xl flex items-center justify-center p-0.5 mx-2 mr-2 ">
          <img src="mobileShop.png" alt="Mobile Shop logo" className="overflow-hidden w-auto h-auto"/>
        </div> */}
        <Logo iconPath={"mobileShop.png"} />
        <div className="right w-[60%] sm:w-[80%] flex items-center justify-end md:justify-between mx-1 sm:mx-4">
          <div className="navLeft w-[65%] hidden md:flex items-center justify-start gap-4 px-4">
            {/* <NavLink
              title="Products 🎁"
              className={(isActive)=>{`list-none text-base font-semibold px-2 flex items-center justify-center gap-2 ${isActive ? " " : ""}`}}
            >
              <i className="ri-layout-masonry-fill"></i>{" "}
              <span className="hidden md:inline-block">All</span>{" "}
            </NavLink> */}
            {/* function Li({title="Products 🎁", to="/", classes="", activeClasses="", text='All', icon=(<i className="ri-layout-masonry-fill"></i>)}) {} */}
            <Li
              title="Products 🎁"
              to="/"
              text="All"
              icon={<i className="ri-layout-masonry-fill"></i>}
            />
            <Li
              title="category 👩‍⚖️"
              to="/category"
              text="category"
              icon={<i className="ri-equalizer-fill"></i>}
            />

            <Li
              title="services 🛠"
              to="/services"
              text="services"
              icon={<i className="ri-tools-fill"></i>}
            />

            <Li
              title="contact 🤝"
              to="/contact"
              text="contact"
              icon={<i className="ri-shake-hands-fill"></i>}
            />
          </div>

          <div className="navRight w-auto flex items-center justify-end sm:gap-4 gap-1 px-4 ml-2">
            <li
              title="search 🔍"
              className="list-none text-base font-semibold hidden sm:inline-block px-2 cursor-pointer "
            >
              <i className="ri-search-2-line"></i>
            </li>

            {login ? (
              <Li
                title="you ❤"
                to="/me"
                icon={<i className="ri-user-6-fill"></i>}
              />
            ) : (
              <Li
                title="login"
                to="/login"
                icon={<i className="ri-user-6-line"></i>}
              />
            )}

            <Li
              title="cart 🛒"
              to="/cart"
              icon={<i className="ri-shopping-cart-fill"></i>}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
