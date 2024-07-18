import { z } from "zod";

export const createCommentDTO = z.object({
  description: z
    .string()
    .max(6000, "This field max is 6000 character")
    .min(1, "This field is required"),
});
