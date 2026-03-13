import { Button } from "@/components/ui/button";
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
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-border text-left">
						<th className="py-3 px-4 font-medium text-muted-foreground">Projet</th>
						<th className="py-3 px-4 font-medium text-muted-foreground">Statut</th>
						<th className="py-3 px-4 font-medium text-muted-foreground">RACI</th>
						<th className="py-3 px-4 font-medium text-muted-foreground">GitHub</th>
						<th className="py-3 px-4 font-medium text-muted-foreground text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					{projects.map((project) => (
						<tr key={project.id} className="border-b border-border hover:bg-muted/50">
							<td className="py-3 px-4">
								<div>
									<p className="font-medium">{project.name}</p>
									{project.description && (
										<p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
											{project.description}
										</p>
									)}
								</div>
							</td>
							<td className="py-3 px-4">
								<StatusBadge status={project.status} />
							</td>
							<td className="py-3 px-4">
								<RaciDisplay project={project} />
							</td>
							<td className="py-3 px-4">
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
							</td>
							<td className="py-3 px-4 text-right">
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
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
