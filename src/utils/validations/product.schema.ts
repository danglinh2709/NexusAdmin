import { z } from "zod";

const SKU_REGEX = /^[A-Z]{3}-\d{3}-[A-Z]{2}$/;

const toNumber = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return undefined;
  const n = typeof v === "number" ? v : Number(v);
  return Number.isNaN(n) ? undefined : n;
};

export const productSchema = z
  .object({
    name: z.string().trim().min(1, "Product name is required"),

    sku: z
      .string()
      .trim()
      .min(1, "SKU is required")
      .regex(SKU_REGEX, "Format: XXX-000-XX (e.g., APL-123-MB)"),

    barcode: z.string().trim().optional(),

    categoryId: z.string().trim().min(1, "Category selection is required"),

    brand: z.string().trim().min(1, "Brand is required"),

    manufacturer: z.string().trim().min(1, "Manufacturer is required"),

    weight: z.string().trim().optional(),
    dimensions: z.string().trim().optional(),
    description: z.string().trim().optional(),

    tags: z
      .array(z.string().trim().min(1, "Tag cannot be empty"))
      .min(1, "At least 1 tag is required")
      .max(8, "Maximum 8 tags"),

    isFeatured: z.boolean().optional(),

    basePrice: z.preprocess(
      toNumber,
      z.number({ error: "Base price is required" }).gt(0, "Price must be > 0"),
    ),

    costPrice: z.preprocess(
      toNumber,
      z
        .number({ error: "Cost price is required" })
        .gt(0, "Cost price must be > 0"),
    ),

    discountPrice: z.preprocess(toNumber, z.number().optional()),

    stockUnits: z.preprocess(toNumber, z.number().int().min(0)),
    lowStockAlertLevel: z.preprocess(toNumber, z.number().default(5)),

    mainImage: z.string().optional(),
    images: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.costPrice >= data.basePrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["costPrice"],
        message: "Cost price must be less than base price",
      });
    }

    if (data.discountPrice !== undefined) {
      if (data.discountPrice >= data.basePrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discountPrice"],
          message: "Discount must be less than base price",
        });
      }
      if (data.discountPrice <= data.costPrice) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discountPrice"],
          message: "Discount must be greater than cost price",
        });
      }
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;
