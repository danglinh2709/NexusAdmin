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
  { value: "createdAt:DESC", label: "Newest Additions" },
  { value: "price:ASC", label: "Price: Low to High" },
  { value: "price:DESC", label: "Price: High to Low" },
  { value: "popularity:DESC", label: "Most Popular" },
];

export const PROMOTION_OPTIONS = [
  { value: "on_sale", label: "On Sale" },
  { value: "featured", label: "Featured" },
];
