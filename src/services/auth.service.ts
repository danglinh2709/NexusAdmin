import api from "./api";
import type { ILoginResponse } from "../types/auth.type";
import type { IUser } from "../types/user.type";
import { ROUTES } from "../configs/route.config";

const baseLogin = ROUTES.AUTH.LOGIN;
const baseLogout = ROUTES.AUTH.LOGOUT;
const base = ROUTES.AUTH;

export const authService = {
  login: (email: string, password: string): Promise<ILoginResponse> => {
    return api.post(baseLogin, { email, password });
  },

  logout: (): Promise<void> => {
    return api.post(baseLogout);
  },

  profile: (): Promise<IUser> => {
    return api.get(`${base}/me`);
  },
};
