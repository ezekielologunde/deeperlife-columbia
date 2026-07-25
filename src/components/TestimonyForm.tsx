"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitTestimony, type FormState } from "@/lib/actions/public";

const initialState: FormState = { success: false };

export default function TestimonyForm() {
  const [state, formAction, pending] = useActionState(submitTestimony, initialState);

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <p className="text-lg font-bold text-emerald-800">Thank you for sharing!</p>
        <p className="mt-2 text-sm text-emerald-700">
          Your testimony has been received and will appear here once reviewed.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Your Name
        <input
          name="name"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Your Testimony
        <textarea
          name="content"
          required
          rows={5}
          placeholder="Share what God has done in your life..."
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-indigo-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800 disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? "Sending…" : "Share Testimony"}
      </button>
    </form>
  );
}
