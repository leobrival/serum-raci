import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/db/teams";

export function useTeams() {
	return useQuery({
		queryKey: ["teams"],
		queryFn: getTeamMembers,
		staleTime: Number.POSITIVE_INFINITY,
	});
}
