import z from "zod";

export const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, "Comment is required")
    .max(300, "Comment cannot exceed 300 characters"),
});
