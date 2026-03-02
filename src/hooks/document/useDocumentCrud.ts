import { useCallback } from "react";
import type { TBaseQuery } from "../../types/common.type";
import { useServiceHandler } from "../common/useServiceHandler";
import { documentService } from "../../services/document.service";

interface IProps {
  fetchDocuments: (override?: Partial<TBaseQuery>) => Promise<void>;
  query: TBaseQuery;
}

export const useDocumentCrud = ({ fetchDocuments, query }: IProps) => {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();

  const createDocument = useCallback(
    async (data: FormData) => {
      try {
        startLoading();
        await documentService.createDocument(data);
        await fetchDocuments({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to create Document , please try again");
        throw err;
      } finally {
        stopLoading();
      }
    },
    [fetchDocuments, query],
  );

  const deleteDocument = useCallback(
    async (id: string) => {
      try {
        startLoading();

        await documentService.deletDocument(id);

        await fetchDocuments({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to delete Document , please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchDocuments, query],
  );

  return { createDocument, deleteDocument, loading, error };
};
