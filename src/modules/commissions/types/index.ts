export interface CommissionStatus {
  value: "pending" | "approved" | "paid" | "cancelled";
  label: string;
}

export interface CommissionStats {
  total: number;
  pending: number;
  approved: number;
  paid: number;
  totalAmount: number;
}
