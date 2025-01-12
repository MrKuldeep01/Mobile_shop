import React from "react";
import { NavLink } from "react-router-dom";
function Li({title="", to="", classes="", activeClasses="", text='', icon=(<i className="ri-heart-fill"></i>), props}) {
  return (
    <NavLink
      title={title}
      to={to}

      className={
        "list-none text-lg font-semibold py-2 px-3 rounded-full hover:bg-amber-800/20 flex items-center justify-center text-amber-950 outline-none focus:bg-amber-800/20"
        }
        {...props}
      >
      {icon}
      { text && <span className="hidden md:inline-block mx-2 font-semibold"> {text} </span>}
    </NavLink>
  );
}

export default Li;
