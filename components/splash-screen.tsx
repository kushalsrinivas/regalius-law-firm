"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(handleComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [handleComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#071731]"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold text-[#F2F2F2] mb-4"
            initial={{ letterSpacing: "0.1em" }}
            animate={{ letterSpacing: "0.05em" }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            REGALIUS
          </motion.h1>
          <motion.div
            className="h-px bg-[#C6B27E] mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p
            className="text-[#C6B27E] text-lg tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            LAW PARTNERS
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
