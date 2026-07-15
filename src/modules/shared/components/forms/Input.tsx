import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, wrapperClassName, className = "", id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className={wrapperClassName}>
        {label && (
          <label htmlFor={inputId} className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors ${
            error ? "border-red-400" : "border-secondary/20"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
