"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Eye, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PracticeAreaEditorPage() {
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
    status: "active" as "active" | "inactive",
    order: 1,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadPracticeArea();
    }
  }, [isEdit]);

  const loadPracticeArea = async () => {
    try {
      const res = await fetch(`/api/practice-areas/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.practiceArea.title,
          description: data.practiceArea.description,
          content: data.practiceArea.content,
          image: data.practiceArea.image,
          icon: data.practiceArea.icon || "",
          status: data.practiceArea.status,
          order: data.practiceArea.order,
        });
      }
    } catch (error) {
      console.error("Failed to load practice area:", error);
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

  const handleSave = async (status: "active" | "inactive") => {
    if (!form.title || !form.description || !form.content || !form.image) {
      alert("Please fill in all required fields");
      return;
    }

    setSaving(true);

    try {
      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/practice-areas/${params.id}` : "/api/practice-areas";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status }),
      });

      if (res.ok) {
        alert(status === "active" ? "Practice area published successfully!" : "Draft saved");
        router.push("/admin/practice-areas");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save practice area");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save practice area");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/practice-areas">
          <Button variant="outline" size="sm" className="border-border text-heading">
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </Link>
        <h1 className="font-serif text-4xl font-bold text-heading">
          {isEdit ? "Edit Practice Area" : "Create New Practice Area"}
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
                  placeholder="Enter practice area title..."
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

