import React from "react";
import { NavLink } from "react-router-dom";
function Li({title="", to="", classes="", activeClasses="", text='', icon=(<i className="ri-heart-fill"></i>), props}) {
  return (
    <NavLink
      title={title}
      to={to}

      className={
        "list-none text-lg font-semibold px-2 flex items-center justify-center text-amber-950"
        }
        {...props}
      >
      {icon}
      <span className="hidden md:inline-block mx-2 font-semibold"> {text} </span>{" "}
    </NavLink>
  );
}

export default Li;
