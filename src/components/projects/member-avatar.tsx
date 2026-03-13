import type { TeamMember } from "@/domain/types";

function getInitials(member: TeamMember): string {
	return `${member.first_name[0]}${member.last_name[0]}`.toUpperCase();
}

function getFullName(member: TeamMember): string {
	return `${member.first_name} ${member.last_name}`;
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
			title={getFullName(member)}
		>
			{getInitials(member)}
		</span>
	);
}
