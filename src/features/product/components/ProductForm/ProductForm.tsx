import { useEffect, useMemo, useState, type JSX } from "react";
import { AlertCircle, Package, X } from "lucide-react";
import { FORM_MODE, type FormMode } from "../../../../configs/common.config";
import type { IProductImage, IProducts } from "../../../../types/product.type";
import { ProductFormSidebar } from "./ProductFormSidebar";
import { PricingTab } from "./tabs/PricingTab";
import { MediaTab } from "./tabs/MediaTab";
import { SeoTab } from "./tabs/SeoTab";
import { Button } from "../../../../components/customControl/Button";
import {
  PRODUCT_FORM_TABS,
  type TProductFormTab,
} from "../../../../configs/product-form.config";
import type { ICategory } from "../../../../types/category.type";
import { GeneralTab } from "./tabs/GeneralTab";
import {
  productSchema,
  type ProductFormValues,
} from "../../../../utils/validations/product.schema";
import { ZodError } from "zod";
import { ApiError } from "../../../../utils/api-error";
import { ERROR_CODE } from "../../../../configs/error.config";

interface IProductFormProps {
  mode: FormMode;
  initialData?: IProducts | null;
  onCancel: () => void;
  categoryOptions: ICategory[];
  onSubmit: (payload: {
    data: FormData;
    mainImageFile: File | null;
    galleryFiles: File[];
  }) => Promise<void>;
}

const TAB_CONTENT = (
  fieldErrors: Partial<Record<keyof ProductFormValues, string>>,
  form: ProductFormValues,
  setField: <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) => void,

  handlers: {
    setMainImageFile: (file: File | null) => void;
    addGalleryFiles: (files: File[]) => void;
    removeGalleryFile: (index: number) => void;
    categoryOptions: ICategory[];
  },
) =>
  ({
    general: () => (
      <GeneralTab
        fieldErrors={fieldErrors}
        form={form}
        setField={setField}
        categories={handlers.categoryOptions}
      />
    ),
    pricing: () => (
      <PricingTab fieldErrors={fieldErrors} form={form} setField={setField} />
    ),
    media: () => (
      <MediaTab
        fieldErrors={fieldErrors}
        form={form}
        setField={setField}
        onMainImageFileChange={handlers.setMainImageFile}
        onGalleryFilesChange={handlers.addGalleryFiles}
        onGalleryRemove={handlers.removeGalleryFile}
      />
    ),
    seo: () => <SeoTab />,
  }) satisfies Record<TProductFormTab, () => JSX.Element>;

