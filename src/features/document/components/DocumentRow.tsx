import { Pencil, Trash2, Eye, Download } from "lucide-react";
import { Button } from "../../../components/customControl/Button";
import type { IDocument } from "../../../types/document.type";
import {} from "../../../configs/document.config";
import { toYMD } from "../../../utils/helper/format-date.helper";
import { formatFileSize, getFileIcon } from "../../../utils/helper/file.helper";

interface IDocumentRow {
  document: IDocument;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPreview?: (document: IDocument) => void;
}

export const DocumentRow = ({
  document,
  onDelete,
  onEdit,
  onPreview,
}: IDocumentRow) => {
  const { icon: Icon, bg, color } = getFileIcon(document.fileName);
  return (
    <tr className="border-b border-gray-50 last:border-none hover:bg-gray-50/30 transition-colors group">
      <td className="py-5 pl-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}
          >
            <Icon size={20} className={color} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#1E293B] text-sm leading-tight transition-colors">
              {document.title || document.fileName}
            </span>
            <span className="text-[12px] text-gray-400 font-medium mt-1">
              {document.fileType.toUpperCase()} File
            </span>
          </div>
        </div>
      </td>

      <td className="py-5">
        <span className="text-sm font-medium text-[#64748B]">
          {formatFileSize(document.fileSize)}
        </span>
      </td>

      <td className="py-5">
        <span className="text-sm font-medium text-[#1E293B]">
          {document.owner?.fullName || "System Admin"}
        </span>
      </td>

      <td className="py-5">
        <span className="text-sm font-medium text-[#64748B]">
          <span>{toYMD(document.createdAt)}</span>
        </span>
      </td>

      <td className="py-5 pr-6 text-right">
        <div className="flex justify-end items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" onClick={() => onPreview?.(document)}>
            <Eye size={18} strokeWidth={1.5} />
          </Button>

          <Button variant="ghost" onClick={() => onEdit?.(document.id)}>
            <Pencil size={18} strokeWidth={1.5} />
          </Button>

          <Button variant="ghost" onClick={() => onDelete?.(document.id)}>
            <Trash2 size={18} strokeWidth={1.5} />
          </Button>

          <Button variant="ghost">
            <Download size={18} strokeWidth={1.5} />
          </Button>
        </div>
      </td>
    </tr>
  );
};
