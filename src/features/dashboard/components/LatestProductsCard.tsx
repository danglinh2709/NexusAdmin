import { MoreHorizontal, ArrowRight } from "lucide-react";
import type { IDashboardLatestProduct } from "../../../types/dashboard.type";
import { Button } from "../../../components/customControl/Button";
import { PRODUCT_STATUS_UI } from "../../../configs/product.config";
import { Image } from "../../../components/customControl/Image";

interface Props {
  products: IDashboardLatestProduct[] | null;
}

export function LatestProductsCard({ products }: Props) {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-gray-100/60 shadow-sm flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#1E293B]">Latest Products</h2>
          <p className="text-sm text-[#8A92A6] mt-1">
            New additions to the hardware inventory.
          </p>
        </div>
        <Button size="sm" variant="none">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {products?.map((product) => {
          const statusUI = PRODUCT_STATUS_UI[product.status] || {
            label: product.status,
            color: "text-gray-500",
          };

          return (
            <div key={product.id} className="flex items-center gap-4">
              <Image
                src={product.mainImage}
                alt={product.name}
                className="w-14 h-14 rounded-xl object-cover bg-gray-50 border border-gray-100"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-[#1E293B] truncate">
                  {product.name}
                </h3>
              </div>
              <div className="text-right whitespace-nowrap">
                <div className="text-[15px] font-bold text-[#6366F1]">
                  ${Number(product.basePrice).toLocaleString()}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest mt-1">
                  {statusUI.label}
                </div>
              </div>
            </div>
          );
        })}

        {(!products || products.length === 0) && (
          <div className="text-sm text-gray-500 py-4 text-center">
            No products found.
          </div>
        )}
      </div>

      <Button size="sm" variant="none">
        View All Products
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
