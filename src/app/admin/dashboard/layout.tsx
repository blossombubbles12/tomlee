import { requireAdmin } from "@/lib/auth";
import Sidebar from "./Sidebar";
import { ToastProvider } from "@/modules/shared/components/feedback/Toast";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="min-h-screen bg-surface md:flex">
      <ToastProvider>
        <Sidebar userName={user.name} userEmail={user.email} userRole={user.role} />

        <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          <header className="md:h-14 bg-white border-b border-secondary/5 hidden md:flex items-center justify-between px-6 shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md gradient-accent flex items-center justify-center">
                <GlobeIcon size={13} className="text-white" />
              </div>
              <h1 className="text-sm font-heading font-semibold text-text">Tomlee Home Care</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-text/40">{user.name}</span>
              <span className="badge badge-primary">{user.role}</span>
            </div>
          </header>
          <div className="p-4 md:p-6 flex-1 pt-[4.5rem] md:pt-6">
            {children}
          </div>
        </main>
      </ToastProvider>
    </div>
  );
}

function GlobeIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}
