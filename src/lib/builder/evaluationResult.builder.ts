import type {DomainZone, EvaluationResultModel, Evidence, RuleResult, Verdict} from "../types/models/evaluationResult.model.ts";
import type {
    ArticleFilteredByZoneResults,
    EvaluationResultFilters, EvidenceDetailRow,
    NomenclatureLevelResult,
    ZoneResults
} from "../types/presentation/evaluation.model.presentation.ts";
import {ZONE_ORDER} from "../utils/constands.ts";

/**
 * @summary Builder qui permet de construire la liste des résultats par niveau de nomenclature pour un type de Verdict donné
 * @param evaluationResult Résultats bruts de l'évaluation triés par article
 * @param verdict Verdict dont on doit ressortir tous les résultats
 * @param filters
 * @return NomenclatureLevelResult Résultat par niveau de nomenclature
 */
export function buildResultsByLevel(evaluationResult: EvaluationResultModel, verdict: Verdict, filters: EvaluationResultFilters): NomenclatureLevelResult[] {
    /* Construction des résultats par article pour le verdict donné. */
    const resultsByArticle: ArticleFilteredByZoneResults[] = [];
    for (const article of evaluationResult.articles) {

        /* Filtre pour extraire les règles dont le verdict est celui d'entrée de la fonction. */
        const rules: RuleResult[] = article.rules.filter(
            (rule): boolean => rule.verdict === verdict && matchesSecondary(rule, filters),
        )
        if (rules.length === 0) continue;

        /* Construction des résultats par zone pour l'article courant. */
        const resultsByZone = new Map<DomainZone, RuleResult[]>();
        for (const rule of rules) {
            if (!resultsByZone.has(rule.zone)) {
                resultsByZone.set(rule.zone, []);
            }
            resultsByZone.get(rule.zone)!.push(rule);
        }
        const zones: ZoneResults[] = ZONE_ORDER
            .filter((zone) => resultsByZone.has(zone))
            .map((zone) => (
                    {
                        zone: zone,
                        results: resultsByZone.get(zone)!
                    }
                ),
            )
        resultsByArticle.push({
            code: article.codeArticle,
            designation: article.designationArticle,
            level: article.level,
            resultByZone: zones,
        })
    }

    /* Reconstitution en résultats par niveau*/
    const byLevel = new Map<number, ArticleFilteredByZoneResults[]>()
    for (const result of resultsByArticle) {
        if (!byLevel.has(result.level)){
            byLevel.set(result.level, [])
        }
        byLevel.get(result.level)!.push(result)
    }

    return [...byLevel.keys()]
        .sort((a, b) => a - b)
        .map((level) => (
                {
                    level,
                    resultsByArticle: byLevel.get(level)!,
                }
            )
        )
}

/**
 * @summary Fonction utilitaire qui permet de vérifier si une règle vérifie les filtres courants.
 * @param rule
 * @param filters
 */
function matchesSecondary(rule: RuleResult, filters: EvaluationResultFilters): boolean {
    if (filters.criticality !== "all" && rule.criticality !== filters.criticality)
        return false
    if (filters.zones.length > 0 && !filters.zones.includes(rule.zone))
        return false
    return !(filters.exemptionsOnly && !rule.exempted);
}


/**
 * @summary Builder qui permet de construire une ligne d'évidence détaillée pour l'affichage
 * @param ev Evidence source à transformer
 */
export function buildEvidenceDetailRows(ev: Evidence): EvidenceDetailRow[] {
    const rows: EvidenceDetailRow[] = []
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