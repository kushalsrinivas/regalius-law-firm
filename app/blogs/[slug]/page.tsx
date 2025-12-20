"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  publishedAt?: string;
  createdAt: string;
  readTime: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params.slug) {
      loadBlog(params.slug as string);
    }
  }, [params.slug]);

  const loadBlog = async (slug: string) => {
    try {
      // Fetch all blogs and find by slug
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        const foundBlog = data.blogs.find((b: Blog) => b.slug === slug);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to load blog:", err);
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

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#071731]">
        <Navigation />
        <div className="pt-32 pb-20 px-4 text-center">
          <h1 className="text-4xl font-bold text-[#F2F2F2] mb-4">Blog Not Found</h1>
          <p className="text-[#C7CBD1] mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs">
            <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
              <ArrowLeft className="mr-2" size={16} />
              Back to Blogs
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
          src={blog.thumbnail || "/placeholder.svg"}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071731] via-[#071731]/60 to-transparent" />
        
        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/blogs">
              <Button
                variant="outline"
                size="sm"
                className="border-[#C6B27E] text-[#C6B27E] hover:bg-[#C6B27E] hover:text-[#071731] bg-[#071731]/80 backdrop-blur-sm"
              >
                <ArrowLeft className="mr-2" size={16} />
                Back to Blogs
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
                {blog.category}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#F2F2F2] mb-4 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[#C7CBD1] text-sm">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{blog.readTime}</span>
                </div>
              </div>
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
            {/* Excerpt */}
            <p className="text-xl text-[#C7CBD1] leading-relaxed mb-8 font-medium border-l-4 border-[#C6B27E] pl-6 italic">
              {blog.excerpt}
            </p>

            {/* Content */}
            <div className="text-[#C7CBD1] leading-relaxed space-y-6">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>

          {/* Footer Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-[#2C3E5F]"
          >
            <Link href="/blogs">
              <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
                <ArrowLeft className="mr-2" size={16} />
                Back to All Blogs
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

