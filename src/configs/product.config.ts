export type ProductStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export const PRODUCT_STATUS_UI: Record<
  ProductStatus,
  { label: string; color: string }
> = {
  IN_STOCK: {
    label: "In stock",
    color: "bg-green-500",
  },
  LOW_STOCK: {
    label: "Low stock",
    color: "bg-orange-400",
  },
  OUT_OF_STOCK: {
    label: "Out of stock",
    color: "bg-red-500",
  },
};

export const PRODUCT_TEXT = {
  uncategorized: "Uncategorized",
  pricing: "Pricing",
  stock: "Stock",
};

export const formatCurrency = (value: string | number) =>
  Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const SORT_OPTIONS = [
  {
    label: "Newest Additions",
    sortBy: "createdAt",
    sortOrder: "DESC" as const,
  },
  { label: "Oldest Additions", sortBy: "createdAt", sortOrder: "ASC" as const },

  {
    label: "Price: Low to High",
    sortBy: "basePrice",
    sortOrder: "ASC" as const,
  },
  {
    label: "Price: High to Low",
    sortBy: "basePrice",
    sortOrder: "DESC" as const,
  },

  {
    label: "Stock: Low to High",
    sortBy: "stockUnits",
    sortOrder: "ASC" as const,
  },
  {
    label: "Stock: High to Low",
    sortBy: "stockUnits",
    sortOrder: "DESC" as const,
  },

  { label: "Name: A to Z", sortBy: "name", sortOrder: "ASC" as const },
  { label: "Name: Z to A", sortBy: "name", sortOrder: "DESC" as const },
];

export const PROMOTION_OPTIONS = [
  { label: "All Products", value: "" },
  { label: "Featured Only", value: "featured" },
  { label: "Standard Only", value: "standard" },
];
