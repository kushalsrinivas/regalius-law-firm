"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Offices", href: "/offices" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 bg-[#071731]/95 backdrop-blur-sm border-b border-[#2C3E5F]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
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
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="relative text-[#C7CBD1] hover:text-[#C6B27E] transition-colors text-sm tracking-wide after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-[#C6B27E] after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <Button asChild className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#F2F2F2]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-[#0C1F3A] border-t border-[#2C3E5F]"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-[#C7CBD1] hover:text-[#C6B27E] transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="w-full bg-[#C6B27E] text-[#071731] hover:bg-[#A99663]">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
