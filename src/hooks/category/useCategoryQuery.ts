import { useCallback, useState } from "react";
import type { TBaseQuery } from "../../types/common.type";
import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import type { ICategory, ICategoryResponse } from "../../types/category.type";
import { categoryService } from "../../services/category.service";

export const useCategoryQuery = (
  initial: TBaseQuery = BASE_QUERY_CONFIG.default,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [meta, setMeta] = useState<ICategoryResponse["meta"] | null>(null);
  const [query, setQuery] = useState<TBaseQuery>(initial);

  const fetchCategories = useCallback(
    async (override?: Partial<TBaseQuery>) => {
      const finalQuery = { ...query, ...override };

      try {
        setLoading(true);
        setError(null);

        const res = await categoryService.getCategories(finalQuery);
        setCategories(res.items);
        setMeta(res.meta);
        setQuery(finalQuery);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "unable to load category information, please try again",
        );
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  return {
    categories,
    meta,
    loading,
    error,
    query,
    fetchCategories,
    setQuery,
  };
};
