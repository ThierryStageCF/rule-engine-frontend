import type {JSX} from "react";
import {ScanSearch, X} from "lucide-react";


export type BaseModalProps = {
    open: boolean;
    onClose: () => void
    children: JSX.Element
    title: string
    subtitle?: string
    icon?: JSX.Element
}

/**
 * Modale de base configurée qui accepte un enfant ReactNode.
 */
export default function BaseModal({open, onClose, children, title, subtitle, icon}: BaseModalProps): JSX.Element | null {
    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="evaluate-title"
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fade-in-up"/>
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-base-color p-6 shadow-2xl shadow-primary/20 animate-fade-in-up sm:p-7">
                <div className="mb-4 flex flex-col items-center justify-center">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fermer"
                        className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-red-100 text-red-500 transition-colors hover:bg-red-200 hover:text-red-800 duration-200 cursor-pointer"
                    >
                        <X className="size-4" />
                    </button>

                    {icon && (
                        <div className="flex size-11 items-center justify-center rounded-xl bg-icon-accent/10 text-icon-accent">
                            <ScanSearch className="size-5" />
                        </div>
                    )}
                    <h2 id="evaluate-title" className="mt-4 text-xl font-semibold tracking-tight text-foreground text-balance">{title}</h2>
                    {subtitle && (<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>)}
                </div>
                {children}
            </div>
        </div>
    )
}