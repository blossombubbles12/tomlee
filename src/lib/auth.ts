import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { admins } from "@/db/schema";
import { eq } from "drizzle-orm";

// Also export the new auth service for modules that want to use the users table
export { authService } from "@/modules/auth/services/auth-service";
export type { SessionUser } from "@/modules/auth/services/auth-service";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
const TOKEN_NAME = "admin_token";
const SALT_ROUNDS = 12;

export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  role: "superadmin" | "admin";
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashStr: string): Promise<boolean> {
  return compare(password, hashStr);
}

export function createToken(payload: JwtPayload): string {
  return sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

/**
 * Authenticate against the legacy `admins` table.
 * Used by the existing admin login page.
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; token?: string; user?: JwtPayload }> {
  try {
    const [user] = await db.select().from(admins).where(eq(admins.email, email.toLowerCase().trim())).limit(1);
    if (!user) return { success: false, error: "Invalid email or password." };

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) return { success: false, error: "Invalid email or password." };

    const payload: JwtPayload = { id: user.id, email: user.email, name: user.name, role: user.role as JwtPayload["role"] };
    const token = createToken(payload);
    return { success: true, token, user: payload };
  } catch (err) {
    console.error("[Auth Error]", err);
    return { success: false, error: "Authentication failed." };
  }
}

export async function registerAdmin(
  email: string,
  name: string,
  password: string,
  role: "superadmin" | "admin" = "admin"
): Promise<{ success: boolean; error?: string }> {
  try {
    const existing = await db.select().from(admins).where(eq(admins.email, email.toLowerCase().trim())).limit(1);
    if (existing.length > 0) return { success: false, error: "An admin with this email already exists." };

    const passwordHash = await hashPassword(password);
    await db.insert(admins).values({ email: email.toLowerCase().trim(), name, passwordHash, role });
    return { success: true };
  } catch (err) {
    console.error("[Register Error]", err);
    return { success: false, error: "Registration failed." };
  }
}

export async function getSessionUser(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) {
    cookieStore.delete(TOKEN_NAME);
    return null;
  }
  return payload;
}

export async function setSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}

export async function requireAdmin(allowedRoles?: ("superadmin" | "admin")[]): Promise<JwtPayload> {
  const user = await getSessionUser();
  if (!user) {
    const { redirect } = await import("next/navigation");
    redirect("/admin");
    throw new Error("unreachable");
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/dashboard");
    throw new Error("unreachable");
  }
  return user;
}