export const ProductForm = ({
  mode,
  onCancel,
  onSubmit,
  initialData,
  categoryOptions,
}: IProductFormProps) => {
  const isCreate = mode === FORM_MODE.CREATE;
  const [activeTab, setActiveTab] = useState<TProductFormTab>(
    PRODUCT_FORM_TABS[0].id,
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ProductFormValues, string>>
  >({});

  const [isDisplayErrors, setIsDisplayErrors] = useState<boolean>(false);

  const [form, setForm] = useState<ProductFormValues>({
    name: "",
    sku: "",
    barcode: "",
    categoryId: "",
    brand: "",
    manufacturer: "",
    weight: "",
    dimensions: "",
    description: "",
    tags: [] as string[],
    isFeatured: false,
    basePrice: 0,
    costPrice: 0,
    discountPrice: 0,
    stockUnits: 0,
    lowStockAlertLevel: 5,
    mainImage: "",
    images: [] as string[],
  });

  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const setField = <K extends keyof ProductFormValues>(
    key: K,
    value: ProductFormValues[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      return { ...prev, [key]: undefined };
    });
  };

  const normalizeImages = (raw: unknown): string[] => {
    if (!Array.isArray(raw)) return [];
    return raw
      .map((x) => {
        if (typeof x === "string") return x;
        if (x && typeof x === "object" && "url" in (x as any))
          return String((x as any).url || "");
        return "";
      })
      .filter(Boolean);
  };

  // initial data for edit
  useEffect(() => {
    if (!initialData) return;

    setForm({
      name: initialData.name ?? "",
      sku: initialData.sku ?? "",
      barcode: initialData.barcode ?? "",

      categoryId: initialData.category?.id ?? "",

      brand: initialData.brand ?? "",
      manufacturer: initialData.manufacturer ?? "",

      weight: initialData.weight ?? "",
      dimensions: initialData.dimensions ?? "",
      description: initialData.description ?? "",
      tags: initialData.tags ?? [],

      isFeatured: !!initialData.isFeatured,

      basePrice: initialData.basePrice ? Number(initialData.basePrice) : 0,
      costPrice: (initialData as any).costPrice
        ? Number((initialData as any).costPrice)
        : 0,
      discountPrice: initialData.discountPrice
        ? Number(initialData.discountPrice)
        : undefined,
      stockUnits: initialData.stockUnits ? Number(initialData.stockUnits) : 0,

      lowStockAlertLevel: (initialData as any).lowStockAlertLevel
        ? Number((initialData as any).lowStockAlertLevel)
        : 5,
      mainImage: initialData.mainImage ?? "",

      images: normalizeImages((initialData as any).images),
    });

    setMainImageFile(null);
    setGalleryFiles([]);
  }, [initialData]);

  // create + edit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsDisplayErrors(true);
      setFieldErrors({});

      const validated = productSchema.parse(form);

      const formData = new FormData();
      formData.append("name", validated.name);
      formData.append("sku", validated.sku);
      formData.append("categoryId", validated.categoryId);
      formData.append("brand", validated.brand);
      formData.append("manufacturer", validated.manufacturer);

      const appendIf = (k: string, v?: any) => {
        if (v === undefined || v === null || v === "") return;
        formData.append(k, String(v));
      };

      appendIf("barcode", validated.barcode);
      appendIf("weight", validated.weight);
      appendIf("dimensions", validated.dimensions);
      appendIf("description", validated.description);
      if (Number(validated.discountPrice) > 0) {
        formData.append("discountPrice", String(validated.discountPrice));
      }
      formData.append("isFeatured", String(!!validated.isFeatured));
      formData.append("basePrice", String(validated.basePrice));
      formData.append("costPrice", String(validated.costPrice));
      formData.append("stockUnits", String(validated.stockUnits ?? 0));
      formData.append(
        "lowStockAlert",
        String(validated.lowStockAlertLevel ?? 5),
      );

      if (validated.mainImage) {
        formData.append("mainImage", validated.mainImage);
      }
      (validated.tags ?? []).forEach((t) => formData.append("tags", t));
      (validated.images ?? []).forEach((img) => formData.append("images", img));

      await onSubmit({ data: formData, mainImageFile, galleryFiles });

      onCancel();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: typeof fieldErrors = {};
        err.issues.forEach((e) => {
          const key = (e.path[0] || e.path[1]) as keyof ProductFormValues;
          errors[key] = e.message;
        });
        setFieldErrors(errors);
        return;
      }

      if (err instanceof ApiError) {
        if (err.code === ERROR_CODE.CONFLICT) {
          setFieldErrors({ name: err.message });
          return;
        }
        setError(err.message);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const uiFieldErrors = isDisplayErrors ? fieldErrors : {};

  // tabs
  const tabs = TAB_CONTENT(uiFieldErrors, form, setField, {
    setMainImageFile,
    addGalleryFiles: (files) => setGalleryFiles((prev) => [...prev, ...files]),
    removeGalleryFile,
    categoryOptions,
  });

  // accu
  const estMargin = useMemo(() => {
    const base = Number(form.basePrice) || 0;
    const discount = Number(form.discountPrice) || 0;
    const cost = Number(form.costPrice) || 0;

    const sellingPrice = discount > 0 ? discount : base;

    if (sellingPrice <= 0) return "0.00";

    const margin = ((sellingPrice - cost) / sellingPrice) * 100;

    if (!Number.isFinite(margin)) return "0.00";

    return margin.toFixed(2);
  }, [form.basePrice, form.discountPrice, form.costPrice]);

  return (
    <div className="flex flex-col" style={{ minHeight: "560px" }}>
      <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <Package className="w-6 h-6 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1E293B]">
              {isCreate ? "Create New Product" : "Edit Product"}
            </h2>
            <p className="text-sm text-[#94A3B8] mt-0.5">
              Configure all product specifications and market details.
            </p>
          </div>
        </div>

        <Button variant="none" onClick={onCancel}>
          <X size={24} />
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ProductFormSidebar
          onTabChange={setActiveTab}
          estMargin={estMargin}
          fieldErrors={uiFieldErrors}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">{tabs[activeTab]()}</div>

          <div className="px-8 py-5 bg-white border-t border-gray-100 flex justify-end gap-4 shrink-0">
            <Button onClick={onCancel}>Discard Changes</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading
                ? isCreate
                  ? "Saving..."
                  : "Updating..."
                : isCreate
                  ? "Save "
                  : "Update "}
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}
    </div>
  );
};
