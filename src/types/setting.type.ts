import type { IResponse } from "./common.type";

export interface IShippingConfig {
  expressShippingFee: number;
  standardShippingFee: number;
  estimatedDeliveryDays: {
    express: number;
    standard: number;
  };
  freeShippingThreshold: number;
}
export interface ISetting {
  id: string;
  createdAt: string;
  updatedAt: string;

  configKey: string;
  description: string;
  configData: IShippingConfig;
}

export type ISettingResponse = IResponse<ISetting>;

export interface ISettingPayload {
  configKey: string;
  description: string;
  configData: IShippingConfig;
}
