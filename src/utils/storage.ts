import type { IUser } from "../types/user.type";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const storage = {
  setToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  removeToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  clear(): void {
    localStorage.clear();
  },

  setUser(user: IUser | null): void {
    if (!user) {
      localStorage.removeItem(USER_KEY);
      return;
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser(): IUser | null {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw || raw === "undefined") {
      return null;
    }

    try {
      return JSON.parse(raw) as IUser;
    } catch {
      return null;
    }
  },

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  },
};
