import { pgTable,uuid,varchar,timestamp,uniqueIndex } from "drizzle-orm/pg-core";

export const rooms = pgTable(
    "rooms",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        code: varchar("code", { length: 6}).notNull(),
        createdBy: uuid("created_by").references(() => users.id),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [
        uniqueIndex("rooms_code_unique").on(table.code),
    ]
)

export const users = pgTable(
    "users",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        email: varchar('email', { length: 255 }).notNull(),
        passwordHash: varchar("password_hash", { length: 255}).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => ({
        emailUniqueIndex: uniqueIndex("user_email_unique").on(table.email)
    }),
);