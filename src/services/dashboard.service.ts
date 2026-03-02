import { ROUTES } from "../configs/route.config";
import type {
  IDashboardGrowth,
  IDashboardStats,
} from "../types/dashboard.type";
import type {
  IDashboardCategorySplit,
  IDashboardContentStatus,
  IDashboardLatestProduct,
} from "../types/product.type";
import api from "./api";

const base = ROUTES.APP.DASHBOARD;

export const dashboardService = {
  getStats(options?: { hideLoading?: boolean }): Promise<IDashboardStats> {
    // @ts-ignore - custom property handled by interceptor
    return api.get(`${base}/stats`, { ...options });
  },
  getGrowth(options?: { hideLoading?: boolean }): Promise<IDashboardGrowth> {
    // @ts-ignore - custom property handled by interceptor
    return api.get(`${base}/growth`, { ...options });
  },
  getCategorySplit(options?: {
    hideLoading?: boolean;
  }): Promise<IDashboardCategorySplit> {
    // @ts-ignore - custom property handled by interceptor
    return api.get(`${base}/category-split`, { ...options });
  },
  getLatestProduct(options?: {
    hideLoading?: boolean;
  }): Promise<IDashboardLatestProduct> {
    // @ts-ignore - custom property handled by interceptor
    return api.get(`${base}/latest-product`, { ...options });
  },
  getContentStatus(options?: {
    hideLoading?: boolean;
  }): Promise<IDashboardContentStatus> {
    // @ts-ignore - custom property handled by interceptor
    return api.get(`${base}/content-status`, { ...options });
  },
};
