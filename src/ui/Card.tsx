import type {JSX, ReactNode} from "react";

type CardVariant =
    | "default"
    | "elevated"
    | "outlined"
    | "ghost"
    | "primary"
    | "secondary";

type CardPadding = "sm" | "md" | "lg";
type CardRounded = "sm" | "md" | "lg" | "xl";

interface CardProps {
    title?: string;
    description?: string;
    children: ReactNode;

    variant?: CardVariant;
    padding?: CardPadding;
    rounded?: CardRounded;
}


const BASE = "border text-card-foreground";


const VARIANTS: Record<CardVariant, string> = {
    default: "bg-card border-border shadow-xs",

    elevated: "bg-card border-border shadow-md hover:shadow-lg transition-shadow",

    outlined: "border-2 bg-card border-border border-dashed",

    ghost: "bg-transparent border-transparent",

    primary: "bg-primary text-primary-foreground border-transparent",

    secondary: "bg-secondary text-secondary-foreground border-transparent",
};


const PADDING: Record<CardPadding, string> = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
};

const ROUNDED: Record<CardRounded, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-2xl",
};


export default function Card(
    {
        title,
        description,
        children,
        variant = "default",
        padding = "md",
        rounded = "lg",
        }: CardProps) : JSX.Element
{
    return (
        <div
            className={`
                ${BASE}
                ${VARIANTS[variant]}
                ${PADDING[padding]}
                ${ROUNDED[rounded]}
              `}
        >
            {(title || description) && (
                <div className="mb-3">
                    {title && (
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {title}
                        </h3>
                    )}

                    {description && (
                        <p className="mt-1 text-xs text-muted-foreground/80">
                            {description}
                        </p>
                    )}
                </div>
            )}
            <div>{children}</div>
        </div>
    );
}