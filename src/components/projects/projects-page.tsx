import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectWithRaci } from "@/domain/types";
import { useProjects } from "@/hooks/use-projects";
import { DeleteDialog } from "./delete-dialog";
import { ProjectDialog } from "./project-dialog";
import { ProjectList } from "./project-list";

export function ProjectsPage() {
	const { data: projects = [], isLoading, error } = useProjects();

	const [createOpen, setCreateOpen] = useState(false);
	const [editProject, setEditProject] = useState<ProjectWithRaci | undefined>();
	const [deleteProject, setDeleteProject] = useState<ProjectWithRaci | null>(null);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-muted-foreground">Chargement des projets...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-destructive">Erreur : {error.message}</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<div>
						<CardTitle>Projets</CardTitle>
						<CardDescription>{projects.length} projet(s) référencé(s)</CardDescription>
					</div>
					<Button onClick={() => setCreateOpen(true)}>+ Nouveau projet</Button>
				</CardHeader>
				<CardContent>
					<ProjectList
						projects={projects}
						onEdit={(p) => setEditProject(p)}
						onDelete={(p) => setDeleteProject(p)}
					/>
				</CardContent>
			</Card>

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
