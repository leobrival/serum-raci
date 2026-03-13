import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectStatus, ProjectWithRaci } from "@/domain/types";
import { type ProjectFormValues, projectFormSchema } from "@/domain/validation";
import { MemberSelect } from "./member-select";

type ProjectFormProps = {
	project?: ProjectWithRaci;
	onSubmit: (values: ProjectFormValues) => void;
	onCancel: () => void;
	isPending: boolean;
};

const statusOptions: { value: ProjectStatus; label: string }[] = [
	{ value: "draft", label: "Brouillon" },
	{ value: "in_progress", label: "En cours" },
	{ value: "review", label: "En revue" },
	{ value: "completed", label: "Terminé" },
	{ value: "archived", label: "Archivé" },
];

export function ProjectForm({ project, onSubmit, onCancel, isPending }: ProjectFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			name: project?.name ?? "",
			description: project?.description ?? "",
			status: project?.status ?? "draft",
			github_url: project?.github_url ?? "",
			responsible_id: project?.responsible_id ?? null,
			accountable_id: project?.accountable_id ?? null,
			consulted_id: project?.consulted_id ?? null,
			informed_id: project?.informed_id ?? null,
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="name">Nom du projet *</Label>
				<Input id="name" {...register("name")} placeholder="Mon projet" />
				{errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
			</div>

			<div className="space-y-2">
				<Label htmlFor="description">Description</Label>
				<Textarea
					id="description"
					{...register("description")}
					placeholder="Description du projet..."
				/>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="status">Statut</Label>
					<Select id="status" {...register("status")}>
						{statusOptions.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="github_url">Lien GitHub</Label>
					<Input id="github_url" {...register("github_url")} placeholder="https://github.com/..." />
					{errors.github_url && (
						<p className="text-sm text-destructive">{errors.github_url.message}</p>
					)}
				</div>
			</div>

			<div className="border-t border-border pt-4">
				<h4 className="text-sm font-semibold mb-3">Rôles RACI</h4>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>
							<span className="text-red-600 font-bold">R</span>esponsible
						</Label>
						<MemberSelect
							value={watch("responsible_id")}
							onChange={(v) => setValue("responsible_id", v)}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							<span className="text-amber-600 font-bold">A</span>ccountable
						</Label>
						<MemberSelect
							value={watch("accountable_id")}
							onChange={(v) => setValue("accountable_id", v)}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							<span className="text-blue-600 font-bold">C</span>onsulted
						</Label>
						<MemberSelect
							value={watch("consulted_id")}
							onChange={(v) => setValue("consulted_id", v)}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							<span className="text-green-600 font-bold">I</span>nformed
						</Label>
						<MemberSelect
							value={watch("informed_id")}
							onChange={(v) => setValue("informed_id", v)}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-2 pt-4 border-t border-border">
				<Button type="button" variant="outline" onClick={onCancel}>
					Annuler
				</Button>
				<Button type="submit" disabled={isPending}>
					{isPending ? "Enregistrement..." : project ? "Mettre à jour" : "Créer"}
				</Button>
			</div>
		</form>
	);
}
