import { forwardRef, type SelectHTMLAttributes } from "react";
import type { SelectOption } from "../../types/common";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  wrapperClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, wrapperClassName, className = "", id, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className={wrapperClassName}>
        {label && (
          <label htmlFor={selectId} className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full border bg-surface px-4 py-2.5 text-sm text-text focus:outline-none focus:border-primary transition-colors ${
            error ? "border-red-400" : "border-secondary/20"
          } ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value as string} value={opt.value as string}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
