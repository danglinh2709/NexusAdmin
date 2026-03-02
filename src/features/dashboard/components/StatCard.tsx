import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl `}>
          <Icon className={`w-6 h-6 text-[#8B5CF6]`} />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-[#64748B] text-sm font-medium">{label}</p>
        <p className="text-[#1E293B] text-3xl font-bold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
