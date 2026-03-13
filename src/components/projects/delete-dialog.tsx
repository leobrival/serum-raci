import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectWithRaci } from "@/domain/types";
import { useDeleteProject } from "@/hooks/use-projects";

type DeleteDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	project: ProjectWithRaci | null;
};

export function DeleteDialog({ open, onOpenChange, project }: DeleteDialogProps) {
	const deleteMutation = useDeleteProject();

	function handleDelete() {
		if (!project) return;
		deleteMutation.mutate(project.id, {
			onSuccess: () => onOpenChange(false),
		});
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Supprimer le projet</DialogTitle>
					<DialogDescription>
						Êtes-vous sûr de vouloir supprimer le projet « {project?.name} » ? Cette action est
						irréversible.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Annuler
					</Button>
					<Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
						{deleteMutation.isPending ? "Suppression..." : "Supprimer"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
