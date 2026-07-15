export interface PaymentStatus {
  value: "pending" | "verified" | "approved" | "rejected";
  label: string;
}

export interface PaymentStats {
  total: number;
  pending: number;
  verified: number;
  totalAmount: number;
}
