import React from "react";
import Li from "./Li.jsx";
import { useSelector } from "react-redux";

function LowerBar() {
    const auth = useSelector(state => state.auth.authStatus)
    const user = useSelector(state => state.auth.userData)
  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-between py-1 px-2 m-0 bg-amber-800/10 backdrop-blur-lg min-h-18 h-auto transition-all duration-100 md:hidden z-50">
      <Li
        title="Products 🎁"
        to="/Products"
        icon={<i className="ri-layout-masonry-fill"></i>}
        
      />
     {(auth && user.isOwner) && <Li
        to={"./../products/add"}
        icon={<i className="ri-add-circle-fill"></i>}
        title="Add Products ➕"
        className="font-semibold px-3 py-2 text-lg "
      />}
      <Li
        title="search 🔍"
        to={"./../products/search"}
        icon={<i className="ri-search-2-line"></i>}
      />
      <Li
        title="cart 🛒"
        to="/cart"
        icon={<i className="ri-shopping-cart-fill"></i>}
        
      />
    </div>
  );
}

export default LowerBar;
