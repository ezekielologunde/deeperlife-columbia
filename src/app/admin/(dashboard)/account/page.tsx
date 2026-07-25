import { createClient } from "@/lib/supabase/server";
import PasswordForm from "./PasswordForm";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-indigo-950">Account</h1>
      <p className="mt-1 text-sm text-slate-500">{user?.email}</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="font-bold text-indigo-950">Change Password</h2>
        <PasswordForm />
      </div>
    </div>
  );
}
