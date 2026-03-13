import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTeams } from "@/hooks/use-teams";

type MemberMultiSelectProps = {
	value: string[];
	onChange: (ids: string[]) => void;
};

export function MemberMultiSelect({ value, onChange }: MemberMultiSelectProps) {
	const { data: members = [] } = useTeams();
	const [open, setOpen] = useState(false);

	const selectedMembers = members.filter((m) => value.includes(m.id));

	function toggle(memberId: string) {
		if (value.includes(memberId)) {
			onChange(value.filter((id) => id !== memberId));
		} else {
			onChange([...value, memberId]);
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between font-normal"
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
					<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
				<Command>
					<CommandInput placeholder="Rechercher..." />
					<CommandList>
						<CommandEmpty>Aucun membre trouvé.</CommandEmpty>
						<CommandGroup>
							{members.map((member) => {
								const checked = value.includes(member.id);
								return (
									<CommandItem
										key={member.id}
										value={`${member.first_name} ${member.last_name}`}
										onSelect={() => toggle(member.id)}
									>
										<Checkbox checked={checked} className="pointer-events-none" />
										<span>
											{member.first_name} {member.last_name}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
