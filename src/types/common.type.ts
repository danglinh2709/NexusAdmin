export interface IResponse<T> {
  items: T[];
  meta: {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export type TBaseQuery = {
  page: number;
  limit: number;
  search?: string;

  sortBy?: string;
  sortOrder?: "ASC" | "DESC";

  categories?: string[];
  status?: string;
  promotion?: string;

  minPrice?: number;
  maxPrice?: number;
};

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
