import { users } from "../db/schema.ts";
import { db } from "../configs/db.ts";
import { eq } from "drizzle-orm";

export interface UserUpdatePayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  state?: string;
  city?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export class UserService {

  public async updateUser(payload: UserUpdatePayload) {
    const {
      id,
      first_name,
      last_name,
      email,
      phone,
      state,
      city,
      address,
      latitude,
      longitude,
    } = payload;

    const name = `${first_name} ${last_name}`.trim();

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
      })
      .where(eq(users.id, id));

    return result;
  }
}
