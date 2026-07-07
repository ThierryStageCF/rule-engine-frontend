import {type NomenclatureLevelResult} from "../../../lib/types/presentation/evaluation.model.presentation.ts";
import type {JSX} from "react";
import ResultByArticleBlock from "./ResultByArticle.tsx";
import ResultByZoneBlock from "./ResultByZone.tsx";


/**
 * @summary Composant fonctionnel qui affiche les résultats par niveau de nomenclature (du produit fini, aux composants primaires)
 * @param group dictionnaire des résultats par niveau
 */
export default function ResultByLevelBlock({ group }: { group: NomenclatureLevelResult }): JSX.Element {

    const isFiniteProduct = group.level === 0

    return (
        <div>
            {/* Titre du niveau */}
            <div className="mb-5 flex items-center gap-2.5">
                <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
                  {group.level === 0 ?  "Produit fini" : `Nomenclature — niveau ${group.level}`}
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