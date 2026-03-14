import { ExternalLink, Pencil, Trash2 } from "lucide-react";
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
			<div className="py-16 text-center">
				<p className="text-sm text-muted-foreground">Aucun projet pour le moment.</p>
				<p className="mt-1 text-xs text-muted-foreground">
					Cliquez sur &laquo; Nouveau projet &raquo; pour commencer.
				</p>
			</div>
		);
	}

	return (
		<Table>
			<TableHeader>
				<TableRow className="hover:bg-transparent">
					<TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Projet
					</TableHead>
					<TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Objectif
					</TableHead>
					<TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Statut
					</TableHead>
					<TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						RACI
					</TableHead>
					<TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						GitHub
					</TableHead>
					<TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Loom
					</TableHead>
					<TableHead className="w-[100px]" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{projects.map((project) => (
					<TableRow key={project.id} className="group">
						<TableCell>
							<div>
								<p className="text-sm font-medium">{project.name}</p>
								{project.description && (
									<p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
										{project.description}
									</p>
								)}
							</div>
						</TableCell>
						<TableCell>
							{project.objective ? (
								<p className="text-xs text-muted-foreground line-clamp-1">{project.objective}</p>
							) : (
								<span className="text-xs text-muted-foreground/50">&mdash;</span>
							)}
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
									className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
								>
									<ExternalLink className="h-3 w-3" />
									Repo
								</a>
							) : (
								<span className="text-xs text-muted-foreground/50">&mdash;</span>
							)}
						</TableCell>
						<TableCell>
							{project.loom_url ? (
								<a
									href={project.loom_url}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
								>
									<ExternalLink className="h-3 w-3" />
									Vidéo
								</a>
							) : (
								<span className="text-xs text-muted-foreground/50">&mdash;</span>
							)}
						</TableCell>
						<TableCell>
							<div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8"
									onClick={() => onEdit(project)}
								>
									<Pencil className="h-3.5 w-3.5" />
									<span className="sr-only">Modifier</span>
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 text-muted-foreground hover:text-destructive"
									onClick={() => onDelete(project)}
								>
									<Trash2 className="h-3.5 w-3.5" />
									<span className="sr-only">Supprimer</span>
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
