import cx from "classnames";
import React, { HTMLInputTypeAttribute } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.LegacyRef<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  className,
  error = false,
  ...rest
}) => {

  return (
    <input
      {...rest}
      type={type}
      className={cx(
        "w-full rounded-md border border-primary-2 p-3 text-lg placeholder:text-primary-2 capitalize focus:border-primary-3 focus:outline-none focus:ring-0 disabled:pointer-events-none",
        error && "!border-danger-500 placeholder:text-danger-500",
        className
      )}
    />
  );
};

export default Input;
