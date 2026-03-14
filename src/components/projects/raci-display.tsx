import type { ProjectWithRaci, RaciRole, TeamMember } from "@/domain/types";
import { MemberAvatar } from "./member-avatar";

const raciConfig: Record<RaciRole, { label: string; color: string }> = {
	R: { label: "R", color: "text-red-500" },
	A: { label: "A", color: "text-amber-500" },
	C: { label: "C", color: "text-blue-500" },
	I: { label: "I", color: "text-green-500" },
};

function StackedAvatars({ members }: { members: TeamMember[] }) {
	if (members.length === 0) {
		return <MemberAvatar member={null} />;
	}

	const visible = members.slice(0, 3);
	const overflow = members.length - 3;

	return (
		<div className="flex -space-x-1.5">
			{visible.map((member) => (
				<span key={member.id} className="rounded-full ring-2 ring-background">
					<MemberAvatar member={member} />
				</span>
			))}
			{overflow > 0 && (
				<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground ring-2 ring-background">
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
				<div key={key} className="flex flex-col items-center gap-0.5">
					<span className={`text-[10px] font-semibold ${raciConfig[key].color}`}>
						{raciConfig[key].label}
					</span>
					<StackedAvatars members={members} />
				</div>
			))}
		</div>
	);
}
