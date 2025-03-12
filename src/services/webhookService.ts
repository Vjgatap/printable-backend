import { Response, Request } from "express";
import { UserCreatedEvent, UserPayloadType } from "../types/webhook/user.ts";
import { users } from "../db/schema.ts";
import { db } from "../configs/db.ts";
import { eq } from "drizzle-orm";
export const handelWebhooks = async (req: Request, res: Response) => {
  const payload: UserPayloadType = req.body;
  console.log(payload);

  switch (payload.type) {
    case "user.created":
      try {
        const userData = payload.data;

        const response = await db.insert(users).values({
          id: userData.id,
          name: `${userData.first_name} ${userData.last_name}`,
          email: userData.email_addresses[0]?.email_address || "",
          phone: userData.phone_numbers[0],
        });

        return res.status(201).json({
          message: "User created successfully",
          user: response,
        });
      } catch (error) {
        console.error("Error inserting user:", error);
        return res.status(400).json({ error: "Failed to create user" });
      }

    case "user.deleted":
      try {
        const userData = payload.data;

        const response = await db
          .delete(users)
          .where(eq(users.id, payload.data.id));

        return res.status(204).json({
          message: "User deleted successfully",
          user: response,
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(400).json({ error: "Failed to delete user" });
      }
      break;

    case "user.updated":
      try {
        const userData = payload.data;

        const response = await db
          .update(users)
          .set({
            id: userData.id,
            name: `${userData.first_name} ${userData.last_name}`,
            email: userData.email_addresses[0]?.email_address || "", 
            phone: userData.phone_numbers[0],
          })
          .where(eq(users.id, payload.data.id));

        return res.status(202).json({
          message: "User updated successfully",
          user: response,
        });
      } catch (error) {
        console.error("Error updated user:", error);
        return res.status(500).json({ error: "Failed to update user" });
      }
      break;

    default:
      return console.log({
        error: "Unsupported event type",
        eventType: payload.type,
        payload: payload.data,
      });
  }
};
