"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
  readTime: string;
  thumbnail: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?includeDrafts=true");
      if (res.ok) {
        const data = await res.json();
        setBlogs(
          data.blogs.sort(
            (a: Blog, b: Blog) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      }
    } catch (error) {
      console.error("Failed to load blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadBlogs();
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true;
    return blog.status === filter;
  });

  if (loading) {
    return <div className="text-heading">Loading blogs...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-heading mb-2">Blog Posts</h1>
          <p className="text-body-copy">{blogs.length} total posts</p>
        </div>

        <Link href="/admin/blogs/new">
          <Button className="bg-highlight text-page-bg hover:bg-highlight-dark">
            <Plus className="mr-2" size={18} />
            Create New Post
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "published", "draft"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
              filter === status
                ? "bg-highlight text-page-bg"
                : "bg-surface text-body-copy hover:text-highlight border border-border"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status !== "all" && ` (${blogs.filter((b) => b.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <FileText className="w-12 h-12 text-body-copy/30 mx-auto mb-4" />
          <p className="text-body-copy mb-4">
            {filter === "all" ? "No blog posts yet" : `No ${filter} posts`}
          </p>
          <Link href="/admin/blogs/new">
            <Button className="bg-highlight text-page-bg hover:bg-highlight-dark">
              Create Your First Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-surface border border-border rounded-lg overflow-hidden group hover:border-highlight/50 transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={blog.thumbnail || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      blog.status === "published"
                        ? "bg-green-500/90 text-white"
                        : "bg-yellow-500/90 text-white"
                    }`}
                  >
                    {blog.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-body-copy mb-2">
                  <span className="text-highlight">{blog.category}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-heading mb-2 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-body-copy text-sm mb-4 line-clamp-2">{blog.excerpt}</p>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/blogs/${blog.id}`} className="flex-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-border text-heading hover:bg-surface-raised"
                    >
                      <Edit2 className="mr-2" size={14} />
                      Edit
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteBlog(blog.id)}
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

