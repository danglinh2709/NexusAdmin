import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../../../../components/customControl/Button";
import { Input } from "../../../../../components/customControl/Input";
import type { FilterState } from "../../../../../configs/filter.config";
import {
  PRODUCT_STATUS_UI,
  PROMOTION_OPTIONS,
  SORT_OPTIONS,
} from "../../../../../configs/product.config";
import type { ICategory } from "../../../../../types/category.type";
import { useEffect, useRef, useState } from "react";

interface IProductFilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categoryOptions: ICategory[];
}

const SelectArrow = ({ color = "text-gray-400" }: { color?: string }) => (
  <span
    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${color}`}
  >
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

export const ProductFilterPanel = ({
  filters,
  onChange,
  categoryOptions,
}: IProductFilterPanelProps) => {
  const [catOpen, setCatOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleCategory = (value: string) => {
    const next = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value];
    onChange({ ...filters, categories: next });
  };

  const set =
    (key: keyof FilterState) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
      onChange({ ...filters, [key]: e.target.value });

  const selectedLabel =
    filters.categories.length === 0
      ? "Select Categories"
      : filters.categories.length === 1
        ? (categoryOptions.find((o) => o.id === filters.categories[0])?.name ??
          "Select Categories")
        : `${filters.categories.length} selected`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 mb-6">
        <div className="flex flex-col gap-1.5" ref={catRef}>
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8] mb-1">
            Categories
          </label>
          <div className="relative">
            <Button
              variant="secondary"
              className="w-full !bg-[#F1F5F9] !border-none !shadow-none !h-11 !px-4 text-[#475569] flex justify-between"
              type="button"
              onClick={() => setCatOpen((p) => !p)}
            >
              <span
                className={
                  filters.categories.length > 0
                    ? "text-[#1E293B] font-medium"
                    : "text-[#94A3B8]"
                }
              >
                {selectedLabel}
              </span>
              {catOpen ? (
                <ChevronUp size={16} className="text-[#94A3B8]" />
              ) : (
                <ChevronDown size={16} className="text-[#94A3B8]" />
              )}
            </Button>

            {catOpen && (
              <div className="absolute left-0 top-full mt-1 z-50 w-full bg-white border border-gray-100 rounded-xl shadow-lg py-2 overflow-hidden">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => onChange({ ...filters, categories: [] })}
                  className="w-full"
                >
                  Clear Selection
                </Button>

                {categoryOptions.map((opt) => {
                  const checked = filters.categories.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <span>{checked && <Check size={18} />}</span>
                      <Input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleCategory(opt.id)}
                      />
                      <span
                        className={`text-sm ${checked ? "text-gray-900 font-medium" : "text-gray-600"}`}
                      >
                        {opt.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8] mb-1">
            Status
          </label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={set("status")}
              className="w-full !bg-[#F1F5F9] border-none rounded-xl h-11 px-4 text-sm text-[#1E293B] font-medium appearance-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer"
            >
              <option value="">All Statuses</option>
              {Object.entries(PRODUCT_STATUS_UI).map(([key, config]) => (
                <option key={key} value={key}>
                  {config.label}
                </option>
              ))}
            </select>
            <SelectArrow color="text-[#94A3B8]" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8] mb-1">
            Promotion
          </label>
          <div className="relative">
            <select
              value={filters.promotion}
              onChange={set("promotion")}
              className="w-full !bg-[#F1F5F9] border-none rounded-xl h-11 px-4 text-sm text-[#1E293B] font-medium appearance-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer"
            >
              <option value="">All Products</option>
              {PROMOTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <SelectArrow color="text-[#94A3B8]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8] mb-1">
            Min Price ($)
          </label>
          <Input
            type="number"
            value={filters.minPrice}
            onChange={set("minPrice")}
            className="!bg-[#F1F5F9] border-none rounded-xl h-11 px-4 text-sm text-[#1E293B] font-medium focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8] mb-1">
            Max Price ($)
          </label>
          <Input
            type="number"
            value={filters.maxPrice}
            onChange={set("maxPrice")}
            className="!bg-[#F1F5F9] border-none rounded-xl h-11 px-4 text-sm text-[#1E293B] font-medium focus:ring-2 focus:ring-indigo-500/10 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#94A3B8] mb-1">
            Sort Results By
          </label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={set("sortBy")}
              className="w-full !bg-[#F1F5F9] border-none rounded-xl h-11 px-4 text-sm text-indigo-600 font-bold appearance-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <SelectArrow color="text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
