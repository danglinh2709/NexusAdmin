import {
  ExternalLink,
  FileText,
  Globe,
  Image as ImageIcon,
  Pencil,
  PencilLine,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/customControl/Button";
import { type IContentPages } from "../../../types/contentPages.type";
import { STATUS_TYPE } from "../../../configs/category.config";
import { toYMD } from "../../../utils/helper/format-date.helper";
import { Image } from "../../../components/customControl/Image";
interface IContentRowProps {
  content: IContentPages;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}
export function ContentRow({ content, onEdit, onDelete }: IContentRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors group">
      <td className="py-4 pl-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
            {content.featuredImage ? (
              <Image
                src={content.featuredImage}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <ImageIcon size={24} strokeWidth={1.5} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="font-bold text-gray-900 text-sm leading-tight">
              {content.title}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Globe size={12} />
              <span>/pages/{content.slug}</span>
            </div>
          </div>
        </div>
      </td>

      <td className="py-4 text-center">
        <div className="flex justify-center">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
              content.status === STATUS_TYPE.PUBLISHED
                ? "bg-emerald-50 text-emerald-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                content.status === STATUS_TYPE.PUBLISHED
                  ? "bg-emerald-500"
                  : "bg-gray-400"
              }`}
            />
            {content.status}
          </div>
        </div>
      </td>

      <td className="py-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-wide">
            <FileText size={12} strokeWidth={2.5} />
            <span>CREATED: {toYMD(content.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-blue-500 font-medium uppercase tracking-wide">
            <PencilLine size={12} strokeWidth={2.5} />
            <span>UPDATED: {toYMD(content.updatedAt)}</span>
          </div>
        </div>
      </td>

      <td className="py-4 pr-6">
        <div className="flex justify-end items-center gap-1">
          <Button variant="ghost">
            <ExternalLink size={16} strokeWidth={2} />
          </Button>

          <Button variant="ghost" onClick={() => onEdit?.(content.id)}>
            <Pencil size={16} strokeWidth={2} />
          </Button>

          <Button variant="ghost" onClick={() => onDelete?.(content.id)}>
            <Trash2 size={16} strokeWidth={2} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
