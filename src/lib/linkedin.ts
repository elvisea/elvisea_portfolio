export const LINKEDIN_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/linkedin/callback`,
  scope: ['r_liteprofile', 'r_emailaddress'].join(' '),
  authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
  tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
  apiUrl: 'https://api.linkedin.com/v2',
  state: 'linkedin_auth_state',
  apiVersion: '202304',
  restliVersion: '2.0.0'
} 