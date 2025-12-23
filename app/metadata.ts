import { Metadata } from 'next'
import { generateMetadata, PRIMARY_KEYWORDS } from '@/lib/seo'

export const homeMetadata: Metadata = generateMetadata({
  title: "High Court Advocate Bangalore | Civil & Commercial Litigation Lawyer",
  description: "Leading High Court advocates in Bangalore specializing in civil litigation, commercial disputes, arbitration, and corporate legal advisory. Expert representation at Karnataka High Court, Commercial Courts & Supreme Court.",
  keywords: [
    ...PRIMARY_KEYWORDS,
    "Best Lawyer in Bangalore",
    "Top Law Firm Bangalore",
    "Karnataka High Court Advocate",
    "Commercial Courts Bangalore",
    "Business Law Firm Bangalore",
    "Legal Services Bangalore",
    "Corporate Law Firm India"
  ],
  canonical: "/",
})

