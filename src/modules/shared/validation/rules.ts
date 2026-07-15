export const validators = {
  required: (value: string, fieldName: string): string | null =>
    !value?.trim() ? `${fieldName} is required.` : null,

  email: (value: string): string | null =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "A valid email address is required." : null,

  minLength: (min: number) => (value: string, fieldName: string): string | null =>
    value.trim().length < min ? `${fieldName} must be at least ${min} characters.` : null,

  phone: (value: string): string | null =>
    !value?.trim() ? null : /^[\d\s+\-()]{7,20}$/.test(value) ? null : "Please enter a valid phone number.",

  url: (value: string): string | null =>
    !value?.trim() ? null : /^https?:\/\/.+/.test(value) ? null : "Please enter a valid URL starting with http:// or https://",
};

export function validate(rules: Record<string, (value: string) => string | null>, data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const [field, rule] of Object.entries(rules)) {
    const error = rule(data[field] ?? "");
    if (error) errors[field] = error;
  }
  return errors;
}
