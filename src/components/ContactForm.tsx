"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitMessage, type FormState } from "@/lib/actions/public";
import HoneypotField from "@/components/HoneypotField";

const initialState: FormState = { success: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitMessage, initialState);

  if (state.success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <p className="text-lg font-bold text-emerald-800">Message sent!</p>
        <p className="mt-2 text-sm text-emerald-700">
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <HoneypotField />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Phone (optional)
        <input
          name="phone"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        This is a
        <select
          name="category"
          defaultValue="general"
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        >
          <option value="general">General question</option>
          <option value="prayer">Prayer request</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Message
        <textarea
          name="body"
          required
          rows={5}
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
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
