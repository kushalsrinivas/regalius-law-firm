/**
 * SEO Configuration and Utilities for Regalius Law Partners
 * Bangalore High Court Law Firm - Civil & Commercial Litigation
 */

export const SITE_CONFIG = {
  name: "Regalius Law Partners",
  title: "High Court Advocate Bangalore | Civil & Commercial Litigation Lawyer",
  description: "Leading High Court advocates in Bangalore specializing in civil litigation, commercial disputes, arbitration, and corporate legal advisory. Expert representation in Karnataka High Court and Commercial Courts.",
  url: "https://regaliuslawpartners.com",
  locale: "en_IN",
  type: "website",
  
  // Business Info
  businessName: "Regalius Law Partners",
  legalName: "Regalius Law Partners",
  email: "office.blr@regaliuslawpartners.com",
  phone: "+91-XXXXXXXXXX", // Update with actual phone
  
  // Location
  address: {
    streetAddress: "Bangalore, Karnataka", // Update with exact address
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    postalCode: "560001", // Update with actual postal code
    addressCountry: "IN"
  },
  
  // Geo Coordinates (Update with actual coordinates)
  geo: {
    latitude: "12.9716",
    longitude: "77.5946"
  },
  
  // Social Media
  social: {
    linkedin: "https://www.linkedin.com/company/regalius-law-partners",
    twitter: "https://twitter.com/regaliuslaw",
  }
};

// Primary Keywords for Bangalore High Court Law Firm
export const PRIMARY_KEYWORDS = [
  "High Court Advocate Bangalore",
  "Civil Lawyer in Bangalore",
  "Commercial Litigation Lawyer Bangalore",
  "Commercial Court Advocate Bangalore",
  "Arbitration Lawyer Bangalore",
  "Commercial Legal Advisory Bangalore",
  "Contract Dispute Lawyer Bangalore",
  "Karnataka High Court Lawyer",
  "Best Civil Lawyer Bangalore",
  "Corporate Litigation Bangalore"
];

// Practice Areas Keywords
export const PRACTICE_AREAS_KEYWORDS = {
  civil_litigation: [
    "Civil Litigation Lawyer Bangalore",
    "Civil Disputes Bangalore High Court",
    "Civil Cases Lawyer Karnataka",
    "Property Disputes Lawyer Bangalore",
    "Civil Appeals Bangalore"
  ],
  commercial_litigation: [
    "Commercial Litigation Bangalore",
    "Commercial Courts Act Lawyer",
    "Business Disputes Lawyer Bangalore",
    "Commercial Arbitration Bangalore",
    "Contract Disputes Bangalore"
  ],
  arbitration: [
    "Arbitration Lawyer Bangalore",
    "Arbitration & Conciliation Act",
    "Arbitral Awards Enforcement",
    "Commercial Arbitration Expert",
    "Domestic & International Arbitration"
  ],
  corporate_advisory: [
    "Corporate Legal Advisory Bangalore",
    "Business Legal Consultant Bangalore",
    "Corporate Compliance Lawyer",
    "Commercial Contracts Advisory",
    "Corporate Retainer Services"
  ],
  writ_petitions: [
    "Writ Petition Lawyer Bangalore",
    "High Court Writ Advocate",
    "Constitutional Remedies Lawyer",
    "Judicial Review Bangalore",
    "Public Interest Litigation"
  ],
  appeals: [
    "Appeals Lawyer Bangalore",
    "High Court Appeals Advocate",
    "Civil Appeals Karnataka",
    "Revision Petitions Bangalore",
    "Appellate Litigation Expert"
  ]
};

// Courts & Jurisdictions
export const COURTS_JURISDICTIONS = [
  "Karnataka High Court",
  "Commercial Courts, Bangalore",
  "City Civil Court, Bangalore",
  "Supreme Court of India",
  "Arbitration Tribunals",
  "NCLT Bangalore",
  "NCLAT New Delhi"
];

/**
 * Generate metadata for pages
 */
export function generateMetadata({
  title,
  description,
  keywords,
  canonical,
  ogImage = "/og-image.jpg",
  noindex = false
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}) {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`;
  const url = canonical ? `${SITE_CONFIG.url}${canonical}` : SITE_CONFIG.url;
  
  return {
    title: fullTitle,
    description,
    keywords: keywords?.join(", "),
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    robots: noindex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url,
      title: fullTitle,
      description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generate LegalService Schema (JSON-LD)
 */
export function generateLegalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": SITE_CONFIG.businessName,
    "image": `${SITE_CONFIG.url}/logo.png`,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.streetAddress,
      "addressLocality": SITE_CONFIG.address.addressLocality,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": SITE_CONFIG.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.geo.latitude,
      "longitude": SITE_CONFIG.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "areaServed": {
      "@type": "City",
      "name": "Bangalore",
      "containedIn": {
        "@type": "State",
        "name": "Karnataka"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Legal Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Civil Litigation",
            "description": "Expert representation in civil disputes at High Court and Trial Courts"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Litigation",
            "description": "Specialized advocacy under Commercial Courts Act for business disputes"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Arbitration",
            "description": "Representation in domestic and international arbitration proceedings"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Legal Advisory",
            "description": "Strategic legal counsel for businesses and commercial retainers"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Appeals & Writs",
            "description": "High Court appeals, revisions, and writ petitions"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "name": "Regalius Law Partners"
    },
    "knowsAbout": [
      "Civil Litigation",
      "Commercial Litigation",
      "Arbitration",
      "Corporate Law",
      "High Court Practice",
      "Commercial Courts Act",
      "Contract Law",
      "Business Law"
    ]
  };
}

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    "name": SITE_CONFIG.businessName,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/logo.png`,
    "image": `${SITE_CONFIG.url}/logo.png`,
    "description": SITE_CONFIG.description,
    "email": SITE_CONFIG.email,
    "telephone": SITE_CONFIG.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.streetAddress,
      "addressLocality": SITE_CONFIG.address.addressLocality,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": SITE_CONFIG.address.addressCountry
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Bangalore"
      },
      {
        "@type": "State",
        "name": "Karnataka"
      },
      {
        "@type": "Country",
        "name": "India"
      }
    ],
    "sameAs": [
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.twitter
    ]
  };
}

/**
 * Generate Breadcrumb Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_CONFIG.url}${item.url}`
    }))
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Generate Service Schema for individual practice areas
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "LegalService",
      "name": SITE_CONFIG.businessName,
      "url": SITE_CONFIG.url
    },
    "description": service.description,
    "areaServed": {
      "@type": "City",
      "name": service.areaServed || "Bangalore"
    }
  };
}

