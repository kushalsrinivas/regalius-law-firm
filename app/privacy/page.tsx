"use client";

import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
              YOUR PRIVACY MATTERS
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-6">
              Privacy Policy
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
                Introduction
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                Regalius Law Partners ("we," "us," or "our") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website and use our services. Please read this privacy
                policy carefully. If you do not agree with the terms of this
                privacy policy, please do not access the site.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                1. Information We Collect
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                We may collect information about you in a variety of ways. The
                information we may collect on the website includes:
              </p>

              <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-3">
                Personal Data
              </h3>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                Personally identifiable information, such as your name, email
                address, telephone number, and demographic information that you
                voluntarily give to us when you register with the website, when
                you choose to participate in various activities related to the
                website, or when you contact us.
              </p>

              <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-3">
                Derivative Data
              </h3>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                Information our servers automatically collect when you access the
                website, such as your IP address, your browser type, your
                operating system, your access times, and the pages you have viewed
                directly before and after accessing the website.
              </p>

              <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-3">
                Legal Matter Information
              </h3>
              <p className="text-[#C7CBD1] leading-relaxed">
                Information related to your legal matters that you provide to us
                for the purpose of obtaining legal services, which may include
                sensitive personal information subject to attorney-client
                privilege.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                We use the information we collect in the following ways:
              </p>
              <ul className="list-disc list-inside text-[#C7CBD1] leading-relaxed space-y-2 ml-4">
                <li>To provide and maintain our legal services</li>
                <li>To respond to your inquiries and fulfill your requests</li>
                <li>
                  To send you administrative information, such as updates to our
                  terms, conditions, and policies
                </li>
                <li>To improve our website and services</li>
                <li>
                  To monitor and analyze usage and trends to improve your
                  experience with the website
                </li>
                <li>
                  To communicate with you about our services, including sending
                  newsletters and marketing materials
                </li>
                <li>
                  To comply with legal obligations and protect our legal rights
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                3. Disclosure of Your Information
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                We may share information we have collected about you in certain
                situations. Your information may be disclosed as follows:
              </p>

              <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-3">
                By Law or to Protect Rights
              </h3>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                If we believe the release of information about you is necessary to
                respond to legal process, to investigate or remedy potential
                violations of our policies, or to protect the rights, property,
                and safety of others, we may share your information as permitted
                or required by any applicable law, rule, or regulation.
              </p>

              <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-3">
                Third-Party Service Providers
              </h3>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                We may share your information with third parties that perform
                services for us or on our behalf, including payment processing,
                data analysis, email delivery, hosting services, customer service,
                and marketing assistance.
              </p>

              <h3 className="font-serif text-xl font-semibold text-[#F2F2F2] mb-3">
                Professional Advisors
              </h3>
              <p className="text-[#C7CBD1] leading-relaxed">
                We may share information with professional advisors, such as
                consultants, experts, and other professionals, when necessary for
                the provision of legal services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                4. Attorney-Client Privilege
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                Information you provide to us in the course of an attorney-client
                relationship is protected by attorney-client privilege and will be
                kept strictly confidential, subject to applicable legal and
                ethical obligations. We take special care to protect privileged
                and confidential information in accordance with professional rules
                of conduct.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                5. Security of Your Information
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide to
                us, please be aware that despite our efforts, no security measures
                are perfect or impenetrable, and no method of data transmission
                can be guaranteed against any interception or other type of
                misuse.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                We may use cookies, web beacons, tracking pixels, and other
                tracking technologies on the website to help customize the website
                and improve your experience. When you access the website, your
                personal information is not collected through the use of tracking
                technology. Most browsers are set to accept cookies by default.
                You can remove or reject cookies, but be aware that such action
                could affect the availability and functionality of the website.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                7. Your Data Protection Rights
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-4">
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-[#C7CBD1] leading-relaxed space-y-2 ml-4">
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                8. Data Retention
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                We will retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy, unless
                a longer retention period is required or permitted by law (such as
                for compliance with legal, regulatory, tax, accounting or other
                requirements). In the case of legal matters, we may retain
                information for the duration required by professional ethical
                obligations and applicable law.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                9. Third-Party Websites
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                The website may contain links to third-party websites and
                applications of interest. Once you have used these links to leave
                the website, any information you provide to these third parties is
                not covered by this Privacy Policy, and we cannot guarantee the
                safety and privacy of your information.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                We do not knowingly solicit information from or market to children
                under the age of 18. If we learn that we have collected personal
                information from a child under age 18 without verification of
                parental consent, we will delete that information as quickly as
                possible.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed">
                We may update this Privacy Policy from time to time in order to
                reflect changes to our practices or for other operational, legal,
                or regulatory reasons. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "Last
                Updated" date.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-4">
                12. Contact Us
              </h2>
              <p className="text-[#C7CBD1] leading-relaxed mb-2">
                If you have questions or comments about this Privacy Policy,
                please contact us at:
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

