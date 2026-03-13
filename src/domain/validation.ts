import { z } from "zod";

export const projectFormSchema = z.object({
	name: z.string().min(1, "Project name is required"),
	description: z.string(),
	status: z.enum(["draft", "in_progress", "review", "completed", "archived"]),
	github_url: z.string(),
	responsible_id: z.number().nullable(),
	accountable_id: z.number().nullable(),
	consulted_id: z.number().nullable(),
	informed_id: z.number().nullable(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
