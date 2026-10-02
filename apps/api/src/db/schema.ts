import { pgTable,uuid,varchar,timestamp,uniqueIndex } from "drizzle-orm/pg-core";

export const rooms = pgTable(
    "rooms",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        code: varchar("code", { length: 6}).notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
    },
    (table) => [
        uniqueIndex("rooms_code_unique").on(table.code),
    ]
)