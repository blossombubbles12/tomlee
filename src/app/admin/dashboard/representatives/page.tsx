import { Metadata } from "next";
import Link from "next/link";
import { representativeService } from "@/modules/representatives/services/representative-service";
import { DataTable, type Column } from "@/modules/shared/components/ui/DataTable";
import { StatusBadge } from "@/modules/shared/components/ui/StatusBadge";
import { EmptyState } from "@/modules/shared/components/ui/EmptyState";
import { SearchInput } from "@/modules/shared/components/ui/SearchInput";
import { formatDate } from "@/modules/shared/utils/format";
import { ExternalLink, Users } from "lucide-react";
import { deleteRepresentative } from "../actions";
import DeleteButton from "../DeleteButton";

export const metadata: Metadata = {
  title: "Representatives — WorldImpact Africa",
  robots: { index: false, follow: false },
};

interface RepRow {
  id: number;
  fullName: string;
  email: string;
  countryName?: string;
  city: string;
  phone: string;
  status: string;
  totalStudents: number | null;
  totalRevenue: string | null;
  createdAt: Date;
}

export default async function RepresentativesPage() {
  const result = await representativeService.findAll({ pageSize: 100 });
  const reps = result.items as unknown as RepRow[];

  const statusCounts: Record<string, number> = {};
  reps.forEach((r) => { statusCounts[r.status] = (statusCounts[r.status] ?? 0) + 1; });

  const columns: Column<RepRow>[] = [
    { key: "date", header: "Date", cell: (r) => <span className="text-text/40 text-xs">{formatDate(r.createdAt)}</span> },
    { key: "name", header: "Name", cell: (r) => <span className="font-medium text-text">{r.fullName}</span> },
    { key: "email", header: "Email", cell: (r) => <a href={`mailto:${r.email}`} className="text-primary hover:text-secondary text-xs">{r.email}</a> },
    { key: "country", header: "Country", cell: (r) => <span className="text-text/60">{r.countryName ?? "—"}</span> },
    { key: "phone", header: "Phone", cell: (r) => <span className="text-text/60">{r.phone}</span> },
    { key: "students", header: "Students", cell: (r) => <span className="text-text/60">{r.totalStudents ?? 0}</span> },
    { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
    { key: "actions", header: "", cell: (r) => (
      <div className="flex items-center gap-2">
        <Link href={`/admin/dashboard/representatives/${r.id}`}
          className="text-primary hover:text-secondary text-xs font-medium inline-flex items-center gap-1">
          Details <ExternalLink size={10} />
        </Link>
        <DeleteButton onDelete={async () => { "use server"; return await deleteRepresentative(r.id); }} />
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-text">Representatives</h1>
          <p className="text-sm text-text/50 mt-0.5">{result.total} total</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className="filter-btn active rounded-lg">All ({result.total})</span>
        {Object.entries(statusCounts).map(([status, count]) => (
          <span key={status} className="filter-btn rounded-lg">
            <StatusBadge status={status} /> {count}
          </span>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={reps}
        keyExtractor={(r) => r.id}
        emptyState={
          <EmptyState
            icon={<Users size={24} className="text-text/20" />}
            title="No representatives yet"
            description="Representatives will appear once applications are submitted and approved"
          />
        }
      />
    </div>
  );
}
