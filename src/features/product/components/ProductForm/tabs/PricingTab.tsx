import { Input } from "../../../../../components/customControl/Input";
import type { ProductFormValues } from "../../../../../utils/validations/product.schema";

interface IPricingTab {
  fieldErrors: Partial<Record<keyof ProductFormValues, string>>;
  form: ProductFormValues;
  setField: <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) => void;
}

export const PricingTab = ({ fieldErrors, form, setField }: IPricingTab) => {
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setField(name as keyof ProductFormValues, value as any);
  };

  return (
    <div className="space-y-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          type="number"
          label="BASE PRICE ($) *"
          value={form.basePrice}
          onChange={handleTextChange}
          error={fieldErrors.basePrice}
          name="basePrice"
        />
        <Input
          type="number"
          label="COST PRICE ($)*"
          value={form.costPrice}
          onChange={handleTextChange}
          error={fieldErrors.costPrice}
          name="costPrice"
        />
        <Input
          type="number"
          label="DISCOUNT PRICE"
          value={form.discountPrice}
          onChange={handleTextChange}
          error={fieldErrors.discountPrice}
          name="discountPrice"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="number"
          label="STOCK UNITS *"
          value={form.stockUnits}
          onChange={handleTextChange}
          error={fieldErrors.stockUnits}
          name="stockUnits"
        />
        <Input
          type="number"
          label="LOW STOCK ALERT LEVEL"
          value={form.lowStockAlertLevel}
          onChange={handleTextChange}
          error={fieldErrors.lowStockAlertLevel}
          name="lowStockAlertLevel"
        />
      </div>
    </div>
  );
};
