import { useCallback } from "react";
import type { ICategoryPayload } from "../../types/category.type";
import { categoryService } from "../../services/category.service";
import type { TBaseQuery } from "../../types/common.type";
import { useServiceHandler } from "../common/useServiceHandler";

interface IProps {
  fetchCategories: (override?: Partial<TBaseQuery>) => Promise<void>;
  query: TBaseQuery;
}

export const useCategoryCrud = ({ fetchCategories, query }: IProps) => {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();
  const createCategory = useCallback(
    async (data: ICategoryPayload) => {
      try {
        startLoading();

        await categoryService.createCategory(data);

        await fetchCategories({
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
    [fetchCategories, query],
  );

  const updateCategory = useCallback(
    async (id: string, data: ICategoryPayload) => {
      try {
        startLoading();

        // Update data in Database
        await categoryService.updateCategory(id, data);

        // Update newest data to UI
        await fetchCategories({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to update category, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchCategories, query],
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        startLoading();

        await categoryService.deleteCategory(id);

        await fetchCategories({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to delete category, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchCategories, query],
  );

  return {
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
