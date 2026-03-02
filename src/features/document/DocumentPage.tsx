import { useEffect, useState } from "react";
import { BASE_QUERY_CONFIG, FORM_MODE } from "../../configs/common.config";
import { useDocumentCrud } from "../../hooks/document/useDocumentCrud";
import { useDocumentQuery } from "../../hooks/document/useDocumentQuery";
import type { IDocument } from "../../types/document.type";
import { Pagination } from "../../components/customControl/Pagination";
import { Button } from "../../components/customControl/Button";
import { Plus } from "lucide-react";
import { ConfirmModal } from "../../components/customControl/ConfirmModal";
import { DocumentTable } from "./components/DocumentTable";
import { DocumentForm } from "./components/DocumentForm";

export const DocumentPage = () => {
  const queryHook = useDocumentQuery({ ...BASE_QUERY_CONFIG.default });
  const crudHook = useDocumentCrud({
    fetchDocuments: queryHook.fetchDocuments,
    query: queryHook.query,
  });

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingDocument, setEditingDocument] = useState<IDocument | null>(
    null,
  );
  const [deleteToDocument, setToDeleteDocument] = useState<IDocument | null>(
    null,
  );

  useEffect(() => {
    queryHook.fetchDocuments({
      ...BASE_QUERY_CONFIG.default,
    });
  }, []);

  const onPageChange = (page: number) => {
    queryHook.fetchDocuments({
      page,
      limit: queryHook.query.limit,
      search: queryHook.query.search,
    });
  };

  const handleSubmit = async (data: FormData) => {
    await crudHook.createDocument(data);
    setIsCreating(false);
    setEditingDocument(null);
  };

  const handleDeleteConfirm = async () => {
    if (deleteToDocument) {
      await crudHook.deleteDocument(deleteToDocument.id);
      setToDeleteDocument(null);
    }
  };

  const handleEdit = (id: string) => {
    const content = queryHook.document.find((c) => c.id === id);
    if (content) setEditingDocument(content);
  };

  const handleDelete = (id: string) => {
    const content = queryHook.document.find((c) => c.id === id);
    if (content) setToDeleteDocument(content);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">
              Document Management
            </h1>
            <p className="text-[#8A92A6] mb-8 text-sm">
              System management and detailed overview.
            </p>
          </div>
        </div>

        {isCreating || editingDocument ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-full bg-white rounded-[32px] shadow-2xl shadow-blue-100/50 overflow-hidden border border-gray-100">
              <DocumentForm
                mode={isCreating ? FORM_MODE.CREATE : FORM_MODE.EDIT}
                initialData={editingDocument}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingDocument(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-[20px] font-bold text-[#1E293B]">
                  Recent Documents
                </h2>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus size={20} strokeWidth={2.5} />
                  Upload New
                </Button>
              </div>

              {queryHook.document.length > 0 ? (
                <DocumentTable
                  documents={queryHook.document}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                !queryHook.loading && (
                  <div className="p-20 text-center">
                    <p className="text-[#1E293B] font-bold text-lg mb-1">
                      No documents found
                    </p>
                    <p className="text-gray-400 text-sm">
                      {queryHook.query.search
                        ? `We couldn't find any results for "${queryHook.query.search}"`
                        : "Start by uploading your first document."}
                    </p>
                  </div>
                )
              )}
            </div>

            {queryHook.meta && (
              <div className="pt-4">
                <Pagination
                  currentPage={queryHook.query.page}
                  totalPages={queryHook.meta.totalPages}
                  onChange={onPageChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmModal
        title="Delete Document"
        message={`Are you sure you want to delete "${deleteToDocument?.fileName}"? This action cannot be undone.`}
        isOpen={!!deleteToDocument}
        onClose={() => setToDeleteDocument(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
