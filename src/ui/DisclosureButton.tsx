import type {JSX,  ReactNode} from "react";
import { ChevronDown } from "lucide-react";
import { useId } from "react";

type DisclosureVariant =
    | "default"
    | "ghost"
    | "subtle"
    | "inline";

interface DisclosureButtonProps {
    open: boolean;
    onToggle: () => void;
    children: ReactNode;

    controlsId?: string;
    variant?: DisclosureVariant;
    className?: string;
    showChevron?: boolean;
}

const VARIANTS: Record<DisclosureVariant, string> = {
    default:
        "flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-sm font-medium hover:bg-secondary",

    ghost:
        "flex w-full items-center justify-between gap-3 rounded-xl border-transparent px-4 py-3 text-left text-sm font-medium hover:bg-secondary",

    subtle:
        "flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm font-medium hover:bg-muted",

    inline:
        "inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:text-brand-accent/80",
};

export default function DisclosureButton(
    {
        open,
        onToggle,
        children,
        controlsId,
        variant = "default",
        showChevron = true,
    }: DisclosureButtonProps): JSX.Element {

    const generated = useId();
    const id = controlsId ?? generated;

    return (
        <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={id}
            className={`
                ${VARIANTS[variant]}
                transition-colors
                cursor-pointer
            `}
        >
            <span className="flex items-center gap-1">
                {children}
            </span>

            {showChevron && (
                <ChevronDown
                    className={`
                        size-3.5 shrink-0
                        transition-transform
                        ${open ? "rotate-180" : ""}
                    `}
                    aria-hidden="true"
                />
            )}
        </button>
    );
}