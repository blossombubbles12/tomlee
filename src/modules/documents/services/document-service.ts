import { uploadCv } from "@/lib/cloudinary";

export class DocumentService {
  async uploadFile(file: File): Promise<{ url?: string; error?: string }> {
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadCv(buffer, file.name);
      return { url: result.secure_url };
    } catch {
      return { error: "Upload failed" };
    }
  }

  getFileUrl(representativeId: number): string {
    return `/api/cv/${representativeId}`;
  }
}

export const documentService = new DocumentService();
