import {VERDICT_METADATA} from "../../../lib/utils/constands.ts";
import {type ResultsByLevel} from "../../../lib/types/presentation/evaluationPresentation.ts";
import type {Verdict} from "../../../lib/types/models/EvaluationResult.ts";
import {zoneCount} from "../../../lib/utils/functions.ts";
import Card from "../../../ui/Card.tsx";
import type {JSX} from "react";
import ResultByLevelBlock from "./ResultByLevelBlock.tsx";

export type ResultByVerdictProps =  {
    verdict: Verdict,
    resultsByLevel: ResultsByLevel[]
}

/**
 *  @summary Composant fonctionnel qui affiche les résultats d'évaluation d'un article pour un verdict donné
 *  @param verdict verdict de l'évaluation.
 *  @param resultsByLevel résultats par niveaux
 */
export default function ResultByVerdict(
    {
        verdict,
        resultsByLevel
    } : ResultByVerdictProps): JSX.Element {


    const verdictMetadata = VERDICT_METADATA[verdict]
    const VerdictIcon = verdictMetadata.icon
    const numberOfRules = resultsByLevel.reduce(
        (sum, g) => sum + g.resultsByArticle.reduce((s, a) => s + zoneCount(a.resultByZone), 0),
        0,
    )

    return (
        <section id={`section-${verdict}`}
            aria-labelledby={`heading-${verdict}`}
            className="scroll-mt-32"
        >
            {/* Titre de la section : Nom du verdict + Icône représentative + description */}
            <div className="mb-6 flex items-center gap-3">
                {/* Icône représentative */}
                <span className={`inline-flex size-9 items-center justify-center rounded-xl ${verdictMetadata.accent} text-primary-foreground`}
                    aria-hidden="true"
                >
                  <VerdictIcon className="size-5" />
                </span>
                {/* Titre du verdict + description */}
                <div>
                    <h2 id={`heading-${verdict}`}
                        className="font-heading text-2xl font-semibold text-foreground"
                    >
                        {verdictMetadata.title}{" "}
                        <span className="text-lg font-normal text-muted-foreground">
                            ({numberOfRules})
                         </span>
                    </h2>
                    <p className="text-sm text-muted-foreground">{verdictMetadata.description}</p>
                </div>
            </div>

            {/* Zone d'affichage des règles par niveau de nomenclature. */}
            {resultsByLevel.length === 0 ? (
                <Card
                    padding="lg"
                    rounded="xl"
                    variant="outlined"
                >
                    <div className="flex items-center justify-center">
                        <span>Aucune règle ne correspond aux filtres actifs dans cette catégorie.</span>
                    </div>
                </Card>
            ) : (
                <div className="grid gap-12">
                    {resultsByLevel.map((result) => (
                        <ResultByLevelBlock
                            key={result.level}
                            group={result}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}








