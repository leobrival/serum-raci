import type { ReactNode } from "react";
import { Header } from "./header";

export function Shell({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			<main className="mx-auto max-w-[1200px] px-6 py-8">{children}</main>
		</div>
	);
}
