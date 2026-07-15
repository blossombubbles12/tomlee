import { Metadata } from "next";
import Link from "next/link";
import { studentService } from "@/modules/students/services/student-service";
import { DataTable, type Column } from "@/modules/shared/components/ui/DataTable";
import { StatusBadge } from "@/modules/shared/components/ui/StatusBadge";
import { EmptyState } from "@/modules/shared/components/ui/EmptyState";
import { formatDate, formatCurrency } from "@/modules/shared/utils/format";
import { ExternalLink, GraduationCap } from "lucide-react";
import { deleteStudent } from "../actions";
import DeleteButton from "../DeleteButton";

export const metadata: Metadata = {
  title: "Students — WorldImpact Africa",
  robots: { index: false, follow: false },
};

interface StudentRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  institution: string | null;
  status: string;
  amountPaid: string | null;
  currency: string | null;
  enrollmentDate: Date;
}

export default async function StudentsPage() {
  const result = await studentService.findAll({ pageSize: 100 });
  const students = result.items as unknown as StudentRow[];

  const statusCounts: Record<string, number> = {};
  students.forEach((s) => { statusCounts[s.status] = (statusCounts[s.status] ?? 0) + 1; });

  const columns: Column<StudentRow>[] = [
    { key: "date", header: "Enrolled", cell: (s) => <span className="text-text/40 text-xs">{formatDate(s.enrollmentDate)}</span> },
    { key: "name", header: "Name", cell: (s) => <span className="font-medium text-text">{s.firstName} {s.lastName}</span> },
    { key: "email", header: "Email", cell: (s) => <a href={`mailto:${s.email}`} className="text-primary hover:text-secondary text-xs">{s.email}</a> },
    { key: "institution", header: "Institution", cell: (s) => <span className="text-text/60">{s.institution ?? "—"}</span> },
    { key: "amount", header: "Amount", cell: (s) => <span className="text-text/60">{formatCurrency(parseFloat(s.amountPaid ?? "0"), s.currency ?? "USD")}</span> },
    { key: "status", header: "Status", cell: (s) => <StatusBadge status={s.status} /> },
    { key: "actions", header: "", cell: (s) => (
      <div className="flex items-center gap-2">
        <Link href={`/admin/dashboard/students/${s.id}`}
          className="text-primary hover:text-secondary text-xs font-medium inline-flex items-center gap-1">
          Details <ExternalLink size={10} />
        </Link>
        <DeleteButton onDelete={async () => { "use server"; return await deleteStudent(s.id); }} />
      </div>
    )},
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-heading font-bold text-text">Students</h1>
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
        data={students}
        keyExtractor={(s) => s.id}
        emptyState={
          <EmptyState
            icon={<GraduationCap size={24} className="text-text/20" />}
            title="No students yet"
            description="Students will appear once they are enrolled through representatives"
          />
        }
      />
    </div>
  );
}
