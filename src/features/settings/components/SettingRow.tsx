import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../components/customControl/Button";
import type { ISetting } from "../../../types/setting.type";

interface ISettingRow {
  setting: ISetting;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export const SettingRow = ({ setting, onDelete, onEdit }: ISettingRow) => {
  return (
    <tr className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors group">
      <td className="py-4 pl-6 w-[35%]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:border-violet-100 group-hover:text-violet-500 transition-all duration-300">
            <span className="text-xs font-bold leading-none">KEY</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#1E293B] text-sm leading-tight group-hover:text-violet-600 transition-colors">
              {setting.configKey}
            </span>
          </div>
        </div>
      </td>

      <td className="py-4 w-[40%]">
        <span className="text-sm text-[#64748B] leading-relaxed">
          {setting.description}
        </span>
      </td>

      <td className="py-4 pr-6 text-right w-[25%]">
        <div className="flex justify-end items-center gap-1 ">
          <Button variant="ghost" onClick={() => onEdit?.(setting.id)}>
            <Pencil size={16} strokeWidth={2} />
          </Button>

          <Button variant="ghost" onClick={() => onDelete?.(setting.id)}>
            <Trash2 size={16} strokeWidth={2} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
