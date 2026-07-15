"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  title?: string;
  action?: ToastAction;
  duration: number;
}

interface ToastContextValue {
  showToast: (
    message: string,
    type?: ToastType,
    options?: { title?: string; action?: ToastAction; duration?: number }
  ) => void;
  dismissToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
  dismissToast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

let nextId = 0;

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES: Record<ToastType, { container: string; icon: string; title: string }> = {
  success: {
    container: "border-green-200 bg-green-50",
    icon: "text-green-600",
    title: "text-green-800",
  },
  error: {
    container: "border-red-200 bg-red-50",
    icon: "text-red-600",
    title: "text-red-800",
  },
  warning: {
    container: "border-amber-200 bg-amber-50",
    icon: "text-amber-600",
    title: "text-amber-800",
  },
  info: {
    container: "border-blue-200 bg-blue-50",
    icon: "text-blue-600",
    title: "text-blue-800",
  },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = "success",
      options?: { title?: string; action?: ToastAction; duration?: number }
    ) => {
      const id = nextId++;
      const toast: Toast = {
        id,
        message,
        type,
        title: options?.title,
        action: options?.action,
        duration: options?.duration ?? 4000,
      };
      setToasts((prev) => [...prev, toast]);

      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, toast.duration);
      }
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <div
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type];
          const style = STYLES[toast.type];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 shadow-lg border text-sm animate-[slideUp_0.3s_ease-out] ${style.container}`}
              role="alert"
            >
              <Icon size={18} className={`shrink-0 mt-0.5 ${style.icon}`} />
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <p className={`font-semibold text-xs uppercase tracking-wide mb-0.5 ${style.title}`}>
                    {toast.title}
                  </p>
                )}
                <p className="text-text/85">{toast.message}</p>
                {toast.action && (
                  <button
                    onClick={() => {
                      toast.action!.onClick();
                      dismissToast(toast.id);
                    }}
                    className="mt-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>
              <button
                onClick={() => dismissToast(toast.id)}
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity text-text/50 hover:text-text"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
