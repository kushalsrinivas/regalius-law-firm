import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');
const ATTORNEYS_FILE = path.join(DATA_DIR, 'attorneys.json');
const PRACTICE_AREAS_FILE = path.join(DATA_DIR, 'practice-areas.json');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(BLOGS_FILE)) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(ATTORNEYS_FILE)) {
  fs.writeFileSync(ATTORNEYS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(PRACTICE_AREAS_FILE)) {
  fs.writeFileSync(PRACTICE_AREAS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(SERVICES_FILE)) {
  fs.writeFileSync(SERVICES_FILE, JSON.stringify([]));
}
if (!fs.existsSync(ADMIN_FILE)) {
  // Default admin: email: admin@regaliuslaw.com, password: Admin@123
  fs.writeFileSync(
    ADMIN_FILE,
    JSON.stringify([
      {
        id: '1',
        email: 'admin@regaliuslaw.com',
        passwordHash: '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS',
        name: 'Admin User',
        createdAt: new Date().toISOString(),
      },
    ])
  );
}

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

// Database operations
export const db = {
  // Contact operations
  contacts: {
    getAll: (): ContactSubmission[] => {
      const data = fs.readFileSync(CONTACTS_FILE, 'utf-8');
      return JSON.parse(data);
    },
    getById: (id: string): ContactSubmission | undefined => {
      const contacts = db.contacts.getAll();
      return contacts.find((c) => c.id === id);
    },
    create: (contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'updatedAt'>): ContactSubmission => {
      const contacts = db.contacts.getAll();
      const newContact: ContactSubmission = {
        ...contact,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      contacts.push(newContact);
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
      return newContact;
    },
    update: (id: string, updates: Partial<ContactSubmission>): ContactSubmission | null => {
      const contacts = db.contacts.getAll();
      const index = contacts.findIndex((c) => c.id === id);
      if (index === -1) return null;
      contacts[index] = {
        ...contacts[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
      return contacts[index];
    },
    delete: (id: string): boolean => {
      const contacts = db.contacts.getAll();
      const filtered = contacts.filter((c) => c.id !== id);
      if (filtered.length === contacts.length) return false;
      fs.writeFileSync(CONTACTS_FILE, JSON.stringify(filtered, null, 2));
      return true;
    },
  },

  // Blog operations
  blogs: {
    getAll: (): Blog[] => {
      const data = fs.readFileSync(BLOGS_FILE, 'utf-8');
      return JSON.parse(data);
    },
    getPublished: (): Blog[] => {
      const blogs = db.blogs.getAll();
      return blogs.filter((b) => b.status === 'published').sort((a, b) => {
        return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
      });
    },
    getById: (id: string): Blog | undefined => {
      const blogs = db.blogs.getAll();
      return blogs.find((b) => b.id === id);
    },
    getBySlug: (slug: string): Blog | undefined => {
      const blogs = db.blogs.getAll();
      return blogs.find((b) => b.slug === slug);
    },
    create: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
      const blogs = db.blogs.getAll();
      const newBlog: Blog = {
        ...blog,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      blogs.push(newBlog);
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
      return newBlog;
    },
    update: (id: string, updates: Partial<Blog>): Blog | null => {
      const blogs = db.blogs.getAll();
      const index = blogs.findIndex((b) => b.id === id);
      if (index === -1) return null;
      blogs[index] = {
        ...blogs[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
      return blogs[index];
    },
    delete: (id: string): boolean => {
      const blogs = db.blogs.getAll();
      const filtered = blogs.filter((b) => b.id !== id);
      if (filtered.length === blogs.length) return false;
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(filtered, null, 2));
      return true;
    },
  },

  // Admin operations
  admin: {
    getByEmail: (email: string): Admin | undefined => {
      const data = fs.readFileSync(ADMIN_FILE, 'utf-8');
      const admins: Admin[] = JSON.parse(data);
      return admins.find((a) => a.email === email);
    },
  },

  // Attorney operations
  attorneys: {
    getAll: (): Attorney[] => {
      const data = fs.readFileSync(ATTORNEYS_FILE, 'utf-8');
      return JSON.parse(data);
    },
    getActive: (): Attorney[] => {
      const attorneys = db.attorneys.getAll();
      return attorneys.filter((a) => a.status === 'active').sort((a, b) => a.order - b.order);
    },
    getById: (id: string): Attorney | undefined => {
      const attorneys = db.attorneys.getAll();
      return attorneys.find((a) => a.id === id);
    },
    getBySlug: (slug: string): Attorney | undefined => {
      const attorneys = db.attorneys.getAll();
      return attorneys.find((a) => a.slug === slug);
    },
    create: (attorney: Omit<Attorney, 'id' | 'createdAt' | 'updatedAt'>): Attorney => {
      const attorneys = db.attorneys.getAll();
      const newAttorney: Attorney = {
        ...attorney,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      attorneys.push(newAttorney);
      fs.writeFileSync(ATTORNEYS_FILE, JSON.stringify(attorneys, null, 2));
      return newAttorney;
    },
    update: (id: string, updates: Partial<Attorney>): Attorney | null => {
      const attorneys = db.attorneys.getAll();
      const index = attorneys.findIndex((a) => a.id === id);
      if (index === -1) return null;
      attorneys[index] = {
        ...attorneys[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(ATTORNEYS_FILE, JSON.stringify(attorneys, null, 2));
      return attorneys[index];
    },
    delete: (id: string): boolean => {
      const attorneys = db.attorneys.getAll();
      const filtered = attorneys.filter((a) => a.id !== id);
      if (filtered.length === attorneys.length) return false;
      fs.writeFileSync(ATTORNEYS_FILE, JSON.stringify(filtered, null, 2));
      return true;
    },
  },

  // Practice Area operations
  practiceAreas: {
    getAll: (): PracticeArea[] => {
      const data = fs.readFileSync(PRACTICE_AREAS_FILE, 'utf-8');
      return JSON.parse(data);
    },
    getActive: (): PracticeArea[] => {
      const areas = db.practiceAreas.getAll();
      return areas.filter((a) => a.status === 'active').sort((a, b) => a.order - b.order);
    },
    getById: (id: string): PracticeArea | undefined => {
      const areas = db.practiceAreas.getAll();
      return areas.find((a) => a.id === id);
    },
    getBySlug: (slug: string): PracticeArea | undefined => {
      const areas = db.practiceAreas.getAll();
      return areas.find((a) => a.slug === slug);
    },
    create: (area: Omit<PracticeArea, 'id' | 'createdAt' | 'updatedAt'>): PracticeArea => {
      const areas = db.practiceAreas.getAll();
      const newArea: PracticeArea = {
        ...area,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      areas.push(newArea);
      fs.writeFileSync(PRACTICE_AREAS_FILE, JSON.stringify(areas, null, 2));
      return newArea;
    },
    update: (id: string, updates: Partial<PracticeArea>): PracticeArea | null => {
      const areas = db.practiceAreas.getAll();
      const index = areas.findIndex((a) => a.id === id);
      if (index === -1) return null;
      areas[index] = {
        ...areas[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(PRACTICE_AREAS_FILE, JSON.stringify(areas, null, 2));
      return areas[index];
    },
    delete: (id: string): boolean => {
      const areas = db.practiceAreas.getAll();
      const filtered = areas.filter((a) => a.id !== id);
      if (filtered.length === areas.length) return false;
      fs.writeFileSync(PRACTICE_AREAS_FILE, JSON.stringify(filtered, null, 2));
      return true;
    },
  },

  // Service operations
  services: {
    getAll: (): Service[] => {
      const data = fs.readFileSync(SERVICES_FILE, 'utf-8');
      return JSON.parse(data);
    },
    getActive: (): Service[] => {
      const services = db.services.getAll();
      return services.filter((s) => s.status === 'active').sort((a, b) => a.order - b.order);
    },
    getById: (id: string): Service | undefined => {
      const services = db.services.getAll();
      return services.find((s) => s.id === id);
    },
    getBySlug: (slug: string): Service | undefined => {
      const services = db.services.getAll();
      return services.find((s) => s.slug === slug);
    },
    create: (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service => {
      const services = db.services.getAll();
      const newService: Service = {
        ...service,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      services.push(newService);
      fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
      return newService;
    },
    update: (id: string, updates: Partial<Service>): Service | null => {
      const services = db.services.getAll();
      const index = services.findIndex((s) => s.id === id);
      if (index === -1) return null;
      services[index] = {
        ...services[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2));
      return services[index];
    },
    delete: (id: string): boolean => {
      const services = db.services.getAll();
      const filtered = services.filter((s) => s.id !== id);
      if (filtered.length === services.length) return false;
      fs.writeFileSync(SERVICES_FILE, JSON.stringify(filtered, null, 2));
      return true;
    },
  },
};

