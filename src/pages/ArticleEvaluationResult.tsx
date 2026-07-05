import { useMemo, useState } from "react"
import {type Location, useLocation} from "react-router-dom"
import { type EvaluationResult, type ZoneKey } from "../lib/types/models/EvaluationResult";
import { EvaluateModal } from "../components/landingPage/ArticleEvaluationModal"
import {
    SideFilters
} from "../components/evaluationResults/FilterBar.tsx";
import {
    type FilterCounts,
    type Filters,
} from "../lib/types/presentation/evaluationPresentation.ts";
import {ResultsHeader} from "../components/evaluationResults/ResultHeader.tsx";
import {SummaryBanner} from "../components/evaluationResults/SummaryBanner.tsx";
import {DEFAULT_FILTERS, VERDICT_SECTION_ORDER} from "../lib/utils/constands.ts";
import {buildLevelGroups} from "../lib/utils/functions.ts";
import {Header} from "../components/landingPage/Header.tsx";
import {Filter} from "lucide-react";
import {VerdictFilterTab} from "../components/evaluationResults/VerdictFilterTab.tsx";
import ArticleEvaluationResultSection from "../components/evaluationResults/ResultSection.tsx";




export default function ArticleEvaluationResult() {
    const location: Location = useLocation()
    const evaluation: EvaluationResult = location.state?.evaluation

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
    const [reevaluating, setReevaluating] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const allRules = useMemo(
        () => evaluation?.articles.flatMap((a) => a.rules) ?? [],
        [evaluation],
    )

    const counts: FilterCounts & { criticalFail: number } = useMemo(() => {
        const byZone: Record<ZoneKey, number> = {
            caracteristiques: 0,
            operations: 0,
            gammes: 0,
            client: 0,
            nomenclature: 0,
            article: 0,
            apport: 0
        }
        let fail = 0
        let pass = 0
        let incomplete = 0
        let exempted = 0
        let criticalFail = 0
        for (const r of allRules) {
            if (r.verdict === "FAIL") fail++
            if (r.verdict === "PASS") pass++
            if (r.verdict === "INCOMPLETE") incomplete++
            if (r.exempted) exempted++
            if (r.verdict === "FAIL" && r.criticality === "critique") criticalFail++
            byZone[r.zone]++
        }
        return {
            total: allRules.length,
            fail,
            pass,
            incomplete,
            exempted,
            criticalFail,
            byZone,
        }
    }, [allRules])

    const resultByVerdict = useMemo(() => {
        if (!evaluation) return []
        return VERDICT_SECTION_ORDER.filter((verdict) => filters.verdict === "all" || filters.verdict === verdict)
            .map((verdict) => (
                {
                    verdict,
                    resultsByLevel: buildLevelGroups(evaluation, verdict, filters)
                }
            )
        )
    }, [evaluation, filters])



    const handleReevaluate = () => {
        setReevaluating(true)
        console.log("[v0] Réévaluation de l'article:", evaluation?.code)
        window.setTimeout(() => setReevaluating(false), 1400)
    }


    if (!evaluation) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-4 text-center">
                <h1 className="font-heading text-xl font-semibold text-foreground">
                    Aucune évaluation à afficher
                </h1>
                <p className="max-w-md text-sm text-muted-foreground">
                    Lancez une évaluation depuis l'accueil pour consulter les résultats ici.
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
            <div className="mx-auto flex max-w-370 items-start gap-6 px-4 pb-24 pt-6 lg:px-8">

                {/* Filtres dans sidebar à gauche  */}
                <aside className="sticky top-28 hidden w-64 shrink-0 self-start lg:block">
                    <span className="flex gap-2 mt-2  font-semibold mb-4 ">
                        <Filter className="w-6 h-6 mt-1 "/>
                        <p className="text-xl ">Filtres</p>
                    </span>
                    <SideFilters filters={filters} onChange={setFilters} counts={counts} />
                </aside>

                {/* Zone d'affichage du rapport */}
                <main className="min-w-0 flex-1 max-w-5xl">
                    {/*  Titre et boutons de reévaluation de l'article et évaluation pour un autre article */}
                    <ResultsHeader
                        code={evaluation.code}
                        designation={evaluation.designation}
                        reevaluating={reevaluating}
                        onReevaluate={handleReevaluate}
                        onNewArticle={() => setModalOpen(true)}
                    />
                    {/* statistiques d'évaluation */}
                    <SummaryBanner
                        fail={counts.fail}
                        pass={counts.pass}
                        incomplete={counts.incomplete}
                        criticalFail={counts.criticalFail}
                    />
                    {/* Filtres sur les verdicts d'évaluation (FAIL, PASS, INCOMPLET). */}
                    <div className="mt-6">
                        <VerdictFilterTab
                            filters={filters}
                            onChange={setFilters}
                            counts={counts}
                        />
                    </div>
                    {/* Affichage mobile */}
                    <div className="mt-4 lg:hidden">
                        <SideFilters
                            filters={filters}
                            onChange={setFilters}
                            counts={counts}
                        />
                    </div>
                    {/* Affichage du rapport par verdicts */}
                    <div className="mt-8 grid gap-14">
                        {resultByVerdict.map(({ verdict, resultsByLevel }) => (
                            <ArticleEvaluationResultSection
                                key={verdict}
                                verdict={verdict}
                                resultsByLevel={resultsByLevel}
                            />
                        ))}
                    </div>
                </main>
            </div>
            <EvaluateModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    )
}




