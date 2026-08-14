import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, Building2, Linkedin, FileText, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { representativeApplications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { approveApplication, rejectApplication, deleteApplication } from "../../actions";
import DeleteButton from "../../DeleteButton";
import StatusActionButtons from "../../StatusActionButtons";

export const metadata: Metadata = {
  title: "Application Details — Tomlee Home Care",
  robots: { index: false, follow: false },
};

const STATUS_CONFIG = {
  pending: { label: "Pending", class: "badge-warning" },
  approved: { label: "Approved", class: "badge-success" },
  rejected: { label: "Rejected", class: "badge-danger" },
} as const;

export default async function ApplicationDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const [app] = await db
    .select()
    .from(representativeApplications)
    .where(eq(representativeApplications.id, parseInt(id)))
    .limit(1);

  if (!app) notFound();

  const statusCfg = STATUS_CONFIG[app.status as keyof typeof STATUS_CONFIG] || { label: app.status, class: "badge-neutral" };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Link href="/admin/dashboard/applications"
          className="inline-flex items-center gap-1.5 text-xs text-text/40 hover:text-primary transition-colors w-fit">
          <ArrowLeft size={13} /> Back to Applications
        </Link>
        <div className="flex items-center gap-2">
          <StatusActionButtons
            status={app.status}
            onApprove={async () => { "use server"; return await approveApplication(app.id); }}
            onReject={async () => { "use server"; return await rejectApplication(app.id); }}
          />
          <DeleteButton onDelete={async () => { "use server"; return await deleteApplication(app.id); }} />
        </div>
      </div>

      {/* Applicant Info Header */}
      <div className="dashboard-card rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-heading font-bold text-lg shrink-0">
              {app.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-text">{app.fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={12} className="text-text/30" />
                <p className="text-xs text-text/40">
                  Applied {new Date(app.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
                </p>
              </div>
            </div>
          </div>
          <span className={`self-start badge ${statusCfg.class}`}>{statusCfg.label}</span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="dashboard-card rounded-xl p-5">
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <Mail size={13} className="text-primary" /> Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
            <Mail size={15} className="text-primary shrink-0 mt-0.5" />
            <div className="min-w-0">
              <p className="text-[10px] text-text/40 uppercase tracking-wider">Email</p>
              <a href={`mailto:${app.email}`} className="text-sm text-text hover:text-primary transition-colors break-all font-medium">
                {app.email}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
            <Phone size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-text/40 uppercase tracking-wider">Phone</p>
              <a href={`tel:${app.phone}`} className="text-sm text-text hover:text-primary transition-colors font-medium">
                {app.phone}
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
            <MapPin size={15} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-text/40 uppercase tracking-wider">Location</p>
              <p className="text-sm text-text font-medium">{app.city}, {app.country}</p>
            </div>
          </div>
          {app.linkedin && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
              <Linkedin size={15} className="text-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-[10px] text-text/40 uppercase tracking-wider">LinkedIn</p>
                <a href={app.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-secondary transition-colors truncate block font-medium">
                  {app.linkedin}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professional Information */}
      <div className="dashboard-card rounded-xl p-5">
        <h3 className="text-xs font-heading font-bold text-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <Briefcase size={13} className="text-primary" /> Professional Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {app.occupation && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
              <Briefcase size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-text/40 uppercase tracking-wider">Occupation</p>
                <p className="text-sm text-text font-medium">{app.occupation}</p>
              </div>
            </div>
          )}
          {app.organisation && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
              <Building2 size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-text/40 uppercase tracking-wider">Organisation</p>
                <p className="text-sm text-text font-medium">{app.organisation}</p>
              </div>
            </div>
          )}
        </div>

        {app.experience && (
          <div className="mt-5 pt-5 border-t border-secondary/5">
            <p className="text-[10px] text-text/40 uppercase tracking-wider mb-2">Professional Experience</p>
            <p className="text-sm text-text/70 whitespace-pre-wrap leading-relaxed bg-surface/50 rounded-lg p-4">{app.experience}</p>
          </div>
        )}

        {app.areasOfInterest && (
          <div className="mt-5 pt-5 border-t border-secondary/5">
            <p className="text-[10px] text-text/40 uppercase tracking-wider mb-3">Areas of Interest</p>
            <div className="flex flex-wrap gap-2">
              {app.areasOfInterest.split(", ").map((area) => (
                <span key={area} className="badge badge-primary">{area}</span>
              ))}
            </div>
          </div>
        )}

        {app.cvUrl && (
          <div className="mt-5 pt-5 border-t border-secondary/5">
            <p className="text-[10px] text-text/40 uppercase tracking-wider mb-3">CV / Resume</p>
            <a href={`/api/cv/${app.id}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors">
              <FileText size={15} /> View CV
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
