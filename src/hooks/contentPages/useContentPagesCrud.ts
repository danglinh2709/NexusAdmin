import { useCallback } from "react";
import type { TBaseQuery } from "../../types/common.type";
import { contentPagesService } from "../../services/contentPages.service";
import { useServiceHandler } from "../common/useServiceHandler";
interface IProps {
  fetchContentPages: (override?: Partial<TBaseQuery>) => Promise<void>;
  query: TBaseQuery;
}
export const useContentPagesCrud = ({ fetchContentPages, query }: IProps) => {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();

  const createContentPages = useCallback(
    async (data: FormData) => {
      try {
        startLoading();

        await contentPagesService.createContentPages(data);
        await fetchContentPages({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to create category, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchContentPages, query],
  );

  const updateContentPages = useCallback(
    async (id: string, data: FormData) => {
      try {
        startLoading();
        await contentPagesService.updateContentPages(id, data);

        await fetchContentPages({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to create category, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchContentPages, query],
  );

  const deleteContentPages = useCallback(
    async (id: string) => {
      try {
        startLoading();

        await contentPagesService.deleteContentPages(id);

        await fetchContentPages({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to create category, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchContentPages, query],
  );

  return {
    loading,
    error,
    createContentPages,
    updateContentPages,
    deleteContentPages,
  };
};
