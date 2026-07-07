import {Header} from "../components/landingPage/Header.tsx";
import {Filter} from "lucide-react";
import {SummaryBanner} from "../components/evaluationResults/headers/SummaryBanner.tsx";
import {VerdictFilterTab} from "../components/evaluationResults/filters/VerdictFilterTab.tsx";
import {ZoneCriticalityFilters} from "../components/evaluationResults/filters/ZoneCriticalityFilters.tsx";
import ResultByVerdict from "../components/evaluationResults/results/ResultByVerdict.tsx";
import {ResultsHeader} from "../components/evaluationResults/headers/ResultHeader.tsx";
import {Footer} from "../components/landingPage/Footer.tsx";
import {useArticleEvaluationResult} from "../lib/hooks/articleEvaluationResults/useArticleEvaluationResult.ts";
import LoadingPage from "./LoadingPage.tsx";
import {EvaluateModal} from "../components/modals/ArticleEvaluationModal.tsx";


export default function ArticleEvaluationResult() {
    const {ui, data, actions} = useArticleEvaluationResult();
    if(ui.isLoading || ui.isRefetching){
        return <LoadingPage message="Evaluation de l'article en cours"/>
    }
    if (ui.isError && data.errors.length > 0) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
                <h1 className="font-heading text-xl font-semibold text-foreground">
                    Une érreur s'est produite durant l'évaluation !
                </h1>
                <p className="max-w-md text-sm text-muted-foreground">
                    <span>{data.errors[0].message}</span>
                    <span>Veuillez recommencer ou Lancer une autre évaluation depuis l'accueil pour consulter les résultats ici.</span>
                </p>
                <a
                    href="/"
                    className="mt-2 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                    Retour à l'accueil
                </a>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-background">
            <Header/>
            <div className="mx-auto flex max-w-360.75 gap-10 px-4 pb-24 pt-4 lg:px-8">

                {/* Filtres dans sidebar à gauche  */}
                <aside className="sticky top-28 hidden w-64 shrink-0 self-start lg:block">
                    <span className="flex gap-2 mt-2  font-semibold mb-4 ">
                        <Filter className="w-6 h-6 mt-1 "/>
                        <p className="text-xl ">Filtres</p>
                    </span>
                    <ZoneCriticalityFilters
                        filters={ui.filters}
                        onFilterChange={actions.setFilters}
                        countPerFilter={data.countsPerFilters}
                    />
                </aside>

                {/* Zone d'affichage du rapport */}
                <main className="min-w-0 flex-1">
                    {/*  Titre et boutons de reévaluation de l'article et évaluation pour un autre article */}
                    <ResultsHeader
                        codeArticle={data.evaluationResults!.codeArticle}
                        designationArticle={data.evaluationResults!.articles[0].designationArticle}
                        onReevaluate={actions.handleReevaluate}
                        onEvaluateArticle={() => actions.setCanOpenModal(true)}
                    />
                    {/* statistiques d'évaluation */}
                    <SummaryBanner
                        fail={data.countsPerFilters.fail}
                        pass={data.countsPerFilters.pass}
                        incomplete={data.countsPerFilters.incomplete}
                        criticalFail={data.countsPerFilters.criticalFail}
                    />
                    {/* Filtres sur les verdicts d'évaluation (FAIL, PASS, INCOMPLET). */}
                    <div className="mt-6">
                        <VerdictFilterTab
                            filters={ui.filters}
                            onChange={actions.setFilters}
                            counts={data.countsPerFilters}
                        />
                    </div>
                    {/* Affichage mobile */}
                    <div className="mt-4 lg:hidden">
                        <ZoneCriticalityFilters
                            filters={ui.filters}
                            onFilterChange={actions.setFilters}
                            countPerFilter={data.countsPerFilters}
                        />
                    </div>
                    {/* Affichage du rapport par verdicts */}
                    <div className="mt-8 grid gap-14">
                        {data.resultByVerdict.map(({ verdict, resultsByLevel }) => (
                            <ResultByVerdict
                                key={verdict}
                                verdict={verdict}
                                resultsByLevel={resultsByLevel}
                            />
                        ))}
                    </div>
                </main>
            </div>
            <EvaluateModal open={ui.canOpenModal} onClose={() => actions.setCanOpenModal(false)} />
            <Footer/>
        </div>
    )
}




