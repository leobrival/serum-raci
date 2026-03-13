import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProject, deleteProject, getProjects, updateProject } from "@/db/projects";
import type { ProjectFormInput } from "@/domain/types";

export function useProjects() {
	return useQuery({
		queryKey: ["projects"],
		queryFn: getProjects,
	});
}

export function useCreateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: ProjectFormInput) => createProject(input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Projet créé avec succès");
		},
		onError: () => {
			toast.error("Erreur lors de la création du projet");
		},
	});
}

export function useUpdateProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, input }: { id: string; input: ProjectFormInput }) =>
			updateProject(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Projet mis à jour");
		},
		onError: () => {
			toast.error("Erreur lors de la mise à jour du projet");
		},
	});
}

export function useDeleteProject() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteProject(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
			toast.success("Projet supprimé");
		},
		onError: () => {
			toast.error("Erreur lors de la suppression du projet");
		},
	});
}
