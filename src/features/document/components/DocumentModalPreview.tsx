import { X, Printer, Share2, Download } from "lucide-react";
import { Button } from "../../../components/customControl/Button";
import type { IDocument } from "../../../types/document.type";
import {
  getFileIcon,
  formatFileSize,
  getDocPath,
  detectPreviewType,
} from "../../../utils/helper/file.helper";
import { buildAssetUrl } from "../../../utils/helper/asset.helper";

import { PreviewRenderer } from "./PreviewRenderer";

interface IDocumentPreviewModalProps {
  open: boolean;
  onClose: () => void;
  document: IDocument | null;
}

export const DocumentPreviewModal = ({
  open,
  onClose,
  document: doc,
}: IDocumentPreviewModalProps) => {
  if (!open || !doc) return null;

  const { icon: Icon, bg, color } = getFileIcon(doc.fileName);

  const docPath = getDocPath(doc);
  const fullUrl = buildAssetUrl(docPath);
  const previewType = detectPreviewType(doc);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[1000px] h-[85vh] rounded-[32px] flex flex-col overflow-hidden relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 pb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${bg}`}
            >
              <Icon size={24} className={color} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-[#1E293B]">
                  {doc.title || doc.fileName}
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  {doc.fileType}
                </span>
              </div>

              <p className="text-[#8A92A6] text-sm font-medium">
                Added by {doc.owner?.fullName || "System Admin"} •{" "}
                {formatFileSize(doc.fileSize)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-50 rounded-2xl p-1 gap-1">
              <Button variant="ghost" onClick={() => window.print()}>
                <Printer size={20} strokeWidth={1.5} />
              </Button>

              <Button variant="ghost">
                <Share2 size={20} strokeWidth={1.5} />
              </Button>

              <Button variant="ghost">
                <Download size={20} strokeWidth={1.5} />
              </Button>
            </div>

            <Button onClick={onClose}>
              <X size={24} />
            </Button>
          </div>
        </div>

        <PreviewRenderer
          doc={doc}
          docPath={docPath}
          fullUrl={fullUrl}
          previewType={previewType}
        />

        <div className="px-10 py-5 flex items-center justify-between text-[11px] font-bold tracking-widest text-[#94A3B8]">
          <div className="flex gap-6 uppercase">
            <span>SYSTEM: NEXUS CLOUD STORAGE</span>
            <span>REGION: US-EAST-1</span>
          </div>
          <div className="text-[#6366F1] uppercase">
            CONFIDENTIAL - ENTERPRISE ONLY
          </div>
        </div>
      </div>
    </div>
  );
};
