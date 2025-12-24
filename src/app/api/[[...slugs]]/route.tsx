import { redis } from "@/app/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";

const RoomTTLSeconds = 60 * 10; // 10 minutes

// Create an Elysia app with a route to create a room
const rooms = new Elysia({ prefix: "/room" }).post("/create", async () => {
  console.log("Create Room from route.tsx");
  const roomId = nanoid();
  await redis.hset(`meta:${roomId}`, { connected: [], createdAt: Date.now() });

  await redis.expire(`meta:${roomId}`, RoomTTLSeconds);
  return { roomId };
});

// Export the Elysia app with /api prefix
const app = new Elysia({ prefix: "/api" }).use(rooms);

// Define the App type for the client
export const GET = app.fetch;
export const POST = app.fetch;
export type App = typeof app;
