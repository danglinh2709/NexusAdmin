import type { ButtonHTMLAttributes } from "react";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost"
    | "link"
    | "none"
    | "toolbar";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export const Button = ({
  className = "",
  disabled,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  ...props
}: TButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium text-bold disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-[#5850eb] text-white hover:bg-[#4e46e5] focus:ring-[#5850eb] rounded-lg",
    secondary:
      "bg-white text-[#4e46e5] border border-gray-300 hover:bg-gray-50 focus:ring-gray-300 rounded-lg",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 rounded-lg",
    ghost:
      "bg-transparent text-gray-600  hover:text-[#9e46e5]  focus:ring-gray-200 rounde-lg",
    link: "bg-transparent text-[#5850eb] hover:underline p-0 focus:ring-0 rounded-lg",
    none: " text-gray-500 focus:border-none outline-none hover:bg-gray-100 rounded-full",
    toolbar: "bg-transparent text-gray-600 hover:bg-gray-100 rounded-md",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const variantClass = variants[variant];
  const sizeClass = variant === "link" ? "" : sizes[size];

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
