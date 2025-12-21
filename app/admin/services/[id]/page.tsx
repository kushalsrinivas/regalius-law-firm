"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Eye, Upload, ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

export default function ServiceEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id && params.id !== "new";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    icon: "",
    category: "Legal Services",
    features: [] as string[],
    status: "active" as "active" | "inactive",
    order: 1,
  });

  const [newFeature, setNewFeature] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadService();
    }
  }, [isEdit]);

  const loadService = async () => {
    try {
      const res = await fetch(`/api/services/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.service.title,
          description: data.service.description,
          content: data.service.content,
          image: data.service.image,
          icon: data.service.icon || "",
          category: data.service.category,
          features: data.service.features || [],
          status: data.service.status,
          order: data.service.order,
        });
      }
    } catch (error) {
      console.error("Failed to load service:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (status: "active" | "inactive") => {
    if (!form.title || !form.description || !form.content || !form.image) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);

    try {
      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/services/${params.id}` : "/api/services";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      });

      if (res.ok) {
        alert(status === "active" ? "Service published successfully!" : "Draft saved");
        router.push("/admin/services");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save service");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save service");
    } finally {
      setSaving(false);
    }
  };

  const categories = [
    "Legal Services",
    "Corporate Services",
    "Individual Services",
    "Advisory Services",
    "Compliance Services",
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/services">
          <Button variant="outline" size="sm" className="border-border text-heading">
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </Link>
        <h1 className="font-serif text-4xl font-bold text-heading">
          {isEdit ? "Edit Service" : "Create New Service"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-form-bg text-heading border border-border rounded-sm focus:outline-none focus:border-highlight text-lg font-semibold"
                  placeholder="Enter service title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full min-h-[80px] px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight resize-y"
                  placeholder="Brief summary (shown in cards)..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Content <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="w-full min-h-[400px] px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight resize-y font-mono text-sm"
                  placeholder="Write the detailed content here..."
                />
                <p className="text-xs text-body-copy mt-2">
                  {form.content.split(/\s+/).length} words
                </p>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Key Features
                </label>
                <div className="space-y-2">
                  {form.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-2 bg-form-bg text-body-copy border border-border rounded-sm">
                        {feature}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFeature(index)}
                        className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addFeature()}
                      className="flex-1 px-4 py-2 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                      placeholder="Add a feature..."
                    />
                    <Button
                      size="sm"
                      onClick={addFeature}
                      className="bg-highlight text-page-bg hover:bg-highlight-dark"
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Image */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <label className="block text-sm font-medium text-heading mb-3">
              Featured Image <span className="text-destructive">*</span>
            </label>

            {form.image ? (
              <div className="relative group">
                <img
                  src={form.image}
                  alt="Featured"
                  className="w-full h-48 object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-highlight text-page-bg hover:bg-highlight-dark"
                  >
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-48 border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-3 hover:border-highlight transition-colors bg-form-bg"
              >
                <Upload className="w-8 h-8 text-body-copy" />
                <span className="text-body-copy">{uploading ? "Uploading..." : "Click to upload"}</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Metadata */}
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">Icon (optional)</label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm((prev) => ({ ...prev, icon: e.target.value }))}
                className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                placeholder="Icon name or URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((prev) => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                min="1"
              />
              <p className="text-xs text-body-copy mt-1">Lower numbers appear first</p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-surface border border-border rounded-lg p-6 space-y-3">
            <Button
              onClick={() => handleSave("inactive")}
              disabled={saving}
              variant="outline"
              className="w-full border-border text-heading hover:bg-surface-raised"
            >
              <Save className="mr-2" size={16} />
              {saving ? "Saving..." : "Save as Inactive"}
            </Button>

            <Button
              onClick={() => handleSave("active")}
              disabled={saving}
              className="w-full bg-highlight text-page-bg hover:bg-highlight-dark"
            >
              <Eye className="mr-2" size={16} />
              {saving ? "Publishing..." : "Publish (Active)"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

