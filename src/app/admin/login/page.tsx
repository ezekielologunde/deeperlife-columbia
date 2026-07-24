import Image from "next/image";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-50 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.jpg"
            alt="Deeper Life Bible Church Columbia"
            width={56}
            height={56}
            className="rounded-full"
          />
          <h1 className="mt-4 text-lg font-bold text-indigo-950">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500">
            Deeper Life Bible Church Columbia
          </p>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
              <input
                type="password"
                name="password"
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-indigo-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
