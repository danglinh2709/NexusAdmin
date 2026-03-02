import api from "./api";
import type { IUserPayload, IUser, TUsersResponse } from "../types/user.type";
import type { TBaseQuery } from "../types/common.type";
import { ROUTES } from "../configs/route.config";

const base = ROUTES.APP.USERS;

export const userService = {
  getUsers(params: TBaseQuery): Promise<TUsersResponse> {
    return api.get<any, TUsersResponse>(base, { params });
  },

  getUser(id: string): Promise<IUser> {
    return api.get<any, IUser>(`${base}/${id}`);
  },

  createUser(payload: IUserPayload): Promise<IUser> {
    return api.post<any, IUser>(base, payload);
  },

  deleteUser(id: string): Promise<IUser> {
    return api.delete<any, IUser>(`${base}/${id}`);
  },

  updateUser(id: string, payload: IUserPayload): Promise<IUser> {
    return api.put<any, IUser>(`${base}/${id}`, payload);
  },
};
