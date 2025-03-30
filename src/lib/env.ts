const env = {
  // Docker Configuration
  REGISTRY: process.env.REGISTRY,
  IMAGE_NAME: process.env.IMAGE_NAME,
  CONTAINER_NAME_APP: process.env.CONTAINER_NAME_APP,

  // Site Configuration
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

  // Creator Info
  NEXT_PUBLIC_CREATOR_NAME: process.env.NEXT_PUBLIC_CREATOR_NAME,
  NEXT_PUBLIC_CREATOR_ROLE: process.env.NEXT_PUBLIC_CREATOR_ROLE,
  NEXT_PUBLIC_CREATOR_EMAIL: process.env.NEXT_PUBLIC_CREATOR_EMAIL,

  // Company Info
  COMPANY_NAME: process.env.COMPANY_NAME,
  COMPANY_EMAIL: process.env.COMPANY_EMAIL,
  COMPANY_PHONE: process.env.COMPANY_PHONE,

  // Email Configuration
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_USER_NO_REPLY: process.env.SMTP_USER_NO_REPLY,
  EMAIL_CONTACT: process.env.EMAIL_CONTACT,
  PHONE_NUMBER: process.env.PHONE_NUMBER,
  MAP_COORDINATES: process.env.MAP_COORDINATES,

  // API URLs
  NEXT_PUBLIC_GITHUB_API_URL:
    process.env.NEXT_PUBLIC_GITHUB_API_URL ||
    "https://api.github.com/users/elvisea",

  // Social Media URLs
  NEXT_PUBLIC_GITHUB_URL:
    process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/elvisea",
  NEXT_PUBLIC_LINKEDIN_URL:
    process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://linkedin.com/in/elvisea",
} as const;

export { env };
