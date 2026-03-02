import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import type { TBaseQuery } from "../../types/common.type";
import { useCallback, useState } from "react";
import type {
  IContentPages,
  IContentPagesResponse,
} from "../../types/contentPages.type";
import { contentPagesService } from "../../services/contentPages.service";

export const useContentPagesQuery = (
  initial: TBaseQuery = BASE_QUERY_CONFIG.default,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<TBaseQuery>(initial);
  const [contentPages, setContentPages] = useState<IContentPages[]>([]);
  const [meta, setMeta] = useState<IContentPagesResponse["meta"] | null>(null);

  const fetchContentPages = useCallback(
    async (override?: Partial<TBaseQuery>) => {
      const finalQuery = { ...query, ...override };

      try {
        setLoading(true);
        setError(null);

        const res = await contentPagesService.getContentPages(finalQuery);
        setContentPages(res.items);
        setMeta(res.meta);
        setQuery(finalQuery);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "unable to load content pages information, please try again",
        );
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  return {
    contentPages,
    meta,
    loading,
    error,
    query,
    fetchContentPages,
    setQuery,
  };
};
