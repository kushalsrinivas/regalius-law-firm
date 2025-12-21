// Initial data for the application
// This data is loaded into memory when the app starts

import type { Attorney, Blog, ContactSubmission, PracticeArea, Service, Admin } from './db';

export const initialAdmins: Admin[] = [
  {
    id: '1',
    email: 'admin@regaliuslaw.com',
    passwordHash: '$2b$10$4ToEEU0JmhiE30AHwSig6uTxgAmpB/vW6uxrrDolt/M6TJ61/xnqS',
    name: 'Admin User',
    createdAt: '2025-12-21T00:00:00.000Z',
  },
];

export const initialAttorneys: Attorney[] = [
  {
    name: "Chayank M N K",
    title: "Senior Partner",
    specialty: "Corporate Law",
    education: [
      "LLB From Harvard"
    ],
    experience: "72",
    email: "kushal.s.2005@gmail.com",
    phone: "7619552810",
    photo: "/uploads/1766234845825.jpeg",
    bio: "idk much lmao",
    practiceAreas: [
      "Corporate law"
    ],
    barAdmissions: [
      "Bangalore state Law"
    ],
    languages: [
      "English"
    ],
    status: "active",
    order: 0,
    slug: "chayank-m-n-k",
    id: "1766234875634",
    createdAt: "2025-12-20T12:47:55.634Z",
    updatedAt: "2025-12-20T12:59:47.021Z"
  },
  {
    name: "sdfsdf",
    title: "sdfsdf",
    specialty: "sdfs",
    education: [
      "sdf"
    ],
    experience: "sdfsd",
    email: "sdf@gmail.com",
    phone: "1234567890",
    photo: "/uploads/1766320977510.png",
    bio: "dfsfsd",
    practiceAreas: [
      "sdf"
    ],
    barAdmissions: [
      "sdf"
    ],
    languages: [
      "English"
    ],
    status: "active",
    order: 0,
    slug: "sdfsdf",
    id: "1766320978450",
    createdAt: "2025-12-21T12:42:58.450Z",
    updatedAt: "2025-12-21T12:42:58.450Z"
  }
];

export const initialBlogs: Blog[] = [
  {
    title: "huhuh",
    excerpt: "kmo",
    content: "hjfgjhfhmhjncdf",
    thumbnail: "/uploads/1766227542801.jpeg",
    category: "Corporate Law",
    author: "Regalius Law Partners",
    status: "published",
    slug: "huhuh",
    readTime: "1 min read",
    publishedAt: "2025-12-20T10:45:45.160Z",
    id: "1766227545161",
    createdAt: "2025-12-20T10:45:45.161Z",
    updatedAt: "2025-12-20T10:45:45.161Z"
  },
  {
    title: "uhdsihsisdhf",
    excerpt: "sdfsfdioufhsdh",
    content: "ssdefiufgseiygisyegfiyegsfifygisyfge",
    thumbnail: "/uploads/1766227907278.jpeg",
    category: "Firm News",
    author: "Regalius Law Partners",
    status: "published",
    slug: "uhdsihsisdhf",
    readTime: "1 min read",
    id: "1766227909460",
    createdAt: "2025-12-20T10:51:49.460Z",
    updatedAt: "2025-12-20T10:51:54.736Z",
    publishedAt: "2025-12-20T10:51:54.736Z"
  }
];

export const initialContacts: ContactSubmission[] = [
  {
    name: "asdddsa",
    email: "wefwf@gmail.com",
    phone: "7619552810",
    inquiryType: "Corporate Advisory",
    message: "erfreferfewdwedwd",
    status: "new",
    id: "1766228137909",
    createdAt: "2025-12-20T10:55:37.909Z",
    updatedAt: "2025-12-20T10:55:37.909Z"
  },
  {
    name: "zxc",
    email: "zxc@gmail.com",
    phone: "zxc",
    inquiryType: "Career Application - Associate Attorney",
    message: "Position: Associate Attorney\nExperience: zxc\n\nCover Letter:\nzxczc",
    status: "read",
    id: "1766324431020",
    createdAt: "2025-12-21T13:40:31.020Z",
    updatedAt: "2025-12-21T13:43:36.325Z"
  }
];

