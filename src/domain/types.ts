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
	status: ProjectStatus;
	github_url: string | null;
	responsible_id: string | null;
	accountable_id: string | null;
	consulted_id: string | null;
	informed_id: string | null;
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
	responsible_id: string | null;
	accountable_id: string | null;
	consulted_id: string | null;
	informed_id: string | null;
};
