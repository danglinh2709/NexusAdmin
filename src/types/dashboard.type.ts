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
