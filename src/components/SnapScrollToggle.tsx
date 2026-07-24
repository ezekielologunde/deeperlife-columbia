"use client";

import { useEffect } from "react";

export default function SnapScrollToggle() {
  useEffect(() => {
    document.documentElement.classList.add("snap-scroll-page");
    return () => {
      document.documentElement.classList.remove("snap-scroll-page");
    };
  }, []);

  return null;
}
