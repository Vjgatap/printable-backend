import { orders } from "../db/schema.ts";
import { db } from "../configs/db.ts";
import { eq } from "drizzle-orm";

export interface OrderCreatePayload {
  userId: string;
  merchantId: string;
  totalAmount: number;
  paymentMethod: string;
  documents: any;
  scheduledPrintTime?: Date;
  fulfillmentType?: string; // "delivery" or "takeaway", default "delivery"
  state?: string;
  city?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}

export interface OrderUpdatePayload {
  status?: string;
  totalAmount?: number;
  paymentMethod?: string;
  scheduledPrintTime?: Date;
  fulfillmentType?: string;
  state?: string;
  city?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  documents?: any;
}

export class OrderService {
  public async getOrder(orderId: string) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1);
    return result.length > 0 ? result[0] : null;
  }

  public async getOrdersByMerchantId(merchantId: string) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.merchantId, merchantId));

    return result;
  }

  public async getOrdersByUserId(userId: string) {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId));
      
    return result;
  }
  public async createOrder(payload: OrderCreatePayload) {
    const id = crypto.randomUUID();
    const result = await db
      .insert(orders)
      .values({id,...payload})
      .returning();
    return result[0];
  }

  public async updateOrder(orderId: string, payload: OrderUpdatePayload) {
    const result = await db
      .update(orders)
      .set({...payload,updatedAt:new Date()})
      .where(eq(orders.id, orderId))
      .returning();
    return result[0];
  }
}
