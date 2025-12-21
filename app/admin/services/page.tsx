"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cog, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetch("/api/services?includeInactive=true");
      if (res.ok) {
        const data = await res.json();
        setServices(
          data.services.sort((a: Service, b: Service) => a.order - b.order)
        );
      }
    } catch (error) {
      console.error("Failed to load services:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadServices();
      }
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const filteredServices = services.filter((service) => {
    if (filter === "all") return true;
    return service.status === filter;
  });

  if (loading) {
    return <div className="text-heading">Loading services...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-heading mb-2">Services</h1>
          <p className="text-body-copy">{services.length} total services</p>
        </div>

        <Link href="/admin/services/new">
          <Button className="bg-highlight text-page-bg hover:bg-highlight-dark">
            <Plus className="mr-2" size={18} />
            Create New Service
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "active", "inactive"] as const).map((status) => (
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
            {status !== "all" && ` (${services.filter((s) => s.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Services List */}
      {filteredServices.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <Cog className="w-12 h-12 text-body-copy/30 mx-auto mb-4" />
          <p className="text-body-copy mb-4">
            {filter === "all" ? "No services yet" : `No ${filter} services`}
          </p>
          <Link href="/admin/services/new">
            <Button className="bg-highlight text-page-bg hover:bg-highlight-dark">
              Create Your First Service
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-surface border border-border rounded-lg overflow-hidden group hover:border-highlight/50 transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.status === "active"
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-500/90 text-white"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-body-copy mb-2">
                  <span className="text-highlight">{service.category}</span>
                  <span>•</span>
                  <span>Order: {service.order}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-heading mb-2 line-clamp-2">
                  {service.title}
                </h3>

                <p className="text-body-copy text-sm mb-4 line-clamp-2">{service.description}</p>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/services/${service.id}`} className="flex-1">
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
                    onClick={() => deleteService(service.id)}
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

