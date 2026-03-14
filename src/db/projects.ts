import type {
	AcceptanceCriterion,
	CriterionStatus,
	ProjectCategory,
	ProjectFormInput,
	ProjectWithRaci,
	RaciRole,
	TeamMember,
} from "@/domain/types";
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
	const [projectRows, raciRows, criteriaRows] = await Promise.all([
		sql`
			SELECT id, name, description, objective, status, categories, github_url, loom_url, roi, user_story, created_at, updated_at
			FROM projects
			ORDER BY updated_at DESC
		`,
		sql`
			SELECT pr.project_id, pr.role, t.id AS member_id, t.first_name, t.last_name, t.photo
			FROM project_raci pr
			JOIN teams t ON pr.member_id = t.id
			ORDER BY t.first_name
		`,
		sql`
			SELECT id, project_id, title, given_clause, when_clause, then_clause, status
			FROM acceptance_criteria
			ORDER BY created_at
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

	const criteriaMap = new Map<string, AcceptanceCriterion[]>();
	for (const row of criteriaRows) {
		const projectId = row.project_id as string;
		let list = criteriaMap.get(projectId);
		if (!list) {
			list = [];
			criteriaMap.set(projectId, list);
		}
		list.push({
			id: row.id as string,
			title: row.title as string,
			given_clause: row.given_clause as string,
			when_clause: row.when_clause as string,
			then_clause: row.then_clause as string,
			status: row.status as CriterionStatus,
		});
	}

	return projectRows.map((row) => {
		const raci = raciMap.get(row.id as string) ?? { R: [], A: [], C: [], I: [] };
		return {
			id: row.id as string,
			name: row.name as string,
			description: row.description as string | null,
			objective: row.objective as string | null,
			status: row.status as ProjectWithRaci["status"],
			categories: (row.categories ?? []) as ProjectCategory[],
			github_url: row.github_url as string | null,
			loom_url: row.loom_url as string | null,
			roi: row.roi as string | null,
			user_story: row.user_story as string | null,
			created_at: row.created_at as string,
			updated_at: row.updated_at as string,
			responsible: raci.R,
			accountable: raci.A,
			consulted: raci.C,
			informed: raci.I,
			acceptance_criteria: criteriaMap.get(row.id as string) ?? [],
		};
	});
}

export async function createProject(input: ProjectFormInput): Promise<void> {
	const [project] = await sql`
		INSERT INTO projects (name, description, objective, status, categories, github_url, loom_url, roi, user_story)
		VALUES (
			${input.name},
			${input.description || null},
			${input.objective || null},
			${input.status},
			${input.categories},
			${input.github_url || null},
			${input.loom_url || null},
			${input.roi || null},
			${input.user_story || null}
		)
		RETURNING id
	`;

	const projectId = project.id as string;
	await insertRaciAssignments(projectId, input.raci);
	await insertAcceptanceCriteria(projectId, input.acceptance_criteria);
}

export async function updateProject(id: string, input: ProjectFormInput): Promise<void> {
	await sql`
		UPDATE projects SET
			name = ${input.name},
			description = ${input.description || null},
			objective = ${input.objective || null},
			status = ${input.status},
			categories = ${input.categories},
			github_url = ${input.github_url || null},
			loom_url = ${input.loom_url || null},
			roi = ${input.roi || null},
			user_story = ${input.user_story || null},
			updated_at = NOW()
		WHERE id = ${id}
	`;

	await sql`DELETE FROM project_raci WHERE project_id = ${id}`;
	await insertRaciAssignments(id, input.raci);

	await sql`DELETE FROM acceptance_criteria WHERE project_id = ${id}`;
	await insertAcceptanceCriteria(id, input.acceptance_criteria);
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

async function insertAcceptanceCriteria(
	projectId: string,
	criteria: ProjectFormInput["acceptance_criteria"],
): Promise<void> {
	for (const c of criteria) {
		await sql`
			INSERT INTO acceptance_criteria (project_id, title, given_clause, when_clause, then_clause, status)
			VALUES (${projectId}, ${c.title}, ${c.given_clause}, ${c.when_clause}, ${c.then_clause}, ${c.status})
		`;
	}
}
