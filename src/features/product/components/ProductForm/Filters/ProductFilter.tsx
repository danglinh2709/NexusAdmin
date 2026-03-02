import type { ICategory } from "../../../../../types/category.type";
import type { FilterState } from "../../../../../configs/filter.config";
import { ProductFilterButton } from "./ProductFilterButton";
import { ProductFilterPanel } from "./ProductFilterPanel";

interface IProductFilterProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  categoryOptions: ICategory[];
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductFilter = ({
  filters,
  setFilters,
  categoryOptions,
  isOpen,
  onToggle,
}: IProductFilterProps) => {
  return (
    <div className="w-full">
      <ProductFilterButton isOpen={isOpen} onToggle={onToggle} />
      {isOpen && (
        <div className="mt-3">
          <ProductFilterPanel
            filters={filters}
            onChange={setFilters}
            categoryOptions={categoryOptions}
          />
        </div>
      )}
    </div>
  );
};
