import { Metadata } from 'next'
import { generateMetadata, PRACTICE_AREAS_KEYWORDS } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: "Legal Services | Civil & Commercial Litigation | Arbitration Bangalore",
  description: "Comprehensive legal services in Bangalore including civil litigation, commercial disputes, arbitration, corporate advisory, property law, and High Court representation.",
  keywords: [
    ...PRACTICE_AREAS_KEYWORDS.civil_litigation,
    ...PRACTICE_AREAS_KEYWORDS.commercial_litigation,
    ...PRACTICE_AREAS_KEYWORDS.arbitration,
    "Legal Services Bangalore",
    "Law Firm Services",
    "Business Legal Services"
  ],
  canonical: "/services",
})

