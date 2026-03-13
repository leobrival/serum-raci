import type { ProjectFormInput, ProjectWithRaci, RaciRole, TeamMember } from "@/domain/types";
import { sql } from "./client";

type RaciRow = {
	project_id: string;
	role: RaciRole;
	member_id: string;
	first_name: string;
	last_name: string;
	photo: string | null;
};

export async function getProjects(): Promise<ProjectWithRaci[]> {
	const [projectRows, raciRows] = await Promise.all([
		sql`
			SELECT id, name, description, status, github_url, created_at, updated_at
			FROM projects
			ORDER BY updated_at DESC
		`,
		sql`
			SELECT pr.project_id, pr.role, t.id AS member_id, t.first_name, t.last_name, t.photo
			FROM project_raci pr
			JOIN teams t ON pr.member_id = t.id
			ORDER BY t.first_name
		`,
	]);

	const raciMap = new Map<string, Record<RaciRole, TeamMember[]>>();

	for (const row of raciRows as RaciRow[]) {
		let entry = raciMap.get(row.project_id);
		if (!entry) {
			entry = { R: [], A: [], C: [], I: [] };
			raciMap.set(row.project_id, entry);
		}
		entry[row.role].push({
			id: row.member_id,
			first_name: row.first_name,
			last_name: row.last_name,
			photo: row.photo,
		});
	}

	return projectRows.map((row) => {
		const raci = raciMap.get(row.id as string) ?? { R: [], A: [], C: [], I: [] };
		return {
			id: row.id as string,
			name: row.name as string,
			description: row.description as string | null,
			status: row.status as ProjectWithRaci["status"],
			github_url: row.github_url as string | null,
			created_at: row.created_at as string,
			updated_at: row.updated_at as string,
			responsible: raci.R,
			accountable: raci.A,
			consulted: raci.C,
			informed: raci.I,
		};
	});
}

export async function createProject(input: ProjectFormInput): Promise<void> {
	const [project] = await sql`
		INSERT INTO projects (name, description, status, github_url)
		VALUES (
			${input.name},
			${input.description || null},
			${input.status},
			${input.github_url || null}
		)
		RETURNING id
	`;

	const projectId = project.id as string;
	await insertRaciAssignments(projectId, input.raci);
}

export async function updateProject(id: string, input: ProjectFormInput): Promise<void> {
	await sql`
		UPDATE projects SET
			name = ${input.name},
			description = ${input.description || null},
			status = ${input.status},
			github_url = ${input.github_url || null},
			updated_at = NOW()
		WHERE id = ${id}
	`;

	await sql`DELETE FROM project_raci WHERE project_id = ${id}`;
	await insertRaciAssignments(id, input.raci);
}

export async function deleteProject(id: string): Promise<void> {
	await sql`DELETE FROM projects WHERE id = ${id}`;
}

async function insertRaciAssignments(
	projectId: string,
	raci: Record<RaciRole, string[]>,
): Promise<void> {
	const roles: RaciRole[] = ["R", "A", "C", "I"];
	const values: [string, RaciRole, string][] = [];

	for (const role of roles) {
		for (const memberId of raci[role]) {
			values.push([projectId, role, memberId]);
		}
	}

	if (values.length === 0) return;

	for (const [pId, role, memberId] of values) {
		await sql`
			INSERT INTO project_raci (project_id, role, member_id)
			VALUES (${pId}, ${role}, ${memberId})
		`;
	}
}
