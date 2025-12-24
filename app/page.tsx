"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/splash-screen";
import { Navigation } from "@/components/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Scale,
  Users,
  Award,
  ChevronDown,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const heroImages = [
  "/luxury-law-office-interior-with-dark-wood-and-gold.jpg",

  "/corporate-law-office.jpg",
  "/intellectual-property-patents.jpg",
  "/hero.png",
];

// Counter component for stats
function StatCounter({ icon: Icon, value, suffix, label, index }: any) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
      onViewportEnter={() => {
        if (!hasAnimated) {
          setHasAnimated(true);
          const duration = 2000; // 2 seconds
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      }}
      className="text-center"
    >
      <Icon className="w-12 h-12 mx-auto mb-4 text-[#C6B27E]" />
      <div className="text-4xl font-bold text-[#F2F2F2] mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-[#C7CBD1] text-sm">{label}</div>
    </motion.div>
  );
}

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [practiceAreas, setPracticeAreas] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showSplash]);

  useEffect(() => {
    // Load services from API (same as services page)
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        // Take first 3 services
        setPracticeAreas(data.services.slice(0, 3));
      })
      .catch((err) => console.error("Failed to load services:", err));

    // Load FAQs from API
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data.faqs.slice(0, 6)); // Show first 6 FAQs
      })
      .catch((err) => console.error("Failed to load FAQs:", err));
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#071731]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-[#C6B27E] text-sm tracking-widest mb-4"
              >
                EXCELLENCE IN LEGAL COUNSEL
              </motion.div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 leading-tight text-balance">
                Distinguished Legal Expertise
              </h1>
              <p className="text-[#C7CBD1] text-lg mb-8 leading-relaxed text-pretty">
                Regalius Law Partners has been providing exceptional legal
                services to individuals, corporations, and institutions
                worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-base">
                    Schedule Consultation
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#0C1F3A] px-8 py-6 hover:text-shadow-amber-500  bg-transparent"
                  >
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-[#2C3E5F]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={heroImages[currentImageIndex]}
                    alt="Regalius Law Partners Office"
                    className="object-cover w-full h-full absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#071731] via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-[#C6B27E] text-[#071731] p-8 rounded-lg shadow-2xl"
              >
                <div className="text-4xl font-bold mb-1">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Scale, value: 50, suffix: "+", label: "Cases Won" },
              {
                icon: Users,
                value: 100,
                suffix: "+",
                label: "Satisfied Clients",
              },
              { icon: Award, value: 5, suffix: "", label: "Awards Received" },
              { icon: Globe, value: 100, suffix: "%", label: "Legal Way" },
            ].map((stat, index) => (
              <StatCounter
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              OUR PRACTICE AREAS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Practice Areas
            </h2>
            <p className="text-[#C7CBD1] max-w-2xl mx-auto text-pretty">
              Comprehensive legal solutions tailored to your unique needs across
              multiple practice areas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {practiceAreas.length > 0
              ? practiceAreas.map((area, index) => (
                  <Link key={area.id} href={`/service-details/${area.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                      whileHover={{ y: -5 }}
                      className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group cursor-pointer h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={area.image || "/placeholder.svg"}
                          alt={area.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F3A] to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">
                          {area.title}
                        </h3>
                        <p className="text-[#C7CBD1] mb-4 leading-relaxed line-clamp-3">
                          {area.description}
                        </p>
                        <Button
                          variant="link"
                          className="text-[#C6B27E] p-0 h-auto"
                        >
                          Learn More <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                ))
              : // Fallback to static content if API fails (first 3 services from services page)
                [
                  {
                    title: "Corporate Law",
                    description:
                      "Strategic counsel for mergers, acquisitions, corporate governance, and compliance matters.",
                    image: "/corporate-law-office.jpg",
                    slug: "corporate-law",
                  },
                  {
                    title: "Intellectual Property",
                    description:
                      "Comprehensive protection and enforcement of your patents, trademarks, and copyrights.",
                    image: "/intellectual-property-patents.jpg",
                    slug: "intellectual-property",
                  },
                  {
                    title: "Litigation",
                    description:
                      "Aggressive courtroom representation with a proven track record of favorable outcomes.",
                    image: "/professional-courtroom.jpg",
                    slug: "litigation",
                  },
                ].map((area, index) => (
                  <Link key={area.title} href={`/service-details/${area.slug}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                      whileHover={{ y: -5 }}
                      className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group cursor-pointer h-full"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={area.image || "/placeholder.svg"}
                          alt={area.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F3A] to-transparent" />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-3">
                          {area.title}
                        </h3>
                        <p className="text-[#C7CBD1] mb-4 leading-relaxed line-clamp-3">
                          {area.description}
                        </p>
                        <Button
                          variant="link"
                          className="text-[#C6B27E] p-0 h-auto"
                        >
                          Learn More <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-[#2C3E5F]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Common Questions
            </h2>
            <p className="text-[#C7CBD1] max-w-2xl mx-auto text-pretty">
              Find answers to common questions about our services and how we can
              help you.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                  }
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-[#071731]/50 transition-colors"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#F2F2F2] pr-8">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C6B27E] transition-transform flex-shrink-0 ${
                      openFaqId === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[#C7CBD1] leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-t border-[#2C3E5F]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Our experienced attorneys are ready to provide the expert guidance
              you deserve.
            </p>
            <Link href="/contact">
              <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-lg">
                Schedule a Consultation
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
