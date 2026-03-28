import { z } from "zod";

/** Docker Compose costuma passar ""; Zod .optional() não trata "" como ausente. */
export function emptyToUndefined<T extends z.ZodTypeAny>(schema: T) {
  return z.preprocess((val) => (val === "" ? undefined : val), schema);
}

export function firebasePublicString(defaultValue: string) {
  return z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().default(defaultValue),
  );
}
