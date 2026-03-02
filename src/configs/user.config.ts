export const USER_ROLE = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export const USER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
