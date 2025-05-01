import {
  files,
  signatureStatus,
  signRequestedFiles,
  signRequests,
  users,
} from "../db/schema.ts";
import { db } from "../configs/db.ts";
import { inArray } from "drizzle-orm";

export interface esignRequestPayload {
  requestedBy: number;
  fileIds: number[];
  signers_email: string[];
  link: string;
}
export interface FilePayload {
  ownerId: string;
  fileName: string;
  fileKey: string;
  fileSize: number;
  fileType: string;
}
export class EsignService {
  async createFile(payload: FilePayload) {
    const id = crypto.randomUUID();

    const result = await db
      .insert(files)
      .values({
        id,
        ...payload,
      })
      .returning();
    return result[0];
  }

  async isValidSigner() {
    //when clicked on link it must check either the user is valid as signers
  }
  async getSignedNotification() {
    //if signer is valid and submited the signed document then send notification
  }

  async sendSigningRequest(payload: esignRequestPayload) {
    const id = crypto.randomUUID();

    const res = await db.transaction(async (tx) => {
      //create signRequest record in signRequest table
      const [signRequest] = await tx
        .insert(signRequests)
        .values({
          id,
          requestedBy: payload.requestedBy,
          status: "pending",
        })
        .returning({ id: signRequests.id });

      const fileEntries = payload.fileIds.map((fileId) => ({
        fileId,
        requestId: signRequest.id,
      }));
      // create entry within signRequestFiles of newSignRequests
      await tx.insert(signRequestedFiles).values(fileEntries);

      // Fetch registered users in a single query
      const existingUsers = await tx
        .select({ id: users.id, email: users.email })
        .from(users)
        .where(inArray(users.email, payload.signers_email));

      const userMap = new Map(
        existingUsers.map((user) => [user.email, user.id]),
      );

      const signatureEntries = payload.signers_email.map((email) => ({
        requestId: signRequest.id,
        userId: userMap.get(email) || null, // use userId if found
        email: userMap.has(email) ? null : email, // store email if unregistered
        status: "pending",
      }));

      await tx.insert(signatureStatus).values(signatureEntries);

      return true;
    });
    if (res) {
      // after generate link and send email
      // next to proceed
      //
    }
  }
}
