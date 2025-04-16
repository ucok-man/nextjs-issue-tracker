import { z } from "zod";

export const createIssueDTO = z.object({
  title: z
    .string()
    .min(1, "This field is required")
    .max(255, "This field must be less than 255 char long"),
  description: z
    .string()
    .max(6000, "This field max is 6000 character")
    .min(1, "This field is required"),
});

export const updateIssueDTO = z.object({
  title: z
    .string()
    .min(1, "This field is required")
    .max(255, "This field must be less than 255 char long")
    .optional(),

  description: z
    .string()
    .max(6000, "This field max is 6000 character")
    .min(1, "This field is required")
    .optional(),

  assignedToId: z
    .string()
    .min(1, "This field is required")
    .max(255, "This field max is 255 character")
    .nullable()
    .optional(),

  status: z.enum(["OPEN", "IN_PROGGRES", "CLOSED"]).optional(),
});
