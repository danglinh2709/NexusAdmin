export interface IFilterState {
  categories: string[];
  status: string;
  promotion: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  sortOrder: "ASC" | "DESC";
}

export const DEFAULT_FILTERS: IFilterState = {
  categories: [],
  status: "",
  promotion: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "createdAt",
  sortOrder: "DESC",
};
