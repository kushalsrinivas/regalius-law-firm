"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FAQ>>({
    question: "",
    answer: "",
    category: "General",
    status: "active",
    order: 0,
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const res = await fetch("/api/faqs?includeInactive=true");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data.faqs);
      }
    } catch (error) {
      console.error("Failed to load FAQs:", error);
      alert("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.question || !formData.answer) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          order: formData.order ?? faqs.length,
        }),
      });

      if (res.ok) {
        await loadFAQs();
        setIsCreating(false);
        setFormData({
          question: "",
          answer: "",
          category: "General",
          status: "active",
          order: 0,
        });
        alert("FAQ created successfully!");
      } else {
        alert("Failed to create FAQ");
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
      alert("Failed to create FAQ");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await loadFAQs();
        setEditingId(null);
        setFormData({
          question: "",
          answer: "",
          category: "General",
          status: "active",
          order: 0,
        });
        alert("FAQ updated successfully!");
      } else {
        alert("Failed to update FAQ");
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
      alert("Failed to update FAQ");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadFAQs();
        alert("FAQ deleted successfully!");
      } else {
        alert("Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Failed to delete FAQ");
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setFormData(faq);
    setIsCreating(false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      question: "",
      answer: "",
      category: "General",
      status: "active",
      order: 0,
    });
  };

  const moveUp = async (index: number) => {
    if (index === 0) return;
    const newFaqs = [...faqs];
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[index - 1];
    newFaqs[index - 1] = temp;

    // Update orders
    for (let i = 0; i < newFaqs.length; i++) {
      await fetch(`/api/faqs/${newFaqs[i].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: i }),
      });
    }
    await loadFAQs();
  };

  const moveDown = async (index: number) => {
    if (index === faqs.length - 1) return;
    const newFaqs = [...faqs];
    const temp = newFaqs[index];
    newFaqs[index] = newFaqs[index + 1];
    newFaqs[index + 1] = temp;

    // Update orders
    for (let i = 0; i < newFaqs.length; i++) {
      await fetch(`/api/faqs/${newFaqs[i].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: i }),
      });
    }
    await loadFAQs();
  };

  if (loading) {
    return <div className="text-heading">Loading FAQs...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-4xl font-bold text-heading mb-2">
            Manage FAQs
          </h1>
          <p className="text-body-copy">
            Create and manage frequently asked questions
          </p>
        </div>
        <Button
          onClick={() => {
            setIsCreating(true);
            setEditingId(null);
            setFormData({
              question: "",
              answer: "",
              category: "General",
              status: "active",
              order: faqs.length,
            });
          }}
          className="bg-highlight text-page-bg hover:bg-highlight-dark"
        >
          <Plus className="mr-2" size={18} />
          Add New FAQ
        </Button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-lg p-6 mb-8"
        >
          <h2 className="font-serif text-2xl font-bold text-heading mb-6">
            {isCreating ? "Create New FAQ" : "Edit FAQ"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-2">
                Question *
              </label>
              <input
                type="text"
                value={formData.question || ""}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className="w-full px-4 py-2 bg-page-bg border border-border rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-highlight"
                placeholder="Enter the question"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">
                Answer *
              </label>
              <textarea
                value={formData.answer || ""}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 bg-page-bg border border-border rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-highlight resize-none"
                placeholder="Enter the answer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Category
                </label>
                <select
                  value={formData.category || "General"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-page-bg border border-border rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-highlight"
                >
                  <option value="General">General</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Fees">Fees</option>
                  <option value="Process">Process</option>
                  <option value="Services">Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Status
                </label>
                <select
                  value={formData.status || "active"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "active" | "inactive",
                    })
                  }
                  className="w-full px-4 py-2 bg-page-bg border border-border rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-highlight"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order ?? 0}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 bg-page-bg border border-border rounded-lg text-heading focus:outline-none focus:ring-2 focus:ring-highlight"
                  min="0"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() =>
                  isCreating ? handleCreate() : handleUpdate(editingId!)
                }
                className="bg-highlight text-page-bg hover:bg-highlight-dark"
              >
                {isCreating ? "Create FAQ" : "Update FAQ"}
              </Button>
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="border-border text-heading hover:bg-surface-raised"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQs List */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="text-center py-12 text-body-copy">
            No FAQs found. Create your first FAQ to get started.
          </div>
        ) : (
          faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-surface border rounded-lg p-6 ${
                faq.status === "active" ? "border-border" : "border-gray-600 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-xl font-semibold text-heading">
                      {faq.question}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        faq.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {faq.status}
                    </span>
                    <span className="px-2 py-1 text-xs rounded bg-highlight/20 text-highlight">
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-body-copy leading-relaxed mb-3">
                    {faq.answer}
                  </p>
                  <div className="text-xs text-body-copy-light">
                    Order: {faq.order} | Created:{" "}
                    {new Date(faq.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      size="sm"
                      variant="outline"
                      className="border-border text-heading hover:bg-surface-raised p-2"
                    >
                      <ChevronUp size={16} />
                    </Button>
                    <Button
                      onClick={() => moveDown(index)}
                      disabled={index === faqs.length - 1}
                      size="sm"
                      variant="outline"
                      className="border-border text-heading hover:bg-surface-raised p-2"
                    >
                      <ChevronDown size={16} />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(faq)}
                      size="sm"
                      variant="outline"
                      className="border-border text-heading hover:bg-surface-raised"
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      onClick={() => handleDelete(faq.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

