export interface EnquiryType {
  value: "contact" | "get-started" | "corporate-training";
  label: string;
}

export interface EnquiryStats {
  total: number;
  byType: Record<string, number>;
}
