import { Copy, Plus } from "lucide-react";
import type { IDashboardContentStatus } from "../../../types/dashboard.type";
import { Button } from "../../../components/customControl/Button";
import { toYMD } from "../../../utils/helper/format-date.helper";
import { STATUS_TYPE } from "../../../configs/category.config";

interface Props {
  content: IDashboardContentStatus | null;
}

export function ContentStatusCard({ content }: Props) {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-gray-100/60 shadow-sm flex flex-col">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Content Status</h2>
          <p className="text-sm text-[#8A92A6] mt-1">
            Recently modified CMS pages and drafts.
          </p>
        </div>
        <Button size="sm">
          <Plus className="w-3.5 h-3.5" />
          NEW PAGE
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-5">
        {content?.map((item) => {
          const isPublished = item.status === STATUS_TYPE.PUBLISHED;

          return (
            <div key={item.id} className="flex items-center gap-4">
              <div>
                <Copy className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-[#1E293B] truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8A92A6] mt-0.5">
                  Modified: {toYMD(item.updatedAt)}
                </p>
              </div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  isPublished
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPublished ? "bg-emerald-500" : "bg-gray-400"
                  }`}
                />
                {item.status}
              </div>
            </div>
          );
        })}

        {(!content || content.length === 0) && (
          <div className="text-sm text-gray-500 py-4 text-center">
            No recent content found.
          </div>
        )}
      </div>
    </div>
  );
}
