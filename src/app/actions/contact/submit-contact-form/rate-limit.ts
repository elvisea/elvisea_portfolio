const REQUESTS_PER_MINUTE = 3;
const WINDOW_SIZE_MS = 60 * 1000;

interface RateLimitInfo {
  count: number;
  firstRequest: number;
}

const rateLimitMap = new Map<string, RateLimitInfo>();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [ip, info] of rateLimitMap.entries()) {
    if (now - info.firstRequest >= WINDOW_SIZE_MS) {
      rateLimitMap.delete(ip);
    }
  }
}

export function isContactSubmissionRateLimited(ip: string): boolean {
  cleanupExpiredEntries();
  const now = Date.now();
  const info = rateLimitMap.get(ip);

  if (!info) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - info.firstRequest >= WINDOW_SIZE_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (info.count >= REQUESTS_PER_MINUTE) {
    return true;
  }

  info.count++;
  return false;
}

export function resetContactRateLimitForTests(): void {
  rateLimitMap.clear();
}
