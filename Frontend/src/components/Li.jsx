import React from "react";
import { NavLink } from "react-router-dom";
function Li({title="", to="", classes="", activeClasses="", text='', icon=(<i className="ri-heart-fill"></i>)}) {
  return (
    <NavLink
      title={title}
      to={to}
      className={(isActive) => {
        `list-none text-base font-semibold px-2 flex items-center justify-center ${classes} ${
          isActive ? "text-amber-700" + activeClasses : "text-black"
        }`;
      }}
    >
      {icon}
      <span className="hidden md:inline-block mx-2 font-semibold"> {text} </span>{" "}
    </NavLink>
  );
}

export default Li;
