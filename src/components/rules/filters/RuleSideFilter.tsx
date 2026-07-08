import { type LucideIcon } from "lucide-react";
import type { JSX } from "react";
import { type DomainZone } from "../../../lib/types/models/evaluationResult.model.ts";
import {
    CRITICALITY_OPTIONS,
    ZONE_ICONS,
    ZONE_LABELS,
    ZONE_ORDER,
} from "../../../lib/utils/constands.ts";
import type {
    RuleCounts,
    RuleLocalFilters,
} from "../../../lib/types/presentation/rule.model.presentation.ts";
import Card from "../../../ui/Card.tsx";
import ListItem from "../../../ui/ListItem.tsx";

export type RuleSideFiltersProps = {
    filters: RuleLocalFilters;
    onFilterChange: (next: RuleLocalFilters) => void;
    countPerFilter: RuleCounts;
};

/**
 * @summary Filtres locaux de la liste des règles : zone métier (multi-sélection)
 * et criticité (sélection unique). Affinent instantanément la liste déjà chargée.
 * @param filters Filtres locaux courants
 * @param onFilterChange Met à jour les filtres locaux
 * @param countPerFilter Compteurs calculés sur l'ensemble chargé
 */
export function RuleSideFilters(
    {
        filters,
        onFilterChange,
        countPerFilter,
    }: RuleSideFiltersProps): JSX.Element {

    const toggleZone = (zone: DomainZone) => {
        const has = filters.zones.includes(zone);
        onFilterChange({
            ...filters,
            zones: has ? filters.zones.filter((z) => z !== zone) : [...filters.zones, zone],
        });
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Filtres sur la zone métier */}
            <Card
                variant="default"
                title="Zone métier"
                description="Isoler une ou plusieurs zones dans la liste."
            >
                <div className="flex flex-col gap-0.5">
                    {ZONE_ORDER.map((zone) => {
                        const active: boolean = filters.zones.includes(zone);
                        const ZoneIcon: LucideIcon = ZONE_ICONS[zone];
                        return (
                            <ListItem
                                key={zone}
                                active={active}
                                label={ZONE_LABELS[zone]}
                                icon={<ZoneIcon className="size-4 text-muted-foreground" />}
                                count={countPerFilter.byZone[zone] ?? 0}
                                onClick={() => toggleZone(zone)}
                            />
                        );
                    })}
                </div>
            </Card>

            {/* Filtre sur la criticité */}
            <Card variant="default" title="Criticité">
                <div className="flex flex-col gap-0.5">
                    {CRITICALITY_OPTIONS.map((option) => {
                        const active = filters.criticality === option.value;
                        const count =
                            option.value === "critique"
                                ? countPerFilter.critique : option.value === "normal"
                                    ? countPerFilter.normal
                                    : countPerFilter.total;
                        return (
                            <ListItem
                                key={option.value}
                                label={option.label}
                                active={active}
                                count={count}
                                onClick={() => onFilterChange({ ...filters, criticality: option.value })}
                            />
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}