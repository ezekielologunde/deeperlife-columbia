"use client";

import { useState } from "react";

export default function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — user can still select and copy manually.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      aria-label={copied ? "Copied" : `Copy ${value}`}
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="9" y="9" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
            <path
              d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}
