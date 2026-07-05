import type {FilterCounts, Filters, VerdictFilter} from "../../../lib/types/presentation/evaluationPresentation.ts";
import Card from "../../../ui/Card.tsx";
import ListItem from "../../../ui/ListItem.tsx";


export type VerdictFilterTabProps = {
    filters: Filters
    onChange: (next: Filters) => void
    counts: FilterCounts
}


export function VerdictFilterTab(
    {
        filters,
        onChange,
        counts,
    }: VerdictFilterTabProps) {

    const options: { value: VerdictFilter; label: string }[] = [
        { value: "all", label: `Tous (${counts.total})` },
        { value: "FAIL", label: `Échecs (${counts.fail})` },
        { value: "PASS", label: `Conformes (${counts.pass})` },
        { value: "INCOMPLETE", label: `Incomplètes (${counts.incomplete})` },
    ]
    return (
        <Card
            variant="default"
            rounded="xl"
        >
            <div className="inline-flex flex-wrap gap-1">
                {options.map((opt) => {
                    const active = filters.verdict === opt.value
                    return (
                        <div
                            className="w-fit"
                            key={opt.value}
                        >
                            <ListItem
                                variant="simple"
                                label={opt.label}
                                active={active}
                                onClick={() => onChange({ ...filters, verdict: opt.value })}
                            />
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}