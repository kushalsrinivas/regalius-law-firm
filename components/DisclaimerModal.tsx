"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISCLAIMER_KEY = "regalius_disclaimer_accepted";

export function DisclaimerModal() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the disclaimer
    const hasAccepted = localStorage.getItem(DISCLAIMER_KEY);
    if (!hasAccepted) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setShowDisclaimer(false);
  };

  return (
    <AnimatePresence>
      {showDisclaimer && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
            onClick={handleAccept}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0C1F3A] border border-[#2C3E5F] rounded-lg shadow-2xl"
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-[#F2F2F2] mb-2">
                    Important Disclaimer
                  </h2>
                  <p className="text-[#C6B27E] text-sm">
                    Please read carefully before proceeding
                  </p>
                </div>
                <button
                  onClick={handleAccept}
                  className="text-[#C7CBD1] hover:text-[#F2F2F2] transition-colors"
                  aria-label="Close disclaimer"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 text-[#C7CBD1] text-sm leading-relaxed mb-8">
                <p>
                  The information contained on this website is for general informational purposes only and does not constitute legal advice, solicitation, or advertisement in any manner. Your use of this website or communication through it does not create an attorney–client relationship between you and the Firm. Any reliance on the information provided herein is strictly at your own risk.
                </p>
                <p>
                  The content on this website is not intended to be a substitute for professional legal advice. Laws and regulations are subject to change and may vary based on jurisdiction and specific facts. You are advised to seek independent legal counsel for your particular matter.
                </p>
                <p>
                  This website is not intended to solicit clients or advertise legal services, in compliance with the rules of the Bar Council of India. The material is provided solely upon your request for informational purposes. While reasonable efforts are made to ensure that the information on this website is accurate and up to date, the Firm makes no representations or warranties, express or implied, about the completeness, accuracy, reliability, or suitability of the content.
                </p>
                <p>
                  This website may contain links to third-party websites. The Firm has no control over the content or reliability of such websites and does not endorse any views expressed therein. The Firm shall not be liable for any loss, damage, or expense arising out of or in connection with the use of this website or reliance on any information provided herein.
                </p>
                <p>
                  All content on this website, including text, graphics, logos, and design, is the intellectual property of the Firm unless otherwise stated and may not be reproduced without prior written consent. This disclaimer shall be governed by and construed in accordance with the laws of India, and courts in India shall have exclusive jurisdiction.
                </p>
                <p className="font-medium text-[#F2F2F2]">
                  By continuing to browse this website, you confirm that you are doing so of your own volition and that you have read and understood this disclaimer.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-4">
                <Button
                  onClick={handleAccept}
                  className="bg-[#C6B27E] text-[#071731] hover:bg-[#A99663] px-8 py-6 text-base font-medium"
                >
                  I Understand & Accept
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

