import { Redis } from "@upstash/redis";

// Create a Redis client using environment variables - automatically picks up UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
export const redis = Redis.fromEnv();
