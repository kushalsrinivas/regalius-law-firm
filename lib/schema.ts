import { pgTable, serial, text, timestamp, integer, jsonb, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const statusEnum = pgEnum('status', ['active', 'inactive']);
export const blogStatusEnum = pgEnum('blog_status', ['draft', 'published']);
export const contactStatusEnum = pgEnum('contact_status', ['new', 'read', 'responded']);

// Admins table
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Attorneys table
export const attorneys = pgTable('attorneys', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  specialty: text('specialty').notNull(),
  education: jsonb('education').notNull().$type<string[]>(),
  experience: text('experience').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  linkedin: text('linkedin'),
  photo: text('photo').notNull(),
  bio: text('bio').notNull(),
  practiceAreas: jsonb('practice_areas').notNull().$type<string[]>(),
  barAdmissions: jsonb('bar_admissions').notNull().$type<string[]>(),
  languages: jsonb('languages').notNull().$type<string[]>(),
  status: statusEnum('status').default('active').notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blogs table
export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  thumbnail: text('thumbnail').notNull(),
  category: text('category').notNull(),
  author: text('author').notNull(),
  status: blogStatusEnum('status').default('draft').notNull(),
  publishedAt: timestamp('published_at'),
  readTime: text('read_time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Contacts table
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  inquiryType: text('inquiry_type').notNull(),
  message: text('message').notNull(),
  status: contactStatusEnum('status').default('new').notNull(),
  adminNotes: text('admin_notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Practice Areas table
export const practiceAreas = pgTable('practice_areas', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  image: text('image').notNull(),
  icon: text('icon'),
  status: statusEnum('status').default('active').notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Services table
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  content: text('content').notNull(),
  image: text('image').notNull(),
  icon: text('icon'),
  category: text('category').notNull(),
  features: jsonb('features').notNull().$type<string[]>(),
  status: statusEnum('status').default('active').notNull(),
  order: integer('order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// FAQs table
export const faqs = pgTable('faqs', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: text('category').notNull(),
  order: integer('order').default(0).notNull(),
  status: statusEnum('status').default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports for use in the application
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;

export type Attorney = typeof attorneys.$inferSelect;
export type NewAttorney = typeof attorneys.$inferInsert;

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;

export type PracticeArea = typeof practiceAreas.$inferSelect;
export type NewPracticeArea = typeof practiceAreas.$inferInsert;

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;

export type FAQ = typeof faqs.$inferSelect;
export type NewFAQ = typeof faqs.$inferInsert;

