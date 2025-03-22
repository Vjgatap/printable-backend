import { users } from "../db/schema.ts";
import { db } from "../configs/db.ts";
import { eq } from "drizzle-orm";

export interface UserUpdatePayload {
  id: string;
  name: string;
  email: string;
  phone?: string;
  state?: string;
  city?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export class UserService {

  public async getUser(id: string) {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result.length > 0 ? result[0] : null;
  }

  public async updateUser(payload: UserUpdatePayload,id:string) {
    const {
      name,
      email,
      phone,
      state,
      city,
      address,
      latitude,
      longitude,
    } = payload;


    const result = await db
      .update(users)
      .set({
        name,
        email,
        phone,
        state,
        city,
        address,
        latitude,
        longitude,
        updatedAt:new Date()
      })
      .where(eq(users.id, id));

    return result;
  }
}
