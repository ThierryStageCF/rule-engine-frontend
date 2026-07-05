/**
 * Métadonnées de présentation dérivées du modèle d'évaluation.
 * Séparé du modèle de données pur : ici vivent les libellés d'affichage,
 * les ordres canoniques et les helpers de formatage pour l'UI.
 */
import type {Criticality, Verdict, ZoneKey} from "../types/models/EvaluationResult.ts";
import {
    CheckCircle2, Cog, HelpCircle, ListChecks, Package, Boxes, FileText, type LucideIcon, Sliders, UserRound, XCircle,
    ShieldAlert, Ban, AlertTriangle
} from "lucide-react";
import type {CriticalityFilter, Filters, VerdictFilter} from "../types/presentation/evaluationPresentation.ts";
import type {BadgeProps} from "../../ui/Badge.tsx";



export const ZONE_LABELS: Record<ZoneKey, string> = {
    caracteristiques: "Caractéristiques",
    operations: "Opérations",
    gammes: "Gammes",
    client: "Client",
    apport: "apports",
    nomenclature: "nomenclature",
    article: "article"
};

/** Ordre d'affichage canonique des zones lors du regroupement. */
export const ZONE_ORDER: ZoneKey[] = [
    "article",
    "caracteristiques",
    "client",
    "nomenclature",
    "gammes",
    "operations",
    "apport",
];

export const VERDICT_LABELS: Record<Verdict, string> = {
    FAIL: "Non conforme",
    PASS: "Conforme",
    INCOMPLETE: "Incomplète",
};


export const VERDICT_METADATA: Record<Verdict, { title: string; description: string; icon: typeof XCircle; accent: string }> = {
    FAIL: {
        title: "Échecs",
        description: "Règles non respectées — à traiter en priorité.",
        icon: XCircle,
        accent: "bg-danger",
    },
    PASS: {
        title: "Conformes",
        description: "Contrôles satisfaits, y compris les exemptions.",
        icon: CheckCircle2,
        accent: "bg-success",
    },
    INCOMPLETE: {
        title: "Incomplètes",
        description:
            "Information manquante pour trancher — à compléter si nécessaire.",
        icon: HelpCircle,
        accent: "bg-warning",
    },
}

export const VERDICT_SECTION_ORDER: Verdict[] = ["FAIL", "PASS", "INCOMPLETE"]


export const DEFAULT_FILTERS: Filters = {
    verdict: "all",
    criticality: "all",
    zones: [],
    exemptionsOnly: false,
}

export const ZONE_ICONS: Record<ZoneKey, LucideIcon> = {
    caracteristiques: Sliders,
    operations: Cog,
    gammes: ListChecks,
    client: UserRound,
    article: FileText,
    nomenclature: Package,
    apport: Boxes
}

export const CRITICALITY_OPTIONS: { value: CriticalityFilter; label: string }[] = [
    { value: "all", label: "Toute criticité" },
    { value: "critique", label: "Critiques" },
    { value: "normal", label: "Normales" },
]

export const VERDICT_TAB_ACTIVE: Record<VerdictFilter, string> = {
    all: "bg-primary text-primary-foreground",
    FAIL: "bg-danger text-danger-foreground",
    PASS: "bg-success text-success-foreground",
    INCOMPLETE: "bg-warning text-warning-foreground",
}


export const VERDICT_BADGES: Record<Verdict,  Omit<BadgeProps, "children">> = {
    PASS: {
        variant: "success",
        icon: CheckCircle2,
        rounded: "full",
    },
    FAIL: {
        variant: "danger",
        icon: XCircle,
        rounded: "full",
    },
    INCOMPLETE: {
        variant: "warning",
        icon: HelpCircle,
        rounded: "full",
    },
};

export const CRITICALITY_BADGES: Record<Criticality, Omit<BadgeProps, "children">> = {
    critique: {
        variant: "danger",
        icon: ShieldAlert,
        uppercase: true,
        rounded: "md",
    },
    normal: {
        variant: "neutral",
        rounded: "md",
        uppercase: true,
    },
};

export const EXEMPTION_BADGE: Omit<BadgeProps, "children"> = {
    variant: "accent",
    icon: Ban,
    rounded: "full",
};

export const UNCERTAINTY_BADGE: Omit<BadgeProps, "children"> = {
    variant: "warning",
    icon: AlertTriangle,
    rounded: "full",
};