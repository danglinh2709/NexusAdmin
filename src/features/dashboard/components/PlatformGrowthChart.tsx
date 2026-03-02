import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { IDashboardGrowth } from "../../../types/dashboard.type";

interface PlatformGrowthChartProps {
  data: IDashboardGrowth | null;
}

export function PlatformGrowthChart({ data }: PlatformGrowthChartProps) {
  const chartData =
    data?.labels.map((label, index) => {
      const item: any = { name: label };
      data.datasets.forEach((dataset) => {
        item[dataset.name] = dataset.data[index] || 0;
      });
      return item;
    }) || [];

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F1F4F9] shadow-sm flex-1 min-h-[450px]">
      <div className="mb-8">
        <h2 className="text-[#1E293B] text-xl font-bold mb-1">
          Platform Growth
        </h2>
        <p className="text-[#8A92A6] text-sm">
          User engagement and activity trends over the last 7 months.
        </p>
      </div>

      <div className="h-[300px] w-full mt-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F4F9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8A92A6", fontSize: 10, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8A92A6", fontSize: 10, fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "1px solid #F1F4F9",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            {data?.datasets.map((dataset) => (
              <Area
                key={dataset.name}
                type="monotone"
                dataKey={dataset.name}
                stroke="#6366F1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
