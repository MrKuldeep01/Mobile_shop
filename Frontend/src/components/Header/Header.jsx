import React from "react";

function Header() {
  return (
    <>
      <header className="header w-full h-[100px]  bg-gray-500/50 text-semibold text-[var(--fontPrimaryColor)] flex ">
        <div className="logo bg-rose-400 w-14 h-14  ">
          <img src="mobileShop.png" alt="Mobile Shop logo" className="overflow-hidden w-auto h-auto"/>
        </div>
      </header>
    </>
  );
}

export default Header;
