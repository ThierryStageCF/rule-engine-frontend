import type {RuleResult} from "../../../lib/types/models/EvaluationResult.ts";
import {CRITICALITY_BADGES, VERDICT_BADGES, VERDICT_LABELS} from "../../../lib/utils/constands.ts";
import type {JSX} from "react";
import Badge from "../../../ui/Badge.tsx";

/**
 * @summary composant fonctionnel qui affiche l'en tête d'un résultat d'évaluation d'une règle (sa criticité, son statut)
 * @param rule Résult d'évaluation de la règle.
 */
export default function RuleHeader({ rule }: { rule: RuleResult }): JSX.Element {
    const verdictBadge     = VERDICT_BADGES[rule.verdict];
    const criticalityBadge = CRITICALITY_BADGES[rule.criticality];
    return (
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
            {/* Identifiant + Nom de la règle */}
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="font-mono text-md font-semibold text-brand-accent text-pretty ">
                        {rule.rule_id} - {rule.rule_label}
                     </span>
                </div>
            </div>
            {/* Badges statut du résultat et criticité de la règle. */}
            <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
                <Badge {...verdictBadge}>
                    {VERDICT_LABELS[rule.verdict]}
                </Badge>
                <Badge {...criticalityBadge}>
                    {rule.criticality}
                </Badge>
            </div>
        </div>
    )
}