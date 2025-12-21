"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Building2, Scale, Shield, Briefcase, Globe, FileText, TrendingUp, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/Footer"

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  features: string[];
  order: number;
}

// Fallback static services for initial render
const fallbackServices = [
  {
    icon: Building2,
    title: "Corporate Law",
    description: "Strategic counsel for mergers, acquisitions, corporate governance, and compliance matters.",
    features: ["Mergers & Acquisitions", "Corporate Governance", "Securities Regulation", "Contract Negotiation"],
    image: "/corporate-law-office.jpg",
    slug: "corporate-law",
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    description: "Comprehensive protection and enforcement of your patents, trademarks, and copyrights.",
    features: ["Patent Prosecution", "Trademark Registration", "Copyright Protection", "IP Litigation"],
    image: "/intellectual-property-patents.jpg",
    slug: "intellectual-property",
  },
  {
    icon: Scale,
    title: "Litigation",
    description: "Aggressive courtroom representation with a proven track record of favorable outcomes.",
    features: ["Commercial Litigation", "Class Actions", "Arbitration", "Appeals"],
    image: "/professional-courtroom.jpg",
    slug: "litigation",
  },
  {
    icon: Briefcase,
    title: "Employment Law",
    description: "Expert guidance on workforce matters, from contracts to dispute resolution.",
    features: ["Employment Contracts", "Discrimination Claims", "Executive Compensation", "Labor Disputes"],
    image: "/business-meeting-employment.jpg",
    slug: "employment-law",
  },
  {
    icon: Globe,
    title: "International Law",
    description: "Cross-border legal solutions for global business operations and transactions.",
    features: ["International Trade", "Foreign Investment", "Cross-Border M&A", "Treaty Compliance"],
    image: "/global-business-international.jpg",
    slug: "international-law",
  },
  {
    icon: FileText,
    title: "Real Estate",
    description: "Comprehensive legal services for property transactions and development projects.",
    features: ["Property Acquisition", "Commercial Leasing", "Zoning & Land Use", "Real Estate Finance"],
    image: "/luxury-real-estate.png",
    slug: "real-estate",
  },
  {
    icon: TrendingUp,
    title: "Tax Law",
    description: "Strategic tax planning and dispute resolution to optimize your financial position.",
    features: ["Tax Planning", "Tax Disputes", "International Tax", "Estate Planning"],
    image: "/financial-tax-planning.jpg",
    slug: "tax-law",
  },
  {
    icon: Users,
    title: "Family Law",
    description: "Compassionate counsel for sensitive family matters with discretion and care.",
    features: ["Divorce & Separation", "Custody Arrangements", "Prenuptial Agreements", "Estate Distribution"],
    image: "/family-law-consultation.jpg",
    slug: "family-law",
  },
]

const iconMap: Record<string, any> = {
  Building2, Scale, Shield, Briefcase, Globe, FileText, TrendingUp, Users
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load services from API
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to load services:", err)
        setLoading(false)
      })
  }, [])
  return (
    <div className="min-h-screen bg-[#071731]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">OUR LEGAL SERVICES</div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Comprehensive Legal Solutions
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              From corporate transactions to litigation, our multidisciplinary team delivers exceptional results across
              all practice areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-[#C7CBD1]">Loading services...</div>
          ) : services.length > 0 ? (
            <div className="grid gap-8">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.category] || Briefcase
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                    className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group hover:border-[#C6B27E]/50 transition-all cursor-pointer"
                  >
                    <Link href={`/service-details/${service.slug}`}>
                      <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                        <div
                          className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                        >
                          <IconComponent className="w-12 h-12 text-[#C6B27E] mb-6" />
                          <div className="inline-block px-3 py-1 bg-[#C6B27E]/10 text-[#C6B27E] rounded-full text-xs font-medium mb-4 w-fit">
                            {service.category}
                          </div>
                          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2F2F2] mb-4 group-hover:text-[#C6B27E] transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-[#C7CBD1] text-lg mb-6 leading-relaxed">{service.description}</p>
                          {service.features && service.features.length > 0 && (
                            <ul className="space-y-3 mb-8">
                              {service.features.slice(0, 4).map((feature, idx) => (
                                <li key={idx} className="flex items-center text-[#C7CBD1]">
                                  <div className="w-1.5 h-1.5 bg-[#C6B27E] rounded-full mr-3" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                          <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] w-fit">
                            Learn More <ArrowRight className="ml-2" size={16} />
                          </Button>
                        </div>
                        <div className={`relative h-80 lg:h-auto ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                          <img
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0C1F3A] to-transparent opacity-50" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            // Fallback to static services if API returns empty
            <div className="grid gap-8">
              {fallbackServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                  className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden"
                >
                  <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                    <div
                      className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                    >
                      <service.icon className="w-12 h-12 text-[#C6B27E] mb-6" />
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2F2F2] mb-4">{service.title}</h2>
                      <p className="text-[#C7CBD1] text-lg mb-6 leading-relaxed">{service.description}</p>
                      <ul className="space-y-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-[#C7CBD1]">
                            <div className="w-1.5 h-1.5 bg-[#C6B27E] rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] w-fit">Learn More</Button>
                    </div>
                    <div className={`relative h-80 lg:h-auto ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0C1F3A] to-transparent opacity-50" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">OUR APPROACH</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">How We Work</h2>
            <p className="text-[#C7CBD1] max-w-2xl mx-auto text-pretty">
              A proven methodology refined over three decades of legal excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We listen carefully to understand your unique needs.",
              },
              {
                step: "02",
                title: "Strategy",
                description: "We develop a tailored legal strategy for your situation.",
              },
              { step: "03", title: "Execution", description: "We implement with precision and expertise." },
              { step: "04", title: "Success", description: "We deliver results that exceed expectations." },
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-serif font-bold text-[#C6B27E] mb-4 opacity-30">{process.step}</div>
                <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">{process.title}</h3>
                <p className="text-[#C7CBD1] leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Ready to Get Started?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Schedule a consultation with one of our experienced attorneys today.
            </p>
            <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-lg">
              Schedule Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
