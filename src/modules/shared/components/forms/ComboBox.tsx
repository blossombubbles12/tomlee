"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import type { SelectOption } from "../../types/common";

interface ComboBoxProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function ComboBox({ label, name, value, onChange, options, placeholder, error, required }: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(opt: SelectOption) {
    onChange?.(opt.value as string);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <p className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </p>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between border bg-surface px-4 py-2.5 text-sm text-left transition-colors ${
          error ? "border-red-400" : "border-secondary/20"
        } ${open ? "border-primary" : ""} ${value ? "text-text" : "text-text/40"}`}
      >
        <span className="truncate">{value ? selected?.label : (placeholder ?? "Select...")}</span>
        <ChevronDown size={14} className={`shrink-0 ml-2 text-text/30 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {open && (
        <div className="absolute z-50 left-0 right-0 mt-1 border border-secondary/20 bg-surface shadow-lg max-h-60 flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-secondary/10">
            <Search size={13} className="text-text/30 shrink-0" />
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search institutions..."
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text/30"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <p className="py-4 text-center text-xs text-text/30">No results found</p>
            ) : (
              filtered.map((opt) => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value as string}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                      active ? "bg-primary/10 text-primary font-medium" : "text-text hover:bg-surface/80"
                    }`}
                  >
                    <span className={`w-4 shrink-0 ${active ? "text-primary" : "text-transparent"}`}>
                      {active && <Check size={13} />}
                    </span>
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
