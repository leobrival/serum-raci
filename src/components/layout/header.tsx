export function Header() {
	return (
		<header className="border-b border-border bg-card">
			<div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<h1 className="text-xl font-bold tracking-tight">Serum RACI</h1>
					<span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
						v1.0
					</span>
				</div>
				<p className="text-sm text-muted-foreground hidden sm:block">
					Gestion des projets et rôles RACI
				</p>
			</div>
		</header>
	);
}
