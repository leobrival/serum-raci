import { Select } from "@/components/ui/select";
import { useTeams } from "@/hooks/use-teams";

type MemberSelectProps = {
	value: string | null;
	onChange: (value: string | null) => void;
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
			value={value ?? ""}
			onChange={(e) => {
				const val = e.target.value;
				onChange(val || null);
			}}
		>
			<option value="">{placeholder}</option>
			{members.map((member) => (
				<option key={member.id} value={member.id}>
					{member.first_name} {member.last_name}
				</option>
			))}
		</Select>
	);
}
