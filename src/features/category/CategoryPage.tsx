import { BASE_QUERY_CONFIG, FORM_MODE } from "../../configs/common.config";
import { useCategoryQuery } from "../../hooks/category/useCategoryQuery";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/common/useDebounce";
import { CategoryTable } from "./components/CategoryTable";
import { SearchComponent } from "../../components/customControl/SearchComponent";
import { Button } from "../../components/customControl/Button";
import { Plus } from "lucide-react";
import { Pagination } from "../../components/customControl/Pagination";
import { CategoryForm } from "./components/CategoryForm";
import type { ICategory, ICategoryPayload } from "../../types/category.type";
import { ConfirmModal } from "../../components/customControl/ConfirmModal";
import { useCategoryCrud } from "../../hooks/category/useCategoryCrud";
import { LoadingOverlay } from "../../components/customControl/LoadingOverlay";

export const CategoryPage = () => {
  const queryHook = useCategoryQuery({
    ...BASE_QUERY_CONFIG.default,
  });

  const crudHook = useCategoryCrud({
    fetchCategories: queryHook.fetchCategories,
    query: queryHook.query,
  });

  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, BASE_QUERY_CONFIG.debounceTime);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );

  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null,
  );

  useEffect(() => {
    queryHook.fetchCategories({
      ...BASE_QUERY_CONFIG.default,
      search: debouncedKeyword || undefined,
    });
  }, [debouncedKeyword]);

  const onPageChange = (page: number) => {
    queryHook.fetchCategories({
      page,
      limit: queryHook.query.limit,
      search: queryHook.query.search,
    });
  };

  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      await crudHook.deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
    }
  };

  async function handleSubmit(data: ICategoryPayload) {
    if (isCreating) {
      await crudHook.createCategory(data);
    } else {
      await crudHook.updateCategory(editingCategory!.id, data);
    }
  }

  async function handleEdit(id: string) {
    const category = queryHook.categories.find((c) => c.id === id);
    if (category) setEditingCategory(category);
  }

  async function handleDelete(id: string) {
    const category = queryHook.categories.find((c) => c.id === id);
    if (category) setCategoryToDelete(category);
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Category Management
        </h1>
        <p className="text-[#8A92A6] mb-8 text-sm">
          System management and detailed overview.
        </p>

        {isCreating || editingCategory ? (
          <CategoryForm
            mode={isCreating ? FORM_MODE.CREATE : FORM_MODE.EDIT}
            initialData={editingCategory}
            onCancel={() => {
              setIsCreating(false);
              setEditingCategory(null);
            }}
            onSubmit={async (data) => await handleSubmit(data)}
          />
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
              <SearchComponent
                placeholder="Search categories..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              <Button onClick={() => setIsCreating(true)}>
                <Plus size={18} />
                Add Category
              </Button>
            </div>

            {queryHook.categories.length > 0 ? (
              <CategoryTable
                categories={queryHook.categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              !queryHook.loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <p className="text-gray-500">
                    {queryHook.query.search
                      ? `No categories found for "${queryHook.query.search}"`
                      : "No categories available"}
                  </p>
                </div>
              )
            )}

            <LoadingOverlay open={queryHook.loading} text="Loading..." />
          </div>
        )}
        {!(isCreating || editingCategory) && queryHook.meta && (
          <Pagination
            currentPage={queryHook.query.page}
            totalPages={queryHook.meta.totalPages}
            onChange={onPageChange}
          />
        )}
      </div>

      <ConfirmModal
        title="Delete Category"
        message={`Are you sure you want to delete ${categoryToDelete?.name}?\nThis action cannot be undone.`}
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
