import type { UserRole, UserStatus } from "../configs/user.config";
import type { IResponse } from "./common.type";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string | null;
}

export type TUsersResponse = IResponse<IUser>;

export interface IUserPayload {
  fullName: string;
  email: string;
  password?: string;
}
