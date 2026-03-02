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
  minPrice: "0",
  maxPrice: "99999",
  sortBy: "createdAt",
  sortOrder: "DESC",
};
