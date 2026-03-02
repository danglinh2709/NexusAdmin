export interface FilterState {
  categories: string[];
  status: string;
  promotion: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  status: "",
  promotion: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "createdAt",
  sortOrder: "DESC",
};
