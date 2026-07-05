import type { JSX, MouseEventHandler } from "react";

/**
 *  Variantes de boutons disponibles
 */
type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonStyle = "solid" | "outlined" | "dashed";
type ButtonSize = "sm" | "md" | "lg" | "xl";
type ButtonRounded = "sm" | "md" | "lg" | "xl";


interface ButtonProps {
    icon?: JSX.Element;
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;

    variant?: ButtonVariant;
    style?: ButtonStyle;
    size?: ButtonSize;
    rounded?: "sm" | "md" | "lg" | "xl";
}

/**
 *  Variants (couleurs)
 */
const SOLID: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-blue-800",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    danger: "bg-danger text-danger-foreground hover:bg-danger/80",
    ghost: "bg-transparent text-foreground hover:bg-accent",
};

const OUTLINED: Record<ButtonVariant, string> = {
    primary: "border border-primary text-primary hover:bg-primary/10",
    secondary: "border border-secondary text-secondary hover:bg-secondary/10",
    danger: "border border-danger text-danger hover:bg-danger/10",
    ghost: "border border-border text-foreground hover:bg-accent",
};

const DASHED: Record<ButtonVariant, string> = {
    primary: "border border-dashed border-primary text-primary hover:bg-primary/10",
    secondary: "border border-dashed border-secondary text-secondary hover:bg-secondary/10",
    danger: "border border-dashed border-danger text-danger hover:bg-danger/10",
    ghost: "border border-dashed border-border text-foreground hover:bg-accent",
};

/**
 *  Sizes (taille bouton + texte)
 */
const SIZE = {
    sm: "h-9 px-3 text-xs",
    md: "h-11 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-13 px-5 text-lg",
};


/**
 *  Rounded
 */
const ROUNDED: Record<ButtonRounded, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
};

/**
 *  Base style commun
 */
const BASE =
    "inline-flex items-center gap-2 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer";

export default function Button(
    {
        icon,
        type = "button",
        label, onClick,
        disabled = false,
        variant = "primary",
        style = "solid",
        size = "md",
        rounded = "md"
    }: ButtonProps): JSX.Element {

    const variantClass =
        style === "solid" ? SOLID[variant] :
            (style === "outlined" ? OUTLINED[variant] : DASHED[variant]);

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className=
                {`
                    ${BASE}
                    ${variantClass}
                    ${SIZE[size]}
                    ${ROUNDED[rounded]}
                `}
        >
            {icon && <span className="text-current flex items-center">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
}