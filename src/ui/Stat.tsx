import type {JSX} from "react";

export type StatVariant =
    | "danger"
    | "success"
    | "warning"
    | "primary"
    | "muted";


const DOTS: Record<StatVariant, string> = {
    danger: "bg-danger",
    success: "bg-success",
    warning: "bg-warning",
    primary: "bg-brand-accent",
    muted: "bg-muted-foreground",
};

const LABELS_COLOR: Record<StatVariant, string> = {
    danger: "text-danger",
    success: "text-success",
    warning: "text-warning",
    primary: "text-primary-foreground/70",
    muted: "text-muted-foreground",
};

export type StatProps = {
    variant: StatVariant;
    label: string;
    value: number | string;
    hint?: string;
};

export default function Stat(
    {
        variant,
        label,
        value,
        hint,
    }: StatProps): JSX.Element {
    return (
        <div>
            {/* header */}
            <div className="flex items-center gap-2">
                <span
                    className={`size-2 rounded-full ${DOTS[variant]}`}
                    aria-hidden="true"
                />
                <span
                    className={`text-xs font-semibold uppercase tracking-wide ${LABELS_COLOR[variant]}`}
                >
                    {label}
                </span>
            </div>

            {/* value */}
            <div className="mt-1.5 text-4xl font-semibold text-primary-foreground">
                {value}
            </div>

            {/* hint */}
            {hint && (
                <div className="mt-1.5 text-xs text-primary-foreground/60">
                    {hint}
                </div>
            )}
        </div>
    );
}