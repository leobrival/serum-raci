import { Select } from "@/components/ui/select";
import { useTeams } from "@/hooks/use-teams";

type MemberSelectProps = {
	value: number | null;
	onChange: (value: number | null) => void;
	placeholder?: string;
};

export function MemberSelect({
	value,
	onChange,
	placeholder = "Sélectionner...",
}: MemberSelectProps) {
	const { data: members = [] } = useTeams();

	return (
		<Select
			value={value?.toString() ?? ""}
			onChange={(e) => {
				const val = e.target.value;
				onChange(val ? Number(val) : null);
			}}
		>
			<option value="">{placeholder}</option>
			{members.map((member) => (
				<option key={member.id} value={member.id.toString()}>
					{member.name} — {member.role}
				</option>
			))}
		</Select>
	);
}
