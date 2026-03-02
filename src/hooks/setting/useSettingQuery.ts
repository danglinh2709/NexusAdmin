import { useCallback, useState } from "react";
import { BASE_QUERY_CONFIG } from "../../configs/common.config";
import type { TBaseQuery } from "../../types/common.type";
import { settingService } from "../../services/setting.service";
import type { ISetting, ISettingResponse } from "../../types/setting.type";

export const useSettingQuery = (
  initial: TBaseQuery = BASE_QUERY_CONFIG.default,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<TBaseQuery>(initial);
  const [settings, setSettings] = useState<ISetting[]>([]);
  const [meta, setMeta] = useState<ISettingResponse["meta"] | null>(null);

  const fetchSettings = useCallback(
    async (override: Partial<TBaseQuery> = BASE_QUERY_CONFIG.default) => {
      const finalQuery = { ...initial, ...override };
      try {
        setLoading(true);
        setError(null);

        const res = await settingService.getSettings(finalQuery);
        setSettings(res.items);
        setMeta(res.meta);
        setQuery(finalQuery);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "unable to load settings information, please try again",
        );
      } finally {
        setLoading(false);
      }
    },
    [query],
  );
  return {
    settings,
    meta,
    loading,
    error,
    fetchSettings,
    setQuery,
    query,
  };
};
