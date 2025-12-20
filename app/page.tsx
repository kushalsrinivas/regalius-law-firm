"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "@/components/splash-screen";
import { Navigation } from "@/components/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Users, Award, Building2 } from "lucide-react";
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
  "/professional-courtroom.jpg",
  "/corporate-law-office.jpg",
  "/historic-law-firm-library.jpg",
  "/hero.png",
];

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showSplash]);

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
                For over three decades, Regalius Law Partners has provided
                exceptional legal services to individuals, corporations, and
                institutions worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-base">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#0C1F3A] px-8 py-6 text-base bg-transparent"
                >
                  Our Services
                </Button>
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
                <div className="text-4xl font-bold mb-1">30+</div>
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
              { icon: Scale, value: "500+", label: "Cases Won" },
              { icon: Users, value: "200+", label: "Satisfied Clients" },
              { icon: Award, value: "50+", label: "Awards Received" },
              { icon: Building2, value: "5", label: "Global Offices" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-[#C6B27E]" />
                <div className="text-4xl font-bold text-[#F2F2F2] mb-2">
                  {stat.value}
                </div>
                <div className="text-[#C7CBD1] text-sm">{stat.label}</div>
              </motion.div>
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
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              OUR EXPERTISE
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
            {[
              {
                title: "Corporate Law",
                description:
                  "Strategic counsel for businesses navigating complex corporate transactions and compliance.",
                image: "/modern-corporate-boardroom.png",
              },
              {
                title: "Intellectual Property",
                description:
                  "Protection and enforcement of patents, trademarks, and copyrights in the global marketplace.",
                image: "/intellectual-property-patents.jpg",
              },
              {
                title: "Litigation",
                description:
                  "Aggressive representation in courtrooms with a track record of favorable outcomes.",
                image: "/professional-courtroom.jpg",
              },
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group cursor-pointer"
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
                  <p className="text-[#C7CBD1] mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  <Button variant="link" className="text-[#C6B27E] p-0 h-auto">
                    Learn More <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
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
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Ready to Discuss Your Legal Needs?
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Our experienced attorneys are ready to provide the expert guidance
              you deserve.
            </p>
            <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-lg">
              Schedule a Consultation
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
