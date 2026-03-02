import {
  MenuItemBase,
  type TMenuItemBaseProps,
} from "../../../components/customControl/MenuItemBase";

export const DropdownItem = ({
  label,
  icon,
  to,
  danger,
  onClick,
}: TMenuItemBaseProps) => {
  return (
    <MenuItemBase
      label={label}
      icon={icon}
      to={to}
      danger={danger}
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-2 text-sm
        hover:bg-slate-100"
    />
  );
};
