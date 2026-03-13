import { useRef, useState } from "react";
import { useTeams } from "@/hooks/use-teams";

type MemberMultiSelectProps = {
	value: string[];
	onChange: (ids: string[]) => void;
};

export function MemberMultiSelect({ value, onChange }: MemberMultiSelectProps) {
	const { data: members = [] } = useTeams();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedMembers = members.filter((m) => value.includes(m.id));

	function toggle(memberId: string) {
		if (value.includes(memberId)) {
			onChange(value.filter((id) => id !== memberId));
		} else {
			onChange([...value, memberId]);
		}
	}

	return (
		<div ref={containerRef} className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex h-10 w-full items-center gap-1 rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
			>
				{selectedMembers.length === 0 ? (
					<span className="text-muted-foreground">Sélectionner...</span>
				) : (
					<div className="flex items-center gap-1 overflow-hidden">
						<div className="flex -space-x-2">
							{selectedMembers.slice(0, 3).map((m) => (
								<span
									key={m.id}
									className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground ring-2 ring-card"
									title={`${m.first_name} ${m.last_name}`}
								>
									{m.first_name[0]}
									{m.last_name[0]}
								</span>
							))}
						</div>
						{selectedMembers.length > 3 && (
							<span className="text-xs text-muted-foreground ml-1">
								+{selectedMembers.length - 3}
							</span>
						)}
					</div>
				)}
				<svg
					className="ml-auto h-4 w-4 shrink-0 opacity-50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<title>Toggle dropdown</title>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</button>

			{open && (
				<>
					<button
						type="button"
						className="fixed inset-0 z-40 cursor-default"
						tabIndex={-1}
						onClick={() => setOpen(false)}
						aria-label="Close dropdown"
					/>
					<div className="absolute z-50 mt-1 w-full rounded-md border border-input bg-card shadow-md">
						<div className="max-h-48 overflow-y-auto p-1">
							{members.map((member) => {
								const checked = value.includes(member.id);
								return (
									<label
										key={member.id}
										className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-accent"
									>
										<input
											type="checkbox"
											checked={checked}
											onChange={() => toggle(member.id)}
											className="h-4 w-4 rounded border-input"
										/>
										<span>
											{member.first_name} {member.last_name}
										</span>
									</label>
								);
							})}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
