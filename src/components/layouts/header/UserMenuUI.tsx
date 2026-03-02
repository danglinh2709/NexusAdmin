import { ChevronDown } from "lucide-react";
import { useAuth } from "../../../stores/AuthContext";
import { USER_ROLE } from "../../../configs/user.config";

export const UserMenuUi = ({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) => {
  const { user } = useAuth();
  return (
    <div className="flex items-center gap-4" onClick={onToggle}>
      <div className="w-px h-8 bg-slate-100 mx-2" />

      <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors group">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">
            {user?.role === USER_ROLE.SUPER_ADMIN ? "Super Admin" : user?.role}
          </p>
        </div>

        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
            {user?.fullName?.[0]?.toUpperCase()}
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform group-hover:translate-y-0.5 ${open ? "rotate-180" : ""}`}
        />
      </div>
    </div>
  );
};
