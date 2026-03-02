import { BadgeDollarSign } from "lucide-react";
import { Button } from "../../../../components/customControl/Button";
import {
  PRODUCT_FORM_TABS,
  type ProductFormTab,
} from "../../../../configs/product-form.config";

interface ProductFormSidebarProps {
  onTabChange: (tab: ProductFormTab) => void;
  estMargin: string;
  fieldErrors: Record<string, string | undefined>;
}

const TAB_FIELDS: Record<ProductFormTab, string[]> = {
  general: ["name", "sku", "categoryId", "brand", "manufacturer", "tags"],
  media: ["images", "mainImage"],
  pricing: ["basePrice", "costPrice", "discountPrice"],
  seo: ["barcode", "description"],
};

export const ProductFormSidebar = ({
  onTabChange,
  estMargin,
  fieldErrors,
}: ProductFormSidebarProps) => {
  return (
    <div className="w-56 flex-shrink-0 border-r border-gray-100 pt-6 pb-6 px-4 flex flex-col gap-1 text-bold">
      {PRODUCT_FORM_TABS.map((tab) => {
        const Icon = tab.icon;
        const hasError = TAB_FIELDS[tab.id].some((f) => !!fieldErrors[f]);

        return (
          <Button
            variant="ghost"
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="w-full justify-start gap-3"
          >
            <span className="relative">
              <Icon size={15} />
              {hasError && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
              )}
            </span>

            <span className="flex-1 text-left">{tab.label}</span>
          </Button>
        );
      })}

      <div className="mt-auto mx-1">
        <div className="rounded-2xl bg-gradient-to-br from-[#F0F4FF] to-[#E8EDFF] border border-[#D6E0FF] p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7B8EC8] flex items-center gap-1.5">
            <BadgeDollarSign /> Est. Margin
          </p>{" "}
          {estMargin}
          <p className="text-2xl font-extrabold text-blue-700 mt-1"></p>
        </div>
      </div>
    </div>
  );
};
