export type RaciRole = "R" | "A" | "C" | "I";

export type ProjectStatus = "draft" | "in_progress" | "review" | "completed" | "archived";

export type TeamMember = {
	id: number;
	name: string;
	role: string;
	email: string;
};

export type Project = {
	id: number;
	name: string;
	description: string | null;
	status: ProjectStatus;
	github_url: string | null;
	responsible_id: number | null;
	accountable_id: number | null;
	consulted_id: number | null;
	informed_id: number | null;
	created_at: string;
	updated_at: string;
};

export type ProjectWithRaci = Project & {
	responsible: TeamMember | null;
	accountable: TeamMember | null;
	consulted: TeamMember | null;
	informed: TeamMember | null;
};

export type ProjectFormInput = {
	name: string;
	description: string;
	status: ProjectStatus;
	github_url: string;
	responsible_id: number | null;
	accountable_id: number | null;
	consulted_id: number | null;
	informed_id: number | null;
};
