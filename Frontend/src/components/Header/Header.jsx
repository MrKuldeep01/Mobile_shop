import React from "react";
import Logo from "../Logo.jsx";
import Li from "../Li.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Auth.slice.js";
function Header() {
  const login = useSelector((state) => state.auth.authStatus);
  const user = useSelector(state => state.auth.userData);
    const auth = useSelector(state => state.auth.authStatus)

  return (
    <>
      <header className="header w-full backdrop-blur-sm h-[100px] py-4 sm:py-6 px-8 sm:px-10  bg-gray-400/40 text-semibold text-[var(--fontPrimaryColor)/50] flex items-center justify-between sticky top-0 left-0 z-50">
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
              to="/Products"
              // text="All"
              icon={<i className="ri-layout-masonry-fill"></i>}
              className=''
            />
            {/* <Li
              title="category 👩‍⚖️"
              to="/category"
              // text="category"
              icon={<i className="ri-equalizer-fill"></i>}
            /> */}

            {(auth && user.isOwner) && (
              <Li
                to={"./../products/add"}
                icon={<i className="ri-add-circle-fill"></i>}
                title="Add Products ➕"
                className="font-semibold px-2 py-2 text-lg "
              />
            )}
           
            {/* <li
              title="cart 🛒"
              className="list-none text-lg font-semibold hidden md:inline-block py-2 px-3 rounded-full hover:bg-amber-800/20 cursor-pointer text-amber-950"
            >
              <i className="ri-shopping-cart-fill"></i>
            </li> */}
            <li
              title="search 🔍"
              className="list-none text-lg font-semibold hidden md:inline-block py-2 px-3 rounded-full hover:bg-amber-800/20 cursor-pointer text-amber-950"
            >
              <i className="ri-search-2-line"></i>
            </li>
          </div>

          <div className="navRight w-auto flex items-center justify-end sm:gap-4 gap-1 pl-4 ml-2">
           
            {login ? (
              <Li
                title="Profile 😇"
                to="/me"
                icon={<i className="ri-user-6-fill"></i>}
              />
            ) : (
              <Li
                title="login 😇"
                to="/"
                icon={<i className="ri-user-6-line"></i>}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
