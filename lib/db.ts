// In-memory database for Vercel deployment
// Data persists only during the lifetime of the serverless function

import {
  initialAdmins,
  initialAttorneys,
  initialBlogs,
  initialContacts,
  initialPracticeAreas,
  initialServices,
  initialFAQs,
  type FAQ,
} from './initial-data';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  inquiryType: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  readTime: string;
}

export interface Admin {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  education: string[];
  experience: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  practiceAreas: string[];
  barAdmissions: string[];
  languages: string[];
  status: 'active' | 'inactive';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon?: string;
  status: 'active' | 'inactive';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon?: string;
  category: string;
  features: string[];
  status: 'active' | 'inactive';
  order: number;
  createdAt: string;
  updatedAt: string;
}

export { FAQ };

// In-memory storage - initialized with data from initial-data.ts
let contacts: ContactSubmission[] = [...initialContacts];
let blogs: Blog[] = [...initialBlogs];
let admins: Admin[] = [...initialAdmins];
let attorneys: Attorney[] = [...initialAttorneys];
let practiceAreas: PracticeArea[] = [...initialPracticeAreas];
let services: Service[] = [...initialServices];
let faqs: FAQ[] = [...initialFAQs];

// Database operations
export const db = {
  // Contact operations
  contacts: {
    getAll: (): ContactSubmission[] => {
      return [...contacts];
    },
    getById: (id: string): ContactSubmission | undefined => {
      return contacts.find((c) => c.id === id);
    },
    create: (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'updatedAt'>): ContactSubmission => {
      const newContact: ContactSubmission = {
        ...contact,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      contacts.push(newContact);
      return newContact;
    },
    update: (id: string, updates: Partial<ContactSubmission>): ContactSubmission | null => {
      const index = contacts.findIndex((c) => c.id === id);
      if (index === -1) return null;
      contacts[index] = {
        ...contacts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return contacts[index];
    },
    delete: (id: string): boolean => {
      const initialLength = contacts.length;
      contacts = contacts.filter((c) => c.id !== id);
      return contacts.length < initialLength;
    },
  },

  // Blog operations
  blogs: {
    getAll: (): Blog[] => {
      return [...blogs];
    },
    getPublished: (): Blog[] => {
      return blogs
        .filter((b) => b.status === 'published')
        .sort((a, b) => {
          return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
        });
    },
    getById: (id: string): Blog | undefined => {
      return blogs.find((b) => b.id === id);
    },
    getBySlug: (slug: string): Blog | undefined => {
      return blogs.find((b) => b.slug === slug);
    },
    create: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
      const newBlog: Blog = {
        ...blog,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      blogs.push(newBlog);
      return newBlog;
    },
    update: (id: string, updates: Partial<Blog>): Blog | null => {
      const index = blogs.findIndex((b) => b.id === id);
      if (index === -1) return null;
      blogs[index] = {
        ...blogs[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return blogs[index];
    },
    delete: (id: string): boolean => {
      const initialLength = blogs.length;
      blogs = blogs.filter((b) => b.id !== id);
      return blogs.length < initialLength;
    },
  },

  // Admin operations
  admin: {
    getByEmail: (email: string): Admin | undefined => {
      return admins.find((a) => a.email === email);
    },
  },

  // Attorney operations
  attorneys: {
    getAll: (): Attorney[] => {
      return [...attorneys];
    },
    getActive: (): Attorney[] => {
      return attorneys
        .filter((a) => a.status === 'active')
        .sort((a, b) => a.order - b.order);
    },
    getById: (id: string): Attorney | undefined => {
      return attorneys.find((a) => a.id === id);
    },
    getBySlug: (slug: string): Attorney | undefined => {
      return attorneys.find((a) => a.slug === slug);
    },
    create: (attorney: Omit<Attorney, 'id' | 'createdAt' | 'updatedAt'>): Attorney => {
      const newAttorney: Attorney = {
        ...attorney,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      attorneys.push(newAttorney);
      return newAttorney;
    },
    update: (id: string, updates: Partial<Attorney>): Attorney | null => {
      const index = attorneys.findIndex((a) => a.id === id);
      if (index === -1) return null;
      attorneys[index] = {
        ...attorneys[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return attorneys[index];
    },
    delete: (id: string): boolean => {
      const initialLength = attorneys.length;
      attorneys = attorneys.filter((a) => a.id !== id);
      return attorneys.length < initialLength;
    },
  },

  // Practice Area operations
  practiceAreas: {
    getAll: (): PracticeArea[] => {
      return [...practiceAreas];
    },
    getActive: (): PracticeArea[] => {
      return practiceAreas
        .filter((a) => a.status === 'active')
        .sort((a, b) => a.order - b.order);
    },
    getById: (id: string): PracticeArea | undefined => {
      return practiceAreas.find((a) => a.id === id);
    },
    getBySlug: (slug: string): PracticeArea | undefined => {
      return practiceAreas.find((a) => a.slug === slug);
    },
    create: (area: Omit<PracticeArea, 'id' | 'createdAt' | 'updatedAt'>): PracticeArea => {
      const newArea: PracticeArea = {
        ...area,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      practiceAreas.push(newArea);
      return newArea;
    },
    update: (id: string, updates: Partial<PracticeArea>): PracticeArea | null => {
      const index = practiceAreas.findIndex((a) => a.id === id);
      if (index === -1) return null;
      practiceAreas[index] = {
        ...practiceAreas[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return practiceAreas[index];
    },
    delete: (id: string): boolean => {
      const initialLength = practiceAreas.length;
      practiceAreas = practiceAreas.filter((a) => a.id !== id);
      return practiceAreas.length < initialLength;
    },
  },

  // Service operations
  services: {
    getAll: (): Service[] => {
      return [...services];
    },
    getActive: (): Service[] => {
      return services
        .filter((s) => s.status === 'active')
        .sort((a, b) => a.order - b.order);
    },
    getById: (id: string): Service | undefined => {
      return services.find((s) => s.id === id);
    },
    getBySlug: (slug: string): Service | undefined => {
      return services.find((s) => s.slug === slug);
    },
    create: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service => {
      const newService: Service = {
        ...service,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      services.push(newService);
      return newService;
    },
    update: (id: string, updates: Partial<Service>): Service | null => {
      const index = services.findIndex((s) => s.id === id);
      if (index === -1) return null;
      services[index] = {
        ...services[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return services[index];
    },
    delete: (id: string): boolean => {
      const initialLength = services.length;
      services = services.filter((s) => s.id !== id);
      return services.length < initialLength;
    },
  },

  // FAQ operations
  faqs: {
    getAll: (): FAQ[] => {
      return [...faqs];
    },
    getActive: (): FAQ[] => {
      return faqs
        .filter((f) => f.status === 'active')
        .sort((a, b) => a.order - b.order);
    },
    getById: (id: string): FAQ | undefined => {
      return faqs.find((f) => f.id === id);
    },
    create: (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): FAQ => {
      const newFAQ: FAQ = {
        ...faq,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      faqs.push(newFAQ);
      return newFAQ;
    },
    update: (id: string, updates: Partial<FAQ>): FAQ | null => {
      const index = faqs.findIndex((f) => f.id === id);
      if (index === -1) return null;
      faqs[index] = {
        ...faqs[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return faqs[index];
    },
    delete: (id: string): boolean => {
      const initialLength = faqs.length;
      faqs = faqs.filter((f) => f.id !== id);
      return faqs.length < initialLength;
    },
  },
};
