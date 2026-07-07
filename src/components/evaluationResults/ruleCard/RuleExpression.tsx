import type {RuleResult} from "../../../lib/types/models/evaluationResult.model.ts";
import type {JSX} from "react";

/**
 * @summary Composant fonctionnel qui affiche l'énoncé d'une règle (semi-formel + texte source si présent)
 * @param rule  Résult d'une règle qui comporte ses métadonnées.
 * */
export default function RuleExpression({ rule }: { rule: RuleResult }): JSX.Element {
    return (
        <div className="mt-4 grid gap-1.5">
            <h2 className="mb-1 font-semibold"> *** Énonce de la règle </h2>
            {/* Libellé de la règle si renseigné */}
            {rule.libelle && (
                <div className="flex gap-2.5 ml-7">
                    <span className="w-14 shrink-0 pt-px text-xs font-medium  text-muted-foreground">
                        Libellé:
                    </span>
                    <span className="min-w-0 flex-1 text-sm text-foreground/80 text-pretty">
                        {rule.libelle}
                    </span>
                </div>
            )}

            {/* Semi-formel de la règle. */}
            <div className="flex gap-2.5 ml-7">
                <span className="w-14 shrink-0 pt-px text-xs font-medium  text-muted-foreground">
                  Formel:
                </span>
                <code className="min-w-0 flex-1 whitespace-wrap wrap-break-word text-sm text-foreground/90">
                    {rule.semiFormel}
                </code>
            </div>
        </div>
    )
}