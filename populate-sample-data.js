// Sample Data Population Script
// Run this to add sample practice areas and services to your database

const samplePracticeAreas = [
  {
    "id": "1734787200000",
    "title": "Corporate Law",
    "slug": "corporate-law",
    "description": "Strategic counsel for businesses navigating complex corporate transactions and compliance.",
    "content": "Our corporate law practice provides comprehensive legal services to businesses of all sizes. We assist with entity formation, corporate governance, mergers and acquisitions, securities offerings, and regulatory compliance.\n\nOur experienced attorneys understand the complexities of modern business and provide practical, strategic advice to help your company succeed. Whether you're a startup seeking guidance on formation and funding, or an established corporation navigating a major transaction, we have the expertise to guide you through every step.\n\nWe work closely with our clients to understand their business objectives and provide tailored legal solutions that support their goals. Our corporate law services include contract drafting and negotiation, due diligence, corporate restructuring, and ongoing compliance advice.",
    "image": "/modern-corporate-boardroom.png",
    "icon": "",
    "status": "active",
    "order": 1,
    "createdAt": "2024-12-21T12:00:00.000Z",
    "updatedAt": "2024-12-21T12:00:00.000Z"
  },
  {
    "id": "1734787260000",
    "title": "Intellectual Property",
    "slug": "intellectual-property",
    "description": "Protection and enforcement of patents, trademarks, and copyrights in the global marketplace.",
    "content": "In today's innovation-driven economy, protecting your intellectual property is critical to your success. Our intellectual property practice provides comprehensive services for patents, trademarks, copyrights, and trade secrets.\n\nWe help clients secure and enforce their IP rights, from filing patent applications and trademark registrations to litigating infringement cases. Our attorneys have deep technical expertise across multiple industries and work closely with inventors, entrepreneurs, and established companies to protect their most valuable assets.\n\nOur IP services include patent prosecution, trademark clearance and registration, copyright protection, licensing agreements, IP due diligence for transactions, and enforcement litigation. We also provide strategic counseling on IP portfolio management and commercialization strategies.",
    "image": "/intellectual-property-patents.jpg",
    "icon": "",
    "status": "active",
    "order": 2,
    "createdAt": "2024-12-21T12:01:00.000Z",
    "updatedAt": "2024-12-21T12:01:00.000Z"
  },
  {
    "id": "1734787320000",
    "title": "Litigation",
    "slug": "litigation",
    "description": "Aggressive representation in courtrooms with a track record of favorable outcomes.",
    "content": "When disputes arise, our litigation team provides aggressive and effective representation in state and federal courts. We handle a wide range of commercial litigation matters, including breach of contract, business torts, shareholder disputes, and employment litigation.\n\nOur litigators are skilled trial attorneys with extensive courtroom experience. We take a strategic approach to each case, thoroughly analyzing the facts and law to develop winning strategies. Whether through negotiation, mediation, arbitration, or trial, we are committed to achieving the best possible outcome for our clients.\n\nWe understand that litigation can be costly and time-consuming, so we work efficiently to resolve disputes quickly when possible while being fully prepared to take cases to trial when necessary. Our litigation practice also includes appellate work and alternative dispute resolution.",
    "image": "/professional-courtroom.jpg",
    "icon": "",
    "status": "active",
    "order": 3,
    "createdAt": "2024-12-21T12:02:00.000Z",
    "updatedAt": "2024-12-21T12:02:00.000Z"
  }
];

