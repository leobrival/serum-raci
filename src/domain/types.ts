export type RaciRole = "R" | "A" | "C" | "I";

export type ProjectStatus = "draft" | "in_progress" | "review" | "completed" | "archived";

export type TeamMember = {
	id: string;
	first_name: string;
	last_name: string;
	photo: string | null;
};

export type Project = {
	id: string;
	name: string;
	description: string | null;
	objective: string | null;
	status: ProjectStatus;
	github_url: string | null;
	loom_url: string | null;
	created_at: string;
	updated_at: string;
};

export type ProjectWithRaci = Project & {
	responsible: TeamMember[];
	accountable: TeamMember[];
	consulted: TeamMember[];
	informed: TeamMember[];
};

export type ProjectFormInput = {
	name: string;
	description: string;
	objective: string;
	status: ProjectStatus;
	github_url: string;
	loom_url: string;
	raci: Record<RaciRole, string[]>;
};
