import type { Rule } from "../types/models/rule.model.ts";
import type { DomainZone } from "../types/models/evaluationResult.model.ts";
import type { RuleCounts, RuleLocalFilters } from "../types/presentation/rule.model.presentation.ts";
import { ZONE_ORDER } from "../utils/constands.ts";

/**
 * @summary Calcule les compteurs des filtres locaux à partir de la liste chargée.
 * Les compteurs reflètent l'ensemble chargé depuis le serveur, afin que les
 * cartes de filtres locaux affichent combien de règles existent dans chaque zone et pour chaque criticité.
 * @param rules Liste plate des règles chargées
 */
export function buildRuleCounts(rules: Rule[]): RuleCounts {
    const byZone = Object.fromEntries(
        ZONE_ORDER.map((zone): [DomainZone, number] => [zone, 0]),
    ) as Record<DomainZone, number>;

    let critique = 0;
    let normal = 0;
    for (const rule of rules) {
        if (rule.zone) {
            byZone[rule.zone] += 1;
        }
        if (rule.criticality === "critique") {
            critique += 1;
        } else {
            normal += 1;
        }
    }
    return {
        total: rules.length,
        byZone,
        critique,
        normal,
    };
}

/**
 * @summary Ordonne les règles, par ordre canonique de zone,
 * puis par identifiant.
 * @param rules Liste à ordonner
 */
export function sortRulesByZone(rules: Rule[]): Rule[] {
    const rank = (zone: DomainZone): number => ZONE_ORDER.indexOf(zone);
    return [...rules].sort(
        (a, b) => rank(a.zone) - rank(b.zone) || a.id.localeCompare(b.id),
    );
}

/**
 * @summary Applique les filtres locaux (zone, criticité) à la liste déjà chargée,
 * @param rules Liste chargée
 * @param filters Filtres locaux courants
 */
export function filterRulesLocally(rules: Rule[], filters: RuleLocalFilters): Rule[] {
    return rules.filter((rule): boolean => matchesLocal(rule, filters));
}

/**
 * @summary Prédicat : une règle, satisfait-elle les filtres locaux courants.
 */
function matchesLocal(rule: Rule, filters: RuleLocalFilters): boolean {
    if (filters.zones.length > 0 && (!filters.zones.includes(rule.zone))) {
        return false;
    }
    return !(filters.criticality !== "all" && rule.criticality !== filters.criticality);
}