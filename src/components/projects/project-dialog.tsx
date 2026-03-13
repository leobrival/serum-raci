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
			status: values.status,
			github_url: values.github_url ?? "",
			responsible_id: values.responsible_id,
			accountable_id: values.accountable_id,
			consulted_id: values.consulted_id,
			informed_id: values.informed_id,
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
