import {useId, useState} from "react";
import type {RuleResult} from "../../../lib/types/models/EvaluationResult.ts";
import {AlertTriangle, Ban, Info} from "lucide-react";
import DisclosureButton from "../../../ui/DisclosureButton.tsx";
import {EvidenceItem} from "../EvidenceItem.tsx";

export default function RuleResultCard({ rule }: { rule: RuleResult }) {
    const hasEvidence = rule.evidence.length > 0
    const hasMultipleEvidences = rule.evidence.length > 1
    const [open, setOpen] = useState<boolean>(!hasMultipleEvidences);
    const listId = useId();


    return (
        <>
            {hasEvidence && (
                <>
                    {/* Rapport détaillé de l'évaluation en cas de verdict FAIL */}
                    <div className="mt-4 mb-2">
                        <h3 className="font-semibold"> *** Rapport d'évaluation </h3>
                    </div>
                    <div className="mt-4">
                        {hasMultipleEvidences && (
                            <div className="ml-6">
                                <DisclosureButton
                                    open={open}
                                    controlsId={listId}
                                    onToggle={() => setOpen(v => !v)}
                                >
                                    <Info className="size-4 text-muted-foreground" />
                                    {rule.evidence.length} cas d'échec ont été recensés durant l'évaluation.
                                </DisclosureButton>
                            </div>
                        )}

                        {open && (
                            <div id={listId}
                                 className={` ${hasMultipleEvidences ? "mt-3" : ""}`}
                            >
                                <div className="grid gap-3 ml-6 mt-3">
                                    {rule.evidence.map((ev, i) => (
                                        <EvidenceItem
                                            key={`${ev.subject}-${i}`}
                                            evidence={ev}
                                        />
                                    ))}
                                </div>

                            </div>
                        )}
                    </div>
                </>
            )}

            <div>
                {/* Exemptions */}
                {(rule.exemption_uncertain && rule?.uncertainty_reason)  &&
                    (
                        <div className="mt-4 mb-2">
                            <h3 className="font-semibold inline-flex">
                                ***
                                <AlertTriangle size={20} className="ml-2 mr-1 mt-0.5"/>
                                Exception Incertaine
                            </h3>
                        </div>
                    )
                }
                {(rule.exempted && rule?.exemption_reason) &&
                    (
                        <div className="mt-4 mb-2">
                            <h3 className="font-semibold inline-flex">
                                *** <Ban size={18} className="ml-2 mr-1 mt-0.5"/>
                                Exception
                            </h3>
                        </div>
                    )
                }
                {/* Règle exemptée - Explication de l'exemption */}
                {rule.exempted && rule?.exemption_reason && (
                    <div className="mt-4 flex flex-col gap-2.5 rounded-xl bg-accent px-4 py-3 ml-6">
                        <p className="ml-6 text-sm leading-relaxed text-accent-foreground text-pretty">
                            {rule?.exemption_reason}
                        </p>
                    </div>
                )}

                {/* Règle dont l'exemption est certaine, et on a appliqué la règle par précaution */}
                {rule.exemption_uncertain && rule?.uncertainty_reason && (
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-warning/25 bg-warning/5 px-4 py-3 ml-6">
                        <div className="min-w-0">
                            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 text-pretty">
                                {rule?.uncertainty_reason}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}