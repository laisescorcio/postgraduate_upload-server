import { env } from "@/env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schemas";

export const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, {schema})