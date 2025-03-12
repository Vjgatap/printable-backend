import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  phone: text("phone").unique()
});

export const merchants = pgTable("merchants", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  shopName: text("shop_name").notNull(),
  address: text("address").notNull(),
  contact: text("contact").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  merchantId: text("merchant_id").references(() => merchants.id, { onDelete: "cascade" }),
  status: text("status").default("pending").notNull(), // e.g., pending, accepted, printing, completed, etc.
  totalAmount: integer("total_amount").notNull(),
  copies: integer("copies").default(1).notNull(), // Number of copies to print
  paperType: text("paper_type"), // e.g., A4, Letter, Glossy, etc.
  printInstructions: text("print_instructions"), // Special instructions for the print order
  documents: jsonb("documents"), // JSON array to hold document metadata (e.g., file name, URL, etc.)
  paymentMethod: text("payment_method").notNull(), // e.g., online, COD, etc.
  scheduledPrintTime: timestamp("scheduled_print_time"), // Scheduled print time (optional)
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
