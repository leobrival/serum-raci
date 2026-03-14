import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import type { ProjectWithRaci } from "@/domain/types";
import type { ProjectFormValues } from "@/domain/validation";
import { useCreateProject, useUpdateProject } from "@/hooks/use-projects";
import { ProjectForm } from "./project-form";

type ProjectDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	project?: ProjectWithRaci;
};

export function ProjectDialog({ open, onOpenChange, project }: ProjectDialogProps) {
	const createMutation = useCreateProject();
	const updateMutation = useUpdateProject();

	const isEditing = !!project;
	const isPending = createMutation.isPending || updateMutation.isPending;

	function handleSubmit(values: ProjectFormValues) {
		const input = {
			name: values.name,
			description: values.description ?? "",
			objective: values.objective ?? "",
			status: values.status,
			categories: values.categories,
			github_url: values.github_url ?? "",
			loom_url: values.loom_url ?? "",
			roi: values.roi ?? "",
			user_story: values.user_story ?? "",
			acceptance_criteria: values.acceptance_criteria,
			raci: values.raci,
		};

		if (isEditing) {
			updateMutation.mutate({ id: project.id, input }, { onSuccess: () => onOpenChange(false) });
		} else {
			createMutation.mutate(input, {
				onSuccess: () => onOpenChange(false),
			});
		}
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-[50vw] max-w-none sm:max-w-none overflow-y-auto">
				<SheetHeader>
					<SheetTitle>{isEditing ? "Modifier le projet" : "Nouveau projet"}</SheetTitle>
					<SheetDescription>
						{isEditing
							? "Modifiez les informations du projet et les rôles RACI."
							: "Créez un nouveau projet et assignez les rôles RACI."}
					</SheetDescription>
				</SheetHeader>
				<ProjectForm
					project={project}
					onSubmit={handleSubmit}
					onCancel={() => onOpenChange(false)}
					isPending={isPending}
				/>
			</SheetContent>
		</Sheet>
	);
}
