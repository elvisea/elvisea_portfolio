import { z } from "zod";

export const listQuerySchema = z.object({
  page: z.number().int().min(1),
  perPage: z.number().int().min(1).max(100),
});
