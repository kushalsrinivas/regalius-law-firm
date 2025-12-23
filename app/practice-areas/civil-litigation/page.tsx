"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import Footer from "@/components/Footer"
import { Scale, CheckCircle, FileText, Gavel, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CivilLitigationPage() {
  const typesOfMatters = [
    "Property & Title Disputes",
    "Recovery of Money & Debts",
    "Specific Performance of Contracts",
    "Declaration & Injunction Suits",
    "Partition Suits",
    "Breach of Contract Claims",
    "Tort Claims & Damages",
    "Partnership Disputes"
  ]

  const courtsJurisdictions = [
    "Karnataka High Court - Original & Appellate Side",
    "City Civil Court, Bangalore",
    "District Courts across Karnataka",
    "Supreme Court of India (Appeals)"
  ]

  const legalProcess = [
    {
      title: "Case Assessment",
      description: "Detailed evaluation of your civil dispute, documentation review, and viability analysis."
    },
    {
      title: "Legal Strategy",
      description: "Crafting a comprehensive litigation strategy aligned with your objectives and timelines."
    },
    {
      title: "Court Proceedings",
      description: "Expert representation at trial courts and High Court with meticulous preparation."
    },
    {
      title: "Appeals & Execution",
      description: "Pursuing appeals when necessary and executing favorable judgments efficiently."
    }
  ]

  const whyChooseUs = [
    "Deep expertise in Karnataka High Court civil litigation",
    "Track record of favorable judgments and settlements",
    "Strategic approach combining legal rigor with commercial awareness",
    "Transparent communication and realistic case assessment",
    "End-to-end litigation support from trial to appeal",
    "Strong focus on alternative dispute resolution when beneficial"
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
              Civil Litigation Lawyer in Bangalore
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed mb-8">
              Expert civil litigation lawyers in Bangalore representing clients in property disputes, 
              contract breaches, recovery matters, and civil appeals before Karnataka High Court and 
              trial courts. Strategic advocacy for favorable outcomes in complex civil litigation.
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
              <Scale className="w-16 h-16 text-[#C6B27E] mb-6" />
              <h2 className="font-serif text-4xl font-bold text-[#F2F2F2] mb-6">
                Civil Litigation Services
              </h2>
              <p className="text-[#C7CBD1] text-lg leading-relaxed mb-6">
                Regalius Law Partners is a leading civil litigation law firm in Bangalore with extensive 
                experience handling complex civil disputes before the Karnataka High Court, City Civil Courts, 
                and District Courts across Karnataka.
              </p>
              <p className="text-[#C7CBD1] text-lg leading-relaxed">
                Our civil litigation practice encompasses property disputes, contract enforcement, recovery 
                matters, and all forms of civil claims. We combine deep legal expertise with strategic 
                thinking to protect our clients' interests and achieve favorable outcomes through litigation 
                or negotiated settlements.
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
                Types of Civil Matters Handled
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

      {/* Courts & Jurisdiction */}
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
              JURISDICTIONS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Courts & Jurisdiction
            </h2>
            <p className="text-[#C7CBD1] max-w-3xl mx-auto text-lg">
              Our civil litigation team regularly appears before various courts in Karnataka and beyond.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courtsJurisdictions.map((court, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-6 flex items-start"
              >
                <Gavel className="w-6 h-6 text-[#C6B27E] mr-4 flex-shrink-0 mt-1" />
                <span className="text-[#C7CBD1] text-lg">{court}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Process */}
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
              OUR PROCESS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Legal Process & Strategy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-6"
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

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
                WHY CHOOSE US
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
                Why Choose Regalius Law Partners
              </h2>
              <p className="text-[#C7CBD1] text-lg leading-relaxed mb-8">
                As one of Bangalore's leading civil litigation law firms, we bring decades of combined 
                experience in handling complex civil disputes with a proven track record of success.
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-lg overflow-hidden border border-[#2C3E5F]"
            >
              <img
                src="/corporate-law-office.jpg"
                alt="Civil Litigation Lawyer Bangalore"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071731]/80 to-transparent" />
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
              Need a Civil Litigation Lawyer in Bangalore?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Consult with our experienced civil litigation advocates for strategic representation 
              in Karnataka High Court and trial courts across Bangalore.
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
                  Meet Our Attorneys
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

