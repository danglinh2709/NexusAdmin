import { useCallback, useState } from "react";
import type {
  IUserPayload,
  IUser,
  TUsersResponse,
} from "../../types/user.type";
import { userService } from "../../services/user.service";
import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import { ApiError } from "../../utils/api-error";
import type { TBaseQuery } from "../../types/common.type";

export const useUsers = (initial: TBaseQuery = BASE_QUERY_CONFIG.default) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [meta, setMeta] = useState<TUsersResponse["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<TBaseQuery>(initial);

  const fetchUsers = useCallback(
    async (override?: Partial<TBaseQuery>) => {
      const finalQuery = { ...query, ...override };
      try {
        setLoading(true);
        const res = await userService.getUsers(finalQuery);

        setUsers(res.items ?? []);
        setMeta(res.meta ?? null);
        setQuery(finalQuery);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("unable to load user information, please try again");
        }
      } finally {
        setLoading(false);
      }
    },
    [query],
  );

  const createUser = useCallback(
    async (payload: IUserPayload) => {
      try {
        setLoading(true);
        setError(null);
        await userService.createUser(payload);
        await fetchUsers({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          throw err;
        } else {
          const unknownError = new Error(
            "unable to create user, please try again",
          );
          setError(unknownError.message);
          throw unknownError;
        }
      } finally {
        setLoading(false);
      }
    },
    [query.limit, query.search, fetchUsers],
  );

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await userService.deleteUser(id);
        await fetchUsers({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          throw err;
        } else {
          const unknownError = new Error(
            "unable to delete user, please try again",
          );
          setError(unknownError.message);
          throw unknownError;
        }
      } finally {
        setLoading(false);
      }
    },
    [query.limit, query.search, fetchUsers],
  );

  const updateUser = useCallback(
    async (id: string, payload: IUserPayload) => {
      try {
        setLoading(true);
        setError(null);

        await userService.updateUser(id, payload);
        await fetchUsers({ page: 1, limit: query.limit, search: query.search });
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          throw err;
        } else {
          const unknownError = new Error(
            "unable to update user, please try again",
          );
          setError(unknownError.message);
          throw unknownError;
        }
      } finally {
        setLoading(false);
      }
    },
    [query.limit, query.search, fetchUsers],
  );
  return {
    users,
    loading,
    error,
    meta,
    fetchUsers,
    query,
    createUser,
    deleteUser,
    updateUser,
  };
};