const sampleServices = [
  {
    "id": "1734787380000",
    "title": "Business Formation & Structuring",
    "slug": "business-formation-structuring",
    "description": "Expert guidance on choosing the right business structure and establishing your company for success.",
    "content": "Starting a business requires careful planning and strategic decision-making. Our business formation services help entrepreneurs and established companies choose the right legal structure and establish a solid foundation for success.\n\nWe guide clients through the process of forming corporations, limited liability companies (LLCs), partnerships, and other business entities. We help you understand the tax implications, liability protection, and operational considerations of each structure to make the best choice for your specific situation.\n\nOur services include entity formation, drafting articles of incorporation and operating agreements, obtaining employer identification numbers, and advising on corporate governance structures. We also assist with business succession planning and restructuring existing entities.",
    "image": "/modern-corporate-boardroom.png",
    "icon": "",
    "category": "Corporate Services",
    "features": [
      "Entity selection and formation",
      "Operating agreement drafting",
      "Corporate governance setup",
      "Tax structure optimization",
      "Business succession planning"
    ],
    "status": "active",
    "order": 1,
    "createdAt": "2024-12-21T12:03:00.000Z",
    "updatedAt": "2024-12-21T12:03:00.000Z"
  },
  {
    "id": "1734787440000",
    "title": "Contract Drafting & Review",
    "slug": "contract-drafting-review",
    "description": "Comprehensive contract services to protect your interests and ensure favorable terms.",
    "content": "Well-drafted contracts are essential to protecting your business interests and avoiding disputes. Our contract services include drafting, reviewing, and negotiating a wide variety of business agreements.\n\nWe work with clients to understand their business objectives and draft contracts that clearly express their intentions while protecting their interests. Whether you need employment agreements, vendor contracts, partnership agreements, or complex commercial transactions, we have the expertise to deliver.\n\nOur attorneys carefully review contracts to identify potential risks and unfavorable terms. We negotiate on your behalf to achieve the best possible terms and ensure your contracts are enforceable. We also assist with contract disputes and breach of contract litigation when necessary.",
    "image": "/corporate-law-office.jpg",
    "icon": "",
    "category": "Legal Services",
    "features": [
      "Custom contract drafting",
      "Thorough contract review",
      "Negotiation support",
      "Risk assessment",
      "Template development",
      "Contract dispute resolution"
    ],
    "status": "active",
    "order": 2,
    "createdAt": "2024-12-21T12:04:00.000Z",
    "updatedAt": "2024-12-21T12:04:00.000Z"
  },
  {
    "id": "1734787500000",
    "title": "Mergers & Acquisitions",
    "slug": "mergers-acquisitions",
    "description": "Strategic legal counsel for complex M&A transactions from due diligence to closing.",
    "content": "Mergers and acquisitions require careful planning, thorough due diligence, and skilled negotiation. Our M&A team provides comprehensive legal services for buyers, sellers, and investors in transactions of all sizes.\n\nWe guide clients through every stage of the M&A process, from initial strategy and target identification through due diligence, negotiation, and closing. Our attorneys have extensive experience structuring deals to achieve our clients' business objectives while minimizing risks and tax liabilities.\n\nWe handle stock purchases, asset purchases, mergers, joint ventures, and strategic alliances. Our services include drafting and negotiating purchase agreements, conducting legal due diligence, obtaining regulatory approvals, and managing post-closing integration issues.",
    "image": "/business-meeting-employment.jpg",
    "icon": "",
    "category": "Corporate Services",
    "features": [
      "Deal structuring and strategy",
      "Due diligence management",
      "Purchase agreement negotiation",
      "Regulatory compliance",
      "Valuation support",
      "Post-merger integration"
    ],
    "status": "active",
    "order": 3,
    "createdAt": "2024-12-21T12:05:00.000Z",
    "updatedAt": "2024-12-21T12:05:00.000Z"
  }
];

console.log('='.repeat(60));
console.log('SAMPLE DATA FOR PRACTICE AREAS & SERVICES');
console.log('='.repeat(60));
console.log('\nTo populate your database, manually copy the content below');
console.log('into the respective JSON files:\n');

console.log('1. Copy this to: data/practice-areas.json');
console.log('-'.repeat(60));
console.log(JSON.stringify(samplePracticeAreas, null, 2));

console.log('\n2. Copy this to: data/services.json');
console.log('-'.repeat(60));
console.log(JSON.stringify(sampleServices, null, 2));

console.log('\n' + '='.repeat(60));
console.log('After copying, refresh your admin panel to see the data!');
console.log('='.repeat(60));

