'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Offices', href: '/offices' },
  { name: 'Careers', href: '/careers' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-surface/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center cursor-pointer"
              >
                <Image
                  src="/logo.png"
                  alt="Regalius Law Partners"
                  width={200}
                  height={50}
                  className="h-12 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ color: '#C6B27E' }}
                      className="relative text-body-copy hover:text-highlight transition-colors duration-300 font-sans text-sm font-medium tracking-wide cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-highlight after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.div>
              ))}
              <Link href="/contact" aria-label="Contact Regalius Law Partners">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-highlight text-page-bg font-sans text-sm font-semibold rounded-sm hover:bg-highlight-dark transition-colors duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-heading"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: '100%' }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%',
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-30 bg-surface md:hidden"
        style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
              <motion.span
                whileHover={{ scale: 1.1, color: '#C6B27E' }}
                className="text-2xl text-heading font-serif cursor-pointer"
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} aria-label="Contact Regalius Law Partners">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-highlight text-page-bg font-sans text-lg font-semibold rounded-sm"
            >
              Contact Us
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}

