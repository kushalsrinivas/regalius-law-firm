// Centralized data store for all content
// Images will be handled separately later

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
  linkedin?: string;
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

export interface Contact {
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

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

// Attorneys Data
export const attorneys: Attorney[] = [
  {
    id: "1766234875634",
    name: "Chayank M N K",
    slug: "chayank-m-n-k",
    title: "Senior Partner",
    specialty: "Corporate Law",
    education: ["LLB From Harvard"],
    experience: "72",
    email: "kushal.s.2005@gmail.com",
    phone: "7619552810",
    photo: "/uploads/1766234845825.jpeg",
    bio: "idk much lmao",
    practiceAreas: ["Corporate law"],
    barAdmissions: ["Bangalore state Law"],
    languages: ["English"],
    status: "active",
    order: 0,
    createdAt: "2025-12-20T12:47:55.634Z",
    updatedAt: "2025-12-20T12:59:47.021Z"
  },
  // Add more attorneys here
  {
    id: "2",
    name: "Sarah Johnson",
    slug: "sarah-johnson",
    title: "Managing Partner",
    specialty: "International Law",
    education: ["JD from Yale Law School", "LLM in International Law"],
    experience: "15 years",
    email: "sarah.johnson@regaliuslaw.com",
    phone: "+1 (555) 123-4567",
    photo: "/placeholder-user.jpg",
    bio: "Sarah Johnson specializes in international corporate law and cross-border transactions. With over 15 years of experience, she has successfully represented multinational corporations in complex mergers and acquisitions.",
    practiceAreas: ["International Law", "Corporate Law", "Mergers & Acquisitions"],
    barAdmissions: ["New York State Bar", "California State Bar"],
    languages: ["English", "French", "Spanish"],
    status: "active",
    order: 1,
    createdAt: "2025-12-20T10:00:00.000Z",
    updatedAt: "2025-12-20T10:00:00.000Z"
  },
  {
    id: "3",
    name: "Michael Chen",
    slug: "michael-chen",
    title: "Senior Partner",
    specialty: "Intellectual Property",
    education: ["JD from Stanford Law School", "BS in Computer Science from MIT"],
    experience: "12 years",
    email: "michael.chen@regaliuslaw.com",
    phone: "+1 (555) 234-5678",
    photo: "/placeholder-user.jpg",
    bio: "Michael Chen is a leading expert in intellectual property law, with a focus on technology patents and software licensing. His technical background gives him unique insights into complex IP matters.",
    practiceAreas: ["Intellectual Property", "Technology Law", "Patent Law"],
    barAdmissions: ["California State Bar", "USPTO Patent Bar"],
    languages: ["English", "Mandarin"],
    status: "active",
    order: 2,
    createdAt: "2025-12-20T10:00:00.000Z",
    updatedAt: "2025-12-20T10:00:00.000Z"
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    slug: "emily-rodriguez",
    title: "Partner",
    specialty: "Family Law",
    education: ["JD from Harvard Law School", "BA in Psychology"],
    experience: "10 years",
    email: "emily.rodriguez@regaliuslaw.com",
    phone: "+1 (555) 345-6789",
    photo: "/placeholder-user.jpg",
    bio: "Emily Rodriguez brings compassion and expertise to complex family law matters. She specializes in high-net-worth divorces and custody cases, always prioritizing her clients' best interests.",
    practiceAreas: ["Family Law", "Divorce", "Child Custody"],
    barAdmissions: ["New York State Bar"],
    languages: ["English", "Spanish"],
    status: "active",
    order: 3,
    createdAt: "2025-12-20T10:00:00.000Z",
    updatedAt: "2025-12-20T10:00:00.000Z"
  },
  {
    id: "5",
    name: "David Thompson",
    slug: "david-thompson",
    title: "Partner",
    specialty: "Real Estate Law",
    education: ["JD from Columbia Law School", "MBA from Wharton"],
    experience: "14 years",
    email: "david.thompson@regaliuslaw.com",
    phone: "+1 (555) 456-7890",
    photo: "/placeholder-user.jpg",
    bio: "David Thompson is a seasoned real estate attorney with extensive experience in commercial real estate transactions, zoning issues, and property development projects.",
    practiceAreas: ["Real Estate Law", "Commercial Transactions", "Property Development"],
    barAdmissions: ["New York State Bar", "New Jersey State Bar"],
    languages: ["English"],
    status: "active",
    order: 4,
    createdAt: "2025-12-20T10:00:00.000Z",
    updatedAt: "2025-12-20T10:00:00.000Z"
  },
  {
    id: "6",
    name: "Jennifer Park",
    slug: "jennifer-park",
    title: "Associate",
    specialty: "Employment Law",
    education: ["JD from UCLA School of Law"],
    experience: "6 years",
    email: "jennifer.park@regaliuslaw.com",
    phone: "+1 (555) 567-8901",
    photo: "/placeholder-user.jpg",
    bio: "Jennifer Park represents both employers and employees in workplace disputes. She has a proven track record in employment discrimination cases and labor negotiations.",
    practiceAreas: ["Employment Law", "Labor Relations", "Workplace Discrimination"],
    barAdmissions: ["California State Bar"],
    languages: ["English", "Korean"],
    status: "active",
    order: 5,
    createdAt: "2025-12-20T10:00:00.000Z",
    updatedAt: "2025-12-20T10:00:00.000Z"
  }
];

// Blogs Data
export const blogs: Blog[] = [
  {
    id: "1766227545161",
    title: "huhuh",
    slug: "huhuh",
    excerpt: "kmo",
    content: "hjfgjhfhmhjncdf",
    thumbnail: "/uploads/1766227542801.jpeg",
    category: "Corporate Law",
    author: "Regalius Law Partners",
    status: "published",
    publishedAt: "2025-12-20T10:45:45.160Z",
    readTime: "1 min read",
    createdAt: "2025-12-20T10:45:45.161Z",
    updatedAt: "2025-12-20T10:45:45.161Z"
  },
  {
    id: "1766227909460",
    title: "uhdsihsisdhf",
    slug: "uhdsihsisdhf",
    excerpt: "sdfsfdioufhsdh",
    content: "ssdefiufgseiygisyegfiyegsfifygisyfge",
    thumbnail: "/uploads/1766227907278.jpeg",
    category: "Firm News",
    author: "Regalius Law Partners",
    status: "published",
    publishedAt: "2025-12-20T10:51:54.736Z",
    readTime: "1 min read",
    createdAt: "2025-12-20T10:51:49.460Z",
    updatedAt: "2025-12-20T10:51:54.736Z"
  }
];

// Contacts Data (initially empty, will be populated as submissions come in)
export const contacts: Contact[] = [];

// FAQs Data
export const faqs: FAQ[] = [];

// Helper functions to interact with data
export const dataStore = {
  // Attorney operations
  attorneys: {
    getAll: (): Attorney[] => attorneys,
    getActive: (): Attorney[] => attorneys.filter(a => a.status === 'active'),
    getById: (id: string): Attorney | undefined => attorneys.find(a => a.id === id),
    getBySlug: (slug: string): Attorney | undefined => attorneys.find(a => a.slug === slug),
    create: (attorney: Omit<Attorney, 'id' | 'createdAt' | 'updatedAt'>): Attorney => {
      const now = new Date().toISOString();
      const newAttorney: Attorney = {
        ...attorney,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      attorneys.push(newAttorney);
      return newAttorney;
    },
    update: (id: string, updates: Partial<Attorney>): Attorney | null => {
      const index = attorneys.findIndex(a => a.id === id);
      if (index === -1) return null;
      attorneys[index] = {
        ...attorneys[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return attorneys[index];
    },
    delete: (id: string): boolean => {
      const index = attorneys.findIndex(a => a.id === id);
      if (index === -1) return false;
      attorneys.splice(index, 1);
      return true;
    }
  },

  // Blog operations
  blogs: {
    getAll: (): Blog[] => blogs,
    getPublished: (): Blog[] => blogs.filter(b => b.status === 'published'),
    getById: (id: string): Blog | undefined => blogs.find(b => b.id === id),
    getBySlug: (slug: string): Blog | undefined => blogs.find(b => b.slug === slug),
    create: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
      const now = new Date().toISOString();
      const newBlog: Blog = {
        ...blog,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      blogs.push(newBlog);
      return newBlog;
    },
    update: (id: string, updates: Partial<Blog>): Blog | null => {
      const index = blogs.findIndex(b => b.id === id);
      if (index === -1) return null;
      blogs[index] = {
        ...blogs[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return blogs[index];
    },
    delete: (id: string): boolean => {
      const index = blogs.findIndex(b => b.id === id);
      if (index === -1) return false;
      blogs.splice(index, 1);
      return true;
    }
  },

  // Contact operations
  contacts: {
    getAll: (): Contact[] => contacts,
    getById: (id: string): Contact | undefined => contacts.find(c => c.id === id),
    create: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Contact => {
      const now = new Date().toISOString();
      const newContact: Contact = {
        ...contact,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      contacts.push(newContact);
      return newContact;
    },
    update: (id: string, updates: Partial<Contact>): Contact | null => {
      const index = contacts.findIndex(c => c.id === id);
      if (index === -1) return null;
      contacts[index] = {
        ...contacts[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return contacts[index];
    },
    delete: (id: string): boolean => {
      const index = contacts.findIndex(c => c.id === id);
      if (index === -1) return false;
      contacts.splice(index, 1);
      return true;
    }
  },

  // FAQ operations
  faqs: {
    getAll: (): FAQ[] => faqs.sort((a, b) => a.order - b.order),
    getActive: (): FAQ[] => faqs.filter(f => f.status === 'active').sort((a, b) => a.order - b.order),
    getById: (id: string): FAQ | undefined => faqs.find(f => f.id === id),
    getByCategory: (category: string): FAQ[] => faqs.filter(f => f.category === category && f.status === 'active').sort((a, b) => a.order - b.order),
    create: (faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): FAQ => {
      const now = new Date().toISOString();
      const newFAQ: FAQ = {
        ...faq,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      };
      faqs.push(newFAQ);
      return newFAQ;
    },
    update: (id: string, updates: Partial<FAQ>): FAQ | null => {
      const index = faqs.findIndex(f => f.id === id);
      if (index === -1) return null;
      faqs[index] = {
        ...faqs[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return faqs[index];
    },
    delete: (id: string): boolean => {
      const index = faqs.findIndex(f => f.id === id);
      if (index === -1) return false;
      faqs.splice(index, 1);
      return true;
    }
  }
};