export const initialPracticeAreas: PracticeArea[] = [
  {
    id: "1734787200000",
    title: "Corporate Law",
    slug: "corporate-law",
    description: "Strategic counsel for businesses navigating complex corporate transactions and compliance.",
    content: "Our corporate law practice provides comprehensive legal services to businesses of all sizes. We assist with entity formation, corporate governance, mergers and acquisitions, securities offerings, and regulatory compliance.\n\nOur experienced attorneys understand the complexities of modern business and provide practical, strategic advice to help your company succeed. Whether you're a startup seeking guidance on formation and funding, or an established corporation navigating a major transaction, we have the expertise to guide you through every step.\n\nWe work closely with our clients to understand their business objectives and provide tailored legal solutions that support their goals. Our corporate law services include contract drafting and negotiation, due diligence, corporate restructuring, and ongoing compliance advice.",
    image: "/modern-corporate-boardroom.png",
    icon: "",
    status: "active",
    order: 1,
    createdAt: "2024-12-21T12:00:00.000Z",
    updatedAt: "2024-12-21T12:00:00.000Z"
  },
  {
    id: "1734787260000",
    title: "Intellectual Property",
    slug: "intellectual-property",
    description: "Protection and enforcement of patents, trademarks, and copyrights in the global marketplace.",
    content: "In today's innovation-driven economy, protecting your intellectual property is critical to your success. Our intellectual property practice provides comprehensive services for patents, trademarks, copyrights, and trade secrets.\n\nWe help clients secure and enforce their IP rights, from filing patent applications and trademark registrations to litigating infringement cases. Our attorneys have deep technical expertise across multiple industries and work closely with inventors, entrepreneurs, and established companies to protect their most valuable assets.\n\nOur IP services include patent prosecution, trademark clearance and registration, copyright protection, licensing agreements, IP due diligence for transactions, and enforcement litigation. We also provide strategic counseling on IP portfolio management and commercialization strategies.",
    image: "/intellectual-property-patents.jpg",
    icon: "",
    status: "active",
    order: 2,
    createdAt: "2024-12-21T12:01:00.000Z",
    updatedAt: "2024-12-21T12:01:00.000Z"
  },
  {
    id: "1734787320000",
    title: "Litigation",
    slug: "litigation",
    description: "Aggressive representation in courtrooms with a track record of favorable outcomes.",
    content: "When disputes arise, our litigation team provides aggressive and effective representation in state and federal courts. We handle a wide range of commercial litigation matters, including breach of contract, business torts, shareholder disputes, and employment litigation.\n\nOur litigators are skilled trial attorneys with extensive courtroom experience. We take a strategic approach to each case, thoroughly analyzing the facts and law to develop winning strategies. Whether through negotiation, mediation, arbitration, or trial, we are committed to achieving the best possible outcome for our clients.\n\nWe understand that litigation can be costly and time-consuming, so we work efficiently to resolve disputes quickly when possible while being fully prepared to take cases to trial when necessary. Our litigation practice also includes appellate work and alternative dispute resolution.",
    image: "/professional-courtroom.jpg",
    icon: "",
    status: "active",
    order: 3,
    createdAt: "2024-12-21T12:02:00.000Z",
    updatedAt: "2024-12-21T12:02:00.000Z"
  },
  {
    title: "sadad",
    description: "asdasd",
    content: "asdasd",
    image: "/uploads/1766322226087.png",
    icon: "",
    status: "active",
    order: 1,
    slug: "sadad",
    id: "1766322227510",
    createdAt: "2025-12-21T13:03:47.510Z",
    updatedAt: "2025-12-21T13:03:47.510Z"
  }
];

export const initialServices: Service[] = [
  {
    id: "1734787380000",
    title: "Business Formation & Structuring",
    slug: "business-formation-structuring",
    description: "Expert guidance on choosing the right business structure and establishing your company for success.",
    content: "Starting a business requires careful planning and strategic decision-making. Our business formation services help entrepreneurs and established companies choose the right legal structure and establish a solid foundation for success.\n\nWe guide clients through the process of forming corporations, limited liability companies (LLCs), partnerships, and other business entities. We help you understand the tax implications, liability protection, and operational considerations of each structure to make the best choice for your specific situation.\n\nOur services include entity formation, drafting articles of incorporation and operating agreements, obtaining employer identification numbers, and advising on corporate governance structures. We also assist with business succession planning and restructuring existing entities.",
    image: "/modern-corporate-boardroom.png",
    icon: "",
    category: "Corporate Services",
    features: [
      "Entity selection and formation",
      "Operating agreement drafting",
      "Corporate governance setup",
      "Tax structure optimization",
      "Business succession planning"
    ],
    status: "active",
    order: 1,
    createdAt: "2024-12-21T12:03:00.000Z",
    updatedAt: "2024-12-21T12:03:00.000Z"
  },
  {
    id: "1734787440000",
    title: "Contract Drafting & Review",
    slug: "contract-drafting-review",
    description: "Comprehensive contract services to protect your interests and ensure favorable terms.",
    content: "Well-drafted contracts are essential to protecting your business interests and avoiding disputes. Our contract services include drafting, reviewing, and negotiating a wide variety of business agreements.\n\nWe work with clients to understand their business objectives and draft contracts that clearly express their intentions while protecting their interests. Whether you need employment agreements, vendor contracts, partnership agreements, or complex commercial transactions, we have the expertise to deliver.\n\nOur attorneys carefully review contracts to identify potential risks and unfavorable terms. We negotiate on your behalf to achieve the best possible terms and ensure your contracts are enforceable. We also assist with contract disputes and breach of contract litigation when necessary.",
    image: "/corporate-law-office.jpg",
    icon: "",
    category: "Legal Services",
    features: [
      "Custom contract drafting",
      "Thorough contract review",
      "Negotiation support",
      "Risk assessment",
      "Template development",
      "Contract dispute resolution"
    ],
    status: "active",
    order: 2,
    createdAt: "2024-12-21T12:04:00.000Z",
    updatedAt: "2024-12-21T12:04:00.000Z"
  },
  {
    id: "1734787500000",
    title: "Mergers & Acquisitions",
    slug: "mergers-acquisitions",
    description: "Strategic legal counsel for complex M&A transactions from due diligence to closing.",
    content: "Mergers and acquisitions require careful planning, thorough due diligence, and skilled negotiation. Our M&A team provides comprehensive legal services for buyers, sellers, and investors in transactions of all sizes.\n\nWe guide clients through every stage of the M&A process, from initial strategy and target identification through due diligence, negotiation, and closing. Our attorneys have extensive experience structuring deals to achieve our clients' business objectives while minimizing risks and tax liabilities.\n\nWe handle stock purchases, asset purchases, mergers, joint ventures, and strategic alliances. Our services include drafting and negotiating purchase agreements, conducting legal due diligence, obtaining regulatory approvals, and managing post-closing integration issues.",
    image: "/business-meeting-employment.jpg",
    icon: "",
    category: "Corporate Services",
    features: [
      "Deal structuring and strategy",
      "Due diligence management",
      "Purchase agreement negotiation",
      "Regulatory compliance",
      "Valuation support",
      "Post-merger integration"
    ],
    status: "active",
    order: 3,
    createdAt: "2024-12-21T12:05:00.000Z",
    updatedAt: "2024-12-21T12:05:00.000Z"
  },
  {
    title: "sadasd",
    description: "asdasd",
    content: "asdasdasd",
    image: "/uploads/1766322278274.png",
    icon: "",
    category: "Legal Services",
    features: [],
    status: "active",
    order: 1,
    slug: "sadasd",
    id: "1766322286935",
    createdAt: "2025-12-21T13:04:46.935Z",
    updatedAt: "2025-12-21T13:04:46.935Z"
  }
];

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

