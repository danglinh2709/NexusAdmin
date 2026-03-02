import { SlidersHorizontal } from "lucide-react";
import { Button } from "../../../../../components/customControl/Button";

interface IProductFilterButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ProductFilterButton = ({
  isOpen,
  onToggle,
}: IProductFilterButtonProps) => (
  <Button
    onClick={onToggle}
    className={`!h-10 px-5 !rounded-lg border-2 transition-all ${
      isOpen
        ? "!bg-indigo-50 !border-indigo-200 !text-indigo-600 !shadow-none"
        : "!bg-white !border-gray-100 !text-gray-500 hover:!border-gray-200"
    }`}
  >
    <SlidersHorizontal size={16} strokeWidth={2.5} />
    <span> Filters</span>
  </Button>
);
