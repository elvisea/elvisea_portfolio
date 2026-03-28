import "server-only";

import { z } from "zod";

import { publicEnvSchema, getPublicEnvFromProcess } from "./public-schema";
import { privateEnvSchema } from "./private-schema";

import type { PublicEnv } from "./public-schema";

function validateEnv() {
  let publicEnv: PublicEnv | undefined;

  try {
    publicEnv = publicEnvSchema.parse(getPublicEnvFromProcess());
    const privateEnv = privateEnvSchema.parse(process.env);

    if (!process.env.ACCESS_TOKEN_GITHUB) {
      console.warn(
        `⚠️  ACCESS_TOKEN_GITHUB is missing in ${publicEnv.NEXT_PUBLIC_NODE_ENV} mode. Some features might be limited.`,
      );
    }

    return { ...publicEnv, ...privateEnv };
  } catch (error) {
    if (publicEnv?.NEXT_PUBLIC_NODE_ENV === "development") {
      console.warn("⚠️  Using default values in development mode");
      return publicEnvSchema.parse(getPublicEnvFromProcess());
    }

    throw error;
  }
}

const env = validateEnv();

export { env };

export type Env = PublicEnv & Partial<z.infer<typeof privateEnvSchema>>;
