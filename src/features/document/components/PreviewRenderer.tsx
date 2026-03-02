import type { IDocument } from "../../../types/document.type";
import { Image } from "../../../components/customControl/Image";
import type { FilePreviewType } from "../../../types/file-preview.types";
import { AlertCircle, Box } from "lucide-react";
import { FILE_PREVIEW_TYPE } from "../../../configs/file-preview.config";
import { buildOfficeViewerUrl } from "../../../utils/helper/file.helper";

type Props = {
  doc: IDocument;
  docPath: string;
  fullUrl: string;
  previewType: FilePreviewType;
};

export const PreviewRenderer = ({
  doc,
  docPath,
  fullUrl,
  previewType,
}: Props) => {
  if (!docPath) {
    return (
      <div className="flex-1 bg-white mx-8 mb-4 rounded-[24px] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-[32px] bg-gray-50 flex items-center justify-center mb-6">
          <AlertCircle size={40} className="text-gray-300" strokeWidth={1} />
        </div>
        <h3 className="text-2xl font-bold text-[#1E293B] mb-3">
          No preview URL
        </h3>
        <p className="text-[#64748B] text-lg max-w-md mx-auto leading-relaxed">
          API chưa trả link/path file để preview.
        </p>
      </div>
    );
  }
  switch (previewType) {
    case FILE_PREVIEW_TYPE.PDF:
      return (
        <div className="flex-1 bg-white mx-8 mb-4 rounded-[24px] overflow-hidden">
          <iframe
            src={fullUrl}
            className="w-full h-full border-0"
            title="PDF Preview"
          />
        </div>
      );

    case FILE_PREVIEW_TYPE.IMAGE:
      return (
        <div className="flex-1 bg-white mx-8 mb-4 rounded-[24px] overflow-hidden flex items-center justify-center">
          <Image
            src={docPath}
            alt="preview"
            className="w-full h-full object-contain"
          />
        </div>
      );

    case FILE_PREVIEW_TYPE.OFFICE:
      return (
        <div className="flex-1 bg-white mx-8 mb-4 rounded-[24px] overflow-hidden">
          <iframe
            src={buildOfficeViewerUrl(fullUrl)}
            className="w-full h-full border-0"
            title="Office Preview"
          />
        </div>
      );

    default:
      return (
        <div className="flex-1 bg-white mx-8 mb-4 rounded-[24px] flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-[32px] bg-gray-50 flex items-center justify-center mb-6">
            <Box size={40} className="text-gray-300" strokeWidth={1} />
          </div>
          <h3 className="text-2xl font-bold text-[#1E293B] mb-3">
            Standard Text View
          </h3>
          <p className="text-[#64748B] text-lg max-w-md mx-auto leading-relaxed">
            The contents of this {doc.fileType?.toUpperCase()} file are
            displayed in standard formatting.
          </p>
        </div>
      );
  }
};
