import { NavLink } from "react-router-dom";
import { Button } from "./Button";

export type TMenuItemBaseProps = {
  icon?: React.ReactNode;
  label: React.ReactNode;
  to?: string;
  danger?: boolean;
  onClick?: () => void;
  className?: string;
};

export const MenuItemBase = ({
  icon,
  label,
  to,
  danger = false,
  onClick,
  className = "",
}: TMenuItemBaseProps) => {
  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{label}</span>
    </>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            className,
            danger
              ? "text-red-600"
              : isActive
                ? "bg-[#EEF2FF] text-[#4F46E5] font-bold"
                : "text-slate-600 hover:bg-slate-50",
          ].join(" ")
        }
      >
        {content}
      </NavLink>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`${className} ${danger ? "text-red-600" : ""}`}
    >
      {content}
    </Button>
  );
};
