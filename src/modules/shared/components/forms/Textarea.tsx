import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, wrapperClassName, className = "", id, ...props }, ref) => {
    const textareaId = id ?? props.name;
    return (
      <div className={wrapperClassName}>
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">
            {label}
            {props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`w-full border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors resize-y ${
            error ? "border-red-400" : "border-secondary/20"
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
