import { Metadata } from 'next'
import { generateMetadata, SITE_CONFIG } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: "Contact Us | High Court Lawyers Bangalore | Free Consultation",
  description: `Contact Regalius Law Partners for expert legal consultation in Bangalore. Email: ${SITE_CONFIG.email}. Specializing in civil, commercial litigation, arbitration, and corporate legal advisory.`,
  keywords: [
    "Contact Lawyer Bangalore",
    "Legal Consultation Bangalore",
    "High Court Lawyer Contact",
    "Bangalore Law Firm Contact",
    "Legal Advice Bangalore",
    "Schedule Legal Consultation",
    "Lawyer Appointment Bangalore"
  ],
  canonical: "/contact",
})

