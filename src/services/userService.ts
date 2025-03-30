import { users, merchants } from "../db/schema.ts";
import { db } from "../configs/db.ts";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { getDistanceMatrix } from "./distanceMatrixService.ts";
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

  public async updateUser(payload: UserUpdatePayload, id: string) {
    const { name, email, phone, state, city, address, latitude, longitude } =
      payload;

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
        updatedAt: new Date(),
      })
      .where(eq(users.id, id));

    return result;
  }

  public async getNearestMerchants(lat: string, long: string) {
    const distanceExpression = sql<string>`(
      6371 * acos(
        cos(radians(${lat})) * cos(radians(cast(${users}.latitude as numeric))) *
        cos(radians(cast(${users}.longitude as numeric)) - radians(${long})) +
        sin(radians(${lat})) * sin(radians(cast(${users}.latitude as numeric)))
      )
    )`;
    console.log({ lat, long });

    const nearestMerchantsQuery = db
      .select({
        merchantId: merchants.id,
        shopName: merchants.shopName,
        MerchantImages:merchants.shopImages,
        distance: distanceExpression, 
        lat:users.latitude,
        long:users.longitude
      })
      .from(merchants)
      // Join with the users table to access lat/long columns from the related user
      .innerJoin(users, sql`${merchants.userId} = ${users.id}`)
      // Order by the computed distance
      .orderBy(distanceExpression)
      // Limit to top 10 nearest merchants
      .limit(10);
    //
    const nearestMerchants = await nearestMerchantsQuery.execute();
 
    const distanceMatrix = await getDistanceMatrix([Number(lat),Number(long)],nearestMerchants) 
    return distanceMatrix
    // const distanceMatrix = await getDistanceMatrix([Number(lat),Number(long)],destinations)
  }
}
