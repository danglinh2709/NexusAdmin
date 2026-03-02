import { Settings, BarChart2, Image as ImageIcon, Globe } from "lucide-react";

export const PRODUCT_FORM_TABS = [
  { id: "general", label: "General Info", icon: Settings },
  { id: "pricing", label: "Pricing & Stock", icon: BarChart2 },
  { id: "media", label: "Product Media", icon: ImageIcon },
  { id: "seo", label: "Search Engine", icon: Globe },
] as const;

export type TProductFormTab = (typeof PRODUCT_FORM_TABS)[number]["id"];

export interface ITabHandlers {
  setMainImageFile: (file: File | null) => void;
  addGalleryFiles: (files: File[]) => void;
  removeGalleryFile: (index: number) => void;
}
