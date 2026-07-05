import type { JSX, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type BadgeVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "accent"
    | "neutral";

type BadgeShape = "rounded" | "pill";

type BadgeSize = "sm" | "md" | "lg";

type BadgeRounded = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const BASE =
    "inline-flex items-center gap-1.5 font-medium";

const VARIANTS: Record<BadgeVariant, string> = {
    primary:
        "bg-primary text-primary-foreground",

    secondary:
        "bg-secondary text-secondary-foreground",

    success:
        "bg-success/10 text-success ring-1 ring-inset ring-success/20",

    danger:
        "bg-danger/10 text-danger ring-1 ring-inset ring-danger/20",

    warning:
        "bg-warning/10 text-warning ring-1 ring-inset ring-warning/20",

    accent:
        "bg-accent text-accent-foreground",

    neutral:
        "border border-border bg-background text-muted-foreground",
};

const SIZES: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
};

const ICON_SIZES: Record<BadgeSize, string> = {
    sm: "size-3",
    md: "size-3.5",
    lg: "size-4",
};

const SHAPES: Record<BadgeShape, string> = {
    rounded: "",
    pill: "rounded-full",
};

const ROUNDED: Record<BadgeRounded, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
};

export interface BadgeProps {
    children: ReactNode;
    icon?: LucideIcon;
    variant?: BadgeVariant;
    shape?: BadgeShape;
    size?: BadgeSize;
    rounded?: BadgeRounded;
    uppercase?: boolean;
    className?: string;
}

export default function Badge(
    {
        children,
        icon: Icon,
        variant = "primary",
        shape = "rounded",
        size = "md",
        rounded = "md",
        uppercase = false,
        className = ""
    }: BadgeProps): JSX.Element {

    const roundedClass =
        shape === "pill"
            ? SHAPES.pill
            : ROUNDED[rounded];

    return (
        <span
            className={`
                ${BASE}
                ${VARIANTS[variant]}
                ${SIZES[size]}
                ${roundedClass}
                ${uppercase ? "uppercase tracking-wide font-semibold" : ""}
                ${className}
            `}
        >
            {Icon && (
                <Icon
                    className={ICON_SIZES[size]}
                    aria-hidden="true"
                />
            )}
            {children}
        </span>
    );
}