import React from "react";
const Logo = ({ className = "", iconPath ="mobileShop.png" }) => {
  return (
    <div
      className={`overflow-hidden size-16 sm:size-18 bg-white/10 rounded-full ${className}`}
    >
      <img
        src={iconPath}
        alt="Logo"
        className="p-1.5 rounded bg-transparent h-full w-full object-cover"
      />
    </div>
  );
};

export default Logo;
