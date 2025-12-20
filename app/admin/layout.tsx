"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LayoutDashboard, Mail, FileText, LogOut, Menu, X, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    // Check authentication
    fetch("/api/admin/session")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        router.push("/admin/login");
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // Don't show layout on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center">
        <div className="text-heading">Loading...</div>
      </div>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Contact Requests", href: "/admin/contacts", icon: Mail },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Attorneys", href: "/admin/attorneys", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border px-4 py-4 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Regalius Law Partners Admin"
          width={150}
          height={40}
          className="h-8 w-auto"
        />
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-heading">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen || window.innerWidth >= 1024 ? 0 : -280,
        }}
        className="fixed top-0 left-0 bottom-0 w-70 bg-surface border-r border-border z-40 lg:translate-x-0 pt-16 lg:pt-0"
      >
        <div className="p-6 hidden lg:block">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Regalius Law Partners"
              width={180}
              height={45}
              className="h-10 w-auto mb-2"
            />
          </Link>
          <p className="text-sm text-body-copy">Admin Panel</p>
        </div>

        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${
                  isActive
                    ? "bg-highlight text-page-bg"
                    : "text-body-copy hover:bg-surface-raised hover:text-highlight"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-body-copy hover:text-destructive transition-colors w-full rounded-sm hover:bg-surface-raised"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="lg:ml-70 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

