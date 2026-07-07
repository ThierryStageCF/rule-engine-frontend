/**
 * Types dérivés des modèles, retournés après des opérations de filtre
 */

import type {Criticality, RuleResult, Verdict, DomainZone} from "../models/evaluationResult.model.ts";

/**
 * Objet représentant les résultat d'évaluation par zone métier
 */
export type ZoneResults = {
    zone: DomainZone;
    results: RuleResult[]
}

/**
 * Objet représentant les résultat d'évaluation d'un article par zone métier,
 * enrichie avec la désignation et le niveau de l'article dans la nomenclature du produit fini.
 */
export type ArticleFilteredByZoneResults = {
    code: string
    designation: string
    level: number
    resultByZone: ZoneResults[]
}

/**
 * Objet représentant les résultat d'évaluation par niveau de nomenclature.
 */
export type NomenclatureLevelResult = {
    level: number;
    resultsByArticle: ArticleFilteredByZoneResults[]
}

/**
 * Objet représentant les statistiques des résultats d'évaluation.
 */
export type FilterCounts = {
    total: number
    fail: number
    pass: number
    incomplete: number
    exempted: number
    byZone: Record<DomainZone, number>
}

/**
 * Objet représentant les différents axes de filtres possibles sur les résultats
 */
export type EvaluationResultFilters = {
    verdict: VerdictFilter
    criticality: CriticalityFilter
    zones: DomainZone[]
    exemptionsOnly: boolean
}

export type VerdictFilter = "all" | Verdict
export type CriticalityFilter = "all" | Criticality



export type EvidenceDetailRow = {
    label: string;
    value: string;
    tone?: "expected" | "actual"
}


