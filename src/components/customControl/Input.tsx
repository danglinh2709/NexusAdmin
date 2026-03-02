import {
  type InputHTMLAttributes,
  useId,
  useState,
  type ReactNode,
  forwardRef,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./Button";

type TInputProps = {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  containerClassName?: string;

  uiSize?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "filled";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightElement,
      containerClassName = "",
      className = "",
      type = "text",
      uiSize = "sm",
      variant = "default",
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const isFile = type === "file";

    const sizeClass = {
      sm: "py-2 text-sm",
      md: "py-3 text-sm",
      lg: "py-3.5 text-base",
    };

    const variantClass = {
      default: `
      rounded-xl
      text-[#1E293B] font-medium
      placeholder:text-[#94A3B8]
      focus:outline-none
      focus:bg-white
      focus:border-purple-500
      focus:ring-3 focus:ring-purple-500
      transition-all duration-200
      rounded-lg
      bg-[#F8FAFC] border-none focus:bg-white

    `,
      outline: `
     
    `,
      filled: `
     
    `,
    };

    return (
      <div className={`flex flex-col gap-2 w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={id}
            className="text-[11px] font-bold text-[#8A92A6] uppercase tracking-wider ml-1"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center gap-2">
          <div className="relative flex-1 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              {leftIcon}
            </div>

            <input
              ref={ref}
              id={id}
              type={inputType}
              className={`
                w-full
                ${!isFile ? sizeClass[uiSize] : ""}
                ${!isFile && leftIcon ? "pl-12" : !isFile ? "px-5" : ""}
                ${!isFile && isPassword ? "pr-12" : !isFile ? "pr-5" : ""}
                ${!isFile ? variantClass[variant] : ""}
                ${
                  error && !isFile
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : ""
                }
              ${className}
            `.trim()}
              {...props}
            />

            {isPassword && (
              <Button
                variant="none"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            )}
          </div>

          {rightElement && <div className="flex-shrink-0">{rightElement}</div>}
        </div>

        {error && <p className="text-xs text-red-500 ml-1 mt-0.5">{error}</p>}
      </div>
    );
  },
);
