ALTER TABLE "orders" ALTER COLUMN "documents" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "fulfillment_type" text DEFAULT 'delivery' NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "state" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "city" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "latitude" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "longitude" text;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "copies";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "paper_type";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "print_instructions";