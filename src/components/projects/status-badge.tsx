import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/domain/types";

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
	draft: { label: "Brouillon", className: "bg-gray-100 text-gray-700" },
	in_progress: { label: "En cours", className: "bg-blue-100 text-blue-700" },
	review: { label: "En revue", className: "bg-orange-100 text-orange-700" },
	completed: { label: "Terminé", className: "bg-green-100 text-green-700" },
	archived: { label: "Archivé", className: "bg-purple-100 text-purple-700" },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
	const config = statusConfig[status];
	return <Badge className={config.className}>{config.label}</Badge>;
}
