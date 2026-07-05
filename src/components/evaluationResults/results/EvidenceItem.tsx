import {type JSX, useId, useState} from "react"

import type { Evidence } from "../../../lib/types/models/EvaluationResult";
import {detailRows} from "../../../lib/utils/functions.ts";
import DisclosureButton from "../../../ui/DisclosureButton.tsx";
import Card from "../../../ui/Card.tsx";


export interface EvidenceItemProps {
    evidence: Evidence,
}

/**
 * @summary Composant fonctionnel qui affiche les évidences (rapports d'échec ou incomplete) d'une règle
 * @param evidence
 * @param tone
 */
export function EvidenceItem({evidence}: EvidenceItemProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(false)
    const detailId = useId()
    const rows = detailRows(evidence)


    return (
        <Card variant="secondary">

            {/* Explication de l'échec de l'évaluation */}
            <p className="mt-2 text-sm leading-relaxed text-foreground text-pretty">
                {evidence.phrase}
            </p>

            {/* Affichage les détails de l'évidence */}
            {rows.length > 0 && (
                <div className="mt-3">
                    <DisclosureButton
                        controlsId={detailId}
                        variant="inline"
                        open={open}
                        onToggle={() => setOpen(open => !open)}
                    >
                        {open ? "Masquer le détail" : "Voir le détail"}
                    </DisclosureButton>

                    {open && (
                        <dl
                            id={detailId}
                            className="mt-3 grid gap-3  p-3 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"
                        >
                            {rows.map((row) => (
                                <div key={row.label}>
                                    <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                                        {row.label}
                                    </dt>
                                    <dd
                                        className={`mt-1 font-mono text-sm wrap-break-word ${
                                            row.tone === "expected"
                                                ? "text-success"
                                                : row.tone === "actual"
                                                    ? "text-danger"
                                                    : "text-foreground"
                                        }`}
                                    >
                                        {row.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            )}
        </Card>
    )
}