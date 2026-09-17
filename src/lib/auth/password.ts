import bcrypt from "bcryptjs";

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

// Works for both freshly-hashed passwords and the bcrypt hashes carried
// over from Supabase Auth's auth.users.encrypted_password column — both
// are standard bcrypt, so no migration-specific handling is needed here.
export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
