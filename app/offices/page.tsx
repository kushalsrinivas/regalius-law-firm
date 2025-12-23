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
    phone: "9740331263",
    email: "office.blr@regaliuslawpartners.com",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM, Saturday: 9:00 AM - 12:00 PM",
    image: "/hero.png",
    featured: true,
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
              Located in the heart of Bengaluru, we provide exceptional legal services to clients across India.
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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg overflow-hidden h-96 flex items-center justify-center"
          >
            <div className="text-center text-[#C7CBD1]">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#C6B27E]" />
              <p className="text-lg">Our Bengaluru Office Location</p>
              <p className="text-sm mt-2 opacity-70">Infantry Road, Vasanth Nagar</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Details */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0C1F3A] border-y border-[#2C3E5F]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-6 text-balance">
              Visit Us Today
            </h2>
            <p className="text-[#C7CBD1] text-lg mb-8 text-pretty">
              Schedule a consultation at our office or connect with us virtually from anywhere in India.
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
