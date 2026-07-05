import {VERDICT_METADATA, ZONE_ICONS, ZONE_LABELS} from "../../lib/utils/constands.ts";
import {
    type ArticleResults, printRenderLevelLabel,
    type ResultByZone,
    type ResultsByLevel
} from "../../lib/types/presentation/evaluationPresentation.ts";
import type {Verdict} from "../../lib/types/models/EvaluationResult.ts";
import {zoneCount} from "../../lib/utils/functions.ts";
import Card from "../../ui/Card.tsx";
import type {JSX} from "react";
import type {LucideIcon} from "lucide-react";
import {RuleCard} from "./ruleCard/RuleCard.tsx";

export type ArticleEvaluationResultSectionProps =  {
    verdict: Verdict,
    resultsByLevel: ResultsByLevel[]
}

/**
 *  @summary Composant fonctionnel qui affiche les résultats d'évaluation d'un article pour un verdict donné
 *  @param verdict verdict de l'évaluation.
 *  @param resultsByLevel résultats par niveaux
 */
export default function ArticleEvaluationResultSection(
    {
        verdict,
        resultsByLevel
    } : ArticleEvaluationResultSectionProps): JSX.Element {


    const verdictMetadata = VERDICT_METADATA[verdict]
    const VerdictIcon = verdictMetadata.icon
    const numberOfRules = resultsByLevel.reduce(
        (sum, g) => sum + g.resultsByArticle.reduce((s, a) => s + zoneCount(a.resultByZone), 0),
        0,
    )

    return (
        <section
            id={`section-${verdict}`}
            aria-labelledby={`heading-${verdict}`}
            className="scroll-mt-32"
        >
            {/* Titre de la section : Nom du verdict + Icône représentative + description */}
            <div className="mb-6 flex items-center gap-3">
                {/* Icône représentative */}
                <span
                    className={`inline-flex size-9 items-center justify-center rounded-xl ${verdictMetadata.accent} text-primary-foreground`}
                    aria-hidden="true"
                >
                  <VerdictIcon className="size-5" />
                </span>
                {/* Titre du verdict + description */}
                <div>
                    <h2
                        id={`heading-${verdict}`}
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


/**
 * @summary Composant fonctionnel qui affiche les résultats par niveau de nomenclature (du produit fini, aux composants primaires)
 * @param group dictionnaire des résultats par niveau
 */
function ResultByLevelBlock({ group }: { group: ResultsByLevel }): JSX.Element {

    const isFiniteProduct = group.level === 0

    return (
        <div>
            {/* Titre du niveau */}
            <div className="mb-5 flex items-center gap-2.5">
                <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  {printRenderLevelLabel(group.level)}
                </span>
            </div>

            {/* Zone d'affichage des résultats par article du niveau correspondant*/}
            {isFiniteProduct && group.resultsByArticle.length === 1 ? (
                <ResultByZoneBlock resultsByZone={group.resultsByArticle[0].resultByZone} />
            ) : (
                <div className="grid gap-8">
                    {group.resultsByArticle.map((article) => (
                        <ResultByArticleBlock
                            key={article.code}
                            article={article}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

/**
 * @summary Composant fonctionnel qui affiche les résultats d'un article seul
 * @param article Résultats d'un article
 */
function ResultByArticleBlock({ article }: { article: ArticleResults }): JSX.Element {
    return (
        <div>
            {/* Code et désignation de l'article courant */}
            <div className="mt-4 mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1  pl-3">
                <span className="font-mono text-md font-medium text-primary">
                  Article {article.code} - {article.designation}
                </span>
            </div>
            {/* Résultat par zone métier */}
            <ResultByZoneBlock resultsByZone={article.resultByZone} />
        </div>
    )
}

/**
 * @summary Composant fonctionnel qui affiche les résultats d'évaluation d'un article par zone métier
 * @param resultsByZone Résultats par zone métier.
*/
function ResultByZoneBlock({ resultsByZone }: { resultsByZone: ResultByZone[] }) {
    return (
        <div className="grid gap-6 mt-5">
            {resultsByZone.map((resultByZone) => {
                const ZoneIcon: LucideIcon = ZONE_ICONS[resultByZone.zone]
                return (
                    <div key={resultByZone.zone}>
                        {/* Métadonnées de la zone (icône + nom + nombre de résultats) */}
                        <div className="mb-3 flex items-center gap-2">
                            <ZoneIcon
                                className="size-4 text-brand-accent"
                                aria-hidden="true"
                            />
                            <h4 className="text-md font-semibold text-foreground">
                                Zone {ZONE_LABELS[resultByZone.zone]}
                            </h4>
                            <span className="font-mono text-xs text-muted-foreground mt-1">({resultByZone.results.length} règle(s))</span>
                        </div>

                        {/* Affichage des résultats par règle*/}
                        <div className="grid gap-4">
                            {resultByZone.results.map((ruleResult, i) => (
                                <RuleCard
                                    key={`${ruleResult.rule_id}-${i}`}
                                    rule={ruleResult}
                                />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

