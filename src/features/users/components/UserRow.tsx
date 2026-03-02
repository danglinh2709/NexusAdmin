import { Pencil, Trash2 } from "lucide-react";
import type { IUser } from "../../../types/user.type";
import { Button } from "../../../components/customControl/Button";
import { USER_ROLE, USER_STATUS } from "../../../configs/user.config";

export function UserRow({
  user,
  onDelete,
  onEdit,
}: {
  user: IUser;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}) {
  return (
    <tr className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
      <td className="py-4 pl-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center font-bold text-sm">
            {user.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-[#1E293B] text-sm leading-tight">
              {user.fullName}
            </span>
            <span className="text-xs text-[#8A92A6] mt-0.5">
              {user.email.toLowerCase()}
            </span>
          </div>
        </div>
      </td>

      <td className="py-4 text-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
            user.role === USER_ROLE.SUPER_ADMIN
              ? "bg-[#EEF2FF] text-[#4F46E5]"
              : "bg-[#F3F4F6] text-[#374151]"
          }`}
        >
          {user.role === USER_ROLE.SUPER_ADMIN
            ? USER_ROLE.SUPER_ADMIN
            : USER_ROLE.ADMIN}
        </span>
      </td>

      <td className="py-4 text-center">
        <div className="flex justify-center">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium leading-none ${
              user.status === USER_STATUS.ACTIVE
                ? "bg-[#E6F9F1] text-[#10B981]"
                : "bg-[#F3F4F6] text-[#6B7280]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                user.status === USER_STATUS.ACTIVE
                  ? "bg-[#10B981]"
                  : "bg-[#6B7280]"
              }`}
            ></span>
            {user.status === USER_STATUS.ACTIVE
              ? USER_STATUS.ACTIVE
              : USER_STATUS.INACTIVE}
          </div>
        </div>
      </td>

      <td className="py-4 pr-6">
        <div className="flex justify-end gap-1 text-[#8A92A6]">
          <Button variant="ghost" onClick={() => onEdit?.(user.id)}>
            <Pencil size={18} />
          </Button>

          {user.role !== USER_ROLE.SUPER_ADMIN && (
            <Button variant="ghost" onClick={() => onDelete?.(user.id)}>
              <Trash2 size={18} />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
