import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { representativeApplications } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ExternalLink, FileText, Search } from "lucide-react";
import { deleteApplication } from "../actions";
import DeleteButton from "../DeleteButton";

export const metadata: Metadata = {
  title: "Applications — Tomlee Home Care",
  robots: { index: false, follow: false },
};

const STATUS_CONFIG = {
  pending: { label: "Pending", class: "badge-warning" },
  approved: { label: "Approved", class: "badge-success" },
  rejected: { label: "Rejected", class: "badge-danger" },
} as const;

export default async function ApplicationsPage() {
  const all = await db.select().from(representativeApplications).orderBy(desc(representativeApplications.createdAt)).limit(100);

  const statusCounts = all.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-text">Representative Applications</h1>
          <p className="text-sm text-text/50 mt-0.5">{all.length} total applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text/30" />
          <input
            type="text"
            placeholder="Search applications..."
            className="search-input rounded-lg w-full"
            disabled
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button className="filter-btn active rounded-lg">All ({all.length})</button>
          {Object.entries(statusCounts).map(([status, count]) => {
            const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
            return (
              <button key={status} className="filter-btn rounded-lg">
                {cfg?.label || status} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card rounded-xl overflow-hidden">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-5">
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center mb-4">
              <FileText size={24} className="text-text/20" />
            </div>
            <p className="text-sm font-medium text-text/40">No applications yet</p>
            <p className="text-xs text-text/30 mt-1">Representative applications will appear here once submitted</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface/50">
                  <th className="table-header">Date</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Country</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Interests</th>
                  <th className="table-header">CV</th>
                  <th className="table-header">Status</th>
                  <th className="table-header" />
                  <th className="table-header w-10" />
                </tr>
              </thead>
              <tbody>
                {all.map((a) => {
                  const statusCfg = STATUS_CONFIG[a.status as keyof typeof STATUS_CONFIG] || { label: a.status, class: "badge-neutral" };
                  return (
                    <tr key={a.id} className="table-row">
                      <td className="table-cell text-text/40">
                        {new Date(a.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="table-cell font-medium text-text">{a.fullName}</td>
                      <td className="table-cell">
                        <a href={`mailto:${a.email}`} className="text-primary hover:text-secondary transition-colors text-xs">
                          {a.email}
                        </a>
                      </td>
                      <td className="table-cell text-text/60">{a.country}</td>
                      <td className="table-cell text-text/60">{a.phone}</td>
                      <td className="table-cell text-text/60 max-w-[140px]">
                        <span className="truncate block">{a.areasOfInterest || <span className="text-text/20">&mdash;</span>}</span>
                      </td>
                      <td className="table-cell">
                        {a.cvUrl ? (
                          <a href={`/api/cv/${a.id}`} target="_blank" rel="noopener noreferrer"
                            className="text-primary hover:text-secondary text-xs font-medium inline-flex items-center gap-1">
                            <ExternalLink size={10} /> View
                          </a>
                        ) : (
                          <span className="text-text/20">&mdash;</span>
                        )}
                      </td>
                      <td className="table-cell">
                        <span className={`badge ${statusCfg.class}`}>{statusCfg.label}</span>
                      </td>
                      <td className="table-cell">
                        <Link href={`/admin/dashboard/applications/${a.id}`}
                          className="text-primary hover:text-secondary text-xs font-medium inline-flex items-center gap-1">
                          Details <ExternalLink size={10} />
                        </Link>
                      </td>
                      <td className="table-cell">
                        <DeleteButton onDelete={async () => { "use server"; return await deleteApplication(a.id); }} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
