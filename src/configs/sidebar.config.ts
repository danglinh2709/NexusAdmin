import {
  LayoutDashboard,
  Users,
  Layers,
  Package,
  FileText,
  File,
  Settings,
} from "lucide-react";
import { ROUTES } from "./route.config";

export const SIDEBAR_ITEMS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    path: ROUTES.APP.DASHBOARD,
  },
  {
    label: "User Management",
    icon: Users,
    path: ROUTES.APP.USERS,
  },
  {
    label: "Category Management",
    icon: Layers,
    path: ROUTES.APP.CATEGORIES,
  },
  {
    label: "Product Management",
    icon: Package,
    path: ROUTES.APP.PRODUCTS,
  },
  {
    label: "Document Management",
    icon: FileText,
    path: ROUTES.APP.DOCUMENTS,
  },
  {
    label: "Content Pages",
    icon: File,
    path: ROUTES.APP.PAGES,
  },
  {
    label: "Settings",
    icon: Settings,
    path: ROUTES.APP.SETTINGS,
  },
];
