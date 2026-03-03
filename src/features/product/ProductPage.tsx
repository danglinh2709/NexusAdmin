import { useEffect, useState } from "react";
import { SearchComponent } from "../../components/customControl/SearchComponent";
import {
  BASE_QUERY_CONFIG,
  FORM_MODE,
  type FormMode,
} from "../../configs/common.config";
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
import {
  DEFAULT_FILTERS,
  type IFilterState,
} from "../../configs/filter.config";
import { ProductFilterButton } from "./components/ProductForm/Filters/ProductFilterButton";
import { ProductFilterPanel } from "./components/ProductForm/Filters/ProductFilterPanel";
import { LoadingOverlay } from "../../components/customControl/LoadingOverlay";

export const ProductPage = () => {
  const queryHook = useProductQuery({ ...BASE_QUERY_CONFIG.default });

  const crudHook = useProductCrud({
    fetchProducts: queryHook.fetchProducts,
    query: queryHook.query,
  });

  const categoryHook = useCategoryQuery({
    ...BASE_QUERY_CONFIG.default,
    limit: 100,
  });

  useEffect(() => {
    categoryHook.fetchCategories();
  }, []);

  // search
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, BASE_QUERY_CONFIG.debounceTime);

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>(FORM_MODE.CREATE);
  const [editProduct, setEditProduct] = useState<IProducts | null>(null);

  const [deleteToProduct, setDeleteToProduct] = useState<IProducts | null>(
    null,
  );

  // filter
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<IFilterState>(DEFAULT_FILTERS);
  const debouncedFilters = useDebounce(filters, BASE_QUERY_CONFIG.debounceTime);

  const handleFilters = () => {
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
    handleFilters();
  }, [debouncedKeyword, debouncedFilters]);

  //  open create
  const handleAdd = () => {
    setEditProduct(null);
    setFormMode(FORM_MODE.CREATE);
    setFormOpen(true);
  };

  //  open edit
  const handleEdit = async (id: string) => {
    try {
      const full = await productService.getProduct(id);

      setEditProduct(full);
      setFormMode(FORM_MODE.EDIT);
      setFormOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = (id: string) => {
    const p = queryHook.products.find((x) => x.id === id);
    if (p) setDeleteToProduct(p);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteToProduct) return;
    await crudHook.deleteProduct(deleteToProduct.id);
    setDeleteToProduct(null);
  };

  //  submit uses formMode
  const handleSubmit = async (payload: {
    data: FormData;
    mainImageFile: File | null;
    galleryFiles: File[];
  }) => {
    const { data, mainImageFile, galleryFiles } = payload;

    if (formMode === FORM_MODE.CREATE) {
      const created = await crudHook.createProduct(data);

      if (mainImageFile) {
        await productService.uploadProductImages(created.id, [mainImageFile]);
      }
      if (galleryFiles.length > 0) {
        await productService.uploadProductImages(created.id, galleryFiles);
      }
    } else if (formMode === FORM_MODE.EDIT && editProduct) {
      await crudHook.updateProduct(editProduct.id, data);
    }

    setFormOpen(false);
    setEditProduct(null);
    setFormMode(FORM_MODE.CREATE);
  };

  // pagination
  const onPageChange = (page: number) => {
    queryHook.fetchProducts({ ...queryHook.query, page });
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Product Management
        </h1>
        <p className="text-[#8A92A6] mb-8 text-sm">
          System management and detailed overview.
        </p>
      </div>

      {formOpen ? (
        <div className="animate-in fade-in zoom-in duration-300">
          <div className="w-full bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
            <ProductForm
              mode={formMode}
              initialData={editProduct}
              categoryOptions={categoryHook.categories}
              onSubmit={handleSubmit}
              onCancel={() => {
                setFormOpen(false);
                setEditProduct(null);
                setFormMode(FORM_MODE.CREATE);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-[24px] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
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

                <Button onClick={handleAdd}>
                  <Plus size={20} strokeWidth={2.5} />
                  Add Product
                </Button>
              </div>

              {isFilterOpen && (
                <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-100/50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <ProductFilterPanel
                    filters={filters}
                    onChange={setFilters}
                    categoryOptions={categoryHook.categories}
                  />
                </div>
              )}
            </div>

            <div className="p-6 relative">
              {queryHook.loading && <LoadingOverlay open text="Loading..." />}

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
