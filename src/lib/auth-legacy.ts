// Legacy types kept for backward compatibility
export interface JwtPayload {
  id: number;
  email: string;
  name: string;
  role: "superadmin" | "admin";
}
