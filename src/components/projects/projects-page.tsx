import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ProjectCategory, ProjectWithRaci } from "@/domain/types";
import { useProjects } from "@/hooks/use-projects";
import { CategoryFilter } from "./category-filter";
import { DeleteDialog } from "./delete-dialog";
import { ProjectDialog } from "./project-dialog";
import { ProjectList } from "./project-list";

export function ProjectsPage() {
	const { data: projects = [], isLoading, error } = useProjects();

	const [createOpen, setCreateOpen] = useState(false);
	const [editProject, setEditProject] = useState<ProjectWithRaci | undefined>();
	const [deleteProject, setDeleteProject] = useState<ProjectWithRaci | null>(null);
	const [activeCategories, setActiveCategories] = useState<ProjectCategory[]>([]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-32">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
					Chargement...
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-32">
				<p className="text-sm text-destructive">Erreur : {error.message}</p>
			</div>
		);
	}

	const filteredProjects =
		activeCategories.length === 0
			? projects
			: projects.filter((p) => activeCategories.some((cat) => p.categories.includes(cat)));

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold tracking-tight">Projets</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						{filteredProjects.length} projet{filteredProjects.length !== 1 ? "s" : ""}
						{activeCategories.length > 0 && ` sur ${projects.length}`}
					</p>
				</div>
				<Button onClick={() => setCreateOpen(true)} size="sm">
					<Plus className="h-4 w-4" />
					Nouveau projet
				</Button>
			</div>

			<CategoryFilter active={activeCategories} onChange={setActiveCategories} />

			<div className="rounded-lg border border-border">
				<ProjectList
					projects={filteredProjects}
					onEdit={(p) => setEditProject(p)}
					onDelete={(p) => setDeleteProject(p)}
				/>
			</div>

			<ProjectDialog open={createOpen} onOpenChange={setCreateOpen} />

			<ProjectDialog
				open={!!editProject}
				onOpenChange={(open) => {
					if (!open) setEditProject(undefined);
				}}
				project={editProject}
			/>

			<DeleteDialog
				open={!!deleteProject}
				onOpenChange={(open) => {
					if (!open) setDeleteProject(null);
				}}
				project={deleteProject}
			/>
		</div>
	);
}
