import { Edit, Eye, Star, Trash2 } from "lucide-react";
import type { IProducts } from "../../../types/product.type";
import { Button } from "../../../components/customControl/Button";
import { PRODUCT_STATUS_UI } from "../../../configs/product.config";
import { Image } from "../../../components/customControl/Image";

interface IProductCard {
  product: IProducts;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ProductCard = ({ product, onDelete, onEdit }: IProductCard) => {
  const statusUI = PRODUCT_STATUS_UI[product.status];
  const base = Number(product.basePrice) || 0;
  const discount = Number(product.discountPrice) || 0;
  const sellingPrice = discount > 0 ? discount : base;
  const hasDiscount = discount > 0 && discount < base;

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  return (
    <div className="my-3 group relative flex flex-col rounded-[20px] bg-white shadow-sm transition-all hover:shadow-md border border-gray-100 overflow-hidden">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.mainImage}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.isFeatured && (
          <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-white shadow-sm">
            <Star className="h-4 w-4 fill-current" />
          </div>
        )}

        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white shadow-sm ${statusUI.color}`}
        >
          {statusUI.label}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600">
          {product.category?.name || "Uncategorized"}
        </div>

        <h3 className="mb-4 text-lg font-bold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-end justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Pricing
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${fmt(sellingPrice)}
              </span>
              {hasDiscount && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  ${fmt(base)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Stock
            </span>
            <span className="text-sm font-bold text-gray-700">
              {product.stockUnits}
            </span>
          </div>
        </div>

        <div className="mt-auto flex justify-end gap-2">
          <Button variant="ghost">
            <Eye size={18} />
          </Button>
          <Button variant="ghost" onClick={() => onEdit?.(product.id)}>
            <Edit size={18} />
          </Button>
          <Button variant="ghost" onClick={() => onDelete?.(product.id)}>
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
