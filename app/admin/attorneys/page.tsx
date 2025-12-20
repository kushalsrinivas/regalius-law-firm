"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Attorney {
  id: string;
  name: string;
  slug: string;
  title: string;
  specialty: string;
  email: string;
  phone: string;
  photo: string;
  status: "active" | "inactive";
  order: number;
  createdAt: string;
}

export default function AttorneysAdminPage() {
  const [attorneys, setAttorneys] = useState<Attorney[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttorneys();
  }, []);

  const loadAttorneys = async () => {
    try {
      const res = await fetch("/api/attorneys?includeInactive=true");
      if (res.ok) {
        const data = await res.json();
        setAttorneys(
          data.attorneys.sort((a: Attorney, b: Attorney) => a.order - b.order)
        );
      }
    } catch (error) {
      console.error("Failed to load attorneys:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: "active" | "inactive") => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const res = await fetch(`/api/attorneys/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        loadAttorneys();
      }
    } catch (error) {
      console.error("Failed to update attorney:", error);
    }
  };

  const deleteAttorney = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/attorneys/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadAttorneys();
      }
    } catch (error) {
      console.error("Failed to delete attorney:", error);
    }
  };

  if (loading) {
    return <div className="text-heading">Loading attorneys...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-heading mb-2">Attorneys</h1>
          <p className="text-body-copy">{attorneys.length} total attorneys</p>
        </div>

        <Link href="/admin/attorneys/new">
          <Button className="bg-highlight text-page-bg hover:bg-highlight-dark">
            <Plus className="mr-2" size={18} />
            Add New Attorney
          </Button>
        </Link>
      </div>

      {/* Attorneys List */}
      {attorneys.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <Users className="w-12 h-12 text-body-copy/30 mx-auto mb-4" />
          <p className="text-body-copy mb-4">No attorneys yet</p>
          <Link href="/admin/attorneys/new">
            <Button className="bg-highlight text-page-bg hover:bg-highlight-dark">
              Add Your First Attorney
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attorneys.map((attorney, index) => (
            <motion.div
              key={attorney.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-surface border border-border rounded-lg overflow-hidden group hover:border-highlight/50 transition-all"
            >
              <div className="relative h-64 overflow-hidden bg-muted">
                <img
                  src={attorney.photo || "/placeholder-user.jpg"}
                  alt={attorney.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => toggleStatus(attorney.id, attorney.status)}
                    className={`p-2 rounded-full ${
                      attorney.status === "active"
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-500/90 text-white"
                    }`}
                    title={attorney.status === "active" ? "Active" : "Inactive"}
                  >
                    {attorney.status === "active" ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-[#071731]/80 text-[#C6B27E] px-3 py-1 rounded text-xs font-medium">
                    Order: {attorney.order}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-xl font-bold text-heading mb-1">
                  {attorney.name}
                </h3>
                <p className="text-highlight text-sm mb-2">{attorney.title}</p>
                <p className="text-body-copy text-sm mb-4">{attorney.specialty}</p>

                <div className="text-xs text-body-copy mb-4">
                  <p>{attorney.email}</p>
                  <p>{attorney.phone}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/attorneys/${attorney.id}`} className="flex-1">
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
                    onClick={() => deleteAttorney(attorney.id, attorney.name)}
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

