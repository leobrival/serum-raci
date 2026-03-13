import { type HTMLAttributes, type MouseEvent, useEffect } from "react";
import { cn } from "@/lib/utils";

type DialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
};

export function Dialog({ open, onOpenChange, children }: DialogProps) {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	if (!open) return null;

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onOpenChange(false);
		}
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: backdrop overlay needs click handler
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
			onClick={handleBackdropClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") onOpenChange(false);
			}}
		>
			{children}
		</div>
	);
}

export function DialogContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"relative z-50 w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg max-h-[90vh] overflow-y-auto",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex flex-col space-y-1.5 text-left mb-4", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
	);
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
	return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("flex justify-end gap-2 mt-4", className)} {...props} />;
}
