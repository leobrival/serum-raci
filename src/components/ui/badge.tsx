import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
	variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
	default: "bg-primary text-primary-foreground",
	secondary: "bg-secondary text-secondary-foreground",
	destructive: "bg-destructive text-destructive-foreground",
	outline: "border border-border text-foreground",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
				variantClasses[variant],
				className,
			)}
			{...props}
		/>
	);
}
