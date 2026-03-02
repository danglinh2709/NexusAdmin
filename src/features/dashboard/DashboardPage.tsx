import { Users, FileText, FileStack } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { PlatformGrowthChart } from "./components/PlatformGrowthChart";
import { CategorySplitChart } from "./components/CategorySplitChart";
import { LatestProductsCard } from "./components/LatestProductsCard";
import { ContentStatusCard } from "./components/ContentStatusCard";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useMemo } from "react";

const COLORS = [
  "#10B981",
  "#F59E0B",
  "#6366F1",
  "#EF4444",
  "#8B5CF6",
  "#3B82F6",
  "#F43F5E",
  "#14B8A6",
  "#84CC16",
];

export function DashboardPage() {
  const { stats, growth, categoryList, latestProducts, contentStatus } =
    useDashboard();

  const categorySplitData = useMemo(() => {
    if (!categoryList) return [];
    return categoryList.map((item, index) => ({
      name: item.name,
      value: item.value,
      color: COLORS[index % COLORS.length],
    }));
  }, [categoryList]);

  const totalContent = categoryList
    ? categoryList.reduce((acc, curr) => acc + curr.value, 0)
    : 0;

  return (
    <div className="p-8">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Dashboard Overview
        </h1>
        <p className="text-[#8A92A6] mb-8 text-sm">
          System management and detailed overview.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-10">
          <StatCard
            icon={Users}
            label="Total Platform Users"
            value={stats?.totalUsers ?? 0}
          />

          <StatCard
            icon={FileStack}
            label="Published Pages"
            value={stats?.publishedPages ?? 0}
          />

          <StatCard
            icon={FileText}
            label="Stored Documents"
            value={stats?.totalDocuments ?? 0}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <PlatformGrowthChart data={growth} />
          <CategorySplitChart
            data={categorySplitData}
            totalLabel="Total Products"
            totalValue={totalContent}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <LatestProductsCard products={latestProducts} />
          <ContentStatusCard content={contentStatus} />
        </div>
      </div>
    </div>
  );
}
