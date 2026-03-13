import type { ProjectWithRaci, RaciRole } from "@/domain/types";
import { MemberAvatar } from "./member-avatar";

const raciLabels: Record<RaciRole, { label: string; color: string }> = {
	R: { label: "R", color: "text-red-600" },
	A: { label: "A", color: "text-amber-600" },
	C: { label: "C", color: "text-blue-600" },
	I: { label: "I", color: "text-green-600" },
};

export function RaciDisplay({ project }: { project: ProjectWithRaci }) {
	const roles: { key: RaciRole; member: ProjectWithRaci["responsible"] }[] = [
		{ key: "R", member: project.responsible },
		{ key: "A", member: project.accountable },
		{ key: "C", member: project.consulted },
		{ key: "I", member: project.informed },
	];

	return (
		<div className="flex items-center gap-3">
			{roles.map(({ key, member }) => (
				<div key={key} className="flex flex-col items-center gap-1">
					<span className={`text-xs font-bold ${raciLabels[key].color}`}>
						{raciLabels[key].label}
					</span>
					<MemberAvatar member={member} />
				</div>
			))}
		</div>
	);
}
