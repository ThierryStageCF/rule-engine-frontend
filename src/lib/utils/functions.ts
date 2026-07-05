import type {EvaluationResult, Evidence, RuleResult, Verdict, ZoneKey} from "../types/models/EvaluationResult.ts";
import type {
    ArticleResults,
    DetailRow,
    ResultsByLevel,
    ResultByZone,
    Filters
} from "../types/presentation/evaluationPresentation.ts";
import {ZONE_ORDER} from "./constands.ts";

function matchesSecondary(rule: RuleResult, filters: Filters): boolean {
    if (filters.criticality !== "all" && rule.criticality !== filters.criticality)
        return false
    if (filters.zones.length > 0 && !filters.zones.includes(rule.zone))
        return false
    return !(filters.exemptionsOnly && !rule.exempted);
}

export function buildLevelGroups(evaluation: EvaluationResult, verdict: Verdict, filters: Filters,): ResultsByLevel[] {
    const articleGroups: ArticleResults[] = []
    for (const article of evaluation.articles) {
        const rules = article.rules.filter(
            (r) => r.verdict === verdict && matchesSecondary(r, filters),
        )
        if (rules.length === 0) continue

        const byZone = new Map<ZoneKey, RuleResult[]>()
        for (const r of rules) {
            if (!byZone.has(r.zone)) byZone.set(r.zone, [])
            byZone.get(r.zone)!.push(r)
        }
        const zones: ResultByZone[] = ZONE_ORDER
            .filter((z) => byZone.has(z))
            .map((z) => (
                {
                    zone: z,
                    results: byZone.get(z)!
                }
            ),
        )

        articleGroups.push({
            code: article.codeArticle,
            designation: article.designationArticle,
            level: article.level,
            resultByZone: zones,
        })
    }

    const byLevel = new Map<number, ArticleResults[]>()
    for (const ag of articleGroups) {
        if (!byLevel.has(ag.level)) byLevel.set(ag.level, [])
        byLevel.get(ag.level)!.push(ag)
    }

    return [...byLevel.keys()]
        .sort((a, b) => a - b)
        .map((level) => ({
            level,
            resultsByArticle: byLevel
                .get(level)!
                .sort((a, b) => a.code.localeCompare(b.code)),
        }))
}


export function zoneCount(zones: ResultByZone[]): number {
    return zones.reduce((s, z) => s + z.results.length, 0)
}



export function detailRows(ev: Evidence): DetailRow[] {
    const rows: DetailRow[] = []
    if (ev.field) {
        rows.push(
            {
                label: "Champ contrôlé",
                value: ev.field
            }
        )
    }
    if (ev.expected) {
        rows.push(
            {
                label: "Attendu",
                value: ev.expected,
                tone: "expected"
            }
        )
    }
    if (ev.actual){
        rows.push(
            {
                label: "Constaté",
                value: ev.actual,
                tone: "actual"
            }
        )
    }
    return rows
}
