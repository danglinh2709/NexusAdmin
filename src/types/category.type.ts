import type { IResponse } from "./common.type";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ICategoryResponse = IResponse<ICategory>;

export interface ICategoryPayload {
  name?: string;
  description?: string;
}
