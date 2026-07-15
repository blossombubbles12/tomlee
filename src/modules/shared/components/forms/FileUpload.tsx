"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, Upload, X, Loader } from "lucide-react";

interface FileUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
  error?: string;
}

const DEFAULT_ACCEPT = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

export function FileUpload({
  onUpload, value, accept = DEFAULT_ACCEPT, maxSize = DEFAULT_MAX_SIZE, label, error,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const onDrop = async (accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;
    if (f.size > maxSize) { setUploadError(`File must be under ${maxSize / 1024 / 1024}MB.`); return; }
    setFile(f);
    setUploading(true);
    setUploadError("");
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) { onUpload(data.url); } else { throw new Error("Upload failed"); }
    } catch {
      setUploadError("Upload failed. You can submit without a file.");
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxFiles: 1, maxSize });

  return (
    <div>
      {label && (
        <p className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">{label}</p>
      )}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-secondary/20 bg-surface hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader size={28} className="text-primary animate-spin" />
            <p className="text-text/60 text-sm">Uploading...</p>
          </div>
        ) : file ? (
          <div className="flex items-center justify-center gap-2">
            <FileText size={20} className="text-primary" />
            <span className="text-sm text-text/80">{file.name}</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); onUpload(""); }}
              className="text-red-400 hover:text-red-600 transition-colors">
              <X size={16} />
            </button>
          </div>
        ) : value ? (
          <div className="flex items-center justify-center gap-2">
            <FileText size={20} className="text-primary" />
            <span className="text-sm text-text/80">File uploaded</span>
            <button type="button" onClick={(e) => { e.stopPropagation(); onUpload(""); }}
              className="text-red-400 hover:text-red-600 transition-colors">
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Upload size={28} className="text-text/20" strokeWidth={1.5} />
            <p className="text-text/80 text-sm">Drop your file here or click to browse</p>
          </div>
        )}
      </div>
      {(uploadError || error) && <p className="mt-1 text-xs text-red-500">{uploadError || error}</p>}
    </div>
  );
}
