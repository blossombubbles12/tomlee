import type { Role } from "@/modules/permissions/types";

export interface AuthState {
  user: SessionUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: Role;
  countryId?: number | null;
  representativeId?: number | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  role?: Role;
}
