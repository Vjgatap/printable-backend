ALTER TABLE "merchants" ADD COLUMN "images" text[] DEFAULT ARRAY[]::text[];--> statement-breakpoint
ALTER TABLE "merchants" DROP COLUMN "address";--> statement-breakpoint
ALTER TABLE "merchants" DROP COLUMN "contact";