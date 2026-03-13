import type { ProjectFormInput, ProjectWithRaci } from "@/domain/types";
import { sql } from "./client";

export async function getProjects(): Promise<ProjectWithRaci[]> {
	const rows = await sql`
		SELECT
			p.id,
			p.name,
			p.description,
			p.status,
			p.github_url,
			p.responsible_id,
			p.accountable_id,
			p.consulted_id,
			p.informed_id,
			p.created_at,
			p.updated_at,
			r.id as r_id, r.name as r_name, r.role as r_role, r.email as r_email,
			a.id as a_id, a.name as a_name, a.role as a_role, a.email as a_email,
			c.id as c_id, c.name as c_name, c.role as c_role, c.email as c_email,
			i.id as i_id, i.name as i_name, i.role as i_role, i.email as i_email
		FROM projects p
		LEFT JOIN teams r ON p.responsible_id = r.id
		LEFT JOIN teams a ON p.accountable_id = a.id
		LEFT JOIN teams c ON p.consulted_id = c.id
		LEFT JOIN teams i ON p.informed_id = i.id
		ORDER BY p.updated_at DESC
	`;

	return rows.map((row) => ({
		id: row.id as number,
		name: row.name as string,
		description: row.description as string | null,
		status: row.status as ProjectWithRaci["status"],
		github_url: row.github_url as string | null,
		responsible_id: row.responsible_id as number | null,
		accountable_id: row.accountable_id as number | null,
		consulted_id: row.consulted_id as number | null,
		informed_id: row.informed_id as number | null,
		created_at: row.created_at as string,
		updated_at: row.updated_at as string,
		responsible: row.r_id
			? {
					id: row.r_id as number,
					name: row.r_name as string,
					role: row.r_role as string,
					email: row.r_email as string,
				}
			: null,
		accountable: row.a_id
			? {
					id: row.a_id as number,
					name: row.a_name as string,
					role: row.a_role as string,
					email: row.a_email as string,
				}
			: null,
		consulted: row.c_id
			? {
					id: row.c_id as number,
					name: row.c_name as string,
					role: row.c_role as string,
					email: row.c_email as string,
				}
			: null,
		informed: row.i_id
			? {
					id: row.i_id as number,
					name: row.i_name as string,
					role: row.i_role as string,
					email: row.i_email as string,
				}
			: null,
	}));
}

export async function createProject(input: ProjectFormInput): Promise<void> {
	await sql`
		INSERT INTO projects (name, description, status, github_url, responsible_id, accountable_id, consulted_id, informed_id)
		VALUES (
			${input.name},
			${input.description || null},
			${input.status},
			${input.github_url || null},
			${input.responsible_id},
			${input.accountable_id},
			${input.consulted_id},
			${input.informed_id}
		)
	`;
}

export async function updateProject(id: number, input: ProjectFormInput): Promise<void> {
	await sql`
		UPDATE projects SET
			name = ${input.name},
			description = ${input.description || null},
			status = ${input.status},
			github_url = ${input.github_url || null},
			responsible_id = ${input.responsible_id},
			accountable_id = ${input.accountable_id},
			consulted_id = ${input.consulted_id},
			informed_id = ${input.informed_id},
			updated_at = NOW()
		WHERE id = ${id}
	`;
}

export async function deleteProject(id: number): Promise<void> {
	await sql`DELETE FROM projects WHERE id = ${id}`;
}
