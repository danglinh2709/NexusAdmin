import { useCallback, useState } from "react";
import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import type { TBaseQuery } from "../../types/common.type";
import type { IProducts, TProductsResponse } from "../../types/product.type";
import { productService } from "../../services/product.service";

export const useProductQuery = (
  initial: TBaseQuery = BASE_QUERY_CONFIG.default,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [query, setQuery] = useState<TBaseQuery>(initial);
  const [meta, setMeta] = useState<TProductsResponse["meta"] | null>(null);

  const fetchProducts = useCallback(
    async (override?: Partial<TBaseQuery>) => {
      const finalQuery = { ...query, ...override };

      try {
        setLoading(true);
        setError(null);

        const res = await productService.getProducts(finalQuery);
        setProducts(res.items);
        setMeta(res.meta);
        setQuery(finalQuery);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "unable to load products information, please try again",
        );
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  return { fetchProducts, meta, loading, error, query, setQuery, products };
};
