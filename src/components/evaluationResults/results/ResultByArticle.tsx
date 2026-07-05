import type {ArticleResults} from "../../../lib/types/presentation/evaluationPresentation.ts";
import type {JSX} from "react";
import ResultByZoneBlock from "./ResultByZone.tsx";

/**
 * @summary Composant fonctionnel qui affiche les résultats d'un article seul
 * @param article Résultats d'un article
 */
export default function ResultByArticleBlock({ article }: { article: ArticleResults }): JSX.Element {
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