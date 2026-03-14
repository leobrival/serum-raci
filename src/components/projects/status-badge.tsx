import type { ProjectStatus } from "@/domain/types";

const statusConfig: Record<ProjectStatus, { label: string; dotColor: string }> = {
	draft: { label: "Brouillon", dotColor: "bg-gray-400" },
	in_progress: { label: "En cours", dotColor: "bg-blue-500" },
	review: { label: "En revue", dotColor: "bg-amber-500" },
	completed: { label: "Terminé", dotColor: "bg-green-500" },
	archived: { label: "Archivé", dotColor: "bg-gray-300" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
	const config = statusConfig[status];
	return (
		<span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
			<span className={`h-1.5 w-1.5 rounded-full ${config.dotColor}`} />
			{config.label}
		</span>
	);
}
