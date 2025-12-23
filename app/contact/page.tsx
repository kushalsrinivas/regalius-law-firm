"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type InquiryType = "Civil" | "Corporate Advisory" | "Arbitration" | "Contracts" | "Other";

export default function ContactPage() {
  const inquiryOptions: InquiryType[] = useMemo(
    () => ["Civil", "Corporate Advisory", "Arbitration", "Contracts", "Other"],
    [],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "Corporate Advisory" as InquiryType,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-page-bg">
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, rgba(198, 178, 126, 0.25) 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-heading mb-4 font-serif">
                Contact Regalius
              </h1>
              <p className="text-lg md:text-xl text-body-copy max-w-2xl mx-auto font-sans font-light leading-relaxed">
                Tell us what you need help with. We’ll respond with next steps and timelines.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              <div className="lg:col-span-2">
                <div className="bg-surface border border-border rounded-sm p-8">
                  <h2 className="text-2xl font-semibold text-heading mb-3 font-serif">
                    What happens next
                  </h2>
                  <ul className="space-y-3 text-body-copy text-sm leading-relaxed">
                    <li>
                      <span className="text-heading font-semibold">1.</span> We review your inquiry and confirm the right
                      practice team.
                    </li>
                    <li>
                      <span className="text-heading font-semibold">2.</span> You’ll get a short call to understand goals,
                      urgency, and documents needed.
                    </li>
                    <li>
                      <span className="text-heading font-semibold">3.</span> We share a clear plan, scope, and next steps.
                    </li>
                  </ul>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-body-copy text-sm">
                      Based in <span className="text-heading font-semibold">India</span>. Mixed clientele across civil and
                      commercial matters.
                    </p>
                    <p className="text-body-copy text-sm mt-2">
                      Prefer email?{" "}
                      <a
                        className="relative text-highlight hover:text-highlight-dark transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-highlight after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                        href="mailto:office.blr@regaliuslawpartners.com"
                      >
                        office.blr@regaliuslawpartners.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-surface-raised border border-border rounded-sm p-8">
                  {!submitted ? (
                    <form
                      className="space-y-5"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setError("");
                        setSubmitting(true);
                        
                        try {
                          const response = await fetch("/api/contacts", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(form),
                          });

                          if (response.ok) {
                            setSubmitted(true);
                            // Reset form
                            setForm({
                              name: "",
                              email: "",
                              phone: "",
                              inquiryType: "Corporate Advisory" as InquiryType,
                              message: "",
                            });
                          } else {
                            const data = await response.json();
                            setError(data.error || "Failed to submit. Please try again.");
                          }
                        } catch (error) {
                          console.error("Submit error:", error);
                          setError("Failed to submit. Please check your connection and try again.");
                        } finally {
                          setSubmitting(false);
                        }
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm text-heading font-medium mb-2" htmlFor="name">
                            Full name
                          </label>
                          <input
                            id="name"
                            value={form.name}
                            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                            className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight transition-colors"
                            placeholder="Your name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-heading font-medium mb-2" htmlFor="email">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                            className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight transition-colors"
                            placeholder="you@company.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm text-heading font-medium mb-2" htmlFor="phone">
                            Phone (optional)
                          </label>
                          <input
                            id="phone"
                            value={form.phone}
                            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                            className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight transition-colors"
                            placeholder="+91 ..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-heading font-medium mb-2" htmlFor="type">
                            Inquiry type
                          </label>
                          <select
                            id="type"
                            value={form.inquiryType}
                            onChange={(e) => setForm((p) => ({ ...p, inquiryType: e.target.value as InquiryType }))}
                            className="w-full px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight transition-colors"
                          >
                            {inquiryOptions.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-heading font-medium mb-2" htmlFor="message">
                          Briefly describe your matter
                        </label>
                        <textarea
                          id="message"
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          className="w-full min-h-[140px] px-4 py-3 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight transition-colors resize-y"
                          placeholder="Key facts, deadlines, desired outcome..."
                          required
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-sm">
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                        <p className="text-xs text-body-copy">
                          We'll respond within 24-48 business hours.
                        </p>
                        <motion.button
                          whileHover={{ scale: submitting ? 1 : 1.02 }}
                          whileTap={{ scale: submitting ? 1 : 0.98 }}
                          className="px-6 py-3 bg-highlight text-page-bg font-semibold rounded-sm hover:bg-highlight-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          type="submit"
                          disabled={submitting}
                        >
                          {submitting ? "Sending..." : "Send message"}
                        </motion.button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <h3 className="text-2xl font-semibold text-heading mb-3 font-serif">
                        Thanks — we’ve received your message
                      </h3>
                      <p className="text-body-copy max-w-xl mx-auto">
                        Thank you for contacting us. We've received your message and will respond within 24-48 business hours.
                      </p>
                      <div className="mt-8">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 border-2 border-highlight text-highlight font-semibold rounded-sm hover:bg-highlight hover:text-page-bg transition-all"
                          onClick={() => setSubmitted(false)}
                        >
                          Send another message
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


