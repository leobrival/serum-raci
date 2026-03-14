import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectStatus, ProjectWithRaci } from "@/domain/types";
import { type ProjectFormValues, projectFormSchema } from "@/domain/validation";
import { MemberMultiSelect } from "./member-multi-select";

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
			objective: project?.objective ?? "",
			status: project?.status ?? "draft",
			github_url: project?.github_url ?? "",
			loom_url: project?.loom_url ?? "",
			raci: {
				R: project?.responsible.map((m) => m.id) ?? [],
				A: project?.accountable.map((m) => m.id) ?? [],
				C: project?.consulted.map((m) => m.id) ?? [],
				I: project?.informed.map((m) => m.id) ?? [],
			},
		},
	});

	const currentStatus = watch("status");

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

			<div className="space-y-2">
				<Label htmlFor="objective">Objectif</Label>
				<Textarea id="objective" {...register("objective")} placeholder="Objectif du projet..." />
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label>Statut</Label>
					<Select
						value={currentStatus}
						onValueChange={(val) => setValue("status", val as ProjectStatus)}
					>
						<SelectTrigger>
							<SelectValue placeholder="Sélectionner un statut" />
						</SelectTrigger>
						<SelectContent>
							{statusOptions.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
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

			<div className="space-y-2">
				<Label htmlFor="loom_url">Lien Loom</Label>
				<Input
					id="loom_url"
					{...register("loom_url")}
					placeholder="https://www.loom.com/share/..."
				/>
			</div>

			<div className="border-t border-border pt-4">
				<h4 className="text-sm font-semibold mb-3">Rôles RACI</h4>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>
							<span className="text-red-600 font-bold">R</span>esponsible
						</Label>
						<MemberMultiSelect
							value={watch("raci.R")}
							onChange={(ids) => setValue("raci.R", ids)}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							<span className="text-amber-600 font-bold">A</span>ccountable
						</Label>
						<MemberMultiSelect
							value={watch("raci.A")}
							onChange={(ids) => setValue("raci.A", ids)}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							<span className="text-blue-600 font-bold">C</span>onsulted
						</Label>
						<MemberMultiSelect
							value={watch("raci.C")}
							onChange={(ids) => setValue("raci.C", ids)}
						/>
					</div>
					<div className="space-y-2">
						<Label>
							<span className="text-green-600 font-bold">I</span>nformed
						</Label>
						<MemberMultiSelect
							value={watch("raci.I")}
							onChange={(ids) => setValue("raci.I", ids)}
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
