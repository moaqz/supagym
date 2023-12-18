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
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"routine_id" integer NOT NULL REFERENCES "routines"("id"),
	"user_id" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "exercise_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"exercise_id" integer NOT NULL REFERENCES "exercises"("id"),
	"routine_id" integer NOT NULL REFERENCES "routines"("id"),
	"createdAt" timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "exercises_routine_idx" ON "exercises" ("routine_id");
CREATE INDEX IF NOT EXISTS "routines_user_idx" ON "routines" ("user_id");
CREATE INDEX IF NOT EXISTS "exercises_user_id_idx" ON "exercises" ("user_id");
CREATE INDEX IF NOT EXISTS "exercise_logs_routine_id" ON "exercise_logs" ("routine_id");
