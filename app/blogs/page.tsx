"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
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

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

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
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">INSIGHTS & UPDATES</div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Latest from Regalius
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              Stay informed with the latest news, insights, and achievements from Regalius Law Partners.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[#C7CBD1]">Loading blog posts...</p>
          </div>
        </section>
      ) : blogs.length === 0 ? (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[#C7CBD1]">No blog posts available yet.</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Blog */}
          {featuredBlog && (
            <section className="pb-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden"
                >
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-80 lg:h-auto">
                      <img
                        src={featuredBlog.thumbnail || "/placeholder.svg"}
                        alt={featuredBlog.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#C6B27E] text-[#071731] px-4 py-1.5 rounded text-xs font-semibold tracking-wide">
                          FEATURED
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="text-[#C6B27E] text-sm mb-3">{featuredBlog.category}</div>
                      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#F2F2F2] mb-4">
                        {featuredBlog.title}
                      </h2>
                      <p className="text-[#C7CBD1] text-lg mb-6 leading-relaxed">{featuredBlog.excerpt}</p>
                      <div className="flex items-center gap-4 text-[#C7CBD1] text-sm mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          {new Date(featuredBlog.publishedAt || featuredBlog.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          {featuredBlog.readTime}
                        </div>
                      </div>
                      <Link href={`/blogs/${featuredBlog.slug}`}>
                        <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] w-fit">
                          Read Full Article
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Blog Grid */}
          {otherBlogs.length > 0 && (
            <section className="py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherBlogs.map((blog, index) => (
                    <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group cursor-pointer"
                      >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={blog.thumbnail || "/placeholder.svg"}
                          alt={blog.title}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F3A] to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="text-[#C6B27E] text-xs mb-3 tracking-wide">{blog.category}</div>
                        <h3 className="font-serif text-xl font-bold text-[#F2F2F2] mb-3 group-hover:text-[#C6B27E] transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-[#C7CBD1] text-sm mb-4 leading-relaxed line-clamp-3">{blog.excerpt}</p>
                        <div className="flex items-center gap-4 text-[#C7CBD1] text-xs mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {blog.readTime}
                          </div>
                        </div>
                        <Button variant="link" className="text-[#C6B27E] p-0 h-auto text-sm">
                          Read More <ArrowRight className="ml-2" size={14} />
                        </Button>
                      </div>
                    </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Newsletter Signup */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
                  Stay Informed
                </h2>
                <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
                  Subscribe to our newsletter for the latest legal insights, firm news, and industry updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-[#0A1A33] border border-[#2C3E5F] rounded text-[#F2F2F2] placeholder:text-[#C7CBD1]/50 focus:outline-none focus:ring-2 focus:ring-[#C6B27E]"
                  />
                  <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-4">Subscribe</Button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
