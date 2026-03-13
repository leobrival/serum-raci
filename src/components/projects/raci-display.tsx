import type { ProjectWithRaci, RaciRole, TeamMember } from "@/domain/types";
import { MemberAvatar } from "./member-avatar";

const raciLabels: Record<RaciRole, { label: string; color: string }> = {
	R: { label: "R", color: "text-red-600" },
	A: { label: "A", color: "text-amber-600" },
	C: { label: "C", color: "text-blue-600" },
	I: { label: "I", color: "text-green-600" },
};

const MAX_VISIBLE = 3;

function StackedAvatars({ members }: { members: TeamMember[] }) {
	if (members.length === 0) {
		return <MemberAvatar member={null} />;
	}

	const visible = members.slice(0, MAX_VISIBLE);
	const overflow = members.length - MAX_VISIBLE;

	return (
		<div className="flex -space-x-2">
			{visible.map((member) => (
				<span key={member.id} className="ring-2 ring-background rounded-full">
					<MemberAvatar member={member} />
				</span>
			))}
			{overflow > 0 && (
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-background">
					+{overflow}
				</span>
			)}
		</div>
	);
}

export function RaciDisplay({ project }: { project: ProjectWithRaci }) {
	const roles: { key: RaciRole; members: TeamMember[] }[] = [
		{ key: "R", members: project.responsible },
		{ key: "A", members: project.accountable },
		{ key: "C", members: project.consulted },
		{ key: "I", members: project.informed },
	];

	return (
		<div className="flex items-center gap-3">
			{roles.map(({ key, members }) => (
				<div key={key} className="flex flex-col items-center gap-1">
					<span className={`text-xs font-bold ${raciLabels[key].color}`}>
						{raciLabels[key].label}
					</span>
					<StackedAvatars members={members} />
				</div>
			))}
		</div>
	);
}
