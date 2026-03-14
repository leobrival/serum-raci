import { z } from "zod";

export const projectFormSchema = z.object({
	name: z.string().min(1, "Project name is required"),
	description: z.string(),
	objective: z.string(),
	status: z.enum(["draft", "in_progress", "review", "completed", "archived"]),
	categories: z.array(
		z.enum(["product", "marketing", "sales", "support", "operations", "finance", "legal", "hr"]),
	),
	github_url: z.string(),
	loom_url: z.string(),
	roi: z.string(),
	user_story: z.string(),
	acceptance_criteria: z.array(
		z.object({
			title: z.string().min(1, "Title is required"),
			given_clause: z.string(),
			when_clause: z.string(),
			then_clause: z.string(),
			status: z.enum(["pending", "pass", "fail"]),
		}),
	),
	raci: z.object({
		R: z.array(z.string()),
		A: z.array(z.string()),
		C: z.array(z.string()),
		I: z.array(z.string()),
	}),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
