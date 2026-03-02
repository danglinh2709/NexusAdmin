import { ROUTES } from "../configs/route.config";
import type {
  IDashboardCategorySplit,
  IDashboardContentStatus,
  IDashboardGrowth,
  IDashboardLatestProduct,
  IDashboardStats,
} from "../types/dashboard.type";
import api from "./api";

const base = ROUTES.APP.DASHBOARD;

export const dashboardService = {
  getStats(): Promise<IDashboardStats> {
    return api.get(`${base}/stats`);
  },
  getGrowth(): Promise<IDashboardGrowth> {
    return api.get(`${base}/growth`);
  },
  getCategorySplit(): Promise<IDashboardCategorySplit> {
    return api.get(`${base}/category-split`);
  },
  getLatestProduct(): Promise<IDashboardLatestProduct[]> {
    return api.get(`${base}/latest-products`);
  },
  getContentStatus(): Promise<IDashboardContentStatus> {
    return api.get(`${base}/content-status`);
  },
};
