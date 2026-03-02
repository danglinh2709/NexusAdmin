import { useCallback, useEffect, useState } from "react";
import { useServiceHandler } from "../common/useServiceHandler";
import { dashboardService } from "../../services/dashboard.service";
import type {
  IDashboardGrowth,
  IDashboardStats,
} from "../../types/dashboard.type";
import type { IDashboardCategorySplit } from "../../types/product.type";

export function useDashboard() {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();

  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [growth, setGrowth] = useState<IDashboardGrowth | null>(null);
  const [categoryList, setCategoryList] =
    useState<IDashboardCategorySplit | null>(null);

  const fetchStats = useCallback(async () => {
    const res = await dashboardService.getStats({ hideLoading: true });
    setStats(res);
  }, []);

  const fetchGrowth = useCallback(async () => {
    const res = await dashboardService.getGrowth({ hideLoading: true });
    setGrowth(res);
  }, []);

  const fetchCategoryList = useCallback(async () => {
    const res = await dashboardService.getCategorySplit({ hideLoading: true });
    setCategoryList(res);
  }, []);

  const fetchAll = useCallback(async () => {
    try {
      startLoading();

      const [s, g, c] = await Promise.all([
        dashboardService.getStats({ hideLoading: true }),
        dashboardService.getGrowth({ hideLoading: true }),
        dashboardService.getCategorySplit({ hideLoading: true }),
      ]);

      setStats(s);
      setGrowth(g);
      setCategoryList(c);
    } catch (err) {
      handleError(err, "unable to load dashboard, please try again");
      throw err;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading, handleError]);

  useEffect(() => {
    fetchAll().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stats,
    growth,
    categoryList,
    fetchStats,
    fetchGrowth,
    fetchCategoryList,
    fetchAll,
    loading,
    error,
  };
}
