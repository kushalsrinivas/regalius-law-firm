"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { Users, Target, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  photo: string;
}

export default function AboutPage() {
  const [attorneys, setAttorneys] = useState<Attorney[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttorneys();
  }, []);

  const loadAttorneys = async () => {
    try {
      const res = await fetch("/api/attorneys");
      if (res.ok) {
        const data = await res.json();
        setAttorneys(data.attorneys);
      }
    } catch (error) {
      console.error("Failed to load attorneys:", error);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">ABOUT REGALIUS LAW PARTNERS</div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Who We Are
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              Regalius Law Partners is a full‑service law firm providing advisory, transactional, and dispute‑resolution services across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">About Us</h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                Regalius Law Partners is a full‑service law firm providing advisory, transactional, and dispute‑resolution services across India. We act for entrepreneurs, growing companies, established businesses, and individuals, delivering practical legal solutions aligned with real‑world objectives.
              </p>
              <p className="text-[#C7CBD1] leading-relaxed">
                Our lawyers bring deep experience in civil and commercial litigation, property matters, corporate advisory, and regulatory compliance. We focus on anticipating risk, protecting interests, and delivering outcomes—not just opinions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[500px] rounded-lg overflow-hidden border border-[#2C3E5F]"
            >
              <img
                src="/historic-law-firm-library.jpg"
                alt="Regalius Law Partners Library"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071731]/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">OUR CORE VALUES</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">What Drives Us</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Excellence",
                description: "We pursue the highest standards in every case, every time.",
              },
              {
                icon: Users,
                title: "Client-Centric",
                description: "Your success is our mission. We listen, understand, and deliver.",
              },
              {
                icon: Heart,
                title: "Integrity",
                description: "Ethical conduct and transparency guide every decision we make.",
              },
              {
                icon: Award,
                title: "Innovation",
                description: "We embrace new approaches while honoring proven traditions.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8 text-center"
              >
                <value.icon className="w-12 h-12 mx-auto mb-4 text-[#C6B27E]" />
                <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">{value.title}</h3>
                <p className="text-[#C7CBD1] leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attorneys Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">MEET OUR TEAM</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">Our Attorneys</h2>
            <p className="text-[#C7CBD1] max-w-2xl mx-auto text-pretty">
              Our team of experienced attorneys is dedicated to providing exceptional legal services with professionalism and integrity.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-[#C7CBD1]">Loading attorneys...</div>
          ) : attorneys.length === 0 ? (
            <div className="text-center text-[#C7CBD1]">No attorneys available at this time.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attorneys.map((attorney, index) => (
                <motion.div
                  key={attorney.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <Link href={`/attorneys/${attorney.slug}`}>
                    <div className="relative h-80 rounded-lg overflow-hidden border border-[#2C3E5F] mb-4 cursor-pointer">
                      <img
                        src={attorney.photo || "/placeholder-user.jpg"}
                        alt={attorney.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071731] via-[#071731]/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-1 group-hover:text-[#C6B27E] transition-colors">
                          {attorney.name}
                        </h3>
                        <p className="text-[#C6B27E] text-sm font-medium">{attorney.title}</p>
                      </div>
                    </div>
                    <div className="text-[#C7CBD1] text-sm mb-2">{attorney.specialty}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-[#C6B27E] text-[#C6B27E] hover:bg-[#C6B27E] hover:text-[#071731]"
                    >
                      View Profile
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Join Our Distinguished Clientele
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Experience the difference that decades of legal excellence can make for your case.
            </p>
            <Link href="/contact">
              <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-lg">
                Contact Our Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071731] border-t border-[#2C3E5F] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-[#C7CBD1] text-sm">
          <p>&copy; {new Date().getFullYear()} Regalius Law Partners. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
