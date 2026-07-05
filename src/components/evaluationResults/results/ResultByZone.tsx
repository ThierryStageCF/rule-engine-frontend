import type {ResultByZone} from "../../../lib/types/presentation/evaluationPresentation.ts";
import {ZONE_ICONS, ZONE_LABELS} from "../../../lib/utils/constands.ts";
import type {LucideIcon} from "lucide-react";
import {RuleCard} from "../ruleCard/RuleCard.tsx";

/**
 * @summary Composant fonctionnel qui affiche les résultats d'évaluation d'un article par zone métier
 * @param resultsByZone Résultats par zone métier.
 */
export default function ResultByZoneBlock({ resultsByZone }: { resultsByZone: ResultByZone[] }) {
    return (
        <div className="grid gap-6 mt-5">
            {resultsByZone.map((resultByZone) => {
                const ZoneIcon: LucideIcon = ZONE_ICONS[resultByZone.zone]
                return (
                    <div key={resultByZone.zone}>
                        {/* Métadonnées de la zone (icône + nom + nombre de résultats) */}
                        <div className="mb-3 flex items-center gap-2">
                            <ZoneIcon
                                className="size-4 text-brand-accent"
                                aria-hidden="true"
                            />
                            <h4 className="text-md font-semibold text-foreground">
                                Zone {ZONE_LABELS[resultByZone.zone]}
                            </h4>
                            <span className="font-mono text-xs text-muted-foreground mt-1">({resultByZone.results.length} règle(s))</span>
                        </div>

                        {/* Affichage des résultats par règle*/}
                        <div className="grid gap-4">
                            {resultByZone.results.map((ruleResult, i) => (
                                <RuleCard
                                    key={`${ruleResult.rule_id}-${i}`}
                                    rule={ruleResult}
                                />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}