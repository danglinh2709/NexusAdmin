import { useState } from "react";
import { useClickOutside } from "../../../hooks/common/useClickOutside";
import { useRef } from "react";
import { UserMenuUi } from "./UserMenuUI";
import { useAuth } from "../../../stores/AuthContext";
import { DropdownItem } from "./DropdownItem";
import { Lock, LogOut, User } from "lucide-react";
import { useLogout } from "../../../hooks/auth/useLogout";
import { ROUTES } from "../../../configs/route.config";

export const UserMenuFunction = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  useClickOutside(ref as React.RefObject<HTMLElement>, () => setOpen(false));
  return (
    <div ref={ref}>
      <UserMenuUi open={open} onToggle={() => setOpen(!open)} />

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
          <div className="px-4 py-3 border-b">
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>

          <DropdownItem
            label="My Profile"
            icon={<User size={16} />}
            to={ROUTES.APP.SETTINGS}
          />

          <DropdownItem label="Change Password" icon={<Lock size={16} />} />

          <DropdownItem
            label="Logout"
            icon={<LogOut size={16} />}
            danger
            onClick={logout}
          />
        </div>
      )}
    </div>
  );
};
