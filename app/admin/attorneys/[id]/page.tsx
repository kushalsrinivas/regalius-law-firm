"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save, Upload, ArrowLeft, Plus, X } from "lucide-react";
import Link from "next/link";

export default function AttorneyEditorPage() {
  const router = useRouter();
  const params = useParams();
  const isEdit = params.id && params.id !== "new";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    specialty: "",
    education: [""],
    experience: "",
    email: "",
    phone: "",
    linkedin: "",
    photo: "",
    bio: "",
    practiceAreas: [""],
    barAdmissions: [""],
    languages: ["English"],
    status: "active" as "active" | "inactive",
    order: 0,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadAttorney();
    }
  }, [isEdit]);

  const loadAttorney = async () => {
    try {
      const res = await fetch(`/api/attorneys/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.attorney.name,
          title: data.attorney.title,
          specialty: data.attorney.specialty,
          education: data.attorney.education,
          experience: data.attorney.experience,
          email: data.attorney.email,
          phone: data.attorney.phone,
          linkedin: data.attorney.linkedin || "",
          photo: data.attorney.photo,
          bio: data.attorney.bio,
          practiceAreas: data.attorney.practiceAreas,
          barAdmissions: data.attorney.barAdmissions || [""],
          languages: data.attorney.languages || ["English"],
          status: data.attorney.status,
          order: data.attorney.order,
        });
      }
    } catch (error) {
      console.error("Failed to load attorney:", error);
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
        setForm((prev) => ({ ...prev, photo: data.url }));
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

  const handleArrayAdd = (field: 'education' | 'practiceAreas' | 'barAdmissions' | 'languages') => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleArrayRemove = (field: 'education' | 'practiceAreas' | 'barAdmissions' | 'languages', index: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleArrayChange = (field: 'education' | 'practiceAreas' | 'barAdmissions' | 'languages', index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleSave = async () => {
    // Validate required fields
    if (!form.name || !form.title || !form.specialty || !form.email || !form.phone || !form.photo || !form.bio) {
      alert("Please fill in all required fields");
      return;
    }

    // Filter out empty entries
    const cleanedForm = {
      ...form,
      education: form.education.filter(e => e.trim()),
      practiceAreas: form.practiceAreas.filter(p => p.trim()),
      barAdmissions: form.barAdmissions.filter(b => b.trim()),
      languages: form.languages.filter(l => l.trim()),
    };

    if (cleanedForm.education.length === 0 || cleanedForm.practiceAreas.length === 0) {
      alert("Please add at least one education entry and one practice area");
      return;
    }

    setSaving(true);

    try {
      const method = isEdit ? "PATCH" : "POST";
      const url = isEdit ? `/api/attorneys/${params.id}` : "/api/attorneys";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedForm),
      });

      if (res.ok) {
        alert("Attorney saved successfully!");
        router.push("/admin/attorneys");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save attorney");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save attorney");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/attorneys">
          <Button variant="outline" size="sm" className="border-border text-heading">
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
        </Link>
        <h1 className="font-serif text-4xl font-bold text-heading">
          {isEdit ? "Edit Attorney" : "Add New Attorney"}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="font-serif text-2xl font-bold text-heading mb-6">Basic Information</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-form-bg text-heading border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Title <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="Senior Partner"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Specialty <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.specialty}
                  onChange={(e) => setForm((prev) => ({ ...prev, specialty: e.target.value }))}
                  className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                  placeholder="Corporate Law"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="john.doe@regaliuslaw.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-heading mb-2">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => setForm((prev) => ({ ...prev, linkedin: e.target.value }))}
                  className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                  placeholder="https://www.linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Bio <span className="text-destructive">*</span>
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full min-h-[120px] px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight resize-y"
                  placeholder="Brief professional biography..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-heading mb-2">
                  Experience
                </label>
                <textarea
                  value={form.experience}
                  onChange={(e) => setForm((prev) => ({ ...prev, experience: e.target.value }))}
                  className="w-full min-h-[100px] px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight resize-y"
                  placeholder="Years of experience, notable achievements..."
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-heading">
                Education <span className="text-destructive">*</span>
              </h2>
              <Button
                size="sm"
                onClick={() => handleArrayAdd('education')}
                className="bg-highlight text-page-bg hover:bg-highlight-dark"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {form.education.map((edu, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={edu}
                    onChange={(e) => handleArrayChange('education', index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="LLB from Harvard Law School"
                  />
                  {form.education.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArrayRemove('education', index)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Practice Areas */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-heading">
                Practice Areas <span className="text-destructive">*</span>
              </h2>
              <Button
                size="sm"
                onClick={() => handleArrayAdd('practiceAreas')}
                className="bg-highlight text-page-bg hover:bg-highlight-dark"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {form.practiceAreas.map((area, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => handleArrayChange('practiceAreas', index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="Corporate Law"
                  />
                  {form.practiceAreas.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArrayRemove('practiceAreas', index)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bar Admissions */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-heading">Bar Admissions</h2>
              <Button
                size="sm"
                onClick={() => handleArrayAdd('barAdmissions')}
                className="bg-highlight text-page-bg hover:bg-highlight-dark"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {form.barAdmissions.map((bar, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={bar}
                    onChange={(e) => handleArrayChange('barAdmissions', index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="New York State Bar"
                  />
                  {form.barAdmissions.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArrayRemove('barAdmissions', index)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl font-bold text-heading">Languages</h2>
              <Button
                size="sm"
                onClick={() => handleArrayAdd('languages')}
                className="bg-highlight text-page-bg hover:bg-highlight-dark"
              >
                <Plus size={16} className="mr-2" />
                Add
              </Button>
            </div>
            <div className="space-y-3">
              {form.languages.map((lang, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={lang}
                    onChange={(e) => handleArrayChange('languages', index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                    placeholder="English"
                  />
                  {form.languages.length > 1 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArrayRemove('languages', index)}
                      className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Photo */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <label className="block text-sm font-medium text-heading mb-3">
              Photo <span className="text-destructive">*</span>
            </label>

            {form.photo ? (
              <div className="relative group">
                <img
                  src={form.photo}
                  alt="Attorney"
                  className="w-full h-64 object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-highlight text-page-bg hover:bg-highlight-dark"
                  >
                    Change Photo
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-64 border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center gap-3 hover:border-highlight transition-colors bg-form-bg"
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

          {/* Settings */}
          <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as "active" | "inactive" }))}
                className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-2">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((prev) => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight"
                placeholder="0"
              />
              <p className="text-xs text-body-copy mt-2">Lower numbers appear first</p>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-highlight text-page-bg hover:bg-highlight-dark"
            >
              <Save className="mr-2" size={16} />
              {saving ? "Saving..." : "Save Attorney"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

