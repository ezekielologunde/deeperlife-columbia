import { getAdminSession } from "@/lib/auth/require-admin";
import PasswordForm from "./PasswordForm";

export default async function AccountPage() {
  const session = await getAdminSession();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Account</h1>
      <p className="mt-1 text-sm text-slate-500">{session?.email}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Change Password</h2>
        <PasswordForm />
      </div>
    </div>
  );
}
