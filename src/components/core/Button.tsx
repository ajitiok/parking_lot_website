import React from "react";
import cx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xl" | "l" | "m" | "s" | "xs";
  full?: boolean;
}

const sizes = {
  xl: "text-xl px-6 py-4",
  l: "text-lg px-4 py-3",
  m: "text-base px-[14px] py-[11px]",
  s: "text-sm px-3 py-2",
  xs: "text-xs px-2 py-1",
};

const Button: React.FC<ButtonProps> = ({
  full = false,
  size = "l",
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cx(
        "transition-colors duration-200 rounded-md font-bold",
        "focus:outline-[1px] focus:outline-primary-1 bg-primary-3 text-primary-1",
        sizes[size],
        {
          "w-full": full,
        },
        className
      )}
    >
      {rest.children}
    </button>
  );
};

export default Button;
