import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "npm:@aws-sdk/client-s3@3.540.0";
import { getSignedUrl } from "npm:@aws-sdk/s3-request-presigner@3.540.0";
import s3 from "../configs/s3.ts";

const BUCKET = Deno.env.get("BUCKET_NAME") || "";

export default {
  async uploadFile(file: Uint8Array, key: string) {
    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file,
    }));
    return key;
  },

  async getTempUrl(key: string, expiresIn = 600) {
    return await getSignedUrl(s3, new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }), { expiresIn });
  },

  async cleanupFile(key: string) {
    await s3.send(new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }));
  }
};