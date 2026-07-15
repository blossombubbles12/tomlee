export interface StudentStatus {
  value: "enrolled" | "completed" | "withdrawn" | "pending";
  label: string;
}

export interface StudentStats {
  total: number;
  enrolled: number;
  revenue: number;
}
