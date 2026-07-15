import type { Role, Permission } from "../types";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  superadmin: [
    "dashboard:view", "dashboard:view_analytics",
    "representatives:list", "representatives:view", "representatives:approve", "representatives:reject", "representatives:manage",
    "countries:list", "countries:view", "countries:manage",
    "students:list", "students:view", "students:create", "students:manage",
    "programs:list", "programs:view", "programs:manage",
    "payments:list", "payments:view", "payments:manage",
    "commissions:list", "commissions:view", "commissions:manage", "commissions:approve",
    "leads:list", "leads:view", "leads:create", "leads:manage",
    "partnerships:list", "partnerships:view", "partnerships:manage",
    "enquiries:list", "enquiries:view", "enquiries:delete",
    "reports:view", "reports:export",
    "settings:view", "settings:manage",
    "users:list", "users:manage",
    "audit:view",
  ],
  admin: [
    "dashboard:view", "dashboard:view_analytics",
    "representatives:list", "representatives:view", "representatives:approve", "representatives:reject",
    "countries:list", "countries:view",
    "students:list", "students:view",
    "programs:list", "programs:view",
    "payments:list", "payments:view",
    "commissions:list", "commissions:view",
    "leads:list", "leads:view",
    "partnerships:list", "partnerships:view",
    "enquiries:list", "enquiries:view", "enquiries:delete",
    "reports:view", "reports:export",
    "settings:view", "settings:manage",
  ],
  country_director: [
    "dashboard:view",
    "representatives:list", "representatives:view",
    "countries:list", "countries:view",
    "students:list", "students:view", "students:create",
    "programs:list", "programs:view",
    "payments:list", "payments:view",
    "commissions:list", "commissions:view",
    "leads:list", "leads:view", "leads:create",
    "reports:view",
  ],
  representative: [
    "dashboard:view",
    "students:list", "students:view", "students:create",
    "leads:list", "leads:view", "leads:create",
    "commissions:list", "commissions:view",
  ],
  finance_officer: [
    "dashboard:view",
    "payments:list", "payments:view", "payments:manage",
    "commissions:list", "commissions:view", "commissions:approve",
    "reports:view", "reports:export",
  ],
};

export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export function hasPermission(role: Role, permission: Permission): boolean {
  return getRolePermissions(role).includes(permission);
}

export function requirePermission(role: Role, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Forbidden: missing permission "${permission}"`);
  }
}

export function getAllPermissions(): Permission[] {
  return Array.from(new Set(Object.values(ROLE_PERMISSIONS).flat()));
}
