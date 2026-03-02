import { Users, FileText, FileStack } from "lucide-react";
import { StatCard } from "./components/StatCard";
import { PlatformGrowthChart } from "./components/PlatformGrowthChart";
import { CategorySplitChart } from "./components/CategorySplitChart";
import { useDashboard } from "../../hooks/dashboard/useDashboard";

export function DashboardPage() {
  const { stats, growth } = useDashboard();

  const categorySplitData = stats
    ? [
        {
          name: "Published Pages",
          value: stats.publishedPages,
          color: "#10B981",
        },
        { name: "Draft Pages", value: stats.draftPages, color: "#F59E0B" },
        { name: "Documents", value: stats.totalDocuments, color: "#6366F1" },
        { name: "Low Stock", value: stats.lowStockProducts, color: "#EF4444" },
        { name: "Featured", value: stats.featuredProducts, color: "#8B5CF6" },
      ]
    : [];

  const totalContent = stats
    ? stats.publishedPages + stats.draftPages + stats.totalDocuments
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
            totalLabel="Total Assets"
            totalValue={totalContent}
          />
        </div>
      </div>
    </div>
  );
}
