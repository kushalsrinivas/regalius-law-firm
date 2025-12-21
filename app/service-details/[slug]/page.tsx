"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon?: string;
  category: string;
  features: string[];
  createdAt: string;
}

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.slug) {
      loadService(params.slug as string);
    }
  }, [params.slug]);

  const loadService = async (slug: string) => {
    try {
      // Fetch all services and find by slug
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        const found = data.services.find((s: Service) => s.slug === slug);
        if (found) {
          setService(found);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to load service:", err);
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

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#071731]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-[#F2F2F2] mb-4">Service Not Found</h1>
          <p className="text-[#C7CBD1] mb-8">The service you're looking for doesn't exist.</p>
          <Link href="/services">
            <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
              <ArrowLeft className="mr-2" size={16} />
              Back to Services
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

      {/* Hero Image */}
      <section className="relative pt-20 h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={service.image || "/placeholder.svg"}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071731] via-[#071731]/60 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/services">
              <Button
                variant="outline"
                size="sm"
                className="border-[#C6B27E] text-[#C6B27E] hover:bg-[#C6B27E] hover:text-[#071731] bg-[#071731]/80 backdrop-blur-sm"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Services
              </Button>
            </Link>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#C6B27E] text-[#071731] rounded-full text-xs font-semibold tracking-wide mb-4">
                {service.category}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#F2F2F2] mb-4 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-[#C7CBD1] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Content */}
            <div className="text-[#C7CBD1] leading-relaxed space-y-6 mb-12">
              {service.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8 mb-12">
                <h2 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-6">
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#C6B27E] flex-shrink-0 mt-1" />
                      <span className="text-[#C7CBD1]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.article>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-[#2C3E5F]"
          >
            <div className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8 text-center">
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                Interested in This Service?
              </h2>
              <p className="text-[#C7CBD1] mb-6 max-w-2xl mx-auto">
                Contact us today to learn more about how we can assist you with {service.title.toLowerCase()}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/attorneys">
                  <Button
                    variant="outline"
                    className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#0C1F3A] px-8 py-6"
                  >
                    Meet Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

