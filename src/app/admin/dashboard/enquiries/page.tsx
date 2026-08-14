import { Metadata } from "next";
import { db } from "@/lib/db";
import { enquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { deleteEnquiry } from "../actions";
import DeleteButton from "../DeleteButton";
import { Mail, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Enquiries — Tomlee Home Care",
  robots: { index: false, follow: false },
};

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact Form",
  "get-started": "Get Started",
  "corporate-training": "Corporate Training",
};

export default async function EnquiriesPage() {
  const all = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(100);

  const typeCounts = all.reduce((acc, e) => {
    acc[e.type] = (acc[e.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-text">Enquiries</h1>
          <p className="text-sm text-text/50 mt-0.5">{all.length} total enquiries</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text/30" />
          <input
            type="text"
            placeholder="Search enquiries..."
            className="search-input rounded-lg w-full"
            disabled
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button className="filter-btn active rounded-lg">All ({all.length})</button>
          {Object.entries(typeCounts).map(([type, count]) => (
            <button key={type} className="filter-btn rounded-lg">
              {TYPE_LABELS[type] || type} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card rounded-xl overflow-hidden">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-5">
            <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center mb-4">
              <Mail size={24} className="text-text/20" />
            </div>
            <p className="text-sm font-medium text-text/40">No enquiries yet</p>
            <p className="text-xs text-text/30 mt-1">Enquiries submitted through the website will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface/50">
                  <th className="table-header">Date</th>
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">Organisation</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Message</th>
                  <th className="table-header w-10" />
                </tr>
              </thead>
              <tbody>
                {all.map((e) => (
                  <tr key={e.id} className="table-row">
                    <td className="table-cell text-text/40">
                      {new Date(e.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="table-cell font-medium text-text">{e.name}</td>
                    <td className="table-cell">
                      <a href={`mailto:${e.email}`} className="text-primary hover:text-secondary transition-colors text-xs">
                        {e.email}
                      </a>
                    </td>
                    <td className="table-cell">
                      <span className="badge badge-primary">{TYPE_LABELS[e.type] || e.type}</span>
                    </td>
                    <td className="table-cell text-text/60">{e.organisation || <span className="text-text/20">&mdash;</span>}</td>
                    <td className="table-cell text-text/60">{e.phone || <span className="text-text/20">&mdash;</span>}</td>
                    <td className="table-cell text-text/60 max-w-[200px]">
                      <span className="truncate block">{e.message}</span>
                    </td>
                    <td className="table-cell">
                      <DeleteButton onDelete={async () => { "use server"; return await deleteEnquiry(e.id); }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
