import { z } from "zod";

export const projectFormSchema = z.object({
	name: z.string().min(1, "Project name is required"),
	description: z.string(),
	objective: z.string(),
	status: z.enum(["draft", "in_progress", "review", "completed", "archived"]),
	github_url: z.string(),
	raci: z.object({
		R: z.array(z.string()),
		A: z.array(z.string()),
		C: z.array(z.string()),
		I: z.array(z.string()),
	}),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
