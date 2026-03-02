import {
  MenuItemBase,
  type TMenuItemBaseProps,
} from "../../customControl/MenuItemBase";

export const SidebarItem = ({
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
      className="flex items-center gap-3 px-4 py-4 rounded-xl text-[15px] font-medium"
    />
  );
};
