import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: "About Us | Leading Law Firm in Bangalore | High Court Advocates",
  description: "Regalius Law Partners is a leading law firm in Bangalore providing civil litigation, commercial litigation, arbitration, and corporate legal advisory services. Experienced High Court advocates.",
  keywords: [
    "Law Firm Bangalore",
    "High Court Advocates Bangalore",
    "Legal Services Bangalore",
    "Top Lawyers Bangalore",
    "Civil Litigation Firm",
    "Commercial Law Firm Bangalore",
    "Corporate Lawyers Bangalore",
    "About Regalius Law Partners"
  ],
  canonical: "/about",
})

