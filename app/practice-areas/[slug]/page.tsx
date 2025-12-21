"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";

interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  icon?: string;
  createdAt: string;
}

export default function PracticeAreaDetailPage() {
  const params = useParams();
  const [practiceArea, setPracticeArea] = useState<PracticeArea | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.slug) {
      loadPracticeArea(params.slug as string);
    }
  }, [params.slug]);

  const loadPracticeArea = async (slug: string) => {
    try {
      // Fetch all practice areas and find by slug
      const res = await fetch("/api/practice-areas");
      if (res.ok) {
        const data = await res.json();
        const found = data.practiceAreas.find((a: PracticeArea) => a.slug === slug);
        if (found) {
          setPracticeArea(found);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to load practice area:", err);
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

  if (error || !practiceArea) {
    return (
      <div className="min-h-screen bg-[#071731]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-[#F2F2F2] mb-4">Practice Area Not Found</h1>
          <p className="text-[#C7CBD1] mb-8">The practice area you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
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
          src={practiceArea.image || "/placeholder.svg"}
          alt={practiceArea.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071731] via-[#071731]/60 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-[#C6B27E] text-[#C6B27E] hover:bg-[#C6B27E] hover:text-[#071731] bg-[#071731]/80 backdrop-blur-sm"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Home
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
                PRACTICE AREA
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#F2F2F2] mb-4 leading-tight">
                {practiceArea.title}
              </h1>
              <p className="text-xl text-[#C7CBD1] leading-relaxed">
                {practiceArea.description}
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
            <div className="text-[#C7CBD1] leading-relaxed space-y-6">
              {practiceArea.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
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
                Need Legal Assistance?
              </h2>
              <p className="text-[#C7CBD1] mb-6 max-w-2xl mx-auto">
                Our experienced attorneys are ready to help you with your {practiceArea.title.toLowerCase()} needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6">
                    Schedule Consultation
                  </Button>
                </Link>
                <Link href="/attorneys">
                  <Button
                    variant="outline"
                    className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#0C1F3A] px-8 py-6"
                  >
                    Meet Our Attorneys
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

