import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
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
import type { CriterionStatus, ProjectStatus, ProjectWithRaci } from "@/domain/types";
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
		control,
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
			roi: project?.roi ?? "",
			user_story: project?.user_story ?? "",
			acceptance_criteria:
				project?.acceptance_criteria.map((c) => ({
					title: c.title,
					given_clause: c.given_clause,
					when_clause: c.when_clause,
					then_clause: c.then_clause,
					status: c.status,
				})) ?? [],
			raci: {
				R: project?.responsible.map((m) => m.id) ?? [],
				A: project?.accountable.map((m) => m.id) ?? [],
				C: project?.consulted.map((m) => m.id) ?? [],
				I: project?.informed.map((m) => m.id) ?? [],
			},
		},
	});

	const currentStatus = watch("status");

	const { fields, append, remove } = useFieldArray({
		control,
		name: "acceptance_criteria",
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

			<div className="space-y-2">
				<Label htmlFor="user_story">User Story</Label>
				<Textarea
					id="user_story"
					{...register("user_story")}
					placeholder="En tant que [acteur], je veux [action], afin de [bénéfice]..."
				/>
			</div>

			<div className="border-t border-border pt-4">
				<div className="flex items-center justify-between mb-3">
					<h4 className="text-sm font-semibold">Critères d'acceptation (GWT)</h4>
					<Button
						type="button"
						variant="outline"
						size="sm"
						className="h-7 text-xs"
						onClick={() =>
							append({
								title: "",
								given_clause: "",
								when_clause: "",
								then_clause: "",
								status: "pending",
							})
						}
					>
						<Plus className="h-3 w-3 mr-1" />
						Ajouter
					</Button>
				</div>
				{fields.length === 0 && (
					<p className="text-xs text-muted-foreground">Aucun critère. Cliquez sur Ajouter.</p>
				)}
				<div className="space-y-3">
					{fields.map((field, index) => (
						<div key={field.id} className="rounded-md border border-border p-3 space-y-2">
							<div className="flex items-center gap-2">
								<Input
									{...register(`acceptance_criteria.${index}.title`)}
									placeholder={`AC-${String(index + 1).padStart(3, "0")}: Titre du critère`}
									className="text-sm"
								/>
								<Select
									value={watch(`acceptance_criteria.${index}.status`)}
									onValueChange={(val) =>
										setValue(`acceptance_criteria.${index}.status`, val as CriterionStatus)
									}
								>
									<SelectTrigger className="w-[120px]">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="pending">En attente</SelectItem>
										<SelectItem value="pass">Validé</SelectItem>
										<SelectItem value="fail">Échoué</SelectItem>
									</SelectContent>
								</Select>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
									onClick={() => remove(index)}
								>
									<Trash2 className="h-3.5 w-3.5" />
								</Button>
							</div>
							<div className="grid grid-cols-3 gap-2">
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">Given</Label>
									<Input
										{...register(`acceptance_criteria.${index}.given_clause`)}
										placeholder="Contexte initial..."
										className="text-xs"
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">When</Label>
									<Input
										{...register(`acceptance_criteria.${index}.when_clause`)}
										placeholder="Action effectuée..."
										className="text-xs"
									/>
								</div>
								<div className="space-y-1">
									<Label className="text-xs text-muted-foreground">Then</Label>
									<Input
										{...register(`acceptance_criteria.${index}.then_clause`)}
										placeholder="Résultat attendu..."
										className="text-xs"
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="roi">ROI</Label>
				<Textarea
					id="roi"
					{...register("roi")}
					placeholder="Gains attendus : temps économisé, revenus, qualité..."
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
