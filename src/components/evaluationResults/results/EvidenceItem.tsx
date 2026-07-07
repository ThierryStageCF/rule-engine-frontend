import {type JSX, useId, useState} from "react"

import type { Evidence } from "../../../lib/types/models/evaluationResult.model.ts";
import DisclosureButton from "../../../ui/DisclosureButton.tsx";
import Card from "../../../ui/Card.tsx";
import {buildEvidenceDetailRows} from "../../../lib/builder/evaluationResultBuilder.ts";
import type {EvidenceDetailRow} from "../../../lib/types/presentation/evaluation.model.presentation.ts";


export interface EvidenceItemProps {
    evidence: Evidence,
}

/**
 * @summary Composant fonctionnel qui affiche les évidences (rapports d'échec ou incomplete) d'une règle
 * @param evidence
 * @param tone
 */
export function EvidenceItem({evidence}: EvidenceItemProps): JSX.Element {
    const [open, setOpen] = useState<boolean>(!evidence.phrase);
    const detailId: string = useId();
    const evidenceDetail: EvidenceDetailRow[] = buildEvidenceDetailRows(evidence);


    return (
        <Card variant="secondary">

            {/* Explication de l'échec de l'évaluation */}
            {evidence.phrase &&
                <p className="mt-2 text-sm leading-relaxed text-foreground text-pretty">
                    {evidence.phrase}
                </p>
            }

            {/* Affichage les détails de l'évidence */}
            {evidenceDetail.length > 0 && (
                <div className="mt-3">
                    {evidence.phrase &&
                        <DisclosureButton
                            controlsId={detailId}
                            variant="inline"
                            open={open}
                            onToggle={() => setOpen(open => !open)}
                        >
                            {open ? "Masquer le détail" : "Voir le détail"}
                        </DisclosureButton>
                    }

                    {open && (
                        <dl
                            id={detailId}
                            className="mt-3 grid gap-3 p-1 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]"
                        >
                            {evidenceDetail.map((detail) => (
                                <div key={detail.label}>
                                    <dt className="text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
                                        {detail.label}
                                    </dt>
                                    <dd
                                        className={`mt-1 font-mono text-sm wrap-break-word ${
                                            detail.tone === "expected" ? "text-success" :
                                                detail.tone === "actual" ? "text-danger" : "text-foreground"
                                        }`}
                                    >
                                        {detail.value}
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