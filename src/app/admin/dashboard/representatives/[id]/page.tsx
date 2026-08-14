import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Building2, Linkedin, Calendar, Users, DollarSign } from "lucide-react";
import { representativeService } from "@/modules/representatives/services/representative-service";
import { StatusBadge } from "@/modules/shared/components/ui/StatusBadge";
import { Card } from "@/modules/shared/components/ui/Card";
import { formatDate, formatCurrency } from "@/modules/shared/utils/format";
import { deleteRepresentative } from "../../actions";
import DeleteButton from "../../DeleteButton";

export const metadata: Metadata = {
  title: "Representative Details — Tomlee Home Care",
  robots: { index: false, follow: false },
};

export default async function RepresentativeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rep = await representativeService.findById(parseInt(id));
  if (!rep) notFound();

  const r = rep as any;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard/representatives"
          className="inline-flex items-center gap-1.5 text-xs text-text/40 hover:text-primary transition-colors w-fit">
          <ArrowLeft size={13} /> Back to Representatives
        </Link>
        <DeleteButton onDelete={async () => { "use server"; return await deleteRepresentative(r.id); }} />
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
              {r.fullName?.charAt(0)?.toUpperCase() ?? "?"}
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-text">{r.fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={12} className="text-text/30" />
                <p className="text-xs text-text/40">Applied {formatDate(r.createdAt, "full")}</p>
              </div>
            </div>
          </div>
          <StatusBadge status={r.status} />
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <Mail size={13} className="text-primary" /> Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ContactItem icon={<Mail size={15} />} label="Email" value={r.email} href={`mailto:${r.email}`} />
          <ContactItem icon={<Phone size={15} />} label="Phone" value={r.phone} href={`tel:${r.phone}`} />
          <ContactItem icon={<MapPin size={15} />} label="Location" value={`${r.city}, ${r.countryName ?? ""}`} />
          {r.linkedin && <ContactItem icon={<Linkedin size={15} />} label="LinkedIn" value={r.linkedin} href={r.linkedin} />}
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <Briefcase size={13} className="text-primary" /> Professional Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {r.occupation && <ContactItem icon={<Briefcase size={15} />} label="Occupation" value={r.occupation} />}
          {r.organisation && <ContactItem icon={<Building2 size={15} />} label="Organisation" value={r.organisation} />}
        </div>
        {r.experience && (
          <div className="mt-5 pt-5 border-t border-secondary/5">
            <p className="text-[10px] text-text/40 uppercase tracking-wider mb-2">Professional Experience</p>
            <p className="text-sm text-text/70 whitespace-pre-wrap leading-relaxed bg-surface/50 rounded-lg p-4">{r.experience}</p>
          </div>
        )}
        {r.areasOfInterest && (
          <div className="mt-5 pt-5 border-t border-secondary/5">
            <p className="text-[10px] text-text/40 uppercase tracking-wider mb-3">Areas of Interest</p>
            <div className="flex flex-wrap gap-2">
              {String(r.areasOfInterest).split(", ").map((area: string) => (
                <span key={area} className="badge badge-primary">{area}</span>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card>
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <DollarSign size={13} className="text-primary" /> Performance
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-surface/50 rounded-lg text-center">
            <Users size={18} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-text">{r.totalStudents ?? 0}</p>
            <p className="text-[11px] text-text/50">Students</p>
          </div>
          <div className="p-4 bg-surface/50 rounded-lg text-center">
            <DollarSign size={18} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-text">{formatCurrency(Number(r.totalRevenue ?? 0))}</p>
            <p className="text-[11px] text-text/50">Revenue</p>
          </div>
          <div className="p-4 bg-surface/50 rounded-lg text-center">
            <DollarSign size={18} className="text-primary mx-auto mb-2" />
            <p className="text-2xl font-heading font-bold text-text">{formatCurrency(Number(r.totalCommissions ?? 0))}</p>
            <p className="text-[11px] text-text/50">Commissions</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
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
