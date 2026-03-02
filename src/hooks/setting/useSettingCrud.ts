import { useCallback } from "react";
import type { TBaseQuery } from "../../types/common.type";
import { useServiceHandler } from "../common/useServiceHandler";
import type { ISettingPayload } from "../../types/setting.type";
import { settingService } from "../../services/setting.service";

interface IProps {
  fetchSettings: (override?: Partial<TBaseQuery>) => Promise<void>;
  query: TBaseQuery;
}

export const useSettingCrud = ({ fetchSettings, query }: IProps) => {
  const { loading, error, startLoading, stopLoading, handleError } =
    useServiceHandler();

  const createSetting = useCallback(
    async (data: ISettingPayload) => {
      try {
        startLoading();
        await settingService.createSetting(data);
        await fetchSettings({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to create setting, please try again");
        throw err;
      } finally {
        stopLoading();
      }
    },
    [fetchSettings, query],
  );

  const updateSetting = useCallback(
    async (id: string, data: ISettingPayload) => {
      try {
        startLoading();
        await settingService.updateSetting(id, data);
        await fetchSettings({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to update setting, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchSettings, query],
  );

  const deleteSetting = useCallback(
    async (id: string) => {
      try {
        startLoading();

        await settingService.deleteSetting(id);

        await fetchSettings({
          page: 1,
          limit: query.limit,
          search: query.search,
        });
      } catch (err) {
        handleError(err, "unable to delete category, please try again");
      } finally {
        stopLoading();
      }
    },
    [fetchSettings, query],
  );

  return { createSetting, updateSetting, deleteSetting, loading, error };
};
