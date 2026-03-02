import { ROUTES } from "../configs/route.config";
import type { TBaseQuery } from "../types/common.type";
import type { IDocument, IDocumentResponse } from "../types/document.type";
import api from "./api";

const base = ROUTES.APP.DOCUMENTS;

export const documentService = {
  getDocuments(params: TBaseQuery): Promise<IDocumentResponse> {
    return api.get<any, IDocumentResponse>(base, { params });
  },
  createDocument(data: FormData): Promise<IDocument> {
    return api.post(base, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deletDocument(id: string): Promise<void> {
    return api.delete<any, void>(`${base}/${id}`);
  },
};
