import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: "Legal Insights & Articles | Bangalore High Court Law Updates",
  description: "Expert legal articles on civil litigation, commercial law, arbitration, High Court procedures, and business legal matters. Stay informed with insights from experienced advocates.",
  keywords: [
    "Legal Blog Bangalore",
    "High Court Law Updates",
    "Commercial Law Articles",
    "Legal Insights India",
    "Civil Litigation Guide",
    "Arbitration Law Updates",
    "Business Law Articles"
  ],
  canonical: "/blogs",
})

