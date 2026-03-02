import { ROUTES } from "../configs/route.config";
import type { TBaseQuery } from "../types/common.type";
import type {
  IContentPages,
  IContentPagesResponse,
} from "../types/contentPages.type";
import api from "./api";

const base = ROUTES.APP.PAGES;

export const contentPagesService = {
  getContentPages(params: TBaseQuery): Promise<IContentPagesResponse> {
    return api.get<any, IContentPagesResponse>(base, { params });
  },
  createContentPages(data: FormData): Promise<IContentPages> {
    return api.post(base, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateContentPages(id: string, data: FormData): Promise<IContentPages> {
    return api.put(`${base}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteContentPages(id: string): Promise<void> {
    return api.delete<any, void>(`${base}/${id}`);
  },
};
