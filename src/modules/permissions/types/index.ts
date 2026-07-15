export type Role = "superadmin" | "admin" | "country_director" | "representative" | "finance_officer";

export type Permission =
  | "dashboard:view"
  | "dashboard:view_analytics"
  | "representatives:list"
  | "representatives:view"
  | "representatives:approve"
  | "representatives:reject"
  | "representatives:manage"
  | "countries:list"
  | "countries:view"
  | "countries:manage"
  | "students:list"
  | "students:view"
  | "students:create"
  | "students:manage"
  | "programs:list"
  | "programs:view"
  | "programs:manage"
  | "payments:list"
  | "payments:view"
  | "payments:manage"
  | "commissions:list"
  | "commissions:view"
  | "commissions:manage"
  | "commissions:approve"
  | "leads:list"
  | "leads:view"
  | "leads:create"
  | "leads:manage"
  | "partnerships:list"
  | "partnerships:view"
  | "partnerships:manage"
  | "enquiries:list"
  | "enquiries:view"
  | "enquiries:delete"
  | "reports:view"
  | "reports:export"
  | "settings:view"
  | "settings:manage"
  | "users:list"
  | "users:manage"
  | "audit:view";

export interface PermissionCheck {
  permission: Permission;
  resourceId?: string | number;
  resourceOwnerId?: string | number;
}
