/**
 * Minimal in-memory, fixed-window rate limiter for public API routes
 * (search, contact). Good enough for a single-instance deployment; it does
 * NOT share state across multiple server instances/regions — if this site
 * is deployed behind multiple edge/serverless instances, replace this with
 * a shared store (e.g. Upstash Redis) before relying on it as the only
 * defense. It exists to blunt casual abuse, not to be a hard guarantee.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  bucket.count += 1;
  return bucket.count > limit;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
