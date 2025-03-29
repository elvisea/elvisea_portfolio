import { cookies } from 'next/headers'

const LINKEDIN_TOKEN_COOKIE = 'linkedin_access_token'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 dias

export async function setLinkedInToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(LINKEDIN_TOKEN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  })
}

export async function getLinkedInToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(LINKEDIN_TOKEN_COOKIE)?.value
}

export async function removeLinkedInToken() {
  const cookieStore = await cookies()
  cookieStore.delete(LINKEDIN_TOKEN_COOKIE)
} 