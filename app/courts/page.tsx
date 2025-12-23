"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/Footer";
import { Building2, Scale, Gavel, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const courts = [
  {
    name: "Karnataka High Court",
    location: "Bangalore, Karnataka",
    icon: Scale,
    jurisdiction: "Original, Appellate & Writ Jurisdiction",
    description:
      "We regularly appear before the Hon'ble Karnataka High Court in civil, commercial, and writ matters. Our expertise includes constitutional matters, civil appeals, revisions, and writ petitions.",
    matters: [
      "Civil Appeals & Revisions",
      "Writ Petitions (Article 226 & 227)",
      "Commercial Appeals",
      "Company Law Matters",
      "Arbitration Petitions",
      "Constitutional Matters",
    ],
  },
  {
    name: "Commercial Courts, Bangalore",
    location: "Bangalore, Karnataka",
    icon: Building2,
    jurisdiction: "Commercial Disputes under Commercial Courts Act, 2015",
    description:
      "Specialized advocacy in commercial courts for high-value business disputes, contract breaches, trademark infringement, and commercial transactions.",
    matters: [
      "Commercial Disputes above ₹3 Lakhs",
      "Contract Breach & Enforcement",
      "Intellectual Property Disputes",
      "Partnership & Shareholder Disputes",
      "Trade Secret Litigation",
      "Business Torts",
    ],
  },
  {
    name: "City Civil Court, Bangalore",
    location: "Bangalore, Karnataka",
    icon: Gavel,
    jurisdiction: "Civil Suits & Original Jurisdiction",
    description:
      "Comprehensive representation in civil suits including property disputes, recovery matters, specific performance, and civil claims before trial courts.",
    matters: [
      "Property & Title Disputes",
      "Specific Performance Suits",
      "Recovery of Money",
      "Declaration & Injunction",
      "Partition Suits",
      "Breach of Contract",
    ],
  },
  {
    name: "Supreme Court of India",
    location: "New Delhi",
    icon: Scale,
    jurisdiction: "Appellate & Constitutional Jurisdiction",
    description:
      "We handle appeals and special leave petitions before the Supreme Court through our network of senior advocates and counsel on record.",
    matters: [
      "Civil Appeals",
      "Special Leave Petitions (SLP)",
      "Constitutional Matters",
      "Commercial Appeals",
      "Arbitration Appeals",
      "Public Interest Litigation",
    ],
  },
  {
    name: "NCLT & NCLAT",
    location: "Bangalore Bench & New Delhi",
    icon: Building2,
    jurisdiction: "Corporate & Insolvency Matters",
    description:
      "Representation before National Company Law Tribunal and Appellate Tribunal for corporate disputes, insolvency proceedings, and company law matters.",
    matters: [
      "Insolvency & Bankruptcy Proceedings",
      "Company Law Disputes",
      "Oppression & Mismanagement",
      "Mergers & Amalgamations",
      "Winding Up Petitions",
      "CIRP Applications",
    ],
  },
  {
    name: "Arbitration Tribunals",
    location: "Pan-India",
    icon: Gavel,
    jurisdiction: "Domestic & International Arbitration",
    description:
      "Expert representation in arbitration proceedings under the Arbitration and Conciliation Act, 1996, including ad-hoc and institutional arbitrations.",
    matters: [
      "Commercial Arbitration",
      "Construction Disputes",
      "Contract Disputes",
      "International Arbitration",
      "Enforcement of Awards",
      "Challenge to Awards (Section 34)",
    ],
  },
];

export default function CourtsPage() {
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
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              OUR PRACTICE JURISDICTIONS
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Courts We Appear In
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              Regalius Law Partners has extensive experience appearing before
              the Karnataka High Court, Commercial Courts, Supreme Court of
              India, and various tribunals across the country. Our practice
              covers civil litigation, commercial disputes, arbitration, and
              appellate matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courts Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {courts.map((court, index) => (
              <motion.div
                key={court.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden hover:border-[#C6B27E]/50 transition-all"
              >
                <div className="p-8 lg:p-12">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <court.icon className="w-12 h-12 text-[#C6B27E]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2F2F2] mb-2">
                        {court.name}
                      </h2>
                      <div className="flex items-center text-[#C6B27E] mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{court.location}</span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-[#C6B27E]/10 text-[#C6B27E] rounded-full text-sm font-medium mb-4">
                        {court.jurisdiction}
                      </div>
                      <p className="text-[#C7CBD1] text-lg mb-6 leading-relaxed">
                        {court.description}
                      </p>

                      <div className="mb-6">
                        <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-4">
                          Types of Matters Handled:
                        </h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {court.matters.map((matter, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-[#C6B27E] rounded-full mr-3 mt-2 flex-shrink-0" />
                              <span className="text-[#C7CBD1]">{matter}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              WHY CHOOSE US
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Our Litigation Strengths
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "High Court Expertise",
                description:
                  "Extensive experience in Karnataka High Court with strong track record in civil, commercial, and writ matters.",
              },
              {
                title: "Commercial Courts Specialization",
                description:
                  "Deep understanding of Commercial Courts Act, 2015 and specialized procedures for business disputes.",
              },
              {
                title: "Strategic Advocacy",
                description:
                  "Result-oriented approach combining legal expertise with commercial awareness and practical solutions.",
              },
              {
                title: "Arbitration Excellence",
                description:
                  "Skilled representation in domestic and international arbitrations, from constitution to award enforcement.",
              },
              {
                title: "Trial to Appeal",
                description:
                  "Comprehensive litigation support from trial courts through High Court to Supreme Court appeals.",
              },
              {
                title: "Corporate Dispute Resolution",
                description:
                  "Expertise in NCLT/NCLAT proceedings, insolvency matters, and complex corporate litigation.",
              },
            ].map((strength, index) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-8"
              >
                <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">
                  {strength.title}
                </h3>
                <p className="text-[#C7CBD1] leading-relaxed">
                  {strength.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Need Representation in Court?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Consult with our experienced advocates for expert legal
              representation before Karnataka High Court, Commercial Courts, and
              other jurisdictions.
            </p>
            <Link href="/contact">
              <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-lg">
                Schedule Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
