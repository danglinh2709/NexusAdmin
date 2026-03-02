import { FileText, FileSpreadsheet, FileImage } from "lucide-react";

type FileIconConfig = {
  icon: React.ComponentType<any>;
  bg: string;
  color: string;
};

export const FILE_ICON_MAP: Record<string, FileIconConfig> = {
  pdf: {
    icon: FileText,
    bg: "bg-red-100",
    color: "text-red-600",
  },

  docx: {
    icon: FileText,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },

  xlsx: {
    icon: FileSpreadsheet,
    bg: "bg-green-100",
    color: "text-green-600",
  },

  jpg: {
    icon: FileImage,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
};
