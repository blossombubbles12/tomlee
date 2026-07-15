import type { ReactNode } from "react";

export interface KpiItem {
  label: string;
  value: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  trend?: number;
  trendLabel?: string;
}
