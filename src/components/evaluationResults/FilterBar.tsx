import {Ban, type LucideIcon} from "lucide-react"
import { type ZoneKey } from "../../lib/types/models/EvaluationResult";
import {
    CRITICALITY_OPTIONS,
    ZONE_ICONS,
    ZONE_LABELS,
    ZONE_ORDER
} from "../../lib/utils/constands.ts";
import type {
    FilterCounts,
    Filters,
} from "../../lib/types/presentation/evaluationPresentation.ts";
import Card from "../../ui/Card.tsx";
import ListItem from "../../ui/ListItem.tsx";



export type SideFiltersProps = {
    filters: Filters
    onChange: (next: Filters) => void
    counts: FilterCounts
}

export function SideFilters(
    {
        filters,
        onChange,
        counts,
    }: SideFiltersProps){


    const toggleZone = (zone: ZoneKey) => {
        const has = filters.zones.includes(zone)
        onChange({
            ...filters,
            zones: has
                ? filters.zones.filter((z) => z !== zone)
                : [...filters.zones, zone],
        })
    }

    return (
        <div className="flex flex-col gap-4">
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
                                count={counts.byZone[zone] ?? 0}
                                onClick={() => toggleZone(zone)}
                            />
                        )
                    })}
                </div>
            </Card>

            <Card
                variant="default"
                title="Criticité"
            >
                <div className="flex flex-col gap-0.5">
                    {CRITICALITY_OPTIONS.map((opt) => {
                        const active = filters.criticality === opt.value
                        return (
                            <ListItem
                                key={opt.value}
                                variant="simple"
                                label={opt.label}
                                active={active}
                                onClick={() =>
                                    onChange({ ...filters, criticality: opt.value })
                                }
                            />
                        )
                    })}
                </div>

                <div className="mt-3 border-t border-border pt-3">
                    <ListItem
                        variant="select"
                        label="Exemptées uniquement"
                        active={filters.exemptionsOnly}
                        onClick={() =>
                            onChange({ ...filters, exemptionsOnly: !filters.exemptionsOnly })
                        }
                        icon={<Ban className="size-4 shrink-0" aria-hidden="true" />}
                        count={counts.exempted}
                    />
                </div>
            </Card>
        </div>
    )
}