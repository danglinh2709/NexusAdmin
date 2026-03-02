import { useCallback } from "react";
import type { TBaseQuery } from "../../types/common.type";
import { useServiceHandler } from "../common/useServiceHandler";
import { productService } from "../../services/product.service";
import type { IProducts } from "../../types/product.type";

interface IProps {
  fetchProducts: (override?: Partial<TBaseQuery>) => Promise<void>;
  query: TBaseQuery;
}

export const useProductCrud = ({ fetchProducts, query }: IProps) => {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();

  const createProduct = useCallback(
    async (data: FormData): Promise<IProducts> => {
      try {
        startLoading();
        const created = await productService.createProduct(data);
        await fetchProducts({
          page: 1,
          limit: query.limit,
          search: query.search,
        });

        return created;
      } catch (err) {
        handleError(err, "unable to create setting, please try again");
        throw err;
      } finally {
        stopLoading();
      }
    },
    [fetchProducts, query],
  );

  const updateProduct = useCallback(
    async (id: string, data: FormData) => {
      try {
        startLoading();

        await productService.updateProduct(id, data);

        await fetchProducts({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to update product, please try again");
        throw err;
      } finally {
        stopLoading();
      }
    },
    [fetchProducts, query],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        startLoading();

        await productService.deleteProduct(id);

        await fetchProducts({
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
    [fetchProducts, query],
  );

  return { createProduct, updateProduct, deleteProduct, loading, error };
};
