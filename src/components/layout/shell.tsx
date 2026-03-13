import type { ReactNode } from "react";
import { Header } from "./header";

export function Shell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
		</div>
	);
}
