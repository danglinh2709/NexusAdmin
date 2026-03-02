import { z } from "zod";

const baseUserSchema = z.object({
  fullName: z.string().nonempty("Full name cannot be empty"),
  email: z
    .string()
    .nonempty("Email cannot be empty")
    .email("Invalid email address"),
});

export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = baseUserSchema.extend({
  password: z.string().min(6).optional(),
});
