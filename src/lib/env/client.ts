import { publicEnvSchema, getPublicEnvFromProcess } from "./public-schema";

import type { PublicEnv } from "./public-schema";

function validateClientEnv(): PublicEnv {
  let publicEnv: PublicEnv | undefined;

  try {
    publicEnv = publicEnvSchema.parse(getPublicEnvFromProcess());
    return publicEnv;
  } catch (error) {
    if (publicEnv?.NEXT_PUBLIC_NODE_ENV === "development") {
      console.warn("⚠️  Using default values in development mode");
      return publicEnvSchema.parse(getPublicEnvFromProcess());
    }

    throw error;
  }
}

const env = validateClientEnv();

export { env };

export type Env = PublicEnv;
