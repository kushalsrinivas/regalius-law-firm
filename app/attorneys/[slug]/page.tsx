"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Scale,
  Globe,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  education: string[];
  experience: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  practiceAreas: string[];
  barAdmissions: string[];
  languages: string[];
}

export default function AttorneyProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [attorney, setAttorney] = useState<Attorney | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.slug) {
      loadAttorney(params.slug as string);
    }
  }, [params.slug]);

  const loadAttorney = async (slug: string) => {
    try {
      // Fetch all attorneys and find by slug
      const res = await fetch("/api/attorneys");
      if (res.ok) {
        const data = await res.json();
        const foundAttorney = data.attorneys.find((a: Attorney) => a.slug === slug);
        if (foundAttorney) {
          setAttorney(foundAttorney);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to load attorney:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071731]">
        <Navigation />
        <div className="pt-32 text-center text-[#C7CBD1]">Loading...</div>
      </div>
    );
  }

  if (error || !attorney) {
    return (
      <div className="min-h-screen bg-[#071731]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-[#F2F2F2] mb-4">Attorney Not Found</h1>
          <p className="text-[#C7CBD1] mb-8">The attorney you're looking for doesn't exist.</p>
          <Link href="/about">
            <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
              <ArrowLeft className="mr-2" size={16} />
              Back to About Us
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071731]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/about">
            <Button
              variant="outline"
              size="sm"
              className="mb-8 border-[#C6B27E] text-[#C6B27E] hover:bg-[#C6B27E] hover:text-[#071731]"
            >
              <ArrowLeft className="mr-2" size={16} />
              Back to About Us
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Attorney Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-8"
              >
                <div className="w-full md:w-64 h-80 rounded-lg overflow-hidden border border-[#2C3E5F] flex-shrink-0">
                  <img
                    src={attorney.photo || "/placeholder-user.jpg"}
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-3">
                    {attorney.name}
                  </h1>
                  <p className="text-[#C6B27E] text-xl font-medium mb-4">{attorney.title}</p>
                  <p className="text-[#C7CBD1] text-lg mb-6">{attorney.specialty}</p>

                  <div className="flex flex-wrap gap-3">
                    {attorney.practiceAreas.map((area, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-[#0C1F3A] text-[#C6B27E] text-sm rounded-sm border border-[#2C3E5F]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Biography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8"
              >
                <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4 flex items-center gap-3">
                  <Scale className="text-[#C6B27E]" size={28} />
                  Biography
                </h2>
                <p className="text-[#C7CBD1] leading-relaxed text-lg whitespace-pre-line">
                  {attorney.bio}
                </p>
              </motion.div>

              {/* Experience */}
              {attorney.experience && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8"
                >
                  <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4 flex items-center gap-3">
                    <Calendar className="text-[#C6B27E]" size={28} />
                    Experience
                  </h2>
                  <p className="text-[#C7CBD1] leading-relaxed text-lg whitespace-pre-line">
                    {attorney.experience}
                  </p>
                </motion.div>
              )}

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8"
              >
                <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-6 flex items-center gap-3">
                  <GraduationCap className="text-[#C6B27E]" size={28} />
                  Education
                </h2>
                <ul className="space-y-3">
                  {attorney.education.map((edu, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#C7CBD1] text-lg">
                      <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Bar Admissions */}
              {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8"
                >
                  <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-6 flex items-center gap-3">
                    <Scale className="text-[#C6B27E]" size={28} />
                    Bar Admissions
                  </h2>
                  <ul className="space-y-3">
                    {attorney.barAdmissions.map((bar, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#C7CBD1] text-lg">
                        <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                        <span>{bar}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Languages */}
              {attorney.languages && attorney.languages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8"
                >
                  <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-6 flex items-center gap-3">
                    <Globe className="text-[#C6B27E]" size={28} />
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {attorney.languages.map((lang, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-[#071731] text-[#C7CBD1] text-sm rounded-sm border border-[#2C3E5F]"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Contact Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8"
                >
                  <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Mail className="text-[#C6B27E]" size={20} />
                        <span className="text-sm text-[#C7CBD1] font-medium">Email</span>
                      </div>
                      <a
                        href={`mailto:${attorney.email}`}
                        className="text-[#F2F2F2] hover:text-[#C6B27E] transition-colors block pl-8"
                      >
                        {attorney.email}
                      </a>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Phone className="text-[#C6B27E]" size={20} />
                        <span className="text-sm text-[#C7CBD1] font-medium">Phone</span>
                      </div>
                      <a
                        href={`tel:${attorney.phone}`}
                        className="text-[#F2F2F2] hover:text-[#C6B27E] transition-colors block pl-8"
                      >
                        {attorney.phone}
                      </a>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-[#C6B27E]" size={20} />
                        <span className="text-sm text-[#C7CBD1] font-medium">Office</span>
                      </div>
                      <p className="text-[#F2F2F2] pl-8">
                        #50,1,Infantry Road,
                        <br />
                        opp. Commissioner Office,
                        <br />
                        Vasanth Nagar, Bengaluru 56001
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#2C3E5F]">
                    <h4 className="text-sm text-[#C7CBD1] font-medium mb-4">Working Hours</h4>
                    <div className="space-y-2 text-sm text-[#F2F2F2]">
                      <div className="flex justify-between">
                        <span className="text-[#C7CBD1]">Mon - Fri</span>
                        <span>9:00 am - 6:00 pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#C7CBD1]">Saturday</span>
                        <span>9:00 am - 12:00 pm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#C7CBD1]">Sunday</span>
                        <span className="text-[#C6B27E]">Holiday</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/contact" className="block mt-8">
                    <Button className="w-full bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] py-6 text-base font-semibold">
                      Schedule Consultation
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

