import type { IUser } from "./user.type";

export interface ILoginResponse {
  accessToken: string;
  user: IUser;
}
