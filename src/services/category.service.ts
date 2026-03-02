import api from "./api";
import type {
  ICategory,
  ICategoryPayload,
  ICategoryResponse,
} from "../types/category.type";
import type { TBaseQuery } from "../types/common.type";
import { ROUTES } from "../configs/route.config";

const base = ROUTES.APP.CATEGORIES;

export const categoryService = {
  getCategories(params: TBaseQuery): Promise<ICategoryResponse> {
    return api.get<any, ICategoryResponse>(base, { params });
  },

  createCategory(data: ICategoryPayload): Promise<ICategory> {
    return api.post<any, ICategory>(base, data);
  },

  updateCategory(id: string, data: ICategoryPayload): Promise<ICategory> {
    return api.put<any, ICategory>(`${base}/${id}`, data);
  },

  deleteCategory(id: string): Promise<void> {
    return api.delete<any, void>(`${base}/${id}`);
  },
};
