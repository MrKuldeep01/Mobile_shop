import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", classes = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full my-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        className={`block w-full p-2 border rounded-md outline-1 outline-dashed outline-zinc-600/50 border-none font-semibool text-amber-900 ${classes}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});
export default Input;
