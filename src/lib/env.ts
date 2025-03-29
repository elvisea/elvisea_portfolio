import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_CREATOR_NAME: z.string().default('Elvis Amancio'),
  NEXT_PUBLIC_CREATOR_ROLE: z.string().default('Desenvolvedor Full Stack'),
  NEXT_PUBLIC_CREATOR_EMAIL: z.string().email().default('contato@elvisea.dev'),
  NEXT_PUBLIC_GITHUB_URL: z.string().url().default('https://github.com/elvisea'),
  NEXT_PUBLIC_GITHUB_API_URL: z.string().url().default('https://api.github.com/users/elvisea'),
  NEXT_PUBLIC_LINKEDIN_URL: z.string().url().default('https://linkedin.com/in/elvisea'),
  NEXT_PUBLIC_TWITTER_HANDLE: z.string().default('@elvisea'),

  // LINKEDIN_CLIENT_ID: z.string(),
  // LINKEDIN_CLIENT_SECRET: z.string(),
})

// Validação das variáveis de ambiente
const envParsed = envSchema.safeParse(process.env)

if (!envParsed.success) {
  console.error('❌ Invalid environment variables:', envParsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables')
}

export type Env = z.infer<typeof envSchema>
export const env = envParsed.data as Env
