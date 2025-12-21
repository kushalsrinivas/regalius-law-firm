"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/Original Logo.png"
          alt="Regalius Law Partners"
          width={800}
          height={500}
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
