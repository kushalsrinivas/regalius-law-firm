"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "Offices", href: "/offices" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-[#071731] border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Regalius Law Partners"
                  width={200}
                  height={50}
                  className="h-12 w-auto mb-4"
                />
              </Link>
              <p className="text-body-copy text-sm leading-relaxed">
                Providing exceptional legal services with authority, trust since our establishment.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-heading mb-4 font-serif">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative text-body-copy hover:text-highlight transition-colors duration-300 text-sm after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-highlight after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-heading mb-4 font-serif">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-body-copy text-sm">
                  <Phone size={16} className="text-highlight" />
                  <span>9740331263</span>
                </li>
                <li className="flex items-center gap-3 text-body-copy text-sm">
                  <Mail size={16} className="text-highlight" />
                  <span>office.blr@regaliuslawpartners.com</span>
                </li>
                <li className="flex items-start gap-3 text-body-copy text-sm">
                  <MapPin size={16} className="text-highlight mt-1" />
                  <span>
                    #50,1,Infantry Road,
                    <br />
                    opp. Commissioner Office,
                    <br />
                    Vasanth Nagar, Bengaluru 56001
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-heading mb-4 font-serif">
                Newsletter
              </h4>
              <p className="text-body-copy text-sm mb-4">
                Stay updated with our latest news and insights.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-form-bg text-body-copy border border-border rounded-sm focus:outline-none focus:border-highlight transition-colors text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-highlight text-page-bg font-semibold rounded-sm hover:bg-highlight-dark transition-colors text-sm"
                >
                  Subscribe
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Facebook, href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, color: "#C6B27E" }}
                    className="text-body-copy hover:text-highlight transition-colors"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-body-copy text-sm">
            © {new Date().getFullYear()} Regalius Law Partners. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="relative text-body-copy hover:text-highlight transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-highlight after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="relative text-body-copy hover:text-highlight transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-highlight after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
