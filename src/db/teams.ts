import type { TeamMember } from "@/domain/types";
import { sql } from "./client";

export async function getTeamMembers(): Promise<TeamMember[]> {
	const rows = await sql`SELECT id, first_name, last_name, photo FROM teams ORDER BY first_name`;
	return rows as TeamMember[];
}
