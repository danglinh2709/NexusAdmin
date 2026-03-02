import { useCallback, useState } from "react";
import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import type { TBaseQuery } from "../../types/common.type";
import { documentService } from "../../services/document.service";
import type { IDocument, IDocumentResponse } from "../../types/document.type";

export const useDocumentQuery = (
  initial: TBaseQuery = BASE_QUERY_CONFIG.default,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<TBaseQuery>(initial);
  const [document, setDocument] = useState<IDocument[]>([]);
  const [meta, setMeta] = useState<IDocumentResponse["meta"] | null>(null);

  const fetchDocuments = useCallback(
    async (override: Partial<TBaseQuery> = BASE_QUERY_CONFIG.default) => {
      const finalQuery = { ...initial, ...override };
      try {
        setLoading(true);
        setError(null);

        const res = await documentService.getDocuments(finalQuery);
        setDocument(res.items);
        setMeta(res.meta);
        setQuery(finalQuery);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "unable to load settings information, please try again",
        );
      } finally {
        setLoading(false);
      }
    },
    [query],
  );
  return {
    document,
    meta,
    loading,
    error,
    fetchDocuments,
    setQuery,
    query,
  };
};
