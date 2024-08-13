import { serial, text, pgTable } from "drizzle-orm/pg-core";


export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageSrc: text('image_src').notNull(),
});