import type { z } from "zod";

import { submitContactFormSchema } from "./schema";

export type ContactFormInput = z.infer<typeof submitContactFormSchema>;

export type SubmitContactFormResult =
  | { ok: true }
  | { ok: false; code: "RATE_LIMITED"; message: string }
  | { ok: false; code: "VALIDATION_ERROR"; message: string }
  | { ok: false; code: "SEND_FAILED"; message: string };
