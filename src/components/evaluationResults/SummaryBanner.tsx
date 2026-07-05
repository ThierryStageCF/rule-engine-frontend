import { Download } from "lucide-react"
import Card from "../../ui/Card.tsx";
import Button from "../../ui/Button.tsx";

type Props = {
    fail: number
    pass: number
    incomplete: number
    criticalFail: number
}

export type StatProps  = {
    dotClass: string
    label: string
    value: number | string
    hint?: string
}

function Stat(
    {
        dotClass,
        label,
        value,
        hint,
    }: StatProps) {
    return (
        <div>
            <div className="flex items-center gap-2">
                <span
                    className={`size-2 rounded-full ${dotClass}`}
                    aria-hidden="true"
                />
                <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/65">
                        {label}
                </span>
            </div>
            <div className="mt-1.5 text-4xl font-semibold text-primary-foreground">
                {value}
            </div>
            {hint && (
                <div className="mt-1.5 text-xs text-primary-foreground/60">{hint}</div>
            )}
        </div>
    )
}

export function SummaryBanner({ fail, pass, incomplete, criticalFail }: Props) {
    const evaluated = fail + pass + incomplete
    const rate = evaluated > 0 ? Math.round((pass / evaluated) * 100) : 0

    return (
        <Card
            aria-label="Synthèse de l'évaluation"
            variant="primary"
            rounded="xl"
            padding="lg"
        >
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
                <div className="flex flex-wrap gap-x-10 gap-y-6">
                    <Stat
                        dotClass="bg-danger"
                        label="Échecs"
                        value={fail}
                        hint={
                            criticalFail > 0
                                ? `dont ${criticalFail} critique${criticalFail > 1 ? "s" : ""}`
                                : "aucun critique"
                        }
                    />
                    <Stat
                        dotClass="bg-success"
                        label="Conformes" value={pass}
                    />
                    <Stat
                        dotClass="bg-warning"
                        label="Incomplètes"
                        value={incomplete}
                    />
                    <Stat
                        dotClass="bg-brand-accent"
                        label="Taux de conformité"
                        value={`${rate}%`}
                    />
                </div>
                <Button
                    type="button"
                    variant="secondary"
                    style="dashed"
                    rounded="xl"
                    size="sm"
                    label="Exporter · bientôt disponible"
                    icon={<Download className="size-4" aria-hidden="true" />}
                    disabled={true}
                />
            </div>
        </Card>
    )
}