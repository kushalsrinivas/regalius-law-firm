// Database operations using Drizzle ORM
import { eq, desc, asc, and } from 'drizzle-orm';
import { db } from './drizzle';
import * as schema from './schema';

// Re-export types for backward compatibility
export type {
  Admin,
  Attorney,
  Blog,
  Contact,
  PracticeArea,
  Service,
  FAQ,
} from './schema';

// Database operations
export const database = {
  // Contact operations
  contacts: {
    getAll: async () => {
      return await db.select().from(schema.contacts).orderBy(desc(schema.contacts.createdAt));
    },
    getById: async (id: number) => {
      const results = await db.select().from(schema.contacts).where(eq(schema.contacts.id, id)).limit(1);
      return results[0];
    },
    create: async (contact: schema.NewContact) => {
      const results = await db.insert(schema.contacts).values(contact).returning();
      return results[0];
    },
    update: async (id: number, updates: Partial<schema.Contact>) => {
      const results = await db
        .update(schema.contacts)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.contacts.id, id))
        .returning();
      return results[0] || null;
    },
    delete: async (id: number) => {
      const results = await db.delete(schema.contacts).where(eq(schema.contacts.id, id)).returning();
      return results.length > 0;
    },
  },

  // Blog operations
  blogs: {
    getAll: async () => {
      return await db.select().from(schema.blogs).orderBy(desc(schema.blogs.createdAt));
    },
    getPublished: async () => {
      return await db
        .select()
        .from(schema.blogs)
        .where(eq(schema.blogs.status, 'published'))
        .orderBy(desc(schema.blogs.publishedAt));
    },
    getById: async (id: number) => {
      const results = await db.select().from(schema.blogs).where(eq(schema.blogs.id, id)).limit(1);
      return results[0];
    },
    getBySlug: async (slug: string) => {
      const results = await db.select().from(schema.blogs).where(eq(schema.blogs.slug, slug)).limit(1);
      return results[0];
    },
    create: async (blog: schema.NewBlog) => {
      const results = await db.insert(schema.blogs).values(blog).returning();
      return results[0];
    },
    update: async (id: number, updates: Partial<schema.Blog>) => {
      const results = await db
        .update(schema.blogs)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.blogs.id, id))
        .returning();
      return results[0] || null;
    },
    delete: async (id: number) => {
      const results = await db.delete(schema.blogs).where(eq(schema.blogs.id, id)).returning();
      return results.length > 0;
    },
  },

  // Admin operations
  admin: {
    getByEmail: async (email: string) => {
      const results = await db.select().from(schema.admins).where(eq(schema.admins.email, email)).limit(1);
      return results[0];
    },
  },

  // Attorney operations
  attorneys: {
    getAll: async () => {
      return await db.select().from(schema.attorneys).orderBy(asc(schema.attorneys.order));
    },
    getActive: async () => {
      return await db
        .select()
        .from(schema.attorneys)
        .where(eq(schema.attorneys.status, 'active'))
        .orderBy(asc(schema.attorneys.order));
    },
    getById: async (id: number) => {
      const results = await db.select().from(schema.attorneys).where(eq(schema.attorneys.id, id)).limit(1);
      return results[0];
    },
    getBySlug: async (slug: string) => {
      const results = await db.select().from(schema.attorneys).where(eq(schema.attorneys.slug, slug)).limit(1);
      return results[0];
    },
    create: async (attorney: schema.NewAttorney) => {
      const results = await db.insert(schema.attorneys).values(attorney).returning();
      return results[0];
    },
    update: async (id: number, updates: Partial<schema.Attorney>) => {
      const results = await db
        .update(schema.attorneys)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.attorneys.id, id))
        .returning();
      return results[0] || null;
    },
    delete: async (id: number) => {
      const results = await db.delete(schema.attorneys).where(eq(schema.attorneys.id, id)).returning();
      return results.length > 0;
    },
  },

  // Practice Area operations
  practiceAreas: {
    getAll: async () => {
      return await db.select().from(schema.practiceAreas).orderBy(asc(schema.practiceAreas.order));
    },
    getActive: async () => {
      return await db
        .select()
        .from(schema.practiceAreas)
        .where(eq(schema.practiceAreas.status, 'active'))
        .orderBy(asc(schema.practiceAreas.order));
    },
    getById: async (id: number) => {
      const results = await db.select().from(schema.practiceAreas).where(eq(schema.practiceAreas.id, id)).limit(1);
      return results[0];
    },
    getBySlug: async (slug: string) => {
      const results = await db.select().from(schema.practiceAreas).where(eq(schema.practiceAreas.slug, slug)).limit(1);
      return results[0];
    },
    create: async (area: schema.NewPracticeArea) => {
      const results = await db.insert(schema.practiceAreas).values(area).returning();
      return results[0];
    },
    update: async (id: number, updates: Partial<schema.PracticeArea>) => {
      const results = await db
        .update(schema.practiceAreas)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.practiceAreas.id, id))
        .returning();
      return results[0] || null;
    },
    delete: async (id: number) => {
      const results = await db.delete(schema.practiceAreas).where(eq(schema.practiceAreas.id, id)).returning();
      return results.length > 0;
    },
  },

  // Service operations
  services: {
    getAll: async () => {
      return await db.select().from(schema.services).orderBy(asc(schema.services.order));
    },
    getActive: async () => {
      return await db
        .select()
        .from(schema.services)
        .where(eq(schema.services.status, 'active'))
        .orderBy(asc(schema.services.order));
    },
    getById: async (id: number) => {
      const results = await db.select().from(schema.services).where(eq(schema.services.id, id)).limit(1);
      return results[0];
    },
    getBySlug: async (slug: string) => {
      const results = await db.select().from(schema.services).where(eq(schema.services.slug, slug)).limit(1);
      return results[0];
    },
    create: async (service: schema.NewService) => {
      const results = await db.insert(schema.services).values(service).returning();
      return results[0];
    },
    update: async (id: number, updates: Partial<schema.Service>) => {
      const results = await db
        .update(schema.services)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.services.id, id))
        .returning();
      return results[0] || null;
    },
    delete: async (id: number) => {
      const results = await db.delete(schema.services).where(eq(schema.services.id, id)).returning();
      return results.length > 0;
    },
  },

  // FAQ operations
  faqs: {
    getAll: async () => {
      return await db.select().from(schema.faqs).orderBy(asc(schema.faqs.order));
    },
    getActive: async () => {
      return await db
        .select()
        .from(schema.faqs)
        .where(eq(schema.faqs.status, 'active'))
        .orderBy(asc(schema.faqs.order));
    },
    getById: async (id: number) => {
      const results = await db.select().from(schema.faqs).where(eq(schema.faqs.id, id)).limit(1);
      return results[0];
    },
    create: async (faq: schema.NewFAQ) => {
      const results = await db.insert(schema.faqs).values(faq).returning();
      return results[0];
    },
    update: async (id: number, updates: Partial<schema.FAQ>) => {
      const results = await db
        .update(schema.faqs)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(schema.faqs.id, id))
        .returning();
      return results[0] || null;
    },
    delete: async (id: number) => {
      const results = await db.delete(schema.faqs).where(eq(schema.faqs.id, id)).returning();
      return results.length > 0;
    },
  },
};

// Export as 'db' for backward compatibility with existing code
export { database as db };
