"use client";

import { useActionState } from "react";
import { updatePassword } from "./actions";
import type { FormState } from "@/lib/actions/public";

const initialState: FormState = { success: false };

export default function PasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, initialState);

  return (
    <form action={formAction} className="mt-6 max-w-sm space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        New Password
        <input
          type="password"
          name="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Confirm New Password
        <input
          type="password"
          name="confirm"
          required
          minLength={8}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Password updated.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-indigo-900 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Update Password"}
      </button>
    </form>
  );
}
