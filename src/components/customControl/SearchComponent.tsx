import { Input } from "./Input";
import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface ISearchProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const SearchComponent = ({
  placeholder,
  value,
  onChange,
  className,
  containerClassName,
  ...props
}: ISearchProps) => {
  return (
    <div className={`relative w-72 ${containerClassName || ""}`.trim()}>
      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
        <Search size={18} className="text-[#8A92A6]" />
      </span>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        containerClassName="!gap-0 border !rounded-xl !border-gray-200 !text-sm placeholder:text-[#8A92A6] "
        className={`!pl-11 !py-2.5 !bg-[#FBFCFE] border !rounded-xl !border-gray-200 !text-sm placeholder:text-[#8A92A6] ${className || ""}`.trim()}
        {...props}
      />
    </div>
  );
};
