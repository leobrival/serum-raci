import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
			github_url: values.github_url ?? "",
			loom_url: values.loom_url ?? "",
			roi: values.roi ?? "",
			gwt: values.gwt ?? "",
			user_story: values.user_story ?? "",
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
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{isEditing ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
					<DialogDescription>
						{isEditing
							? "Modifiez les informations du projet et les rôles RACI."
							: "Créez un nouveau projet et assignez les rôles RACI."}
					</DialogDescription>
				</DialogHeader>
				<ProjectForm
					project={project}
					onSubmit={handleSubmit}
					onCancel={() => onOpenChange(false)}
					isPending={isPending}
				/>
			</DialogContent>
		</Dialog>
	);
}
