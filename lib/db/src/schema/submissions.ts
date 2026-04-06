import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const instagramSubmissionsTable = pgTable("instagram_submissions", {
  id: serial("id").primaryKey(),
  favoriteCelebrity: text("favorite_celebrity").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const tiktokSubmissionsTable = pgTable("tiktok_submissions", {
  id: serial("id").primaryKey(),
  favoriteCelebrity: text("favorite_celebrity").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertInstagramSubmissionSchema = createInsertSchema(instagramSubmissionsTable).omit({ id: true, submittedAt: true });
export const insertTiktokSubmissionSchema = createInsertSchema(tiktokSubmissionsTable).omit({ id: true, submittedAt: true });

export type InsertInstagramSubmission = z.infer<typeof insertInstagramSubmissionSchema>;
export type InstagramSubmission = typeof instagramSubmissionsTable.$inferSelect;
export type InsertTiktokSubmission = z.infer<typeof insertTiktokSubmissionSchema>;
export type TiktokSubmission = typeof tiktokSubmissionsTable.$inferSelect;
