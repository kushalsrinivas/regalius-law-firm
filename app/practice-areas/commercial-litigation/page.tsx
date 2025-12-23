"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/Footer"
import { Building2, CheckCircle, Briefcase, Scale, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CommercialLitigationPage() {
  const typesOfMatters = [
    "Contract Disputes & Breach of Contract",
    "Commercial Courts Act Litigation",
    "Business Partnership Disputes",
    "Shareholder & Director Disputes",
    "Trademark & IP Infringement",
    "Trade Secret Litigation",
    "Banking & Finance Disputes",
    "Supply Chain & Vendor Disputes",
    "Franchise & Distribution Disputes",
    "Commercial Fraud Claims"
  ]

  const commercialCourtsExpertise = [
    "High-value commercial disputes above ₹3 Lakhs",
    "Specialized procedures under Commercial Courts Act, 2015",
    "Fast-track litigation with strict timelines",
    "Pre-institution mediation and settlement",
    "Commercial Appeals before High Court",
    "Interim reliefs and injunctions"
  ]

  const whyChooseUs = [
    "Deep expertise in Commercial Courts Act and procedures",
    "Strong track record in Karnataka High Court commercial matters",
    "Understanding of business realities and commercial considerations",
    "Strategic litigation combined with settlement negotiations",
    "Experience across diverse industries and sectors",
    "Focus on cost-effective and time-efficient resolution"
  ]

  return (
    <div className="min-h-screen bg-[#071731]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              PRACTICE AREA
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 leading-tight">
              Commercial Litigation Lawyer Bangalore
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed mb-8">
              Leading commercial litigation lawyers in Bangalore specializing in Commercial Courts Act 
              disputes, contract enforcement, business litigation, and IP disputes. Expert representation 
              before Commercial Courts and Karnataka High Court for complex business disputes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-base">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/courts">
                <Button
                  variant="outline"
                  className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#0C1F3A] px-8 py-6"
                >
                  Courts We Appear In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Building2 className="w-16 h-16 text-[#C6B27E] mb-6" />
              <h2 className="font-serif text-4xl font-bold text-[#F2F2F2] mb-6">
                Commercial Litigation Services
              </h2>
              <p className="text-[#C7CBD1] text-lg leading-relaxed mb-6">
                Regalius Law Partners is a premier commercial litigation law firm in Bangalore with 
                specialized expertise in representing businesses before Commercial Courts and Karnataka 
                High Court under the Commercial Courts Act, 2015.
              </p>
              <p className="text-[#C7CBD1] text-lg leading-relaxed">
                Our commercial litigation practice handles high-value business disputes, contract enforcement, 
                intellectual property litigation, and all forms of commercial claims. We combine legal 
                expertise with business acumen to protect your commercial interests and achieve favorable 
                outcomes efficiently.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-8"
            >
              <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-6">
                Commercial Matters We Handle
              </h3>
              <ul className="space-y-4">
                {typesOfMatters.map((matter, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-[#C6B27E] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7CBD1]">{matter}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Commercial Courts Expertise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              SPECIALIZED EXPERTISE
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Commercial Courts Act Expertise
            </h2>
            <p className="text-[#C7CBD1] max-w-3xl mx-auto text-lg">
              Deep understanding of specialized procedures under the Commercial Courts Act, 2015
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commercialCourtsExpertise.map((expertise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-6"
              >
                <Briefcase className="w-8 h-8 text-[#C6B27E] mb-4" />
                <p className="text-[#C7CBD1] text-lg">{expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              INDUSTRIES SERVED
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Cross-Industry Commercial Litigation
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Technology & IT",
              "Real Estate & Construction",
              "Manufacturing",
              "Banking & Finance",
              "Retail & E-commerce",
              "Pharmaceuticals",
              "Professional Services",
              "Media & Entertainment"
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-6 text-center"
              >
                <h3 className="font-serif text-xl font-bold text-[#F2F2F2]">
                  {industry}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-lg overflow-hidden border border-[#2C3E5F]"
            >
              <img
                src="/modern-corporate-boardroom.png"
                alt="Commercial Litigation Lawyer Bangalore"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071731]/80 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
                WHY CHOOSE US
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
                Why Choose Regalius for Commercial Litigation
              </h2>
              <p className="text-[#C7CBD1] text-lg leading-relaxed mb-8">
                As Bangalore's leading commercial litigation law firm, we bring specialized expertise 
                in Commercial Courts Act proceedings and a deep understanding of business realities.
              </p>
              
              <div className="space-y-4">
                {whyChooseUs.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="w-1.5 h-1.5 bg-[#C6B27E] rounded-full mr-4 mt-2.5 flex-shrink-0" />
                    <span className="text-[#C7CBD1] text-lg">{reason}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Need a Commercial Litigation Lawyer?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Consult with our commercial litigation experts for strategic representation in 
              Commercial Courts and Karnataka High Court.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-lg">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/attorneys">
                <Button
                  variant="outline"
                  className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#071731] px-8 py-6 text-lg"
                >
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

