import {Ban, type LucideIcon} from "lucide-react"
import { type DomainZone } from "../../../lib/types/models/evaluationResult.model.ts";
import {
    CRITICALITY_OPTIONS,
    ZONE_ICONS,
    ZONE_LABELS,
    ZONE_ORDER
} from "../../../lib/utils/constands.ts";
import type {
    FilterCounts,
    EvaluationResultFilters,
} from "../../../lib/types/presentation/evaluation.model.presentation.ts";
import Card from "../../../ui/Card.tsx";
import ListItem from "../../../ui/ListItem.tsx";
import type {JSX} from "react";



export type SideFiltersProps = {
    filters: EvaluationResultFilters
    onFilterChange: (next: EvaluationResultFilters) => void
    countPerFilter: FilterCounts
}

/**
 * @summary Composant fonctionnel qui affiche les filtres sur les résultats de l'évaluation selon la zone métier et la criticité des règles.
 * @param filters : EvaluationResultFilters  objet de filtres disponible (par verdict, zone, etc.)
 * @param onFilterChange Fonction permettant de mettre à jour un filtre
 * @param countPerFilter Nombre d'éléments pour chaque filtre.
 */
export function ZoneCriticalityFilters(
    {
        filters,
        onFilterChange,
        countPerFilter,
    }: SideFiltersProps): JSX.Element{


    const toggleZone = (zone: DomainZone) => {
        const has = filters.zones.includes(zone);
        onFilterChange({
            ...filters,
            zone: has ? filters.zones.filter((z) => z !== zone) : [...filters.zones, zone],
        });
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Filtres sur la zone métier */}
            <Card
                variant="default"
                title="Zone métier"
                description="Isoler une zone sans perdre la structure du résultat."
            >
                <div className="flex flex-col gap-0.5">
                    {ZONE_ORDER.map((zone) => {
                        const active: boolean = filters.zones.includes(zone)
                        const ZoneIcon: LucideIcon = ZONE_ICONS[zone]
                        return (
                            <ListItem
                                key={zone}
                                active={active}
                                label={ZONE_LABELS[zone]}
                                icon={<ZoneIcon className="size-4 text-muted-foreground" />}
                                count={countPerFilter.byZone[zone] ?? 0}
                                onClick={() => toggleZone(zone)}
                            />
                        )
                    })}
                </div>
            </Card>

            {/* Filtre sur la criticité de la règle */}
            <Card
                variant="default"
                title="Criticité"
            >
                <div className="flex flex-col gap-0.5">
                    {CRITICALITY_OPTIONS.map((criticalityOption) => {
                        const active = filters.criticality === criticalityOption.value
                        return (
                            <ListItem
                                key={criticalityOption.value}
                                variant="simple"
                                label={criticalityOption.label}
                                active={active}
                                onClick={() =>
                                    onFilterChange({ ...filters, criticality: criticalityOption.value })
                                }
                            />
                        )
                    })}
                </div>

                {/* Filtre pour afficher les articles exemptés sur des règles. */}
                <div className="mt-3 border-t border-border pt-3">
                    <ListItem
                        variant="select"
                        label="Exemptées uniquement"
                        active={filters.exemptionsOnly}
                        onClick={() =>
                            onFilterChange({ ...filters, exemptionsOnly: !filters.exemptionsOnly })
                        }
                        icon={<Ban className="size-4 shrink-0" aria-hidden="true" />}
                        count={countPerFilter.exempted}
                    />
                </div>
            </Card>
        </div>
    )
}