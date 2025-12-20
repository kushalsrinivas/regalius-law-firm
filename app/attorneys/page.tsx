"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  email: string;
  phone: string;
  photo: string;
  practiceAreas: string[];
}

export default function AttorneysPage() {
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
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">OUR LEGAL TEAM</div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Meet Our Attorneys
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              Our team of experienced attorneys is dedicated to providing exceptional legal services with professionalism and integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[#C7CBD1]">Loading attorneys...</p>
          </div>
        </section>
      ) : attorneys.length === 0 ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <User className="w-16 h-16 text-[#C7CBD1]/30 mx-auto mb-4" />
            <p className="text-[#C7CBD1]">No attorneys available at this time.</p>
          </div>
        </section>
      ) : (
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {attorneys.map((attorney, index) => (
                <motion.div
                  key={attorney.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/attorneys/${attorney.slug}`}>
                    <div className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group cursor-pointer hover:border-[#C6B27E] transition-all">
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={attorney.photo || "/placeholder-user.jpg"}
                          alt={attorney.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F3A] via-[#0C1F3A]/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-1 group-hover:text-[#C6B27E] transition-colors">
                            {attorney.name}
                          </h3>
                          <p className="text-[#C6B27E] text-sm font-medium">{attorney.title}</p>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-[#C7CBD1] text-sm mb-4">{attorney.specialty}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-[#C7CBD1] text-sm">
                            <Mail size={14} className="text-[#C6B27E]" />
                            <span className="truncate">{attorney.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#C7CBD1] text-sm">
                            <Phone size={14} className="text-[#C6B27E]" />
                            <span>{attorney.phone}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {attorney.practiceAreas.slice(0, 2).map((area, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-[#071731] text-[#C6B27E] text-xs rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                          {attorney.practiceAreas.length > 2 && (
                            <span className="px-3 py-1 bg-[#071731] text-[#C7CBD1] text-xs rounded-full">
                              +{attorney.practiceAreas.length - 2} more
                            </span>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#C6B27E] text-[#C6B27E] hover:bg-[#C6B27E] hover:text-[#071731]"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

