import { treaty } from "@elysiajs/eden";
import type { App } from "../api/[[...slugs]]/route";

// this require .api to enter /api prefix
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export const Client = treaty<App>(baseUrl).api;
