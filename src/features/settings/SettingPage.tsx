import { useEffect, useState } from "react";
import type { ISetting, ISettingPayload } from "../../types/setting.type";
import { useSettingQuery } from "../../hooks/setting/useSettingQuery";
import { BASE_QUERY_CONFIG, FORM_MODE } from "../../configs/common.config";
import { useDebounce } from "../../hooks/common/useDebounce";
import { SettingTable } from "./components/SettingTable";
import { SearchComponent } from "../../components/customControl/SearchComponent";
import { Button } from "../../components/customControl/Button";
import { Plus } from "lucide-react";
import { SettingForm } from "./components/SettingForm";
import { Pagination } from "../../components/customControl/Pagination";
import { useSettingCrud } from "../../hooks/setting/useSettingCrud";
import { ConfirmModal } from "../../components/customControl/ConfirmModal";

export const SettingPage = () => {
  const queryHook = useSettingQuery({ ...BASE_QUERY_CONFIG.default });
  const crudHook = useSettingCrud({
    fetchSettings: queryHook.fetchSettings,
    query: queryHook.query,
  });
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, BASE_QUERY_CONFIG.debounceTime);

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingSetting, setEditingSetting] = useState<ISetting | null>(null);
  const [deleteToSetting, setToDeleteSetting] = useState<ISetting | null>(null);
  useEffect(() => {
    queryHook.fetchSettings({
      ...BASE_QUERY_CONFIG.default,

      search: debouncedKeyword || undefined,
    });
  }, [debouncedKeyword]);

  const handleSubmit = async (data: ISettingPayload) => {
    if (isCreating) {
      await crudHook.createSetting(data);
    } else {
      await crudHook.updateSetting(editingSetting!.id, data);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteToSetting) {
      await crudHook.deleteSetting(deleteToSetting.id);
      setToDeleteSetting(null);
    }
  };

  const handleEdit = (id: string) => {
    const content = queryHook.settings.find((c) => c.id === id);
    if (content) setEditingSetting(content);
  };

  const handleDelete = (id: string) => {
    const content = queryHook.settings.find((c) => c.id === id);
    if (content) setToDeleteSetting(content);
  };

  const onPageChange = (page: number) => {
    queryHook.fetchSettings({
      page,
      limit: queryHook.query.limit,
      search: queryHook.query.search,
    });
  };
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">
              System Settings
            </h1>
            <p className="text-[#8A92A6] mb-8 text-sm">
              Manage system-wide configurations and variables.
            </p>
          </div>
        </div>

        {isCreating || editingSetting ? (
          <div className="animate-in fade-in zoom-in duration-500">
            <div className="w-full bg-white rounded-[32px] shadow-2xl shadow-indigo-100/50 overflow-hidden border border-gray-100">
              <SettingForm
                mode={isCreating ? FORM_MODE.CREATE : FORM_MODE.EDIT}
                initialData={editingSetting}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingSetting(null);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-full sm:w-96">
                <SearchComponent
                  placeholder="Seach by key or description..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <Button
                onClick={() => setIsCreating(true)}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200"
              >
                <Plus size={18} strokeWidth={2.5} className="mr-2" />
                Add New Setting
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {queryHook.settings.length > 0 ? (
                <SettingTable
                  settings={queryHook.settings}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                !queryHook.loading && (
                  <div className="p-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <SearchComponent
                        value=""
                        onChange={() => {}}
                        placeholder=""
                        className="hidden"
                      />
                    </div>
                    <p className="text-[#1E293B] font-bold text-lg mb-1">
                      No settings found
                    </p>
                    <p className="text-gray-400 text-sm">
                      {queryHook.query.search
                        ? `We couldn't find any results for "${queryHook.query.search}"`
                        : "Start by creating your first system setting."}
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
        title="Delete System Setting"
        message={`Are you sure you want to delete "${deleteToSetting?.configKey}"? This action cannot be undone.`}
        isOpen={!!deleteToSetting}
        onClose={() => setToDeleteSetting(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
