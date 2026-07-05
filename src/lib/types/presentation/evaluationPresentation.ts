import type {Criticality, RuleResult, Verdict, ZoneKey} from "../models/EvaluationResult.ts";


export type ResultByZone = {
    zone: ZoneKey;
    results: RuleResult[]
}

export type ArticleResults = {
    code: string
    designation: string
    level: number
    resultByZone: ResultByZone[]
}

export type ResultsByLevel = {
    level: number;
    resultsByArticle: ArticleResults[]
}


export function printRenderLevelLabel(level: number): string {
    if (level === 0) return "Produit fini";
    return `Nomenclature — niveau ${level}`;
}

export type FilterCounts = {
    total: number
    fail: number
    pass: number
    incomplete: number
    exempted: number
    byZone: Record<ZoneKey, number>
}


export type DetailRow = {
    label: string;
    value: string;
    tone?: "expected" | "actual"
}


export type VerdictFilter = "all" | Verdict
export type CriticalityFilter = "all" | Criticality

export type Filters = {
    verdict: VerdictFilter
    criticality: CriticalityFilter
    zones: ZoneKey[]
    exemptionsOnly: boolean
}