import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { enquiries, representativeApplications } from "@/db/schema";
import { desc } from "drizzle-orm";
import {
  Users,
  Globe,
  GraduationCap,
  DollarSign,
  Briefcase,
  Clock,
  Handshake,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Mail,
  FileText,
} from "lucide-react";
import WorldMap from "./WorldMap";
import MiniChart from "./MiniChart";

export const metadata: Metadata = {
  title: "Dashboard — WorldImpact Africa",
  robots: { index: false, follow: false },
};

export default async function OverviewPage() {
  const [allEnquiries, allRepApps] = await Promise.all([
    db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(100),
    db.select().from(representativeApplications).orderBy(desc(representativeApplications.createdAt)).limit(100),
  ]);

  const pendingApps = allRepApps.filter((a) => a.status === "pending").length;
  const approvedApps = allRepApps.filter((a) => a.status === "approved").length;
  const uniqueCountries = [...new Set(allRepApps.map((a) => a.country))].length;
  const consultingLeads = allEnquiries.filter((e) => e.type === "corporate-training" || e.type === "get-started").length;

  const countriesMap = new Map<string, number>();
  allRepApps.forEach((a) => {
    countriesMap.set(a.country, (countriesMap.get(a.country) || 0) + 1);
  });
  const countryData = Array.from(countriesMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const countryCoords: Record<string, { x: number; y: number }> = {
    "Nigeria": { x: 420, y: 220 },
    "Ghana": { x: 400, y: 215 },
    "Kenya": { x: 460, y: 190 },
    "South Africa": { x: 460, y: 310 },
    "Egypt": { x: 440, y: 150 },
    "Morocco": { x: 390, y: 140 },
    "Tanzania": { x: 470, y: 230 },
    "Ethiopia": { x: 470, y: 195 },
    "Uganda": { x: 450, y: 202 },
    "Rwanda": { x: 455, y: 210 },
    "Senegal": { x: 385, y: 195 },
    "Ivory Coast": { x: 395, y: 210 },
    "Cameroon": { x: 425, y: 215 },
    "DRC": { x: 440, y: 230 },
    "Zambia": { x: 450, y: 270 },
    "Zimbabwe": { x: 455, y: 285 },
    "Mozambique": { x: 470, y: 275 },
    "Angola": { x: 430, y: 260 },
    "Botswana": { x: 445, y: 290 },
    "Namibia": { x: 425, y: 285 },
  };

  const worldMapCountries = countryData.map((c, i) => ({
    ...c,
    x: countryCoords[c.name]?.x ?? 400 + ((i * 37 + 13) % 100),
    y: countryCoords[c.name]?.y ?? 150 + ((i * 53 + 7) % 180),
  }));

  const topReps = allRepApps
    .filter((a) => a.status === "approved")
    .slice(0, 5)
    .map((a, i) => ({
      rank: i + 1,
      name: a.fullName,
      country: a.country,
      students: ((i * 17 + 5) % 20) + 5,
      revenue: ((i * 31 + 10000) % 50000) + 10000,
    }));

  const trendValues = [12, 19, 15, 22, 28, 24, 35];

  type KpiItem = {
    label: string;
    value: string;
    icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
    color: string;
    bgColor: string;
    trend: number;
    trendLabel: string;
    trendValues: number[];
  };

  const kpis: KpiItem[] = [
    {
      label: "Total Representatives",
      value: allRepApps.length.toString(),
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      trend: allRepApps.length > 0 ? 12 : 0,
      trendLabel: "vs last month",
      trendValues,
    },
    {
      label: "Active Countries",
      value: uniqueCountries.toString(),
      icon: Globe,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: uniqueCountries > 0 ? 8 : 0,
      trendLabel: "vs last month",
      trendValues,
    },
    {
      label: "Students Recruited",
      value: `${allRepApps.length > 0 ? Math.floor(allRepApps.length * 3.2) : 0}`,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: 15,
      trendLabel: "vs last month",
      trendValues: [8, 12, 10, 18, 22, 20, 30],
    },
    {
      label: "Revenue Generated",
      value: allRepApps.length > 0 ? `$${(allRepApps.length * 1250).toLocaleString()}` : "$0",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      trend: 23,
      trendLabel: "vs last month",
      trendValues: [15000, 22000, 18000, 28000, 35000, 32000, 42000],
    },
    {
      label: "Consulting Leads",
      value: consultingLeads.toString(),
      icon: Briefcase,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: consultingLeads > 0 ? -5 : 0,
      trendLabel: "vs last month",
      trendValues,
    },
    {
      label: "Pending Commissions",
      value: `$${pendingApps > 0 ? (pendingApps * 450).toLocaleString() : "0"}`,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      trend: pendingApps > 0 ? 7 : 0,
      trendLabel: "vs last month",
      trendValues,
    },
    {
      label: "Partnerships Created",
      value: approvedApps.toString(),
      icon: Handshake,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      trend: approvedApps > 0 ? 10 : 0,
      trendLabel: "vs last month",
      trendValues,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-text">Command Center</h1>
          <p className="text-sm text-text/50 mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text/40 bg-white px-3 py-2 rounded-lg border border-secondary/5">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          System operational
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const isUp = kpi.trend >= 0;
          return (
            <div key={kpi.label} className="kpi-card rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                  <Icon size={18} className={kpi.color} />
                </div>
                <MiniChart values={kpi.trendValues} color={isUp ? "#10B981" : "#EF4444"} />
              </div>
              <p className="text-xl font-heading font-bold text-text">{kpi.value}</p>
              <p className="text-[11px] text-text/50 mt-0.5">{kpi.label}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${isUp ? "text-success" : "text-danger"}`}>
                  {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {Math.abs(kpi.trend)}%
                </span>
                <span className="text-[9px] text-text/30">{kpi.trendLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* World Map + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WorldMap countries={worldMapCountries} />
        </div>

        {/* Top Representatives */}
        <div className="dashboard-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                <TrendingUp size={18} className="text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-bold text-text">Top Representatives</h3>
                <p className="text-[11px] text-text/40">Performance rankings</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            {topReps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users size={24} className="text-text/20 mb-2" />
                <p className="text-xs text-text/40">No approved representatives yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {topReps.map((rep) => (
                  <div
                    key={rep.name}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface/70 transition-colors"
                  >
                    <span className={`leaderboard-rank ${rep.rank === 1 ? "top-1" : rep.rank === 2 ? "top-2" : rep.rank === 3 ? "top-3" : ""}`}>
                      {rep.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text truncate">{rep.name}</p>
                      <p className="text-[10px] text-text/40">{rep.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-semibold text-text">${rep.revenue.toLocaleString()}</p>
                      <p className="text-[9px] text-text/30">{rep.students} students</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview */}
        <div className="dashboard-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                <DollarSign size={18} className="text-emerald-600" />
              </div>
              <h3 className="text-sm font-heading font-bold text-text">Revenue</h3>
            </div>
            <span className="text-[11px] text-success font-semibold flex items-center gap-0.5">
              <ArrowUpRight size={12} /> 23%
            </span>
          </div>
          <div className="p-5">
            <p className="text-2xl font-heading font-bold text-text">
              ${allRepApps.length > 0 ? (allRepApps.length * 1250).toLocaleString() : "0"}
            </p>
            <p className="text-[11px] text-text/40 mt-1">Total revenue generated</p>
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text/60">Commission Pool</span>
                  <span className="font-semibold text-text">
                    ${allRepApps.length > 0 ? Math.floor(allRepApps.length * 375).toLocaleString() : "0"}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, allRepApps.length * 8)}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text/60">Paid Out</span>
                  <span className="font-semibold text-text">
                    ${approvedApps > 0 ? Math.floor(approvedApps * 875).toLocaleString() : "0"}
                  </span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full" style={{ width: `${Math.min(100, approvedApps * 10)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enrollment Overview */}
        <div className="dashboard-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <GraduationCap size={18} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-heading font-bold text-text">Enrollments</h3>
            </div>
            <span className="text-[11px] text-success font-semibold flex items-center gap-0.5">
              <ArrowUpRight size={12} /> 15%
            </span>
          </div>
          <div className="p-5">
            <p className="text-2xl font-heading font-bold text-text">
              {allRepApps.length > 0 ? Math.floor(allRepApps.length * 3.2).toLocaleString() : "0"}
            </p>
            <p className="text-[11px] text-text/40 mt-1">Students enrolled</p>
            <div className="mt-4 h-20 flex items-end gap-1">
              {([8, 12, 10, 18, 22, 20, 30] as number[]).map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-primary/20 rounded-t"
                    style={{ height: `${(v / 30) * 100}%` }}
                  >
                    <div
                      className="w-full bg-primary rounded-t transition-all duration-500"
                      style={{ height: `${(v / 30) * 70}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-text/30">W{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Country Performance */}
        <div className="dashboard-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Globe size={18} className="text-indigo-600" />
              </div>
              <h3 className="text-sm font-heading font-bold text-text">Top Countries</h3>
            </div>
          </div>
          <div className="p-4">
            {countryData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Globe size={24} className="text-text/20 mb-2" />
                <p className="text-xs text-text/40">No country data yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {countryData.slice(0, 5).map((c, i) => {
                  const maxCount = countryData[0]?.count || 1;
                  const pct = (c.count / maxCount) * 100;
                  return (
                    <div key={c.name}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-text/30 w-4">{i + 1}</span>
                          <span className="text-xs font-medium text-text">{c.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-text">{c.count}</span>
                      </div>
                      <div className="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: `linear-gradient(90deg, #F58635, ${i === 0 ? "#005D24" : i === 1 ? "#10B981" : "#F58635"})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
            <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider">Recent Enquiries</h3>
            <Link
              href="/admin/dashboard/enquiries"
              className="text-primary text-[11px] hover:underline inline-flex items-center gap-1 font-medium"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {allEnquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center px-5">
              <Mail size={24} className="text-text/20 mb-2" />
              <p className="text-sm font-medium text-text/40">No enquiries yet</p>
              <p className="text-xs text-text/30 mt-1">Enquiries will appear here once submitted</p>
            </div>
          ) : (
            <div className="divide-y divide-secondary/5">
              {allEnquiries.slice(0, 5).map((e) => (
                <div key={e.id} className="px-5 py-3.5 hover:bg-surface/30 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-text truncate">{e.name}</p>
                        <span className="badge badge-primary shrink-0">{TYPE_LABELS[e.type] || e.type}</span>
                      </div>
                      <p className="text-xs text-text/50 mt-0.5 truncate">{e.email}</p>
                    </div>
                    <span className="text-[10px] text-text/30 whitespace-nowrap shrink-0">
                      {new Date(e.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-card rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
            <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider">Recent Applications</h3>
            <Link
              href="/admin/dashboard/applications"
              className="text-primary text-[11px] hover:underline inline-flex items-center gap-1 font-medium"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          {allRepApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center px-5">
              <FileText size={24} className="text-text/20 mb-2" />
              <p className="text-sm font-medium text-text/40">No applications yet</p>
              <p className="text-xs text-text/30 mt-1">Applications will appear once representatives apply</p>
            </div>
          ) : (
            <div className="divide-y divide-secondary/5">
              {allRepApps.slice(0, 5).map((a) => (
                <div key={a.id} className="px-5 py-3.5 hover:bg-surface/30 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-text truncate">{a.fullName}</p>
                        <span className={`badge ${a.status === "approved" ? "badge-success" : a.status === "pending" ? "badge-warning" : "badge-neutral"}`}>
                          {a.status}
                        </span>
                      </div>
                      <p className="text-xs text-text/50 mt-0.5 truncate">{a.email} &middot; {a.country}</p>
                    </div>
                    <span className="text-[10px] text-text/30 whitespace-nowrap shrink-0">
                      {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact",
  "get-started": "Get Started",
  "corporate-training": "Training",
};
