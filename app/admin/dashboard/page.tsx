"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, FileText, TrendingUp, Eye, Users, Briefcase, Cog, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Stats {
  totalContacts: number;
  newContacts: number;
  totalBlogs: number;
  publishedBlogs: number;
  totalAttorneys: number;
  activeAttorneys: number;
  totalPracticeAreas: number;
  activePracticeAreas: number;
  totalServices: number;
  activeServices: number;
  totalFAQs: number;
  activeFAQs: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    newContacts: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    totalAttorneys: 0,
    activeAttorneys: 0,
    totalPracticeAreas: 0,
    activePracticeAreas: 0,
    totalServices: 0,
    activeServices: 0,
    totalFAQs: 0,
    activeFAQs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [contactsRes, blogsRes, attorneysRes, practiceAreasRes, servicesRes, faqsRes] = await Promise.all([
        fetch("/api/contacts"),
        fetch("/api/blogs?includeDrafts=true"),
        fetch("/api/attorneys?includeInactive=true"),
        fetch("/api/practice-areas?includeInactive=true"),
        fetch("/api/services?includeInactive=true"),
        fetch("/api/faqs?includeInactive=true"),
      ]);

      if (contactsRes.ok && blogsRes.ok && attorneysRes.ok && practiceAreasRes.ok && servicesRes.ok && faqsRes.ok) {
        const contactsData = await contactsRes.json();
        const blogsData = await blogsRes.json();
        const attorneysData = await attorneysRes.json();
        const practiceAreasData = await practiceAreasRes.json();
        const servicesData = await servicesRes.json();
        const faqsData = await faqsRes.json();

        setStats({
          totalContacts: contactsData.contacts.length,
          newContacts: contactsData.contacts.filter((c: any) => c.status === "new").length,
          totalBlogs: blogsData.blogs.length,
          publishedBlogs: blogsData.blogs.filter((b: any) => b.status === "published").length,
          totalAttorneys: attorneysData.attorneys.length,
          activeAttorneys: attorneysData.attorneys.filter((a: any) => a.status === "active").length,
          totalPracticeAreas: practiceAreasData.practiceAreas.length,
          activePracticeAreas: practiceAreasData.practiceAreas.filter((p: any) => p.status === "active").length,
          totalServices: servicesData.services.length,
          activeServices: servicesData.services.filter((s: any) => s.status === "active").length,
          totalFAQs: faqsData.faqs.length,
          activeFAQs: faqsData.faqs.filter((f: any) => f.status === "active").length,
        });
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Contacts",
      value: stats.totalContacts,
      subtitle: `${stats.newContacts} new`,
      icon: Mail,
      color: "text-blue-500",
      href: "/admin/contacts",
    },
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      subtitle: `${stats.publishedBlogs} published`,
      icon: FileText,
      color: "text-green-500",
      href: "/admin/blogs",
    },
    {
      title: "Total Attorneys",
      value: stats.totalAttorneys,
      subtitle: `${stats.activeAttorneys} active`,
      icon: Users,
      color: "text-purple-500",
      href: "/admin/attorneys",
    },
    {
      title: "Practice Areas",
      value: stats.totalPracticeAreas,
      subtitle: `${stats.activePracticeAreas} active`,
      icon: Briefcase,
      color: "text-orange-500",
      href: "/admin/practice-areas",
    },
    {
      title: "Services",
      value: stats.totalServices,
      subtitle: `${stats.activeServices} active`,
      icon: Cog,
      color: "text-cyan-500",
      href: "/admin/services",
    },
    {
      title: "FAQs",
      value: stats.totalFAQs,
      subtitle: `${stats.activeFAQs} active`,
      icon: HelpCircle,
      color: "text-yellow-500",
      href: "/admin/faqs",
    },
  ];

  if (loading) {
    return <div className="text-heading">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-heading mb-2">Dashboard</h1>
        <p className="text-body-copy">Welcome back to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <div className="bg-surface border border-border rounded-lg p-6 hover:border-highlight transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-heading mb-1">{stat.value}</div>
                <div className="text-sm text-body-copy mb-1">{stat.title}</div>
                <div className="text-xs text-highlight">{stat.subtitle}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-surface border border-border rounded-lg p-6"
        >
          <h2 className="font-serif text-2xl font-bold text-heading mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/blogs/new">
                <Button className="w-full justify-start bg-highlight text-page-bg hover:bg-highlight-dark">
                  <FileText className="mr-2" size={18} />
                  Create New Blog Post
                </Button>
              </Link>
              <Link href="/admin/attorneys/new">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-heading hover:bg-surface-raised"
                >
                  <Users className="mr-2" size={18} />
                  Add New Attorney
                </Button>
              </Link>
              <Link href="/admin/practice-areas/new">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-heading hover:bg-surface-raised"
                >
                  <Briefcase className="mr-2" size={18} />
                  Add Practice Area
                </Button>
              </Link>
              <Link href="/admin/services/new">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-heading hover:bg-surface-raised"
                >
                  <Cog className="mr-2" size={18} />
                  Add Service
                </Button>
              </Link>
              <Link href="/admin/faqs">
                <Button
                  variant="outline"
                  className="w-full justify-start border-border text-heading hover:bg-surface-raised"
                >
                  <HelpCircle className="mr-2" size={18} />
                  Manage FAQs
                </Button>
              </Link>
              <Link href="/admin/contacts">
              <Button
                variant="outline"
                className="w-full justify-start border-border text-heading hover:bg-surface-raised"
              >
                <Mail className="mr-2" size={18} />
                View Contact Requests
              </Button>
            </Link>
            <Link href="/blogs" target="_blank">
              <Button
                variant="outline"
                className="w-full justify-start border-border text-heading hover:bg-surface-raised"
              >
                <Eye className="mr-2" size={18} />
                View Public Blog Page
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-surface border border-border rounded-lg p-6"
        >
          <h2 className="font-serif text-2xl font-bold text-heading mb-4">System Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-body-copy">Platform</span>
              <span className="text-heading font-medium">Regalius Admin v1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-copy">Database</span>
              <span className="text-heading font-medium">JSON File Storage</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body-copy">Last Login</span>
              <span className="text-heading font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

