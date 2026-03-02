export const STATUS_TYPE = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
} as const;

export type STATUS = (typeof STATUS_TYPE)[keyof typeof STATUS_TYPE];
