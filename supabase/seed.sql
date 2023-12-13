CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"sets" integer NOT NULL,
	"repetitions" integer NOT NULL,
	"weight" numeric,
	"routine_id" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "routines" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "exercises_routine_idx" ON "exercises" ("routine_id");
CREATE INDEX IF NOT EXISTS "routines_user_idx" ON "routines" ("user_id");

DO $$ BEGIN
 ALTER TABLE "exercises" ADD CONSTRAINT "exercises_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

