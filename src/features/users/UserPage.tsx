import { UserPlus } from "lucide-react";
import { Button } from "../../components/customControl/Button";
import { useUsers } from "../../hooks/user/useUser";
import { SearchComponent } from "../../components/customControl/SearchComponent";
import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/common/useDebounce";
import { Pagination } from "../../components/customControl/Pagination";
import { ConfirmModal } from "../../components/customControl/ConfirmModal";
import type { IUser, IUserPayload } from "../../types/user.type";
import { UserForm } from "./components/UserForm";
import { FORM_MODE } from "../../configs/common.config";
import { UserTable } from "./components/UserTable";
import { userService } from "../../services/user.service";
import { LoadingOverlay } from "../../components/customControl/LoadingOverlay";

export const UserPage = () => {
  const {
    users,
    loading,

    fetchUsers,
    query,
    meta,
    createUser,
    deleteUser,
    updateUser,
  } = useUsers({
    ...BASE_QUERY_CONFIG.default,
  });

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const debouncedKeyword = useDebounce(keyword, BASE_QUERY_CONFIG.debounceTime);

  useEffect(() => {
    fetchUsers({
      ...BASE_QUERY_CONFIG.default,
      search: debouncedKeyword || undefined,
    });
  }, [debouncedKeyword]);

  const onPageChange = (page: number) => {
    fetchUsers({
      page,
      limit: query.limit,
      search: query.search,
    });
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id);
      setUserToDelete(null);
    }
  };

  const handleEdit = async (id: string) => {
    const user = await userService.getUser(id);
    setEditingUser(user);
  };

  const handleDelete = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) setUserToDelete(user);
  };

  const handleSubmit = async (data: IUserPayload) => {
    if (editingUser) {
      await updateUser(editingUser.id, data);
    } else {
      await createUser(data);
    }
    setIsCreating(false);
    setEditingUser(null);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#1E293B]">User Management</h1>
        <p className="text-[#8A92A6] mb-8 text-sm">
          System management and detailed overview.
        </p>

        {isCreating || editingUser ? (
          <div className="flex justify-center items-start pt-8 pb-12 animate-in fade-in slide-in-from-bottom-4">
            <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden">
              <UserForm
                mode={editingUser ? FORM_MODE.EDIT : FORM_MODE.CREATE}
                initialData={editingUser || null}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingUser(null);
                }}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ">
            <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white">
              <SearchComponent
                placeholder="Search users..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />

              {!loading && users.length === 0 && (
                <p className="p-6 text-gray-500">
                  {query.search
                    ? `No users found for "${query.search}"`
                    : "No users available"}
                </p>
              )}

              <LoadingOverlay open={loading} text="Loading..." />

              <Button onClick={() => setIsCreating(true)}>
                <UserPlus size={18} />
                Add User
              </Button>
            </div>

            {users.length > 0 && (
              <UserTable
                users={users}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            )}
          </div>
        )}

        {!(isCreating || editingUser) && meta && (
          <Pagination
            currentPage={query.page}
            totalPages={meta.totalPages}
            onChange={onPageChange}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.fullName}?\nThis action cannot be undone.`}
      />
    </div>
  );
};
