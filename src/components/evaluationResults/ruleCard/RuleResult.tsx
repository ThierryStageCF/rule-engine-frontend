import {useId, useState} from "react";
import type {RuleResult} from "../../../lib/types/models/evaluationResult.model.ts";
import {AlertTriangle, Ban, Info} from "lucide-react";
import DisclosureButton from "../../../ui/DisclosureButton.tsx";
import {EvidenceItem} from "../results/EvidenceItem.tsx";
import Badge from "../../../ui/Badge.tsx";


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
                {/* Titre Exemptions Incertaine */}
                {(rule.exemptionUncertain && rule?.uncertaintyReason)  &&
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
                {/* Titre Exemptions */}
                {(rule.exempted && rule?.exemptionReason) &&
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
                {rule.exempted && rule?.exemptionReason && (
                    <div className="mt-4 ml-6">
                        <Badge
                            variant="accent"
                            size="md"
                        >
                            <span className="min-h-10 items-center justify-center flex">
                                {rule?.exemptionReason}
                            </span>
                        </Badge>
                    </div>
                )}

                {/* Règle dont l'exemption est certaine, et on a appliqué la règle par précaution */}
                {rule.exemptionUncertain && rule?.uncertaintyReason && (
                    <div className="mt-4 ml-6">
                        <Badge
                            variant="warning"
                            size="md"
                        >
                            <span className="min-h-10 items-center justify-center flex">
                                {rule?.uncertaintyReason}
                            </span>
                        </Badge>
                    </div>
                )}
            </div>
        </>
    )
}