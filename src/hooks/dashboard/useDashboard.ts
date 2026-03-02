import { useCallback, useEffect, useState } from "react";
import { useServiceHandler } from "../common/useServiceHandler";
import { dashboardService } from "../../services/dashboard.service";
import type {
  IDashboardGrowth,
  IDashboardStats,
} from "../../types/dashboard.type";
import type {
  IDashboardCategorySplit,
  IDashboardContentStatus,
  IDashboardLatestProduct,
} from "../../types/dashboard.type";

export function useDashboard() {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();

  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [growth, setGrowth] = useState<IDashboardGrowth | null>(null);
  const [categoryList, setCategoryList] =
    useState<IDashboardCategorySplit | null>(null);
  const [latestProducts, setLatestProducts] = useState<
    IDashboardLatestProduct[] | null
  >(null);
  const [contentStatus, setContentStatus] =
    useState<IDashboardContentStatus | null>(null);

  const fetchStats = useCallback(async () => {
    const res = await dashboardService.getStats();
    setStats(res);
  }, []);

  const fetchGrowth = useCallback(async () => {
    const res = await dashboardService.getGrowth();
    setGrowth(res);
  }, []);

  const fetchCategoryList = useCallback(async () => {
    const res = await dashboardService.getCategorySplit();
    setCategoryList(res);
  }, []);

  const fetchLatestProducts = useCallback(async () => {
    const res = await dashboardService.getLatestProduct();
    setLatestProducts(res);
  }, []);

  const fetchContentStatus = useCallback(async () => {
    const res = await dashboardService.getContentStatus();
    setContentStatus(res);
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      startLoading();

      await Promise.all([
        fetchStats(),
        fetchGrowth(),
        fetchCategoryList(),
        fetchLatestProducts(),
        fetchContentStatus(),
      ]);
    } catch (err) {
      handleError(err, "unable to load dashboard, please try again");
      throw err;
    } finally {
      stopLoading();
    }
  }, [
    startLoading,
    stopLoading,
    handleError,
    fetchStats,
    fetchGrowth,
    fetchCategoryList,
    fetchLatestProducts,
    fetchContentStatus,
  ]);

  useEffect(() => {
    fetchAll().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stats,
    growth,
    categoryList,
    latestProducts,
    contentStatus,
    fetchStats,
    fetchGrowth,
    fetchCategoryList,
    fetchLatestProducts,
    fetchContentStatus,
    fetchAll,
    loading,
    error,
  };
}
