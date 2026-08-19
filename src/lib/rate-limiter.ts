/**
 * Simple in-memory rate limiter for Edge Runtime.
 * 40 requests per minute per IP.
 * Note: For multi-instance deployments, replace with @upstash/ratelimit + Redis.
 */

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds
}

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 40;

// Store: ip -> { count, windowStart }
const store = new Map<string, { count: number; windowStart: number }>();

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of store.entries()) {
    if (now - data.windowStart > WINDOW_MS) {
      store.delete(ip);
    }
  }
}, WINDOW_MS);

export async function rateLimit(ip: string): Promise<RateLimitResult> {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now - record.windowStart >= WINDOW_MS) {
    // New window
    store.set(ip, { count: 1, windowStart: now });
    return {
      success: true,
      limit: MAX_REQUESTS,
      remaining: MAX_REQUESTS - 1,
      reset: Math.ceil((now + WINDOW_MS) / 1000),
    };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      success: false,
      limit: MAX_REQUESTS,
      remaining: 0,
      reset: Math.ceil((record.windowStart + WINDOW_MS) / 1000),
    };
  }

  record.count++;
  return {
    success: true,
    limit: MAX_REQUESTS,
    remaining: MAX_REQUESTS - record.count,
    reset: Math.ceil((record.windowStart + WINDOW_MS) / 1000),
  };
}