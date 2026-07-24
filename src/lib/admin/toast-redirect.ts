import { redirect } from "next/navigation";

export function redirectWithToast(path: string, message: string): never {
  redirect(`${path}?toast=${encodeURIComponent(message)}`);
}
