import { useEffect, useState } from "react";
import { SearchComponent } from "../../components/customControl/SearchComponent";
import { BASE_QUERY_CONFIG, FORM_MODE } from "../../configs/common.config";
import { useProductQuery } from "../../hooks/product/useProductQuery";
import { useDebounce } from "../../hooks/common/useDebounce";
import { ProductList } from "./components/ProductList";
import { Button } from "../../components/customControl/Button";
import { Plus } from "lucide-react";
import type { IProducts } from "../../types/product.type";
import { Pagination } from "../../components/customControl/Pagination";
import { ConfirmModal } from "../../components/customControl/ConfirmModal";
import { ProductForm } from "./components/ProductForm/ProductForm";
import { useProductCrud } from "../../hooks/product/useProductCrud";
import { productService } from "../../services/product.service";

import { useCategoryQuery } from "../../hooks/category/useCategoryQuery";
import { DEFAULT_FILTERS, type FilterState } from "../../configs/filter.config";
import { ProductFilterButton } from "./components/ProductForm/Filters/ProductFilterButton";
import { ProductFilterPanel } from "./components/ProductForm/Filters/ProductFilterPanel";
import { LoadingOverlay } from "../../components/customControl/LoadingOverlay";

export const ProductPage = () => {
  const queryHook = useProductQuery({
    ...BASE_QUERY_CONFIG.default,
  });

  const categoryHook = useCategoryQuery({
    ...BASE_QUERY_CONFIG.default,
    limit: 100,
  });

  const crudHook = useProductCrud({
    fetchProducts: queryHook.fetchProducts,
    query: queryHook.query,
  });

  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, BASE_QUERY_CONFIG.debounceTime);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const debouncedFilters = useDebounce(filters, 400);

  const [isCreating, setIsCreating] = useState(false);
  const [editProduct, setEditProduct] = useState<IProducts | null>(null);
  const [deleteToProduct, setDeleteToProduct] = useState<IProducts | null>(
    null,
  );

  useEffect(() => {
    categoryHook.fetchCategories();
  }, []);

  const handleApplyFilters = () => {
    const min = filters.minPrice.trim();
    const max = filters.maxPrice.trim();
    queryHook.fetchProducts({
      ...queryHook.query,
      page: 1,

      search: debouncedKeyword || undefined,

      categories: filters.categories.length ? filters.categories : undefined,

      status: filters.status || undefined,
      promotion: filters.promotion || undefined,

      minPrice: min !== "" ? Number(min) : undefined,
      maxPrice: max !== "" ? Number(max) : undefined,

      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });
  };

  useEffect(() => {
    handleApplyFilters();
  }, [debouncedKeyword, debouncedFilters]);

  const isFiltering =
    debouncedKeyword ||
    filters.categories.length > 0 ||
    filters.status ||
    filters.promotion ||
    filters.minPrice !== "0" ||
    filters.maxPrice !== "99999";

  const handleSubmit = async (payload: {
    data: FormData;
    mainImageFile: File | null;
    galleryFiles: File[];
  }) => {
    const { data, mainImageFile, galleryFiles } = payload;

    if (isCreating) {
      const created = await crudHook.createProduct(data);

      if (mainImageFile) {
        await productService.uploadProductImages(created.id, [mainImageFile]);
      }

      if (galleryFiles.length > 0) {
        await productService.uploadProductImages(created.id, galleryFiles);
      }
    } else if (editProduct) {
      await crudHook.updateProduct(editProduct.id, data);

      if (mainImageFile) {
        await productService.uploadProductImages(editProduct.id, [
          mainImageFile,
        ]);
      }

      if (galleryFiles.length > 0) {
        await productService.uploadProductImages(editProduct.id, galleryFiles);
      }

      await queryHook.fetchProducts({
        ...queryHook.query,
        page: queryHook.query.page,
        search: debouncedKeyword || undefined,
      });
    }

    setIsCreating(false);
    setEditProduct(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteToProduct) {
      await crudHook.deleteProduct(deleteToProduct.id);
      setDeleteToProduct(null);
    }
  };

  const onPageChange = (page: number) => {
    queryHook.fetchProducts({
      ...queryHook.query,
      page,
    });
  };

  const handleEdit = async (id: string) => {
    const p = queryHook.products.find((x) => x.id === id);
    if (p) {
      setEditProduct(p);
      setIsCreating(true);
    }
  };

  const handleDelete = async (id: string) => {
    const p = queryHook.products.find((x) => x.id === id);
    if (p) setDeleteToProduct(p);
  };
  return (
    <div>
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#1E293B]">
            Product Management
          </h1>
          <p className="text-[#8A92A6] mb-8 text-sm">
            System management and detailed overview.
          </p>
        </div>

        {isCreating || editProduct ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="w-full bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
              <ProductForm
                mode={isCreating ? FORM_MODE.CREATE : FORM_MODE.EDIT}
                initialData={editProduct}
                categoryOptions={categoryHook.categories}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsCreating(false);
                  setEditProduct(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-white">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[18px] font-bold text-[#1E293B]">
                      {isFiltering ? "Filtered Results" : "Recent Products"}
                    </h2>
                    {isFiltering && (
                      <span className="bg-indigo-50 text-indigo-600 text-[11px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                        {queryHook.meta?.totalItems ?? 0} found
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1">
                    <SearchComponent
                      placeholder="Search name, SKU..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      containerClassName="!w-full sm:!w-[300px] lg:!w-[360px]"
                    />

                    <ProductFilterButton
                      isOpen={isFilterOpen}
                      onToggle={() => setIsFilterOpen((prev) => !prev)}
                    />
                  </div>

                  <Button
                    onClick={() => setIsCreating(true)}
                    className="!bg-indigo-600 hover:!bg-indigo-700 !h-10 !rounded-xl !px-6"
                  >
                    <Plus size={20} strokeWidth={2.5} />
                    Add Product
                  </Button>
                </div>

                {isFilterOpen && (
                  <div className="mt-6 p-6 bg-[#F8FAFC] rounded-2xl border border-gray-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <ProductFilterPanel
                      filters={filters}
                      onChange={setFilters}
                      categoryOptions={categoryHook.categories}
                    />
                  </div>
                )}
              </div>

              <div className="p-6 relative">
                {queryHook.loading && (
                  <LoadingOverlay open={queryHook.loading} text="Loading..." />
                )}

                <ProductList
                  products={queryHook.products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  loading={false}
                />

                {!queryHook.loading && queryHook.products.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center text-center px-6">
                    No products found
                  </div>
                )}
              </div>
            </div>

            {queryHook.meta && (
              <Pagination
                currentPage={queryHook.query.page}
                totalPages={queryHook.meta.totalPages}
                onChange={onPageChange}
              />
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteToProduct?.name}"? This action cannot be undone.`}
        isOpen={!!deleteToProduct}
        onClose={() => setDeleteToProduct(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
