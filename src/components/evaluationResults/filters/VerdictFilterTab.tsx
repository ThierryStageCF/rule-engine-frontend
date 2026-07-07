import type {FilterCounts, EvaluationResultFilters, VerdictFilter} from "../../../lib/types/presentation/evaluation.model.presentation.ts";
import Card from "../../../ui/Card.tsx";
import ListItem from "../../../ui/ListItem.tsx";



export type VerdictFilterTabProps = {
    filters: EvaluationResultFilters
    onChange: (next: EvaluationResultFilters) => void
    counts: FilterCounts
}


export function VerdictFilterTab(
    {
        filters,
        onChange,
        counts,
    }: VerdictFilterTabProps) {

    const options: { value: VerdictFilter; label: string }[] =
         [
            { value: "all", label: `Tous (${counts.total})` },
            { value: "FAIL", label: `Échecs (${counts.fail})` },
            { value: "PASS", label: `Conformes (${counts.pass})` },
            { value: "INCOMPLETE", label: `Incomplètes (${counts.incomplete})` },
        ];

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