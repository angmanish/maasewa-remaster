"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const phone = "916361376521";
  const message = encodeURIComponent(
    "Hi! I need home healthcare services. Can you help me?"
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white text-text-heading text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-border-color whitespace-nowrap"
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
      >
        <MessageCircle size={26} className="text-white fill-white" />
      </motion.div>
    </a>
  );
}
