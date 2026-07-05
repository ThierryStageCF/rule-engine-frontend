import type {JSX, ReactNode} from "react";
import { Check } from "lucide-react";

type ListItemVariant = "check" | "select" | "simple";

interface ListItemProps {
    label: string;
    active?: boolean;
    icon?: ReactNode;
    count?: number;
    onClick: () => void;
    variant?: ListItemVariant;
}

const BASE =
    "flex w-full items-center gap-2.5 rounded-2xl px-4 py-2 text-left text-sm font-medium transition-colors cursor-pointer";


/**
 * ACTIVE STYLES BY VARIANT
 */
function getActiveStyle(variant: ListItemVariant) {
    switch (variant) {
        case "check":
            return "";

        case "select":
            return "bg-secondary text-foreground";

        case "simple":
            return "bg-primary text-primary-foreground";

        default:
            return "";
    }
}

/**
 * INACTIVE STYLES BY VARIANT
 */
function getInactiveStyle(variant: ListItemVariant) {
    switch (variant) {
        case "check":
            return "hover:bg-secondary";

        case "select":
            return "text-muted-foreground hover:bg-secondary hover:text-foreground";

        case "simple":
            return "text-muted-foreground hover:bg-secondary hover:text-foreground";

        default:
            return "";
    }
}

export default function ListItem(
    {
        label,
        active = false,
        icon,
        count,
        onClick,
        variant = "check",
    }: ListItemProps): JSX.Element {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`
                ${BASE}
                ${active ? getActiveStyle(variant) : getInactiveStyle(variant)}
           `}
        >
            {/* CHECKBOX MODE */}
            {variant === "check" && (
                <span
                    className={`
                        flex size-4 shrink-0 items-center justify-center rounded border transition-colors
                        ${active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background"
                        }
                    `}
                >
                    {active && <Check className="size-3" strokeWidth={3} />}
                </span>
            )}

            {/* ICON (optional) */}
            {icon && (
                <span className="shrink-0 text-muted-foreground">
                    {icon}
                </span>
            )}

            {/* LABEL */}
            <span className="flex-1">{label}</span>

            {/* COUNT */}
            {count !== undefined && (
                <span className="font-mono text-xs text-muted-foreground">
                    {count}
                </span>
            )}
        </button>
    );
}