import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { users } from "@/db/schema/auth";
import { eq } from "drizzle-orm";
import type { Role } from "@/modules/permissions/types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
const TOKEN_NAME = "session_token";
const SALT_ROUNDS = 12;

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: Role;
  countryId?: number | null;
  representativeId?: number | null;
}

interface TokenPayload {
  id: number;
  email: string;
  name: string;
  role: Role;
  countryId?: number | null;
  representativeId?: number | null;
}

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS);
  }

  async verifyPassword(password: string, hashStr: string): Promise<boolean> {
    return compare(password, hashStr);
  }

  createToken(payload: TokenPayload): string {
    return sign(payload, JWT_SECRET, { expiresIn: "24h" });
  }

  verifyToken(token: string): TokenPayload | null {
    try {
      return verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  async authenticate(email: string, password: string): Promise<{ success: boolean; error?: string; token?: string; user?: SessionUser }> {
    try {
      const [user] = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
      if (!user) return { success: false, error: "Invalid email or password." };
      if (!user.isActive) return { success: false, error: "Account is deactivated." };

      const valid = await this.verifyPassword(password, user.passwordHash);
      if (!valid) return { success: false, error: "Invalid email or password." };

      const payload: TokenPayload = {
        id: user.id, email: user.email, name: user.name,
        role: user.role as Role, countryId: user.countryId, representativeId: user.representativeId,
      };
      const token = this.createToken(payload);

      await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));

      return { success: true, token, user: payload };
    } catch (err) {
      console.error("[Auth Error]", err);
      return { success: false, error: "Authentication failed." };
    }
  }

  async register(email: string, name: string, password: string, role: Role = "representative"): Promise<{ success: boolean; error?: string }> {
    try {
      const existing = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
      if (existing.length > 0) return { success: false, error: "A user with this email already exists." };

      const passwordHash = await this.hashPassword(password);
      await db.insert(users).values({ email: email.toLowerCase().trim(), name, passwordHash, role });
      return { success: true };
    } catch (err) {
      console.error("[Register Error]", err);
      return { success: false, error: "Registration failed." };
    }
  }

  async getSession(): Promise<SessionUser | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    if (!token) return null;
    const payload = this.verifyToken(token);
    if (!payload) {
      cookieStore.delete(TOKEN_NAME);
      return null;
    }
    return payload;
  }

  async setSession(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  async clearSession() {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_NAME);
  }

  async requireAuth(allowedRoles?: Role[]): Promise<SessionUser> {
    const user = await this.getSession();
    if (!user) {
      const { redirect } = await import("next/navigation");
      redirect("/admin");
      throw new Error("unreachable");
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      const { redirect } = await import("next/navigation");
      redirect("/dashboard");
      throw new Error("unreachable");
    }
    return user;
  }
}

export const authService = new AuthService();
