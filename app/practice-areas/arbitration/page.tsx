"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/Footer"
import { Gavel, CheckCircle, FileText, Scale, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ArbitrationPage() {
  const arbitrationServices = [
    "Domestic Commercial Arbitration",
    "International Arbitration",
    "Construction Dispute Arbitration",
    "Contract Dispute Arbitration",
    "Ad-hoc Arbitration",
    "Institutional Arbitration (ICC, SIAC, LCIA)",
    "Arbitral Tribunal Constitution",
    "Enforcement of Arbitral Awards (Domestic & Foreign)",
    "Challenge to Arbitral Awards (Section 34)",
    "Emergency Arbitration"
  ]

  const arbitrationProcess = [
    {
      title: "Pre-Arbitration Analysis",
      description: "Evaluation of arbitration clause, merits assessment, and strategy formulation."
    },
    {
      title: "Notice & Constitution",
      description: "Drafting arbitration notice and constituting arbitral tribunal efficiently."
    },
    {
      title: "Pleadings & Evidence",
      description: "Comprehensive statement of claim/defense, evidence compilation, and witness preparation."
    },
    {
      title: "Award & Enforcement",
      description: "Securing favorable award and enforcement through courts or defending challenges."
    }
  ]

  const advantagesArbitration = [
    "Faster resolution compared to court litigation",
    "Confidentiality of proceedings and awards",
    "Expert arbitrators with industry knowledge",
    "Flexibility in procedure and timelines",
    "Cost-effective for commercial disputes",
    "Enforceable under Arbitration & Conciliation Act, 1996",
    "International enforceability under New York Convention"
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
              Arbitration Lawyer Bangalore
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed mb-8">
              Leading arbitration lawyers in Bangalore specializing in domestic and international 
              arbitration, commercial disputes, construction arbitration, and enforcement of awards. 
              Expert representation under Arbitration & Conciliation Act, 1996.
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
                  Our Expertise
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
              <Gavel className="w-16 h-16 text-[#C6B27E] mb-6" />
              <h2 className="font-serif text-4xl font-bold text-[#F2F2F2] mb-6">
                Arbitration Services
              </h2>
              <p className="text-[#C7CBD1] text-lg leading-relaxed mb-6">
                Regalius Law Partners is a premier arbitration law firm in Bangalore with extensive 
                experience in domestic and international arbitration proceedings. Our arbitration 
                practice encompasses commercial disputes, construction contracts, joint ventures, and 
                all forms of contractual disputes.
              </p>
              <p className="text-[#C7CBD1] text-lg leading-relaxed">
                We represent clients before arbitral tribunals, handle Section 34 challenges to awards, 
                and enforce domestic and foreign arbitral awards through Indian courts. Our expertise 
                covers both ad-hoc and institutional arbitrations under Indian and international rules.
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
                Arbitration Services We Provide
              </h3>
              <ul className="space-y-4">
                {arbitrationServices.map((service, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-[#C6B27E] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7CBD1]">{service}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Arbitration Process */}
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
              OUR PROCESS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Arbitration Process
            </h2>
            <p className="text-[#C7CBD1] max-w-3xl mx-auto text-lg">
              Comprehensive arbitration support from notice to award enforcement
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {arbitrationProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-6"
              >
                <div className="text-5xl font-serif font-bold text-[#C6B27E] mb-4 opacity-30">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F2F2F2] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#C7CBD1] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages of Arbitration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
                WHY ARBITRATION
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
                Advantages of Arbitration
              </h2>
              <p className="text-[#C7CBD1] text-lg leading-relaxed mb-8">
                Arbitration offers significant advantages over traditional court litigation for 
                commercial disputes, making it the preferred choice for businesses worldwide.
              </p>
              
              <div className="space-y-4">
                {advantagesArbitration.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-[#C6B27E] mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-[#C7CBD1] text-lg">{advantage}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-8">
                <FileText className="w-12 h-12 text-[#C6B27E] mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">
                  Domestic Arbitration
                </h3>
                <p className="text-[#C7CBD1] leading-relaxed">
                  Expert representation in domestic commercial arbitrations under the Arbitration & 
                  Conciliation Act, 1996, including ad-hoc and institutional arbitrations.
                </p>
              </div>

              <div className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-8">
                <Scale className="w-12 h-12 text-[#C6B27E] mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">
                  International Arbitration
                </h3>
                <p className="text-[#C7CBD1] leading-relaxed">
                  Handling international arbitrations under ICC, SIAC, LCIA, and other institutional 
                  rules, with expertise in cross-border commercial disputes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Disputes */}
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
              DISPUTE TYPES
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Types of Disputes We Handle
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Construction Contracts",
              "Supply & Distribution Agreements",
              "Joint Venture Disputes",
              "Shareholder Agreements",
              "Technology & Licensing",
              "Real Estate Transactions",
              "Infrastructure Projects",
              "Banking & Finance",
              "Energy & Resources"
            ].map((dispute, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-6"
              >
                <div className="w-2 h-2 bg-[#C6B27E] rounded-full mb-4" />
                <h3 className="font-serif text-xl font-bold text-[#F2F2F2]">
                  {dispute}
                </h3>
              </motion.div>
            ))}
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
              Need an Arbitration Lawyer in Bangalore?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Consult with our arbitration experts for strategic representation in domestic and 
              international arbitration proceedings.
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

