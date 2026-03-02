import { z } from "zod";

export const systemConfigSchema = z.object({
  configKey: z.string().min(1, "Configuration key is required"),

  description: z.string().min(1, "description is required"),

  configData: z
    .string()
    .min(1, "Config data is required")
    .transform((value, ctx) => {
      try {
        return JSON.parse(value);
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "JSON invalid",
        });
        return z.NEVER;
      }
    }),
});

export type SystemConfigFormValues = z.input<typeof systemConfigSchema>;

export type SystemConfigSubmitValues = z.output<typeof systemConfigSchema>;
