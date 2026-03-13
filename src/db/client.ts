import { neon } from "@neondatabase/serverless";

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("VITE_DATABASE_URL environment variable is required");
}

export const sql = neon(DATABASE_URL);
