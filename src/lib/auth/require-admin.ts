import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySession, type SessionPayload } from "./session";

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

// Call as the first line of every mutating Server Action. This is the
// primary authorization boundary now that there's no Postgres RLS gating
// writes — proxy.ts's page-level redirect is a UX convenience, not a
// security boundary, since Server Function calls can be invoked directly
// without going through the page. See Next.js proxy.js docs: "Always
// verify authentication and authorization inside each Server Function
// rather than relying on Proxy alone."
export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
