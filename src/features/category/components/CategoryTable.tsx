import { BaseTable } from "../../../components/layouts/table/BaseTable";
import type { ICategory } from "../../../types/category.type";
import { CategoryRow } from "./CategoryRow";

interface ICategoryTableProps {
  categories: ICategory[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
}: ICategoryTableProps) => {
  return (
    <BaseTable
      columns={[
        { title: "CATEGORY NAME", className: "pl-6 w-[30%]" },
        { title: "DESCRIPTION" },
        { title: "PRODUCTS", className: "text-center w-[15%]" },
        { title: "ACTIONS", className: "pr-6 text-right w-[10%]" },
      ]}
      data={categories}
      renderRow={(c) => (
        <CategoryRow
          key={c.id}
          category={c}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};
