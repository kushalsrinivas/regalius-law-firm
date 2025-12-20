"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const offices = [
  {
    city: "Bengaluru",
    country: "India",
    address: "#50,1,Infantry Road,",
    addressLine2: "opp. Commissioner Office, Vasanth Nagar, Bengaluru 56001",
    phone: "+91 (00000) 00000",
    email: "contact@regaliuslaw.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 12:00 PM",
    image: "/hero.png",
    featured: true,
  },
  {
    city: "New York",
    country: "United States",
    address: "123 Legal Plaza, Suite 4000",
    addressLine2: "New York, NY 10004",
    phone: "+1 (212) 555-0100",
    email: "newyork@regaliuslaw.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    image: "/new-york-office-exterior.jpg",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "45 Chancery Lane",
    addressLine2: "London WC2A 1JE",
    phone: "+44 20 7946 0958",
    email: "london@regaliuslaw.com",
    hours: "Monday - Friday: 9:00 AM - 5:30 PM",
    image: "/london-office-building.jpg",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "1 Marina Boulevard, #28-00",
    addressLine2: "Singapore 018989",
    phone: "+65 6532 8900",
    email: "singapore@regaliuslaw.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    image: "/singapore-office-opening.jpg",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Emirates Towers, Level 41",
    addressLine2: "Dubai, UAE",
    phone: "+971 4 330 3500",
    email: "dubai@regaliuslaw.com",
    hours: "Sunday - Thursday: 9:00 AM - 6:00 PM",
    image: "/dubai-office-towers.jpg",
  },
  {
    city: "Tokyo",
    country: "Japan",
    address: "Marunouchi Trust Tower, 18F",
    addressLine2: "Chiyoda-ku, Tokyo 100-0005",
    phone: "+81 3 6267 4500",
    email: "tokyo@regaliuslaw.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    image: "/tokyo-office-skyline.jpg",
  },
]

export default function OfficesPage() {
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
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">GLOBAL PRESENCE</div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6 text-balance">Our Offices</h1>
            <p className="text-[#C7CBD1] text-xl leading-relaxed text-pretty">
              With strategic locations across five continents, we provide seamless legal services to clients worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden h-96 flex items-center justify-center"
          >
            <div className="text-center text-[#C7CBD1]">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#C6B27E]" />
              <p className="text-lg">Interactive map showing our global office locations</p>
              <p className="text-sm mt-2 opacity-70">5 offices across 5 continents</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Office */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto">
                <img
                  src={offices[0].image || "/placeholder.svg"}
                  alt={`${offices[0].city} Office`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071731] to-transparent opacity-50" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#C6B27E] text-[#071731] px-4 py-1.5 rounded text-xs font-semibold tracking-wide">
                    HEADQUARTERS
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="font-serif text-4xl font-bold text-[#F2F2F2] mb-2">
                  {offices[0].city}, {offices[0].country}
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 text-[#C7CBD1]">
                    <MapPin className="w-5 h-5 text-[#C6B27E] mt-1 flex-shrink-0" />
                    <div>
                      <div>{offices[0].address}</div>
                      <div>{offices[0].addressLine2}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[#C7CBD1]">
                    <Phone className="w-5 h-5 text-[#C6B27E] flex-shrink-0" />
                    <a href={`tel:${offices[0].phone}`} className="hover:text-[#C6B27E] transition-colors">
                      {offices[0].phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-[#C7CBD1]">
                    <Mail className="w-5 h-5 text-[#C6B27E] flex-shrink-0" />
                    <a href={`mailto:${offices[0].email}`} className="hover:text-[#C6B27E] transition-colors">
                      {offices[0].email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-[#C7CBD1]">
                    <Clock className="w-5 h-5 text-[#C6B27E] flex-shrink-0" />
                    <div>{offices[0].hours}</div>
                  </div>
                </div>
                <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] w-fit">Get Directions</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Offices Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {offices.slice(1).map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={office.image || "/placeholder.svg"}
                    alt={`${office.city} Office`}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F3A] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#F2F2F2] mb-1">{office.city}</h3>
                  <div className="text-[#C6B27E] text-sm mb-4">{office.country}</div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2 text-[#C7CBD1] text-sm">
                      <MapPin className="w-4 h-4 text-[#C6B27E] mt-0.5 flex-shrink-0" />
                      <div>
                        <div>{office.address}</div>
                        <div>{office.addressLine2}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[#C7CBD1] text-sm">
                      <Phone className="w-4 h-4 text-[#C6B27E] flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-[#C6B27E] transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-[#C7CBD1] text-sm">
                      <Mail className="w-4 h-4 text-[#C6B27E] flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#C6B27E] transition-colors">
                        {office.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-[#C7CBD1] text-sm">
                      <Clock className="w-4 h-4 text-[#C6B27E] flex-shrink-0" />
                      <div>{office.hours}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#2C3E5F] text-[#C6B27E] hover:bg-[#0A1A33] w-full bg-transparent"
                  >
                    Contact Office
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Visit Us Today
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Schedule a consultation at any of our offices or connect with us virtually from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-base">
                Schedule Consultation
              </Button>
              <Button
                variant="outline"
                className="border-[#2C3E5F] text-[#F2F2F2] hover:bg-[#132B4D] px-8 py-6 text-base bg-transparent"
              >
                Virtual Meeting
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#071731] border-t border-[#2C3E5F] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-[#C7CBD1] text-sm">
          <p>&copy; {new Date().getFullYear()} Regalius Law Partners. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
