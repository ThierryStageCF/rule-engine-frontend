/**
 * Constantes utiles à l'affichage des pages de façon plus automatique.
 */
import type {Criticality, Verdict, DomainZone} from "../types/models/evaluationResult.model.ts";
import {
    CheckCircle2, Cog, HelpCircle, ListChecks, Package, Boxes, FileText, type LucideIcon, Sliders, UserRound, XCircle,
    ShieldAlert
} from "lucide-react";
import type {CriticalityFilter, EvaluationResultFilters} from "../types/presentation/evaluation.model.presentation.ts";
import type {BadgeProps} from "../../ui/Badge.tsx";
import type {RuleLocalFilters} from "../types/presentation/rule.model.presentation.ts";
import type {SelectOption} from "../../ui/SelectField.tsx";



export const ZONE_LABELS: Record<DomainZone, string> = {
    caracteristiques: "Caractéristiques",
    operation: "Opérations",
    gamme: "Gammes",
    client: "Client",
    apport: "apports",
    nomenclature: "nomenclature",
    article: "article"
};

/** Ordre d'affichage canonique des zones lors du regroupement. */
export const ZONE_ORDER: DomainZone[] = [
    "article",
    "caracteristiques",
    "client",
    "nomenclature",
    "gamme",
    "operation",
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
        description: "Information manquante pour trancher — à compléter si nécessaire.",
        icon: HelpCircle,
        accent: "bg-warning",
    },
}

export const VERDICT_SECTION_ORDER: Verdict[] = [
    "FAIL",
    "PASS",
    "INCOMPLETE"
]


export const DEFAULT_FILTERS: EvaluationResultFilters = {
    verdict: "all",
    criticality: "all",
    zones: [],
    exemptionsOnly: false,
}

export const DEFAULT_RULES_FILTERS: RuleLocalFilters = {
    zones: [],
    criticality: "all",
}

export const ZONE_ICONS: Record<DomainZone, LucideIcon> = {
    caracteristiques: Sliders,
    operation: Cog,
    gamme: ListChecks,
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

export const PURE_CRITICALITY_OPTIONS: { value:Criticality; label: string }[] = [
    {
        value: "critique",
        label: "Critiques"
    },
    {
        value: "normal",
        label: "Normales"
    },
]


export const ZONES_OPTIONS: SelectOption[] = (Object.entries(ZONE_LABELS) as [DomainZone, string][])
    .map(([key, value]) => (
        {
            label: value,
            value: key,
        }
    ));


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
        rounded: "full",
    },
    normal: {
        variant: "success",
        rounded: "full",
        uppercase: true,
    },
};