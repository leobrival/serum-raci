import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Shell } from "@/components/layout/shell";
import { ProjectsPage } from "@/components/projects/projects-page";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
		},
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<HashRouter>
				<Shell>
					<Routes>
						<Route path="/" element={<ProjectsPage />} />
					</Routes>
				</Shell>
			</HashRouter>
			<Toaster position="bottom-right" />
		</QueryClientProvider>
	);
}
