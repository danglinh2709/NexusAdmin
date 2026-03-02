import { z } from "zod";

export const baseCategorySchema = z.object({
  name: z.string().nonempty("Name cannot be empty"),
  description: z.string().optional(),
});
