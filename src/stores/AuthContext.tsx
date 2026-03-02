import { createContext, useContext, useState, type ReactNode } from "react";
import { storage } from "../utils/storage";
import type { IUser } from "../types/user.type";
import { authService } from "../services/auth.service";

interface IAuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: IUser | null;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    storage.isAuthenticated(),
  );

  const [user, setUser] = useState<IUser | null>(storage.getUser());

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    console.log("res", res);

    if (!res) {
      throw new Error("no access token or user return from api");
    }

    const { accessToken, user } = res;

    storage.setToken(accessToken);
    console.log("access token", accessToken);

    storage.setUser(user);
    console.log("user", user);

    setUser(user);

    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    storage.removeToken();
    storage.removeUser();
    setUser(null);
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
