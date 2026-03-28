import "server-only";

import { z } from "zod";

import { emptyToUndefined } from "./zod-helpers";

export const privateEnvSchema = z.object({
  REGISTRY: emptyToUndefined(z.string().optional()),
  IMAGE_NAME: emptyToUndefined(z.string().optional()),
  CONTAINER_NAME_APP: emptyToUndefined(z.string().optional()),

  SMTP_HOST: emptyToUndefined(z.string().optional()),
  SMTP_PORT: emptyToUndefined(z.string().optional()),
  SMTP_USER: emptyToUndefined(z.string().optional()),
  SMTP_PASSWORD: emptyToUndefined(z.string().optional()),
  SMTP_USER_NO_REPLY: emptyToUndefined(z.string().optional()),
  EMAIL_CONTACT: emptyToUndefined(z.string().email().optional()),
  PHONE_NUMBER: emptyToUndefined(z.string().optional()),

  ACCESS_TOKEN_GITHUB: emptyToUndefined(
    z.string().optional().describe("GitHub access token for API access"),
  ),
});
