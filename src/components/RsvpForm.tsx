"use client";

import { useActionState } from "react";
import { submitRsvp, type FormState } from "@/lib/actions/public";
import HoneypotField from "@/components/HoneypotField";

const initialState: FormState = { success: false };

export default function RsvpForm({
  eventId,
  eventTitle,
}: {
  eventId?: string;
  eventTitle: string;
}) {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);

  if (state.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-bold text-emerald-800">You&apos;re on the list!</p>
        <p className="mt-1 text-sm text-emerald-700">
          We look forward to seeing you at {eventTitle}.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <HoneypotField />
      <input type="hidden" name="event_id" value={eventId ?? ""} />
      <input type="hidden" name="event_title" value={eventTitle} />
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Your name"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="phone"
          placeholder="Phone (optional)"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
        <input
          type="number"
          name="guests"
          min={1}
          defaultValue={1}
          placeholder="Guests"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
        />
      </div>
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-indigo-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-indigo-800 disabled:opacity-60 disabled:hover:scale-100"
      >
        {pending ? "Submitting…" : "RSVP"}
      </button>
    </form>
  );
}
