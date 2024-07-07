import { z } from "zod";

export const issueFormInputValidation = z.object({
  title: z
    .string()
    .min(1, "title is required")
    .max(255, "title must be less than 255 char long"),
  description: z.string().min(2, "description is required"),
});
