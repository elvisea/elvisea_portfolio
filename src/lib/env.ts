import { z } from "zod";

/**
 * Schema para variáveis de ambiente públicas (acessíveis no navegador)
 */
const publicEnvSchema = z.object({
  // Environment
  NEXT_PUBLIC_NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Site e Informações Pessoais
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://elvisea.dev"),

  NEXT_PUBLIC_CREATOR_NAME: z.string().default("Elvis Amancio"),

  NEXT_PUBLIC_CREATOR_ROLE: z.string().default("Desenvolvedor Full Stack"),

  NEXT_PUBLIC_EMAIL_CONTACT: z
    .string()
    .email()
    .default("contato@bytefulcode.tech"),

  NEXT_PUBLIC_PHONE_NUMBER: z.string().default("5541992190528"),

  NEXT_PUBLIC_MAP_COORDINATES: z.string().default("-25.4322266,-49.2811471"),

  // GitHub
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

  // Firebase (Opcional)
  NEXT_PUBLIC_FIREBASE_API_KEY: z
    .string()
    .default("AIzaSyDYKMaO09VL1GMqjnUX1-wr_LGCdvs1-w8"),

  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
    .string()
    .default("elvisea-portfolio.firebaseapp.com"),

  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().default("elvisea-portfolio"),

  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
    .string()
    .default("elvisea-portfolio.firebasestorage.app"),

  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().default("4307927194"),

  NEXT_PUBLIC_FIREBASE_APP_ID: z
    .string()
    .default("1:4307927194:web:6a5c336728de2d05fb1f23"),

  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().default("G-07SH75ELQ6"),
});

/**
 * Schema para variáveis de ambiente privadas (apenas servidor)
 */
const privateEnvSchema = z.object({
  // Docker Configuration
  REGISTRY: z.string().optional(),
  IMAGE_NAME: z.string().optional(),
  CONTAINER_NAME_APP: z.string().optional(),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_USER_NO_REPLY: z.string().optional(),
  EMAIL_CONTACT: z.string().email().optional(),
  PHONE_NUMBER: z.string().optional(),

  // GitHub
  ACCESS_TOKEN_GITHUB: z
    .string()
    .optional()
    .describe("GitHub access token for API access"),
});

/**
 * Valida e exporta as variáveis de ambiente
 */
function validateEnv() {
  let publicEnv;

  try {
    publicEnv = publicEnvSchema.parse(process.env);
    const privateEnv =
      typeof window === "undefined" ? privateEnvSchema.parse(process.env) : {};

    // Em produção, o token do GitHub é obrigatório
    if (
      publicEnv.NEXT_PUBLIC_NODE_ENV === "production" &&
      typeof window === "undefined" &&
      !process.env.ACCESS_TOKEN_GITHUB
    ) {
      throw new Error(
        "ACCESS_TOKEN_GITHUB is required in production environment",
      );
    }

    // Em desenvolvimento, apenas alertamos se estiver faltando
    if (
      publicEnv.NEXT_PUBLIC_NODE_ENV === "development" &&
      typeof window === "undefined" &&
      !process.env.ACCESS_TOKEN_GITHUB
    ) {
      console.warn("⚠️ ACCESS_TOKEN_GITHUB is missing in development mode");
    }

    return { ...publicEnv, ...privateEnv };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ Using default values in development mode");
      return publicEnvSchema.parse(process.env);
    }

    throw error;
  }
}

const env = validateEnv();

export { env };

export type Env = z.infer<typeof publicEnvSchema> &
  Partial<z.infer<typeof privateEnvSchema>>;
