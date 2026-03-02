import type { STATUS } from "../configs/category.config";
import type { IResponse } from "./common.type";

export interface IContentPages {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  title: string;
  slug: string;
  content: string;
  status: STATUS;
  featuredImage?: string;
}

export type IContentPagesResponse = IResponse<IContentPages>;
