import React from "react";
import { LogOut } from "lucide-react";
import { SIDEBAR_ITEMS } from "../../../configs/sidebar.config";
import { SidebarItem } from "./SidebarItem";
import { useLogout } from "../../../hooks/auth/useLogout";

export const Sidebar: React.FC = () => {
  const logout = useLogout();

  return (
    <div className="w-[300px] h-screen bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
          N
        </div>
        <span className="text-2xl font-bold text-slate-900 tracking-tight">
          Nexus Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        {SIDEBAR_ITEMS.map((item) => (
          <SidebarItem
            key={item.path}
            label={item.label}
            icon={<item.icon />}
            to={item.path}
          />
        ))}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-50">
        <SidebarItem label="Logout" icon={<LogOut />} onClick={logout} danger />
      </div>
    </div>
  );
};
