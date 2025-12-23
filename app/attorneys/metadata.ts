import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: "Our Attorneys | Experienced High Court Advocates in Bangalore",
  description: "Meet our team of experienced advocates specializing in civil litigation, commercial disputes, arbitration, and corporate law. Expert representation at Karnataka High Court and Commercial Courts.",
  keywords: [
    "High Court Advocates Bangalore",
    "Senior Lawyers Bangalore",
    "Experienced Advocates Karnataka",
    "Commercial Litigation Lawyers",
    "Civil Lawyers Bangalore",
    "Legal Team Bangalore",
    "Top Advocates Bangalore"
  ],
  canonical: "/attorneys",
})

