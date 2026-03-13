import type { TeamMember } from "@/domain/types";
import { sql } from "./client";

export async function getTeamMembers(): Promise<TeamMember[]> {
	const rows = await sql`SELECT id, name, role, email FROM teams ORDER BY name`;
	return rows as TeamMember[];
}
