import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      className,
      placeholder,
      autoComplete = "Off",
      label = "",
      defaultValue,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <label className={`flex flex-col ${className ? className : ""}`}>
        <span className="text-sm text-gray-500 mb-2">{label}</span>
        <input
          className="focus:bg-white p-2 border-indigo-500 border rounded-lg bg-gray-100 focus:outline-none"
          type={type}
          ref={ref}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...props}
        />
        {children}
      </label>
    );
  }
);

export default Input;
