CREATE TABLE IF NOT EXISTS "routines" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"goal" text,
	"user_id" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "exercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"comment" text,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"weight" numeric,
	"routine_id" integer NOT NULL REFERENCES "routines"("id"),
	"createdAt" timestamp with time zone DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "exercises_routine_idx" ON "exercises" ("routine_id");
CREATE INDEX IF NOT EXISTS "routines_user_idx" ON "routines" ("user_id");
