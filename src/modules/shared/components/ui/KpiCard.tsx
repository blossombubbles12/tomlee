import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  trend?: number;
  trendLabel?: string;
  children?: ReactNode;
}

export function KpiCard({ label, value, icon, color, bgColor, trend, trendLabel, children }: KpiCardProps) {
  const isUp = trend != null ? trend >= 0 : true;
  return (
    <div className="kpi-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        {children}
      </div>
      <p className="text-xl font-heading font-bold text-text">{value}</p>
      <p className="text-[11px] text-text/50 mt-0.5">{label}</p>
      {trend != null && (
        <div className="flex items-center gap-1 mt-2">
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${isUp ? "text-success" : "text-danger"}`}>
            {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="text-[9px] text-text/30">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
