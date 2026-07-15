import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  cell: (item: T) => ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  emptyState?: ReactNode;
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string) => void;
}

export function DataTable<T>({
  columns, data, keyExtractor, emptyState, isLoading, sortBy, sortOrder, onSort,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="dashboard-card rounded-xl overflow-hidden">
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="dashboard-card rounded-xl overflow-hidden">
        {emptyState ?? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-5">
            <p className="text-sm font-medium text-text/40">No data found</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface/50">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`table-header ${col.sortable ? "cursor-pointer hover:text-text transition-colors" : ""} ${col.className ?? ""}`}
                  onClick={() => col.sortable && onSort?.(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortBy === col.key && (
                      <span className="text-[10px]">{sortOrder === "asc" ? "▲" : "▼"}</span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="table-row">
                {columns.map((col) => (
                  <td key={col.key} className={`table-cell ${col.className ?? ""}`}>
                    {col.cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
