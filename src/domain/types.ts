export type RaciRole = "R" | "A" | "C" | "I";

export type CriterionStatus = "pending" | "pass" | "fail";

export type AcceptanceCriterion = {
	id: string;
	title: string;
	given_clause: string;
	when_clause: string;
	then_clause: string;
	status: CriterionStatus;
};

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
	roi: string | null;
	user_story: string | null;
	created_at: string;
	updated_at: string;
};

export type ProjectWithRaci = Project & {
	responsible: TeamMember[];
	accountable: TeamMember[];
	consulted: TeamMember[];
	informed: TeamMember[];
	acceptance_criteria: AcceptanceCriterion[];
};

export type ProjectFormInput = {
	name: string;
	description: string;
	objective: string;
	status: ProjectStatus;
	github_url: string;
	loom_url: string;
	roi: string;
	user_story: string;
	acceptance_criteria: AcceptanceCriterionInput[];
	raci: Record<RaciRole, string[]>;
};

export type AcceptanceCriterionInput = {
	title: string;
	given_clause: string;
	when_clause: string;
	then_clause: string;
	status: CriterionStatus;
};
