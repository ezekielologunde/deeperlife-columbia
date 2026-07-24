"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const toast = searchParams.get("toast");
    if (toast) {
      setMessage(toast);
      const params = new URLSearchParams(searchParams);
      params.delete("toast");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 rounded-full bg-indigo-950 px-5 py-3 text-sm font-medium text-white shadow-lg"
          >
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
