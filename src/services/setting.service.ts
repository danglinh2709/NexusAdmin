import { ROUTES } from "../configs/route.config";
import type { TBaseQuery } from "../types/common.type";
import type {
  ISetting,
  ISettingPayload,
  ISettingResponse,
} from "../types/setting.type";
import api from "./api";

const base = ROUTES.APP.SETTINGS;

export const settingService = {
  getSettings(params: TBaseQuery): Promise<ISettingResponse> {
    return api.get<any, ISettingResponse>(base, { params });
  },
  createSetting(payload: ISettingPayload): Promise<ISetting> {
    return api.post<any, ISetting>(base, payload);
  },
  updateSetting(id: string, payload: ISettingPayload): Promise<ISetting> {
    return api.put<any, ISetting>(`${base}/${id}`, payload);
  },
  deleteSetting(id: string): Promise<void> {
    return api.delete<any, void>(`${base}/${id}`);
  },
};
