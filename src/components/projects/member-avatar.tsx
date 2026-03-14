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
			<span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] text-muted-foreground">
				&mdash;
			</span>
		);
	}

	return (
		<span
			className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background"
			title={getFullName(member)}
		>
			{getInitials(member)}
		</span>
	);
}
