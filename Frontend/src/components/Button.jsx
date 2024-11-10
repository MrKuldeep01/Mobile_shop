import React from 'react'

const Button = ({childern="visit me", icon=(<i className="ri-arrow-right-s-fill"></i>), classes, type="text", ...props}) => {
  return (
    <button className={`text-[var(--fontPrimaryColor)] capitalize bg-transparent/10 rounded-md px-4 py-2 active:scale-[1.02]  active:bg-amber-800 active:text-white font-semibold outline-2 outline-dashed outline-amber-800 hover:outline-black ${classes}`} {...props}>
      {childern} {icon}
    </button>
  )
}

export default Button
