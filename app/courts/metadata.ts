import { Metadata } from 'next'
import { generateMetadata, COURTS_JURISDICTIONS } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: "Courts We Appear In | Karnataka High Court & Commercial Courts Bangalore",
  description: "Regalius Law Partners appears before Karnataka High Court, Commercial Courts Bangalore, Supreme Court, NCLT, and Arbitration Tribunals. Expert advocates for civil, commercial, and writ matters.",
  keywords: [
    "Karnataka High Court Advocate",
    "Commercial Courts Bangalore",
    "Supreme Court Lawyer",
    "NCLT Bangalore Advocate",
    "High Court Lawyer Bangalore",
    "Civil Court Bangalore",
    "Arbitration Tribunal Lawyer",
    "Writ Petition Advocate",
    ...COURTS_JURISDICTIONS
  ],
  canonical: "/courts",
})

