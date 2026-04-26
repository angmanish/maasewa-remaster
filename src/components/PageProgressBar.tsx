"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When path changes, start loading
    setLoading(true);
    
    // Simulating a fast finish since Next.js doesn't provide easy route change events
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // Short enough to feel snappy but long enough to provide feedback

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999] origin-left shadow-lg shadow-primary/30"
        />
      )}
    </AnimatePresence>
  );
}
