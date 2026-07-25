"use client";

import { useActionState } from "react";
import { submitSubscriber, type FormState } from "@/lib/actions/public";

const initialState: FormState = { success: false };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(submitSubscriber, initialState);

  if (state.success) {
    return (
      <p className="text-sm font-medium text-amber-300">
        You&apos;re subscribed — thank you!
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        name="email"
        required
        placeholder="Your email"
        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-indigo-300 focus:border-amber-300 focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-indigo-950 transition-transform hover:scale-105 disabled:opacity-60"
      >
        {pending ? "…" : "Subscribe"}
      </button>
      {state.error && (
        <p className="text-xs text-red-300 sm:basis-full">{state.error}</p>
      )}
    </form>
  );
}
