import { FileType } from "lucide-react";
import { FILE_ICON_MAP } from "../../configs/document.config";
import type { IDocument } from "../../types/document.type";
import {
  FILE_PREVIEW_TYPE,
  PREVIEW_IMAGE_EXTS,
  PREVIEW_OFFICE_EXTS,
  type FilePreviewType,
} from "../../configs/file-preview.config";

// icon
export const getFileIcon = (fileNameOrType: string) => {
  const ext = fileNameOrType.split(".").pop()?.toLowerCase() ?? "";
  return (
    FILE_ICON_MAP[ext] ?? {
      icon: FileType,
      bg: "bg-gray-100",
      color: "text-gray-500",
    }
  );
};

// size
export const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) return `${kb.toFixed(1)} KB`;

  return `${(kb / 1024).toFixed(1)} MB`;
};

//

export const getDocPath = (doc: IDocument): string => {
  return doc.fileUrl || "";
};

export const buildOfficeViewerUrl = (fileUrl: string) =>
  `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
    fileUrl,
  )}`;

export const getExtUpper = (name?: string) =>
  (name?.split(".").pop() || "").toUpperCase().trim();

export const detectPreviewType = (doc: IDocument): FilePreviewType => {
  const ft = (doc.fileType || "").toUpperCase().trim();
  const ext = getExtUpper(doc.fileName);
  const t = ft || ext;

  if (t === FILE_PREVIEW_TYPE.PDF) return FILE_PREVIEW_TYPE.PDF;
  if ((PREVIEW_IMAGE_EXTS as readonly string[]).includes(t))
    return FILE_PREVIEW_TYPE.IMAGE;
  if ((PREVIEW_OFFICE_EXTS as readonly string[]).includes(t))
    return FILE_PREVIEW_TYPE.OFFICE;

  return FILE_PREVIEW_TYPE.UNKNOWN;
};
