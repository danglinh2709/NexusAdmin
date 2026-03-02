export type FilePreviewType = "PDF" | "IMAGE" | "OFFICE" | "UNKNOWN";

export const FILE_PREVIEW_TYPE = {
  PDF: "PDF",
  IMAGE: "IMAGE",
  OFFICE: "OFFICE",
  UNKNOWN: "UNKNOWN",
} as const satisfies Record<string, FilePreviewType>;

export const PREVIEW_IMAGE_EXTS = [
  "JPG",
  "JPEG",
  "PNG",
  "WEBP",
  "GIF",
] as const;
export const PREVIEW_OFFICE_EXTS = ["DOCX", "DOC", "XLSX", "XLS"] as const;
