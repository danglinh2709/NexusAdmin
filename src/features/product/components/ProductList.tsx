import type { IProducts } from "../../../types/product.type";
import { ProductCard } from "./ProductCard";

interface IProductTableProps {
  products: IProducts[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
}
export const ProductList = ({
  products,
  onDelete,
  onEdit,
  loading,
}: IProductTableProps) => {
  return (
    <div
      className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
        loading ? "opacity-40 pointer-events-none" : "opacity-100"
      }`}
    >
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
