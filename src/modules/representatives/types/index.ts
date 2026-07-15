export interface RepresentativeStatus {
  value: "pending" | "approved" | "rejected" | "suspended";
  label: string;
}

export interface RepresentativeStats {
  total: number;
  pending: number;
  approved: number;
  uniqueCountries: number;
}

export interface RepApplicationFormData {
  fullName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  occupation?: string;
  organisation?: string;
  linkedin?: string;
  experience?: string;
  areasOfInterest?: string;
  cvUrl?: string;
}
