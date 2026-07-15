import {type JSX} from "react";
import { X } from "lucide-react";

type ModalSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-2xl",
};


export type BaseModalProps = {
    open: boolean|null;
    onClose: () => void;
    children: JSX.Element;
    title: string;
    subtitle?: string;
    icon?: JSX.Element;
    size?: ModalSize;
    accent?: "success" | "warning" | "danger";
};

/**
 * Modale de base : centrée, largeur réglable, corps scrollable si le contenu est haut.
 */
export default function BaseModal(
    {
        open,
        onClose,
        children,
        title,
        subtitle,
        icon,
        size = "md",
        accent,
    }: BaseModalProps): JSX.Element | null {

    const ACCENTS: Record<NonNullable<BaseModalProps["accent"]>, string> = {
        success: "bg-success/10 text-success",
        warning: "bg-warning/10 text-warning",
        danger: "bg-danger/10 text-danger",
    };
    const iconAccentClass = accent ? ACCENTS[accent] : "bg-icon-accent/10 text-icon-accent";

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="base-modal-title"
        >
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fade-in-up" onClick={onClose} />
            <div className={`relative z-10 flex max-h-[90vh] w-full ${SIZES[size]} flex-col rounded-2xl border border-border bg-base-color shadow-2xl shadow-primary/20 animate-fade-in-up`}>
                {/* En-tête fixe */}
                <div className="relative flex flex-col items-center justify-center px-6 pt-6 pb-4 sm:px-7">
                    <button
                        type="button"
                        onClick={()=> onClose()}
                        aria-label="Fermer"
                        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-red-100 text-red-500 transition-colors hover:bg-red-200 hover:text-red-800 duration-200 cursor-pointer"
                    >
                        <X className="size-4" />
                    </button>
                    {icon && (
                        <div className={`flex size-11 items-center justify-center rounded-xl ${iconAccentClass}`}>
                            {icon}
                        </div>
                    )}
                    <h2 id="base-modal-title" className="mt-4 text-xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
                    {subtitle && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>}
                </div>
                {/* Corps scrollable */}
                <div className="overflow-y-auto px-10 pb-4 sm:px-7 mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}