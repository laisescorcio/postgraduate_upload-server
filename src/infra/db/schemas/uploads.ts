import { randomUUID } from "node:crypto";
import { uuidv7 } from "uuidv7";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const uploads = pgTable("uploads", {
    id: text("id").primaryKey().$defaultFn(() => uuidv7()),
    name: text("name").notNull(),
    remoteKey: text("remote_key").notNull().unique(),
    remoteUrl: text("remote_url").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});