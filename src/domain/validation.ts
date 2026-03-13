import { z } from "zod";

export const projectFormSchema = z.object({
	name: z.string().min(1, "Project name is required"),
	description: z.string(),
	status: z.enum(["draft", "in_progress", "review", "completed", "archived"]),
	github_url: z.string(),
	responsible_id: z.string().nullable(),
	accountable_id: z.string().nullable(),
	consulted_id: z.string().nullable(),
	informed_id: z.string().nullable(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
