"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Mail, FileText, Globe, BarChart3, Settings, LogOut,
  ExternalLink, Menu, X, Users, GraduationCap, DollarSign, Handshake,
  Briefcase, TrendingUp,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

interface NavGroup {
  label: string;
  items: { href: string; label: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Main",
    items: [{ href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Management",
    items: [
      { href: "/admin/dashboard/enquiries", label: "Enquiries", icon: Mail },
      { href: "/admin/dashboard/applications", label: "Applications", icon: FileText },
      { href: "/admin/dashboard/representatives", label: "Representatives", icon: Users },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/admin/dashboard/students", label: "Students", icon: GraduationCap },
      { href: "/admin/dashboard/payments", label: "Payments", icon: DollarSign },
      { href: "/admin/dashboard/commissions", label: "Commissions", icon: TrendingUp },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/admin/dashboard/leads", label: "Consulting Leads", icon: Briefcase },
      { href: "/admin/dashboard/partnerships", label: "Partnerships", icon: Handshake },
    ],
  },
  {
    label: "Intelligence",
    items: [{ href: "/admin/dashboard/reports", label: "Reports", icon: BarChart3 }],
  },
  {
    label: "Administration",
    items: [{ href: "/admin/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/admin/dashboard") return pathname === href;
  return pathname.startsWith(href);
}

export default function Sidebar({ userName, userEmail, userRole }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <aside className="w-64 bg-secondary shrink-0 flex flex-col min-h-screen relative">
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <Globe size={16} className="text-white" />
          </div>
          <div>
            <span className="text-white font-heading font-bold text-sm tracking-wide block leading-tight">WorldImpact</span>
            <span className="text-[10px] text-white/40 font-medium">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 py-5 px-3 space-y-6 overflow-y-auto">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-[0.12em]">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                      active
                        ? "bg-primary/15 text-white font-medium shadow-sm"
                        : "text-white/55 hover:text-white hover:bg-white/[0.07]"
                    }`}
                  >
                    <Icon size={17} strokeWidth={active ? 2 : 1.5} />
                    <span>{item.label}</span>
                    {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4 space-y-3">
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-white/80 truncate font-medium">{userName}</p>
            <p className="text-[10px] text-white/40 truncate">{userEmail}</p>
          </div>
          <span className="shrink-0 text-[9px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
            {userRole}
          </span>
        </div>
        <div className="flex items-center gap-1 pt-1 border-t border-white/5">
          <Link href="/" target="_blank"
            className="flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors px-2 py-1 rounded hover:bg-white/5 flex-1">
            <ExternalLink size={11} /> View Site
          </Link>
          <form action="/admin/logout" method="post" className="flex-1">
            <button type="submit"
              className="flex items-center gap-1.5 text-[11px] text-red-400/60 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-white/5 w-full text-left">
              <LogOut size={11} /> Logout
            </button>
          </form>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden md:flex">{sidebarContent}</div>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-secondary flex items-center px-4 gap-3 shadow-lg">
        <button onClick={() => setOpen(!open)} className="text-white p-1">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
            <Globe size={13} className="text-white" />
          </div>
          <span className="text-white font-heading font-bold text-sm tracking-wide">WorldImpact</span>
        </div>
      </div>

      {open && <div className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />}

      <div className={`md:hidden fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}>
        {sidebarContent}
      </div>
    </>
  );
}
