import type { ProjectCategory } from "@/domain/types";

type CategoryFilterProps = {
	active: ProjectCategory[];
	onChange: (categories: ProjectCategory[]) => void;
};

const categories: { value: ProjectCategory; label: string }[] = [
	{ value: "product", label: "Product" },
	{ value: "marketing", label: "Marketing" },
	{ value: "sales", label: "Sales" },
	{ value: "support", label: "Support" },
	{ value: "operations", label: "Operations" },
	{ value: "finance", label: "Finance" },
	{ value: "legal", label: "Legal" },
	{ value: "hr", label: "HR" },
];

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
	function toggle(category: ProjectCategory) {
		if (active.includes(category)) {
			onChange(active.filter((c) => c !== category));
		} else {
			onChange([...active, category]);
		}
	}

	return (
		<div className="flex flex-wrap items-center gap-2">
			<span className="text-xs text-muted-foreground mr-1">Filtrer :</span>
			{categories.map((cat) => {
				const isActive = active.includes(cat.value);
				return (
					<button
						key={cat.value}
						type="button"
						onClick={() => toggle(cat.value)}
						className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${
							isActive
								? "border-foreground bg-foreground text-background"
								: "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground"
						}`}
					>
						{cat.label}
					</button>
				);
			})}
			{active.length > 0 && (
				<button
					type="button"
					onClick={() => onChange([])}
					className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-1"
				>
					Effacer
				</button>
			)}
		</div>
	);
}
