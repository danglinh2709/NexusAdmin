import axios, { AxiosError, type AxiosResponse } from "axios";
import { storage } from "../utils/storage";
import { ROUTES } from "../configs/route.config";
import { ApiError } from "../utils/api-error";
import { ERROR_CODE } from "../configs/error.config";
import qs from "qs";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "repeat", skipNulls: true }),
});

console.log(import.meta.env.VITE_API_BASE_URL);

api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data?.data ?? response.data;
  },
  (error: AxiosError<{ message?: string }>) => {
    if (!error.response)
      return Promise.reject(new ApiError("no connect server"));

    const { status, data } = error.response;

    if (status === 409) {
      return Promise.reject(
        new ApiError(
          data?.message || "already exists",
          ERROR_CODE.CONFLICT,
          409,
        ),
      );
    }
    if (status === 400) {
      return Promise.reject(
        new ApiError(data?.message || "Invalid data", "BAD_REQUEST", 400),
      );
    }

    if (status === 401) {
      storage.removeToken();
      if (!window.location.pathname.includes(ROUTES.AUTH.LOGIN)) {
        window.location.href = ROUTES.AUTH.LOGIN;
      }
      return Promise.reject(
        new ApiError("Unauthorized", ERROR_CODE.UNAUTHORIZED, 401),
      );
    }

    if (status === 404) {
      return Promise.reject(
        new ApiError(
          data?.message || "Resource not found",
          ERROR_CODE.NOT_FOUND,
          404,
        ),
      );
    }

    if (status >= 500) {
      return Promise.reject(
        new ApiError(
          "Server error, please try again later",
          "SERVER_ERROR",
          status,
        ),
      );
    }

    return Promise.reject(
      new ApiError(data?.message || error.message, "UNKNOWN", status),
    );
  },
);

export default api;
