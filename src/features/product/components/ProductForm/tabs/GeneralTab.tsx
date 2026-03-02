import { Star } from "lucide-react";
import { Button } from "../../../../../components/customControl/Button";
import { Input } from "../../../../../components/customControl/Input";
import { Field } from "../../../../../components/customControl/Field";
import type { ICategory } from "../../../../../types/category.type";
import { type ProductFormValues } from "../../../../../utils/validations/product.schema";
import { TagInput } from "../../../../../components/customControl/TagInput";

interface IGeneralTab {
  fieldErrors: Partial<Record<keyof ProductFormValues, string>>;
  form: ProductFormValues;
  setField: <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) => void;
  categories: ICategory[];
}

export const GeneralTab = ({
  fieldErrors,
  form,
  setField,
  categories,
}: IGeneralTab) => {
  const enabled = form.isFeatured;

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setField(name as keyof ProductFormValues, value as any);
  };

  const handleAddTag = (newTag: string) => {
    const tag = newTag.trim();
    if (!tag) return;

    const current = form.tags ?? [];
    if (current.includes(tag)) return;

    setField("tags", [...current, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    const current = form.tags ?? [];
    setField(
      "tags",
      current.filter((t) => t !== tag),
    );
  };
  const MAX_TAGS = 8;

  return (
    <div className="space-y-6">
      <div
        className={`rounded-2xl border px-6 py-5 transition ${
          enabled
            ? "border-indigo-200 bg-indigo-50"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`mt-0.5 transition-colors ${
                enabled ? "text-yellow-500" : "text-indigo-300"
              }`}
            >
              <Star
                size={24}
                strokeWidth={1.5}
                fill={enabled ? "#facc15" : "none"}
              />
            </div>

            <div>
              <h3 className="text-indigo-900 font-semibold text-lg">
                Featured Product
              </h3>
              <p className="text-indigo-600 text-sm mt-1">
                Highlight this product in the store frontend.
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={() => setField("isFeatured", !enabled)}
            className={`relative h-7 w-12 p-0 rounded-full transition-colors duration-300 ${
              enabled ? "bg-indigo-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="PRODUCT NAME *"
            placeholder="e.g. Nexus Ultra Pro"
            value={form.name}
            onChange={handleTextChange}
            error={fieldErrors.name}
            name="name"
          />
          <Input
            label="SKU (FORMAT: XXX-000-XX) *"
            placeholder="APL-123-MB"
            value={form.sku}
            onChange={handleTextChange}
            error={fieldErrors.sku}
            name="sku"
          />
          <Input
            label="BARCODE / EAN"
            placeholder="1234567890123"
            value={form.barcode}
            onChange={handleTextChange}
            error={fieldErrors.barcode}
            name="barcode"
          />

          <Field label="CATEGORY *" error={fieldErrors.categoryId}>
            <select
              name="categoryId"
              value={form.categoryId ?? ""}
              onChange={(e) => setField("categoryId", e.target.value)}
              className={[
                "h-12 w-full rounded-xl px-4 outline-none transition",
                "border border-slate-200 bg-white text-slate-900",
                "focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300",
                "disabled:bg-slate-50 disabled:text-slate-400",
              ].join(" ")}
            >
              <option value="">Select Category</option>
              {(categories ?? []).map((cat: ICategory) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}{" "}
            </select>
          </Field>

          <Input
            name="brand"
            label="BRAND *"
            placeholder="e.g. Nexus"
            value={form.brand}
            onChange={handleTextChange}
            error={fieldErrors.brand}
          />
          <Input
            name="manufacturer"
            label="MANUFACTURER *"
            placeholder="e.g. Nexus Systems Corp"
            value={form.manufacturer}
            onChange={handleTextChange}
            error={fieldErrors.manufacturer}
          />
          <Input
            name="weight"
            label="WEIGHT (E.G. 1.5KG)"
            placeholder="1.5 kg"
            value={form.weight}
            onChange={handleTextChange}
            error={fieldErrors.weight}
          />
          <Input
            name="dimensions"
            label="DIMENSIONS (E.G. 10X20X5CM)"
            placeholder="10 x 20 x 5 cm"
            value={form.dimensions}
            onChange={handleTextChange}
            error={fieldErrors.dimensions}
          />

          <Field label="DESCRIPTION" className="md:col-span-2">
            <textarea
              name="description"
              onChange={handleTextChange}
              placeholder="Describe the product value proposition..."
              rows={5}
              className={[
                "w-full rounded-xl px-4 py-3 outline-none transition resize-none",
                "border border-slate-200 bg-white text-slate-900",
                "placeholder:text-slate-400",
                "focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300",
              ].join(" ")}
              value={form.description}
            />
          </Field>

          <div className="md:col-span-2">
            <TagInput
              maxTags={MAX_TAGS}
              label="PRODUCT TAG (1-8) *"
              values={form.tags ?? []}
              addTag={handleAddTag}
              removeTag={handleRemoveTag}
              error={fieldErrors.tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
