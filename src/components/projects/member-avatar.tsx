import type { TeamMember } from "@/domain/types";

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function MemberAvatar({ member }: { member: TeamMember | null }) {
	if (!member) {
		return (
			<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-400">
				—
			</span>
		);
	}

	return (
		<span
			className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
			title={`${member.name} (${member.role})`}
		>
			{getInitials(member.name)}
		</span>
	);
}
