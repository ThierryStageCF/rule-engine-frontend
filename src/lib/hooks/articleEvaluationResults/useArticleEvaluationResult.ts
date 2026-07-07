import {type Location, useLocation} from "react-router-dom";
import type {DomainZone} from "../../types/models/evaluationResult.model.ts";
import {useMemo, useState} from "react";
import type {
    FilterCounts,
    EvaluationResultFilters
} from "../../types/presentation/evaluation.model.presentation.ts";
import {DEFAULT_FILTERS, VERDICT_SECTION_ORDER} from "../../utils/constands.ts";
import {buildResultsByLevel} from "../../builder/evaluationResult.builder.ts";
import {useEvaluationQuery} from "../../queries/useEvaluationQuery.ts";
import type {ErrorResponse, ResponseEntity} from "../../types/entities/response.entity.ts";
import {isHTTPError} from "ky";

/**
 * @summary Hook Custom chargé de la logique UI de la page qui affiche les résultats d'une évaluation sur un article.
 */
export function useArticleEvaluationResult() {

    /* Récupération des résultats depuis l'URL */
    const location: Location = useLocation();
    const codeArticle : string = location.state?.codeArticle;

    /* Filtres */
    const [filters, setFilters] = useState<EvaluationResultFilters>(DEFAULT_FILTERS);
    const [canOpenModal, setCanOpenModal] = useState<boolean>(false);

    /* Récupération des données serveurs et avec la gestion d'état et erreurs */
    const {
        data: evaluationResults,
        isLoading,
        isError,
        error,
        refetch,
        isRefetching
    } = useEvaluationQuery(codeArticle);

    let errors: ErrorResponse[] = [];
    if (isHTTPError(error)){
        const errorData = error?.data as ResponseEntity<null>;
        errors = errorData.errors;
    }
    else if(evaluationResults === undefined) {
        errors = [
            {
                code: "",
                message: "Une érreur interne s'est produite" !
            }
        ]
    }

    /* Tous les résultats d'évaluation à plat. */
    const allEvaluatedRules = useMemo(() => {
        return evaluationResults?.articles.flatMap((a) => a.rules) ?? []
    }, [evaluationResults]);

    /* statistiques de l'évaluation */
    const countsPerFilters: FilterCounts & { criticalFail: number } = useMemo(() => {
        const countByZone: Record<DomainZone, number> = {
            caracteristiques: 0,
            operation: 0,
            gamme: 0,
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
        for (const r of allEvaluatedRules) {
            if (r.verdict === "FAIL") fail++
            if (r.verdict === "PASS") pass++
            if (r.verdict === "INCOMPLETE") incomplete++
            if (r.exempted) exempted++
            if (r.verdict === "FAIL" && r.criticality === "critique") criticalFail++
            countByZone[r.zone]++
        }
        return {
            total: allEvaluatedRules.length,
            fail,
            pass,
            incomplete,
            exempted,
            criticalFail,
            byZone: countByZone,
        }
    }, [allEvaluatedRules])

    /* Réordonnement des résultats par Verdict (PASS, INCOMPLET, FAIL, WARNING) */
    const resultByVerdict = useMemo(() => {
        if (!evaluationResults) return []
        return VERDICT_SECTION_ORDER.filter((verdict) => filters.verdict === "all" || filters.verdict === verdict)
            .map((verdict) => (
                    {
                        verdict,
                        resultsByLevel: buildResultsByLevel(evaluationResults, verdict, filters)
                    }
                )
            )
    }, [evaluationResults, filters])


    return {
        ui: {
            filters,
            canOpenModal,
            isLoading,
            isError,
            isRefetching,
        },

        data: {
            evaluationResults,
            countsPerFilters,
            resultByVerdict,
            errors
        },

        actions: {
            setFilters,
            setCanOpenModal,
            handleReevaluate: refetch,
        }
    }
}



