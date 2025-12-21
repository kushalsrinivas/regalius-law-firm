"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Briefcase, Users, TrendingUp, Award, Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/Footer";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.position || !formData.coverLetter) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    try {
      // Create contact submission
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiryType: `Career Application - ${formData.position}`,
          message: `Position: ${formData.position}\nExperience: ${formData.experience}\n\nCover Letter:\n${formData.coverLetter}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          coverLetter: "",
          resume: null,
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Continuous learning opportunities and clear paths for advancement",
    },
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work alongside experienced professionals in a supportive environment",
    },
    {
      icon: Award,
      title: "Competitive Compensation",
      description: "Market-leading salaries and comprehensive benefits packages",
    },
    {
      icon: Briefcase,
      title: "Meaningful Work",
      description: "Handle challenging cases that make a real difference",
    },
  ];

  return (
    <div className="min-h-screen bg-[#071731]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              JOIN OUR TEAM
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Build Your Career with Us
            </h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              At Regalius Law Partners, we believe our people are our greatest asset. Join a team of dedicated professionals committed to excellence in legal practice.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              WHY REGALIUS LAW PARTNERS
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Why Work With Us
            </h2>
            <p className="text-[#C7CBD1] max-w-2xl mx-auto text-pretty">
              We offer more than just a job—we provide a platform for professional growth, meaningful work, and a collaborative environment where your contributions matter.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-8 text-center"
              >
                <benefit.icon className="w-12 h-12 mx-auto mb-4 text-[#C6B27E]" />
                <h3 className="font-serif text-xl font-bold text-[#F2F2F2] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#C7CBD1] leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Look For Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
                What We Look For
              </h2>
              <div className="space-y-4 text-[#C7CBD1] leading-relaxed">
                <p>
                  We seek talented individuals who are passionate about the law and committed to delivering exceptional results for our clients. Whether you're a recent graduate or an experienced professional, we value:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                    <span><strong className="text-[#F2F2F2]">Academic Excellence:</strong> Strong educational background and analytical skills</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                    <span><strong className="text-[#F2F2F2]">Professional Integrity:</strong> Commitment to ethical practice and client service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                    <span><strong className="text-[#F2F2F2]">Team Collaboration:</strong> Ability to work effectively in a team environment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                    <span><strong className="text-[#F2F2F2]">Client Focus:</strong> Dedication to understanding and meeting client needs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#C6B27E] mt-2.5 flex-shrink-0" />
                    <span><strong className="text-[#F2F2F2]">Continuous Learning:</strong> Eagerness to grow and adapt in a dynamic legal landscape</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-lg overflow-hidden border border-[#2C3E5F]"
            >
              <img
                src="/corporate-law-office.jpg"
                alt="Regalius Law Partners Office"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071731]/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-t border-[#2C3E5F]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              APPLY NOW
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6">
              Submit Your Application
            </h2>
            <p className="text-[#C7CBD1] text-pretty">
              We're always looking for talented individuals to join our team. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center"
            >
              Thank you for your application! We'll review it and get back to you soon.
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-[#071731] border border-[#2C3E5F] rounded-lg p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#C6B27E]"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#C6B27E]"
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#C6B27E]"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                  Position Applying For <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#C6B27E]"
                  required
                >
                  <option value="">Select a position</option>
                  <option value="Associate Attorney">Associate Attorney</option>
                  <option value="Senior Associate">Senior Associate</option>
                  <option value="Partner">Partner</option>
                  <option value="Legal Intern">Legal Intern</option>
                  <option value="Paralegal">Paralegal</option>
                  <option value="Legal Secretary">Legal Secretary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                Years of Experience
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full px-4 py-3 bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#C6B27E]"
                placeholder="e.g., 5 years in corporate law"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F2F2F2] mb-2">
                Cover Letter / Why You Want to Join <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                rows={8}
                className="w-full px-4 py-3 bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg text-[#F2F2F2] focus:outline-none focus:ring-2 focus:ring-[#C6B27E] resize-none"
                placeholder="Tell us about yourself, your experience, and why you'd like to join Regalius Law Partners..."
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] py-6 text-lg font-semibold"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Submit Application
                  </>
                )}
              </Button>
            </div>

            <p className="text-sm text-[#C7CBD1] text-center">
              You can also email your resume and cover letter to{" "}
              <a href="mailto:careers@regaliuslaw.com" className="text-[#C6B27E] hover:underline">
                careers@regaliuslaw.com
              </a>
            </p>
          </motion.form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-6">
              Have Questions?
            </h2>
            <p className="text-[#C7CBD1] mb-8">
              If you have any questions about career opportunities at Regalius Law Partners, feel free to reach out to our HR team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#C7CBD1]">
              <a href="mailto:careers@regaliuslaw.com" className="flex items-center gap-2 hover:text-[#C6B27E] transition-colors">
                <Mail size={20} />
                <span>careers@regaliuslaw.com</span>
              </a>
              <a href="tel:+917619552810" className="flex items-center gap-2 hover:text-[#C6B27E] transition-colors">
                <Phone size={20} />
                <span>+91 76195 52810</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

