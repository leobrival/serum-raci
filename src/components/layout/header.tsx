export function Header() {
	return (
		<header className="border-b border-border">
			<div className="mx-auto max-w-[1200px] px-6">
				<div className="flex h-14 items-center gap-2">
					<svg width="18" height="18" viewBox="0 0 76 65" fill="currentColor" aria-hidden="true">
						<title>Logo</title>
						<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
					</svg>
					<span className="text-muted-foreground">/</span>
					<span className="text-sm font-medium">Serum RACI</span>
				</div>
			</div>
		</header>
	);
}