export const initialFAQs: FAQ[] = [
  {
    id: "1",
    question: "What areas of law does Regalius Law Partners practice?",
    answer: "Regalius Law Partners provides comprehensive legal services across civil and commercial litigation, property matters, corporate advisory, regulatory compliance, and dispute resolution. We serve entrepreneurs, businesses, and individuals with tailored legal solutions.",
    category: "General",
    order: 1,
    status: "active",
    createdAt: "2025-12-21T00:00:00.000Z",
    updatedAt: "2025-12-21T00:00:00.000Z"
  },
  {
    id: "2",
    question: "How do I schedule a consultation?",
    answer: "You can schedule a consultation by contacting us through the contact form on our website, calling our office directly, or sending us an email. Our team will respond promptly to arrange a meeting at your convenience.",
    category: "General",
    order: 2,
    status: "active",
    createdAt: "2025-12-21T00:00:00.000Z",
    updatedAt: "2025-12-21T00:00:00.000Z"
  },
  {
    id: "3",
    question: "What should I bring to my first consultation?",
    answer: "Please bring any relevant documents related to your legal matter, such as contracts, correspondence, court papers, or other materials. A timeline of events and any questions you have prepared will also help us understand your situation better.",
    category: "Consultation",
    order: 3,
    status: "active",
    createdAt: "2025-12-21T00:00:00.000Z",
    updatedAt: "2025-12-21T00:00:00.000Z"
  },
  {
    id: "4",
    question: "How are legal fees structured?",
    answer: "Our fee structure depends on the nature and complexity of your matter. We offer various arrangements including hourly rates, fixed fees for specific services, and retainer agreements. We provide transparent fee estimates during the initial consultation.",
    category: "Fees",
    order: 4,
    status: "active",
    createdAt: "2025-12-21T00:00:00.000Z",
    updatedAt: "2025-12-21T00:00:00.000Z"
  },
  {
    id: "5",
    question: "Do you handle cases outside your primary location?",
    answer: "Yes, we handle cases across India. Our team is experienced in working with clients and matters in various jurisdictions, and we can coordinate with local counsel when necessary.",
    category: "General",
    order: 5,
    status: "active",
    createdAt: "2025-12-21T00:00:00.000Z",
    updatedAt: "2025-12-21T00:00:00.000Z"
  },
  {
    id: "6",
    question: "How long will my case take?",
    answer: "The duration varies significantly depending on the complexity of the matter, the cooperation of all parties involved, and court schedules. During your consultation, we can provide a general timeline based on similar cases and our experience.",
    category: "Process",
    order: 6,
    status: "active",
    createdAt: "2025-12-21T00:00:00.000Z",
    updatedAt: "2025-12-21T00:00:00.000Z"
  },
  {
    id: "1766323224012",
    question: "asd",
    answer: "asd",
    category: "General",
    order: 6,
    status: "active",
    createdAt: "2025-12-21T13:20:24.012Z",
    updatedAt: "2025-12-21T13:20:24.012Z"
  }
];

