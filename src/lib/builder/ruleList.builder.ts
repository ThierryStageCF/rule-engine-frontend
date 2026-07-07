import type { Rule } from "../types/models/rule.model.ts";
import type { DomainZone } from "../types/models/evaluationResult.model.ts";
import type { RuleCounts, RuleLocalFilters } from "../types/presentation/rule.model.presentation.ts";
import { ZONE_ORDER } from "../utils/constands.ts";

/**
 * @summary Calcule les compteurs des filtres locaux à partir de la liste chargée.
 * Les compteurs reflètent l'ensemble chargé (avant filtre local), pour que les
 * cartes de gauche indiquent combien de règles existent dans chaque zone.
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
 * @summary Ordonne les règles de façon déterministe : par ordre canonique de zone,
 * puis par identifiant. Donne un tableau stable indépendamment de l'ordre backend.
 * @param rules Liste à ordonner
 */
export function sortRules(rules: Rule[]): Rule[] {
    const rank = (zone?: DomainZone): number =>
        zone ? ZONE_ORDER.indexOf(zone) : ZONE_ORDER.length;
    return [...rules].sort(
        (a, b) => rank(a.zone) - rank(b.zone) || a.ruleId.localeCompare(b.ruleId),
    );
}

/**
 * @summary Applique les filtres locaux (zone, criticité) à la liste déjà chargée,
 * sans appel réseau. Sélection unique par axe, "all" désactivant l'axe.
 * @param rules Liste chargée
 * @param filters Filtres locaux courants
 */
export function filterRulesLocally(rules: Rule[], filters: RuleLocalFilters): Rule[] {
    return rules.filter((rule): boolean => matchesLocal(rule, filters));
}

/**
 * @summary Prédicat : une règle, satisfait-elle les filtres locaux courants.
 * Zones : si aucune sélectionnée, l'axe est inactif ; sinon appartenance.
 */
function matchesLocal(rule: Rule, filters: RuleLocalFilters): boolean {
    if (filters.zones.length > 0 && (!rule.zone || !filters.zones.includes(rule.zone))) {
        return false;
    }
    return !(filters.criticality !== "all" && rule.criticality !== filters.criticality);
}