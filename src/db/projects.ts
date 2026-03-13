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
			r.id as r_id, r.first_name as r_first_name, r.last_name as r_last_name, r.photo as r_photo,
			a.id as a_id, a.first_name as a_first_name, a.last_name as a_last_name, a.photo as a_photo,
			c.id as c_id, c.first_name as c_first_name, c.last_name as c_last_name, c.photo as c_photo,
			i.id as i_id, i.first_name as i_first_name, i.last_name as i_last_name, i.photo as i_photo
		FROM projects p
		LEFT JOIN teams r ON p.responsible_id = r.id
		LEFT JOIN teams a ON p.accountable_id = a.id
		LEFT JOIN teams c ON p.consulted_id = c.id
		LEFT JOIN teams i ON p.informed_id = i.id
		ORDER BY p.updated_at DESC
	`;

	return rows.map((row) => ({
		id: row.id as string,
		name: row.name as string,
		description: row.description as string | null,
		status: row.status as ProjectWithRaci["status"],
		github_url: row.github_url as string | null,
		responsible_id: row.responsible_id as string | null,
		accountable_id: row.accountable_id as string | null,
		consulted_id: row.consulted_id as string | null,
		informed_id: row.informed_id as string | null,
		created_at: row.created_at as string,
		updated_at: row.updated_at as string,
		responsible: row.r_id
			? {
					id: row.r_id as string,
					first_name: row.r_first_name as string,
					last_name: row.r_last_name as string,
					photo: row.r_photo as string | null,
				}
			: null,
		accountable: row.a_id
			? {
					id: row.a_id as string,
					first_name: row.a_first_name as string,
					last_name: row.a_last_name as string,
					photo: row.a_photo as string | null,
				}
			: null,
		consulted: row.c_id
			? {
					id: row.c_id as string,
					first_name: row.c_first_name as string,
					last_name: row.c_last_name as string,
					photo: row.c_photo as string | null,
				}
			: null,
		informed: row.i_id
			? {
					id: row.i_id as string,
					first_name: row.i_first_name as string,
					last_name: row.i_last_name as string,
					photo: row.i_photo as string | null,
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

export async function updateProject(id: string, input: ProjectFormInput): Promise<void> {
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

export async function deleteProject(id: string): Promise<void> {
	await sql`DELETE FROM projects WHERE id = ${id}`;
}
