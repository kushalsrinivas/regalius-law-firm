"use client";

import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#071731]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-[#C6B27E] text-sm tracking-widest mb-4">
              LEGAL INFORMATION
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6">
              Terms and Conditions
            </h1>
            <p className="text-[#C7CBD1] text-lg">
              Last Updated: December 23, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg p-8 md:p-12 space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                By accessing and using the Regalius Law Partners website, you
                accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to these terms, please do not use
                this website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                2. Use of Website
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                The content of this website is for your general information and
                use only. It is subject to change without notice.
              </p>
              <ul className="list-disc list-inside text-[#C7CBD1] leading-relaxed space-y-2 ml-4">
                <li>
                  Neither we nor any third parties provide any warranty or
                  guarantee as to the accuracy, timeliness, performance,
                  completeness or suitability of the information and materials
                  found or offered on this website for any particular purpose.
                </li>
                <li>
                  Your use of any information or materials on this website is
                  entirely at your own risk, for which we shall not be liable.
                </li>
                <li>
                  It shall be your own responsibility to ensure that any
                  products, services or information available through this
                  website meet your specific requirements.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                3. Attorney-Client Relationship
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                The information on this website does not constitute legal advice
                and does not create an attorney-client relationship between you
                and Regalius Law Partners. An attorney-client relationship is
                formed only when we have agreed in writing to represent you. Do
                not send us confidential information until such a relationship has
                been established.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                4. Intellectual Property
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                This website contains material which is owned by or licensed to
                us. This material includes, but is not limited to, the design,
                layout, look, appearance and graphics. Reproduction is prohibited
                other than in accordance with the copyright notice, which forms
                part of these terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                5. Unauthorized Use
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                Unauthorized use of this website may give rise to a claim for
                damages and/or be a criminal offense. From time to time, this
                website may also include links to other websites. These links are
                provided for your convenience to provide further information. They
                do not signify that we endorse the website(s). We have no
                responsibility for the content of the linked website(s).
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                To the fullest extent permitted by law, Regalius Law Partners
                shall not be liable for any direct, indirect, incidental, special,
                or consequential damages arising out of or in connection with your
                use of this website or the information contained herein.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                7. Governing Law
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                These terms and conditions are governed by and construed in
                accordance with the laws of India, and you irrevocably submit to
                the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                8. Privacy
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                Your use of this website is also governed by our Privacy Policy.
                Please review our Privacy Policy to understand our practices.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                We reserve the right to modify these terms and conditions at any
                time. Your continued use of the website following any changes
                constitutes your acceptance of the new terms and conditions.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                10. Contact Information
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-2">
                If you have any questions about these Terms and Conditions, please
                contact us at:
              </p>
              <div className="text-[#C7CBD1] leading-relaxed space-y-1">
                <p>Regalius Law Partners</p>
                <p>#50,1, Infantry Road</p>
                <p>opp. Commissioner Office, Vasanth Nagar</p>
                <p>Bengaluru 560001, India</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:office.blr@regaliuslawpartners.com"
                    className="text-[#C6B27E] hover:underline"
                  >
                    office.blr@regaliuslawpartners.com
                  </a>
                </p>
                <p>Phone: 9740331263</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

