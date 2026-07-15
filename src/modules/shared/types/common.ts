export type AsyncResult<T> = { success: true; data: T } | { success: false; error: string };

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  status?: string;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
  [key: string]: unknown;
}

export interface QueryParams extends PaginationParams, SortParams, FilterParams {}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
}
