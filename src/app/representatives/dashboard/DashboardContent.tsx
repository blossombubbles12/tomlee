"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Plus, Upload, Eye, TrendingUp, DollarSign, Target, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero";

const STUDENTS_DATA = [
  { name: "John Doe", institution: "GIIA", program: "ISO 19011", amount: "₦15,000", date: "10/06/26" },
  { name: "Mary Jones", institution: "GLI", program: "Leadership", amount: "₦35,000", date: "12/06/26" },
];

const CONSULTING_DATA = [
  { company: "ABC Ltd", service: "ISO 9001", value: "₦2,000,000", status: "Proposal" },
  { company: "XYZ Ltd", service: "Internal Audit", value: "₦800,000", status: "Discussion" },
];

type Tab = "students" | "consulting";

const STATUS_COLORS: Record<string, string> = {
  Proposal: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Discussion: "text-blue-600 bg-blue-50 border-blue-200",
  Won: "text-green-600 bg-green-50 border-green-200",
  Lost: "text-red-600 bg-red-50 border-red-200",
};

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState<Tab>("students");

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Representative Dashboard"
        subtitle="Manage your students, consulting leads, and track commissions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Representatives", href: "/representatives" },
          { label: "Dashboard" },
        ]}
      />

      <section className="py-12 md:py-16 bg-surface">
        <div className="container mx-auto">
          {/* Tab Navigation */}
          <div className="flex border-b border-secondary/10 mb-8">
            <button
              onClick={() => setActiveTab("students")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold border-b-2 transition-colors ${
                activeTab === "students"
                  ? "border-primary text-primary"
                  : "border-transparent text-text/70 hover:text-text/85"
              }`}
            >
              <Users size={16} />
              Students
            </button>
            <button
              onClick={() => setActiveTab("consulting")}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-heading font-semibold border-b-2 transition-colors ${
                activeTab === "consulting"
                  ? "border-primary text-primary"
                  : "border-transparent text-text/70 hover:text-text/85"
              }`}
            >
              <Briefcase size={16} />
              Consulting
            </button>
          </div>

          {activeTab === "students" && (
            <motion.div
              key="students"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-secondary/10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Revenue Generated</span>
                    <TrendingUp size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">₦2,500,000</p>
                </div>
                <div className="bg-white border border-secondary/10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Students</span>
                    <Users size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">15</p>
                </div>
                <div className="bg-white border border-secondary/10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Commission</span>
                    <DollarSign size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">₦625,000</p>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-secondary/10 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-secondary/10 bg-surface">
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Student Name</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Institution</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Program</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Amount Paid</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS_DATA.map((student) => (
                      <tr key={student.name} className="border-b border-secondary/5 hover:bg-surface/50 transition-colors">
                        <td className="px-5 py-4 text-sm text-text">{student.name}</td>
                        <td className="px-5 py-4 text-sm text-text/85">{student.institution}</td>
                        <td className="px-5 py-4 text-sm text-text/85">{student.program}</td>
                        <td className="px-5 py-4 text-sm text-text font-medium">{student.amount}</td>
                        <td className="px-5 py-4 text-sm text-text/80">{student.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-heading font-semibold hover:bg-secondary transition-colors">
                  <Plus size={14} /> Add Student
                </button>
                <button className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 text-xs font-heading font-semibold hover:bg-primary hover:text-white transition-colors">
                  <Upload size={14} /> Upload Payment Evidence
                </button>
                <button className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 text-xs font-heading font-semibold hover:bg-primary transition-colors">
                  <Eye size={14} /> View Commission
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "consulting" && (
            <motion.div
              key="consulting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-secondary/10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Leads</span>
                    <Target size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">8</p>
                </div>
                <div className="bg-white border border-secondary/10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Won Projects</span>
                    <CheckCircle size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">3</p>
                </div>
                <div className="bg-white border border-secondary/10 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Project Value</span>
                    <DollarSign size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">₦5,000,000</p>
                </div>
              </div>

              {/* Extra stat row */}
              <div className="mb-8">
                <div className="bg-white border border-secondary/10 p-5 inline-block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text/70 text-xs font-heading font-semibold uppercase tracking-wide">Commission</span>
                    <DollarSign size={18} className="text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="text-2xl font-heading font-bold text-text">₦1,000,000</p>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white border border-secondary/10 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-secondary/10 bg-surface">
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Company</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Service</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Estimated Value</th>
                      <th className="px-5 py-3 text-xs font-heading font-semibold text-text/80 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONSULTING_DATA.map((lead) => (
                      <tr key={lead.company} className="border-b border-secondary/5 hover:bg-surface/50 transition-colors">
                        <td className="px-5 py-4 text-sm text-text font-medium">{lead.company}</td>
                        <td className="px-5 py-4 text-sm text-text/85">{lead.service}</td>
                        <td className="px-5 py-4 text-sm text-text">{lead.value}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-block text-xs font-heading font-semibold px-3 py-1 border ${STATUS_COLORS[lead.status] || "text-text/80 bg-surface border-secondary/10"}`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-xs font-heading font-semibold hover:bg-secondary transition-colors">
                  <Plus size={14} /> Add Lead
                </button>
                <button className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 text-xs font-heading font-semibold hover:bg-primary hover:text-white transition-colors">
                  <Upload size={14} /> Update Status
                </button>
                <button className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2.5 text-xs font-heading font-semibold hover:bg-primary transition-colors">
                  <Eye size={14} /> View Commission
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
