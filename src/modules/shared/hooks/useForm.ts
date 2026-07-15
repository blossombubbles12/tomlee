"use client";

import { useState, useCallback } from "react";

interface UseFormOptions<T extends Record<string, string>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<{ success: boolean; error?: string }>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, string>>({ initialValues, onSubmit, validate: validateFn }: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof T]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  const setFieldValue = useCallback((name: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (validateFn) {
      const validationErrors = validateFn(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    setStatus("submitting");
    try {
      const result = await onSubmit(values);
      if (result.success) {
        setStatus("success");
        setValues(initialValues);
        setErrors({});
      } else {
        setStatus("error");
        setFormError(result.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setFormError("Something went wrong. Please try again.");
    }
  }, [values, validateFn, onSubmit, initialValues]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
    setFormError("");
  }, [initialValues]);

  return {
    values, errors, status, formError,
    handleChange, handleSubmit, setFieldValue, reset, setValues,
  };
}
