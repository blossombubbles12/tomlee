import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar, GraduationCap, DollarSign, Building2, Tag } from "lucide-react";
import { studentService } from "@/modules/students/services/student-service";
import { StatusBadge } from "@/modules/shared/components/ui/StatusBadge";
import { Card } from "@/modules/shared/components/ui/Card";
import { formatDate, formatCurrency } from "@/modules/shared/utils/format";
import { deleteStudent } from "../../actions";
import DeleteButton from "../../DeleteButton";

export const metadata: Metadata = {
  title: "Student Details — WorldImpact Africa",
  robots: { index: false, follow: false },
};

export default async function StudentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await studentService.findById(parseInt(id));
  if (!student) notFound();

  const s = student as any;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/students"
          className="inline-flex items-center gap-1.5 text-xs text-text/40 hover:text-primary transition-colors w-fit">
          <ArrowLeft size={13} /> Back to Students
        </Link>
        <DeleteButton onDelete={async () => { "use server"; return await deleteStudent(s.id); }} />
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
              {s.firstName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-text">{s.firstName} {s.lastName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={12} className="text-text/30" />
                <p className="text-xs text-text/40">Enrolled {formatDate(s.enrollmentDate ?? s.createdAt, "full")}</p>
              </div>
            </div>
          </div>
          <StatusBadge status={s.status} />
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <Mail size={13} className="text-primary" /> Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailItem icon={<Mail size={15} />} label="Email" value={s.email} href={`mailto:${s.email}`} />
          {s.phone && <DetailItem icon={<Phone size={15} />} label="Phone" value={s.phone} href={`tel:${s.phone}`} />}
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <GraduationCap size={13} className="text-primary" /> Enrollment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {s.institution && <DetailItem icon={<Building2 size={15} />} label="Institution" value={s.institution} />}
          {s.programId && <DetailItem icon={<Tag size={15} />} label="Program ID" value={String(s.programId)} />}
          <DetailItem icon={<DollarSign size={15} />} label="Amount Paid" value={formatCurrency(Number(s.amountPaid ?? 0), s.currency ?? "USD")} />
          <DetailItem icon={<Tag size={15} />} label="Payment Status" value={s.paymentStatus} />
        </div>
      </Card>
    </div>
  );
}

function DetailItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
      <span className="text-primary shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-text/40 uppercase tracking-wider">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-text hover:text-primary transition-colors break-all font-medium">{value}</a>
        ) : (
          <p className="text-sm text-text font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}
