import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./actions";
import AdminToast from "@/components/admin/AdminToast";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/church-info", label: "Church Info" },
  { href: "/admin/services", label: "Service Times" },
  { href: "/admin/ministries", label: "Ministries" },
  { href: "/admin/leadership", label: "Leadership" },
  { href: "/admin/beliefs", label: "Statement of Faith" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/posts", label: "Posts" },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-sm font-bold text-indigo-950">Admin Panel</p>
          <p className="mt-0.5 truncate text-xs text-slate-500">
            {user?.email}
          </p>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100"
          >
            ← View Site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Log Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
          <p className="text-sm font-bold text-indigo-950">Admin Panel</p>
          <form action={logout}>
            <button type="submit" className="text-sm text-red-600">
              Log Out
            </button>
          </form>
        </header>
        <nav className="flex gap-4 overflow-x-auto border-b border-slate-200 bg-white px-6 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-sm font-medium text-slate-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="p-6 lg:p-10">{children}</main>
      </div>

      <Suspense fallback={null}>
        <AdminToast />
      </Suspense>
    </div>
  );
}
