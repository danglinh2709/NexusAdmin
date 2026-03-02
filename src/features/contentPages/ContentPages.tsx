import { useEffect, useState } from "react";
import { SearchComponent } from "../../components/customControl/SearchComponent";
import { ContentTable } from "./components/ContentTable";
import { useContentPagesQuery } from "../../hooks/contentPages/useContentPagesQuery";
import { BASE_QUERY_CONFIG, FORM_MODE } from "../../configs/common.config";
import { useDebounce } from "../../hooks/common/useDebounce";
import { Button } from "../../components/customControl/Button";
import { Plus } from "lucide-react";
import type { IContentPages } from "../../types/contentPages.type";
import { ContentForm } from "./components/ContentForm";
import { useContentPagesCrud } from "../../hooks/contentPages/useContentPagesCrud";
import { ConfirmModal } from "../../components/customControl/ConfirmModal";
import { Pagination } from "../../components/customControl/Pagination";

export const ContentPages = () => {
  const queryHook = useContentPagesQuery({
    ...BASE_QUERY_CONFIG.default,
  });

  const crudHook = useContentPagesCrud({
    fetchContentPages: queryHook.fetchContentPages,
    query: queryHook.query,
  });

  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, BASE_QUERY_CONFIG.debounceTime);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingContent, setEditingContent] = useState<IContentPages | null>(
    null,
  );
  const [deleteToContent, setDeleteToContent] = useState<IContentPages | null>(
    null,
  );

  useEffect(() => {
    queryHook.fetchContentPages({
      ...BASE_QUERY_CONFIG.default,

      search: debouncedKeyword || undefined,
    });
  }, [debouncedKeyword]);

  const onPageChange = (page: number) => {
    queryHook.fetchContentPages({
      page,
      limit: queryHook.query.limit,
      search: queryHook.query.search,
    });
  };

  const handleSubmit = async (data: FormData) => {
    if (isCreating) {
      await crudHook.createContentPages(data);
    } else {
      await crudHook.updateContentPages(editingContent!.id, data);
    }
  };

  const handleEdit = (id: string) => {
    const content = queryHook.contentPages.find((c) => c.id === id);
    if (content) setEditingContent(content);
  };

  const handleDelete = (id: string) => {
    const content = queryHook.contentPages.find((c) => c.id === id);
    if (content) setDeleteToContent(content);
  };

  const handleDeleteConfirm = async () => {
    if (deleteToContent) {
      await crudHook.deleteContentPages(deleteToContent.id);
      setDeleteToContent(null);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B]">Content Pages</h1>
        <p className="text-[#8A92A6] mb-8 text-sm">
          System management and detailed overview.
        </p>

        {isCreating || editingContent ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <ContentForm
                mode={isCreating ? FORM_MODE.CREATE : FORM_MODE.EDIT}
                initialData={editingContent}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingContent(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <SearchComponent
                placeholder="Seach by title or slug"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              <Button onClick={() => setIsCreating(true)}>
                <Plus size={18} strokeWidth={2.5} />
                Create Page
              </Button>
            </div>

            {queryHook.contentPages.length > 0 ? (
              <ContentTable
                contentPages={queryHook.contentPages}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ) : (
              !queryHook.loading && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <p className="text-gray-500">
                    {queryHook.query.search
                      ? `No contentPages found for "${queryHook.query.search}"`
                      : "No contentPages available"}
                  </p>
                </div>
              )
            )}

            {!(isCreating || editingContent) && queryHook.meta && (
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
        title="Delete Content Pages"
        message={`Are you sure you want to delete ${deleteToContent?.title}`}
        isOpen={!!deleteToContent}
        onClose={() => setDeleteToContent(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
