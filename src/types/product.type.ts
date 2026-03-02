import type { ProductStatus } from "../configs/product.config";
import type { ICategory } from "./category.type";
import type { IResponse } from "./common.type";

export interface IProducts {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: ICategory;
  basePrice: string;
  discountPrice: string;
  stockUnits: number;
  status: ProductStatus;
  isFeatured: boolean;
  mainImage: string;
  createdAt: string;

  images?: IProductImage[];

  barcode?: string;
  manufacturer?: string;
  weight?: string;
  dimensions?: string;
  description?: string;
  tags?: string[];

  costPrice?: string;
  lowStockAlertLevel?: number;
}

export interface IProductImage {
  id: string;
  url: string;
  isMain: boolean;
  sortOrder: number;
}

export type TProductsResponse = IResponse<IProducts>;
