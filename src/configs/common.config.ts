export const BASE_QUERY_CONFIG = {
  default: {
    page: 1,
    limit: 10,
  },
  debounceTime: 500,
} as const;

export const FORM_MODE = {
  CREATE: "CREATE",
  EDIT: "EDIT",
} as const;

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE];
