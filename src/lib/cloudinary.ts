import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
}

export async function uploadCv(buffer: Buffer, fileName: string): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "worldimpact/cvs",
        resource_type: "raw",
        public_id: `cv-${Date.now()}-${cleanName}`,
      },
      (err, result) => {
        if (err || !result) return reject(err || new Error("Upload failed"));
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
          format: result.format,
        });
      }
    );
    uploadStream.end(buffer);
  });
}
