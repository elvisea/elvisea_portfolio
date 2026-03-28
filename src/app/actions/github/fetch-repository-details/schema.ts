import { z } from "zod";

/** GitHub repo names: alphanumeric, `.`, `-`, `_` (max 100 per GitHub). */
export const repoNameSchema = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-zA-Z0-9._-]+$/, "Invalid repository name");
