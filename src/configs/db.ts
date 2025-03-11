import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';
import "jsr:@std/dotenv/load";

config({ path: ".env" }); // or .env.local

export const db = drizzle(Deno.env.get("DATABASE_URL")!);
