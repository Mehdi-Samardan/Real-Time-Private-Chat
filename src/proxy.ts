import { NextRequest, NextResponse } from "next/server";
import { redis } from "./app/lib/redis";

export const proxy = async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Match the app's route: /room/<id>
  const roomMatch = pathname.match(/^\/room\/([^\/]+)\/?$/);

  if (!roomMatch) return NextResponse.redirect(new URL("/", req.url));

  const roomId = roomMatch[1];

  const meta = await redis.hgetall<{ connected: string[]; createdAt: number }>(
    `meta:${roomId}`
  );
  console.log("room meta", meta);

  if (!meta || !meta.createdAt) {
    return NextResponse.redirect(new URL("/?error=room-not-found", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/room/:path*",
};
