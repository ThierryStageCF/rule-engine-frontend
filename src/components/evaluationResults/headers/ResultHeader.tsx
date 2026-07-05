import { RefreshCw, ScanSearch } from "lucide-react";
import Button from "../../../ui/Button.tsx";

type ResultHeaderProps = {
    codeArticle: string;
    designationArticle: string;
    onReevaluate: () => void;
    onEvaluateArticle: () => void;
};

/**
 * @summary Composant fonctionnel qui affiche l'en tête de la page des résultats d'évaluation d'un article
 * @param codeArticle
 * @param designationArticle
 * @param isLoading
 * @param onReevaluate Fonction permettant de réévaluer l'article courant
 * @param onEvaluateArticle Fonction permettant de lancer une évaluation sur un autre article
 */
export function ResultsHeader({codeArticle, designationArticle, onReevaluate, onEvaluateArticle}: ResultHeaderProps) {
    return (
        <div>
            <div className=" flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-4 sm:px-6 lg:px-8">
                {/* Titre de la page + code article + désignation */}
                <div className="min-w-0">
                    <h1
                        className="font-semibold tracking-wide text-primary text-2xl"
                    >
                        Résultat d&apos;évaluation
                    </h1>
                    <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <h2 className="text-md font-semibold text-muted-foreground text-balance">
                            Article {codeArticle} : {designationArticle}
                        </h2>

                    </div>
                </div>

                {/* Actions Buttons: Bouton réévaluer et bouton Évaluer un nouvel article */}
                <div className="flex flex-wrap items-center gap-2.5">
                    <Button
                        icon = {<ScanSearch className="size-4" aria-hidden="true" />}
                        onClick={onEvaluateArticle}
                        label=" Évaluer un autre article"
                        variant="primary"
                        style="outlined"
                        rounded="xl"
                    >
                    </Button>
                    <Button
                        icon={<RefreshCw className="size-4" aria-hidden="true" />}
                        onClick={onReevaluate}
                        variant="primary"
                        style="solid"
                        rounded="xl"
                        label={"Réévaluer"}
                    />
                </div>
            </div>
        </div>
    );
}