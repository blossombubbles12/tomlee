import { Metadata } from "next";
import { redirect } from "next/navigation";
import { authenticateUser, setSession, getSessionUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Login — WorldImpact Africa",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const existing = await getSessionUser();
  if (existing) redirect("/admin/dashboard");

  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectTo = formData.get("redirect") as string || "/admin/dashboard";

    const result = await authenticateUser(email, password);
    if (result.success && result.token) {
      await setSession(result.token);
      redirect(redirectTo);
    } else {
      redirect("/admin?error=1");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
            </svg>
          </div>
          <h1 className="text-xl font-heading font-bold text-text">Welcome back</h1>
          <p className="text-sm text-text/50 mt-1">Sign in to your admin account</p>
        </div>
        <form action={handleLogin} className="space-y-4">
          <input type="email" name="email" required placeholder="Email address"
            className="w-full border border-secondary/10 bg-white px-4 py-3 text-sm text-text rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          <input type="password" name="password" required placeholder="Password"
            className="w-full border border-secondary/10 bg-white px-4 py-3 text-sm text-text rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          <button type="submit"
            className="w-full bg-primary text-white py-3 text-sm font-heading font-semibold rounded-lg hover:bg-secondary transition-all shadow-sm">
            Sign In
          </button>
        </form>
        <p className="text-xs text-text/40 text-center mt-6">
          First time? Visit <a href="/admin/seed" className="text-primary hover:underline font-medium">/admin/seed</a> to create the initial admin account.
        </p>
      </div>
    </div>
  );
}
