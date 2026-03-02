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
  categoryId?: string;
  category?: string;
  status?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
};

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
