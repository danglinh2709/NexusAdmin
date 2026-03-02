import type { ProductStatus } from "../configs/product.config";

export interface IDashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalCategories: number;
  publishedPages: number;
  draftPages: number;
  totalDocuments: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  featuredProducts: number;
}

export interface IDashboardGrowth {
  labels: string[];
  datasets: IGrowthDataset[];
}

export interface IGrowthDataset {
  name: string;
  data: number[];
}

export interface IDashboardCategorySplitItem {
  name: string;
  value: number;
  percentage: number;
}

export type IDashboardCategorySplit = IDashboardCategorySplitItem[];

export interface IDashboardLatestProduct {
  id: string;
  name: string;
  sku: string;
  basePrice: string;
  mainImage: string;
  createdAt: string;
  stockUnits?: number;
  brand?: string;
  status: ProductStatus;
}

export interface IDashboardContentStatusItem {
  id: string;
  title: string;
  status: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export type IDashboardContentStatus = IDashboardContentStatusItem[];
