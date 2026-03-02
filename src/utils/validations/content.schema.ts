import { z } from "zod";
import { STATUS_TYPE } from "../../configs/category.config";
import { slugify } from "../helper/slugify.helper";

export const baseContentSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    slug: z.string().trim().min(1, "Slug is required"),
    content: z.string().optional(),
    status: z.nativeEnum(STATUS_TYPE).optional(),
    featuredImage: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    slug: slugify(data.title),
  }));
