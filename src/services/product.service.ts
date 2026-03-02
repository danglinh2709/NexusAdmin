import { ROUTES } from "../configs/route.config";
import type { IApiResponse, TBaseQuery } from "../types/common.type";
import type {
  IProductImage,
  IProducts,
  TProductsResponse,
} from "../types/product.type";
import api from "./api";

const base = ROUTES.APP.PRODUCTS;

export const productService = {
  async getProducts(
    params: TBaseQuery,
    options?: { hideLoading?: boolean },
  ): Promise<TProductsResponse> {
    return await api.get<any, TProductsResponse>(base, {
      params,
      ...options,
    });
  },

  createProduct(data: FormData): Promise<IProducts> {
    return api.post<any, IProducts>(base, data);
  },
  updateProduct(id: string, data: FormData): Promise<IProducts> {
    return api.put<any, IProducts>(`${base}/${id}`, data);
  },

  deleteProduct(id: string): Promise<void> {
    return api.delete<any, void>(`${base}/${id}`);
  },

  uploadProductImages(
    id: string,
    files: File[],
  ): Promise<IApiResponse<IProductImage[]>> {
    const formData = new FormData();

    files.forEach((f) => formData.append("images", f));

    return api.post<any, IApiResponse<IProductImage[]>>(
      `${base}/${id}/images`,
      formData,
    );
  },

  getProduct(id: string): Promise<IProducts> {
    return api.get<any, IProducts>(`${base}/${id}`);
  },
};
