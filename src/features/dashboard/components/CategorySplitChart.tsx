import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ICategoryData {
  name: string;
  value: number;
  color: string;
}

interface ICategorySplitChartProps {
  data: ICategoryData[];
  totalLabel?: string;
  totalValue?: number | string;
}

export function CategorySplitChart({
  data,
  totalLabel = "Total Items",
  totalValue,
}: ICategorySplitChartProps) {
  const displayTotal =
    totalValue ?? data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white p-8 rounded-[32px] border border-[#F1F4F9] shadow-sm w-full lg:w-[400px] min-h-[450px] flex flex-col">
      <div className="mb-8">
        <h2 className="text-[#1E293B] text-xl font-bold mb-1">
          Category Split
        </h2>
        <p className="text-[#8A92A6] text-sm">
          Distribution of products across main categories.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between">
        <div className="relative w-48 h-48 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #F1F4F9",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-4xl font-bold text-[#1E293B]">
              {displayTotal}
            </span>
            <span className="text-[10px] font-bold text-[#8A92A6] tracking-widest uppercase">
              {totalLabel}
            </span>
          </div>
        </div>

        <div className="w-full space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[#1E293B] text-sm font-semibold">
                  {item.name}
                </span>
              </div>
              <span className="text-[#1E293B] text-sm font-bold">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
