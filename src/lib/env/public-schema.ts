import { z } from "zod";

import { firebasePublicString } from "./zod-helpers";

/**
 * Objeto explícito para o Next.js fazer inline de NEXT_PUBLIC_* no bundle do cliente.
 * Referências dinâmicas a process.env (ex.: parse(process.env)) não são substituídas.
 */
export function getPublicEnvFromProcess(): Record<string, string | undefined> {
  return {
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_CREATOR_NAME: process.env.NEXT_PUBLIC_CREATOR_NAME,
    NEXT_PUBLIC_CREATOR_ROLE: process.env.NEXT_PUBLIC_CREATOR_ROLE,
    NEXT_PUBLIC_EMAIL_CONTACT: process.env.NEXT_PUBLIC_EMAIL_CONTACT,
    NEXT_PUBLIC_PHONE_NUMBER: process.env.NEXT_PUBLIC_PHONE_NUMBER,
    NEXT_PUBLIC_MAP_COORDINATES: process.env.NEXT_PUBLIC_MAP_COORDINATES,
    NEXT_PUBLIC_GITHUB_USERNAME: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
    NEXT_PUBLIC_GITHUB_API_URL: process.env.NEXT_PUBLIC_GITHUB_API_URL,
    NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    NEXT_PUBLIC_LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("production"),

  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://elvisea.dev"),

  NEXT_PUBLIC_CREATOR_NAME: z.string().default("Elvis Amancio"),

  NEXT_PUBLIC_CREATOR_ROLE: z.string().default("Desenvolvedor Full Stack"),

  NEXT_PUBLIC_EMAIL_CONTACT: z
    .string()
    .email()
    .default("contato@bytefulcode.tech"),

  NEXT_PUBLIC_PHONE_NUMBER: z.string().default("5541992190528"),

  NEXT_PUBLIC_MAP_COORDINATES: z.string().default("-25.4322266,-49.2811471"),

  NEXT_PUBLIC_GITHUB_USERNAME: z.string().default("elvisea"),

  NEXT_PUBLIC_GITHUB_API_URL: z
    .string()
    .url()
    .default("https://api.github.com/users/elvisea"),

  NEXT_PUBLIC_GITHUB_URL: z
    .string()
    .url()
    .default("https://github.com/elvisea"),

  NEXT_PUBLIC_LINKEDIN_URL: z
    .string()
    .url()
    .default("https://linkedin.com/in/elvisea"),

  NEXT_PUBLIC_FIREBASE_API_KEY: firebasePublicString(
    "AIzaSyAluyfMLiLYVSKYAofcv2fFx2k3Yub4Eek",
  ),

  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: firebasePublicString(
    "elvisea.firebaseapp.com",
  ),

  NEXT_PUBLIC_FIREBASE_PROJECT_ID: firebasePublicString("elvisea"),

  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: firebasePublicString(
    "elvisea.firebasestorage.app",
  ),

  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
    firebasePublicString("282665036437"),

  NEXT_PUBLIC_FIREBASE_APP_ID: firebasePublicString(
    "1:282665036437:web:dd6aeb1233234dc8fd099c",
  ),

  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: firebasePublicString("G-T4DM2KN6MT"),
});

export type PublicEnv = z.infer<typeof publicEnvSchema>;
