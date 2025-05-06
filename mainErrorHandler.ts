import { Context, Next } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export default async function errorHandler(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);
    
    ctx.response.status = err.status || 500;
    ctx.response.body = {
      error: err.message || "Internal Server Error",
    };
    
    if (!ctx.response.headers.get("Content-Type")) {
      ctx.response.type = "json";
    }
  }
}