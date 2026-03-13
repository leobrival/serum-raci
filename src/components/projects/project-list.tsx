import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { ProjectWithRaci } from "@/domain/types";
import { RaciDisplay } from "./raci-display";
import { StatusBadge } from "./status-badge";

type ProjectListProps = {
	projects: ProjectWithRaci[];
	onEdit: (project: ProjectWithRaci) => void;
	onDelete: (project: ProjectWithRaci) => void;
};

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
	if (projects.length === 0) {
		return (
			<div className="text-center py-12 text-muted-foreground">
				<p className="text-lg">Aucun projet pour le moment</p>
				<p className="text-sm mt-1">Créez votre premier projet pour commencer.</p>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Projet</TableHead>
					<TableHead>Statut</TableHead>
					<TableHead>RACI</TableHead>
					<TableHead>GitHub</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{projects.map((project) => (
					<TableRow key={project.id}>
						<TableCell>
							<div>
								<p className="font-medium">{project.name}</p>
								{project.description && (
									<p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
										{project.description}
									</p>
								)}
							</div>
						</TableCell>
						<TableCell>
							<StatusBadge status={project.status} />
						</TableCell>
						<TableCell>
							<RaciDisplay project={project} />
						</TableCell>
						<TableCell>
							{project.github_url ? (
								<a
									href={project.github_url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline text-xs"
								>
									Repo
								</a>
							) : (
								<span className="text-muted-foreground text-xs">—</span>
							)}
						</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end gap-1">
								<Button variant="ghost" size="sm" onClick={() => onEdit(project)}>
									Modifier
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="text-destructive hover:text-destructive"
									onClick={() => onDelete(project)}
								>
									Supprimer
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
